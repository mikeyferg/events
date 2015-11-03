# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  name               :string
#  start_time         :string
#  end_time           :string
#  summary            :text
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  address            :string
#  cost               :string
#  source_url         :string
#  end_date           :string
#  date_only          :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  city_id            :integer
#  slug               :string
#  time_only          :time
#  featured           :boolean
#  page_url           :string
#  venue_id           :integer
#  schedule           :text
#  cost_integer       :integer
#

require 'open-uri'
require 'rest_client'
require 'paperclip.rb'
require 'venue.rb'
require 'date'
require 'time'
require 'active_support/time'

class Event < ActiveRecord::Base
  belongs_to :city
  belongs_to :venue
  has_many :user_events
  has_many :users, through: :user_events
  has_many :event_tags
  has_many :tags, through: :event_tags

  def self.by_category(category = nil)
    all
  end

  def self.by_date_range(date_range = nil)
    return where('date_only BETWEEN ? AND ?', DateTime.now.beginning_of_day, DateTime.now.end_of_day).all if date_range === 'today'
    return where('date_only BETWEEN ? AND ?', DateTime.now.tomorrow.beginning_of_day, DateTime.now.tomorrow.end_of_day).all if date_range === 'tomorrow'
    return where('date_only BETWEEN ? AND ?', DateTime.now.tomorrow.beginning_of_day, DateTime.now.tomorrow.end_of_day).all if date_range === 'weekend'
    all
  end

  def self.by_cost(free = nil, cost = nil)
    return where(cost: "Free") if free === 'true'
    return where(cost: cost) if not cost.nil?
    all
  end

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  after_create :update_image, only: :image_url

  def slug_candidates
  [
    :name,
    [:name, :venue],
    [:name, :venue, :date_only],
    [:name, :id]
  ]
  end

  attr_accessor :image

  #associates attribute :image with a file attachment
  has_attached_file :image, styles: {
    # small: "64x64",
    # med: "200x200",
      large: "400x400"
  }
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]


  def update_image

    if self['image_url'].nil?
      self['image_url'] = "https://s3.amazonaws.com/event-images.eventcoyote/default/event.jpg"
    end
      url = self['image_url']
      new_image = URI.parse(url)
      self.update_attribute(:image, new_image)
      image_url = self.image.url
      self.update_attribute(:image_url, image_url)
  end

  ######moving over kimono and standardizer

  def self.create_update_event(event, name, time_only, venue, image_url, page_url, summary, address, cost, source_url, date_only, city_id, tags, schedule)
      new_venue = Venue.find_or_create_venue(venue, address, city_id, image_url)
      current_event = Event.where(name: name)
      # binding.pry
      cost_integer = Event.cost_integer_parser(cost)
      found = false
      if current_event.length != 0
        current_event.each_with_index do |event, index|
          if Venue.find(event['venue_id'])['name'] == venue && !event['date_only'].include?("passed") && !event['date_only'].include?("No Date")  && Date.parse(event['date_only']) == date_only
            found = true
            current_event[index].update(
              name: name,
              time_only: time_only,
              venue_id: new_venue['id'],
              image_url: image_url,
              summary: summary,
              address: address,
              cost: cost,
              cost_integer: cost_integer,
              source_url: source_url,
              date_only: date_only,
              city_id: city_id,
              schedule: schedule
            )
          end
        end
      end

      if found == false
        event = Event.create(
          name: name,
          time_only: time_only,
          venue_id: new_venue['id'],
          image_url: image_url,
          page_url: page_url,
          summary: summary,
          address: address,
          cost: cost,
          cost_integer: cost_integer,
          source_url: source_url,
          date_only: date_only,
          city_id: city_id,
          schedule: schedule
        )
        tags.each do |tag|
          # binding.pry
          tag_entry = Tag.find_or_create_tag(tag)
          event.tags << tag_entry
        end
      end
  end



  def self.month_conversion(month)
    case month
    when "Jan"
      1
    when "Feb"
      2
    when "Mar"
      3
    when "Apr"
      4
    when "May"
      5
    when "Jun"
      6
    when "Jul"
      7
    when "Aug"
      8
    when "Sep"
      9
    when "Oct"
      10
    when "Nov"
      11
    when "Dec"
      12
    else
      ""
    end
  end
  def self.date_splitter(date)
    #binding.pry
    if date.include? "passed"
      "No Date"
    elsif date.include? "No Date"
      "No Date"
    else
      date_array = date.split
      month = month_conversion(date_array[1])
      day = date_array[2].to_i
      Date.new(Time.now.year, month, day)
    end
  end
  def self.start_time_regex(time)
    #  binding.pry
    if time.nil?
      time = "12:07am"
    else
      time_regex = time.match(/(?i)([0-2]?\d?(?::[0-5]\d)?)\s*-?\s*?([0-2]?\d(?::[0-5]\d)?)\s*([ap]m)/).captures
      # time_array = time_regex unless time_regex.nil?
      if time_regex[0] == ''
        time = time_regex[1] + time_regex[2]
      else
        time = time_regex[0] + time_regex[2]
      end
    end
    Time.parse(time) rescue nil
  end

  def self.cost_integer_parser(cost)
    if cost == nil
      nil
    elsif cost.downcase == "free"
      0
    else
      cost[/^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})*?/].tr("$", "").to_i
    end
  end


end
