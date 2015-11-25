# == Schema Information
#
# Table name: events
#
#  id                    :integer          not null, primary key
#  name                  :string
#  end_time              :string
#  summary               :text
#  image_url             :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  address               :string
#  cost                  :string
#  source_url            :string
#  end_date              :string
#  image_file_name       :string
#  image_content_type    :string
#  image_file_size       :integer
#  image_updated_at      :datetime
#  city_id               :integer
#  slug                  :string
#  time_only             :time
#  featured              :boolean
#  page_url              :string
#  venue_id              :integer
#  schedule              :text
#  cost_integer          :integer
#  date_only             :date
#  start_date_time       :datetime
#  start_date_time_array :string           default([]), is an Array
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

  has_many :partner_events
  has_many :partners, through: :partner_events

  validates :name, :presence => true
  validates :city_id, :presence => true
  # after_create :start_date_time_array, :presence => true

  has_many :event_times

  after_validation :update_image, only: :image_url

 # event filter settings
  def self.by_category(category = nil)
    all
  end

  def self.by_date_range(date_range = nil)
    return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).beginning_of_day + 6.day + 8.hour).all if date_range === 'week'
    return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).end_of_day + 8.hour).all if date_range === 'today'
    return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).tomorrow.beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).tomorrow.end_of_day + 8.hour).all if date_range === 'tomorrow'
    return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).at_beginning_of_week + 4.day + 8.hour, (DateTime.now.utc - 8.hour).at_beginning_of_week + 6.day + 8.hour).all if date_range === 'weekend'
    return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day, (DateTime.now.utc - 8.hour).beginning_of_day + 180.day).all if date_range === 'all'
    all
  end

  def self.by_cost(free = nil, cost = nil)
    return where(cost: "Free") if free === 'true'
    return where(cost: cost) if not cost.blank?
    all
  end

  # slug creation
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  def slug_candidates
  [
    :name,
    [:name, :venue],
    [:name, :venue, :date_only],
    [:name, :id]
  ]
  end

  # image managmenet
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
    # binding.pry
    if self['image_url'].blank?
      self['image_url'] = "http://s3.amazonaws.com/event-images.eventcoyote/default/event.jpg"
    end
    url = self['image_url']
    new_image = URI.parse(url)
    self.update_attribute(:image, new_image)
    image_url = self.image.url
    self.update_attribute(:image_url, image_url)
  end


  # Core event creation and update method
     def self.create_update_event(name, start_date_time_array, city_id, opts={})
      options = opts,
      venue = opts[:venue] || nil,
      image_url = opts[:image_url] || nil,
      page_url = opts[:page_url] || nil,
      summary = opts[:summary] || nil,
      address = opts[:address] || nil,
      cost = opts[:cost] || nil,
      source_url = opts[:source_url] || nil,
      tags = opts[:tags] || [],
      schedule = opts[:schedule] || nil,
      featured = opts[:featured] || false
    #find or create venue for this event
    new_venue = Venue.find_or_create_venue(venue, address, city_id)
    #search for events that already exist and put in an array
    current_event_array = Event.where(name: name, venue_id: new_venue['id'])
    #if event exist update event and delete duplicates
     if current_event_array.length != 0
       # update existing event
       event = current_event_array[0]
       event.update(
         name: name,
         venue_id: new_venue['id'],
         image_url: image_url,
         summary: summary,
         address: address,
         cost: cost,
         cost_integer: Event.cost_integer_parser(cost),
         source_url: source_url,
         city_id: city_id,
         schedule: schedule,
         featured: featured
       )

       start_date_time_array.each do |new_time|
         is_found = false
         event.event_times.each do |existing_time|
          
           if DateTime.parse(new_time) == existing_time.start_time
             is_found = true
           end
         end
         if is_found == false
           EventTime.create(start_time:new_time, event_id:event.id)
        end
       end

       event.tags.delete_all
       tags.each do |tag|
         tag_entry = Tag.find_or_create_tag(tag)
         event.tags << tag_entry
       end
       event.save
      #if event does not exist, create

     else
       event = Event.create(
         name: name,
         venue_id: new_venue['id'],
         image_url: image_url,
         page_url: page_url,
         summary: summary,
         address: address,
         cost: cost,
         cost_integer: Event.cost_integer_parser(cost),
         source_url: source_url,
         city_id: city_id,
         schedule: schedule,
         featured: featured
        #  start_date_time_array: start_date_time_array[0]
       )
       start_date_time_array.each do |time|
         EventTime.create(start_time:time, event_id:event.id)
        #  event.event_times << time
       end
       tags.each do |tag|
         tag_entry = Tag.find_or_create_tag(tag)
         event.tags << tag_entry
       end
       event.save
     end
   end

 # convert cost to integer
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
