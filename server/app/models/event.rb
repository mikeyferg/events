# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  name               :string
#  end_time           :string
#  summary            :text
#  image_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  address            :string
#  cost               :string
#  source_url         :string
#  end_date           :string
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
#  date_only          :date
#  start_date_time    :datetime
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
  validates :date_only, :presence => true
  validates :time_only, :presence => true
  validates :city_id, :presence => true
  validates_date :date_only, :presence => true
  validates_datetime :time_only, :presence => true

  after_validation :update_image, only: :image_url

 # event filter settings
  def self.by_category(category = nil)
    all
  end

  def self.by_date_range(date_range = nil)
    return where('date_only BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day, (DateTime.now.utc - 8.hour).beginning_of_day + 6.day).all if date_range === 'week'
    return where('date_only BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day, (DateTime.now.utc - 8.hour).end_of_day).all if date_range === 'today'
    return where('date_only BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).tomorrow.beginning_of_day, (DateTime.now.utc - 8.hour).tomorrow.end_of_day).all if date_range === 'tomorrow'
    return where('date_only BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).at_beginning_of_week + 4.day, (DateTime.now.utc - 8.hour).at_beginning_of_week + 6.day).all if date_range === 'weekend'
    return where('date_only BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day, (DateTime.now.utc - 8.hour).beginning_of_day + 180.day).all if date_range === 'all'
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
     def self.create_update_event(name, date_only, time_only, city_id, opts={})
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
      start_date_time = opts[:start_date_time] || nil
      featured = opts[:featured] || false
    #find or create venue for this event
    new_venue = Venue.find_or_create_venue(venue, address, city_id)
    #search for events that already exist and put in an array
    current_event_array = Event.where(name: name, venue_id: new_venue['id'], date_only: date_only)
    #if event exist update event and delete duplicates
     if current_event_array.length != 0
       #if there is more than one instance of event then delete all instances except the first one
       if current_event_array.length > 1
         current_event = current_event_array.shift
         current_event_array_delete = current_event_array
         current_event_array_delete.each do |event|
           Event.find(event.id).delete
         end
       end
       # update existing event
       event = current_event_array[0]
       event.update(
         name: name,
         time_only: time_only,
         venue_id: new_venue['id'],
         image_url: image_url,
         summary: summary,
         address: address,
         cost: cost,
         cost_integer: Event.cost_integer_parser(cost),
         source_url: source_url,
         date_only: date_only,
         city_id: city_id,
         schedule: schedule,
         start_date_time: start_date_time,
         featured: featured
       )
       event.tags.delete_all
       tags.each do |tag|
         tag_entry = Tag.find_or_create_tag(tag)
         event.tags << tag_entry
       end
      #if event does not exist, create
     else
       event = Event.create(
         name: name,
         time_only: time_only,
         venue_id: new_venue['id'],
         image_url: image_url,
         page_url: page_url,
         summary: summary,
         address: address,
         cost: cost,
         cost_integer: Event.cost_integer_parser(cost),
         source_url: source_url,
         date_only: date_only,
         city_id: city_id,
         schedule: schedule,
         start_date_time: start_date_time,
         featured: featured
       )
       tags.each do |tag|
         tag_entry = Tag.find_or_create_tag(tag)
         event.tags << tag_entry
       end
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
