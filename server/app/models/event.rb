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
  validates :source_url, uniqueness: true

  has_many :event_times

  before_validation :downcase_source_url
  before_validation :load_image_from_url

  def downcase_source_url
    source_url.downcase! if source_url.present?
  end

  def self.by_tag(category = nil)
    case category
      ###remove spaces, etc
    when "live-music"
        # return where("self.tags = ?", "Live Music")
      return where("tags.name = ?", 'Live Music')
    when "bars-clubs"
        return where("tags.name = ?", 'Bars & Clubs')
    when "nightlife"
        return where("tags.name = ?", 'Nightlife')
    when "art-museums"
        return where("tags.name = ?", 'Art & Museums')
    when "comedy"
      return where("tags.name = ?", 'Comedy')
    when "theatre-dance"
      return where("tags.name = ?", 'Theatre & Dance')
    when "food-wine"
      return where("tags.name = ?", 'Food & Wine')
    when "holiday"
      return where("tags.name = ?", 'Holiday')
    when "sport-fitness"
      return where("tags.name = ?", 'Sport & Fitness')
    when "educational"
      return where("tags.name = ?", 'Educational')
    else
      all
    end
  end

  def self.by_date_range(date_range = nil)
    if date_range === nil
      return all
    elsif date_range === 'this-week'
      return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).beginning_of_day + 6.day + 8.hour).all
    elsif date_range === 'today'
      return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).end_of_day + 8.hour).all
    elsif date_range === 'tomorrow'
      return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).tomorrow.beginning_of_day + 8.hour, (DateTime.now.utc - 8.hour).tomorrow.end_of_day + 8.hour).all
    elsif date_range === 'weekend'
      return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).at_beginning_of_week + 4.day + 8.hour, (DateTime.now.utc - 8.hour).at_beginning_of_week + 6.day + 8.hour).all
    elsif date_range === 'upcoming'
      return where('event_times.start_time BETWEEN ? AND ?', (DateTime.now.utc - 8.hour).beginning_of_day, (DateTime.now.utc - 8.hour).beginning_of_day + 180.day).all
    else
      date_array = date_range.split("-")
      month = date_array[0].to_i
      day = date_array[1].to_i
      year = date_array[2].to_i
      dt = DateTime.new(year, month, day, 0, 0, 0, 0).utc
      return where('event_times.start_time BETWEEN ? AND ?', (dt - 8.hour).beginning_of_day + 8.hour, (dt - 8.hour).end_of_day + 8.hour).all
    end
    #all
  end

  def self.by_cost(free = nil, cost = nil)
    return where(cost: "Free") if free === 'true'
    return where(cost: cost) if not cost.blank?
    all
  end

  def self.by_night_only(night_only = false)
    if night_only == 'true'
      return where("to_char(event_times.start_time, 'hh24:mi:ss') BETWEEN ? AND ?", '02:00:00', '08:00:00').all
    else
      return Event.all
    end
  end



  # slug creation
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  def slug_candidates
  [
    :name,
    [:name, :venue],
    [:name, :venue, :id]
  ]
  end

  # image managmenet
  attr_accessor :image
  #associates attribute :image with a file attachment
  has_attached_file :image, styles: {
    # small: "64x64",
    # med: "200x200",
    large: "400x400"
  }, default_url: 'http://s3.amazonaws.com/event-images.eventcoyote/default/event.jpg'
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  def load_image_from_url
    parsed_image = URI.parse(image_url)

    update_attribute(:image, parsed_image)
    update_attribute(:image_url, image.url.to_s)
  rescue
    self.image = nil
  end

  def image_url
    if self[:image_url].present?
      self[:image_url]
    else
      image.url
    end
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
        # Event.tag_live_music(tag_entry, event)
        # Event.tag_bars_and_clubs(tag_entry, event)
        # Event.tag_nightlife(tag_entry, event)
        # Event.tag_art_and_museums(tag_entry, event)
        # Event.tag_comedy(tag_entry, event)
        # Event.tag_theatre_and_dance(tag_entry, event)
        # Event.tag_food_and_wine(tag_entry, event)
        # Event.tag_holiday(tag_entry, event)
        # Event.tag_sport_and_fitness(tag_entry, event)
        # Event.tag_educational(tag_entry, event)
          Event.add_parent_tags(tag_entry, event)
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
        #  Event.tag_live_music(tag_entry, event)
        #  Event.tag_bars_and_clubs(tag_entry, event)
        #  Event.tag_nightlife(tag_entry, event)
        #  Event.tag_art_and_museums(tag_entry, event)
        #  Event.tag_comedy(tag_entry, event)
        #  Event.tag_theatre_and_dance(tag_entry, event)
        #  Event.tag_food_and_wine(tag_entry, event)
        #  Event.tag_holiday(tag_entry, event)
        #  Event.tag_sport_and_fitness(tag_entry, event)
        #  Event.tag_educational(tag_entry, event)
        Event.add_parent_tags(tag_entry, event)
       end
       event.save
     end
   end

 # convert cost to integer
  def self.cost_integer_parser(cost)
    if cost.blank?
      nil
    elsif cost.to_s.downcase == 'free'
      0
    else
      cost[/^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})*?/].tr('$', '').to_i
    end
  rescue
    nil
  end




def self.add_parent_tags(tag_entry, event)

     unless Event.tag_live_music(tag_entry, event) || Event.tag_bars_and_clubs(tag_entry, event) ||
     Event.tag_nightlife(tag_entry, event) ||
     Event.tag_art_and_museums(tag_entry, event) ||
     Event.tag_comedy(tag_entry, event) ||
     Event.tag_theatre_and_dance(tag_entry, event) ||
     Event.tag_food_and_wine(tag_entry, event) ||
     Event.tag_holiday(tag_entry, event) ||
     Event.tag_sport_and_fitness(tag_entry, event) ||
     Event.tag_educational(tag_entry, event)
      ParentlessTag.find_or_create_by(name: tag_entry.name)
    end
end
















  def self.tag_live_music(tag_entry, event)
    subtags = ['Music Festivals', 'Indie Music', 'Live Music Clubs', 'Live Music Bars', 'Blues', 'Music']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Live Music")
    else
      false
    end
  end
  def self.tag_bars_and_clubs(tag_entry, event)
    subtags = ['Music Festivals', 'Indie Music', 'Live Music Clubs', 'Live Music Bars', 'Blues', 'Music', 'Other Music', 'Underground Clubs', 'Gay Bars', 'Salsa', 'Lounge', 'Wine Bar', 'R&B/Soul Music', 'Latin Dance Clubs', 'Reggae/Dub Music', 'Cabaret', 'Funk', 'World Music',
       'Country Music', 'Bluegrass', 'Jazz', 'Hip Hop', 'House Music', 'Rock', 'Goth Music', 'Disco', 'Electronic Music', 'DJ Outlets', 'New Wave/80s Music', 'Dive Bars', 'Arts & Entertainment Venues', 'DJ', 'Dance Clubs', 'Sports Bars', 'Happy Hour / Game Nights']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Bars & Clubs")
    else
      false
    end
  end
  def self.tag_nightlife(tag_entry, event)
    subtags = ['Music Festivals', 'Indie Music', 'Live Music Clubs', 'Blues', 'Music', 'Other Music', 'Underground Clubs', 'Gay Bars', 'Salsa', 'Lounge', 'R&B/Soul Music', 'Latin Dance Clubs', 'Reggae/Dub Music', 'Cabaret', 'Funk', 'World Music', 'Country Music', 'Bluegrass',
       'Jazz', 'Hip Hop', 'House Music', 'Goth Music', 'Disco', 'Electronic Music', 'DJ Outlets', 'New Wave/80s Music', 'Arts & Entertainment Venues', 'DJ\'s', 'Dance Clubs', 'Karaoke Bar', 'Concerts', 'Local Bands', 'Galas', 'Balls']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Nightlife")
    else
      false
    end
  end
  def self.tag_art_and_museums(tag_entry, event)
    subtags = ['Arts & Entertainment Venues', 'Science Museums', 'Childrens Museums', 'Opera', 'Art Festivals', 'Musicals', 'Other Literary Arts', 'Film Screenings', 'Arts & Crafts', 'Performance Arts', 'Theater', 'Dance', 'History Museums', 'Cultural Museums', 'Modern Art Museums',
      'Art Events', 'Arts & Crafts Education', 'Crafts', 'Sculpture', 'Installation Art', 'Photography', 'Art Openings', 'Artists', 'Literary Arts', 'Arts', 'Mixed Media', 'Galleries', 'Fine Arts Museums']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Art & Museums")
    else
      false
    end
  end
  def self.tag_comedy(tag_entry, event)
    subtags = ['Stand Up Comedy']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Comedy")
    else
      false
    end
  end
  def self.tag_theatre_and_dance(tag_entry, event)
    subtags = ['Opera', 'Ballet', 'Modern Dance', 'Plays']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Theatre & Dance")
    else
      false
    end
  end
  def self.tag_food_and_wine(tag_entry, event)
    subtags = ['Wine Bar', 'Live Music Restaurants', 'American Restaurants', 'Food & Drink Event/Festival', 'Wine Tasting', 'Wine', 'Farmers Markets', 'Markets & Specialty Food', 'Restaurants', 'Food', 'Arts & Entertainment Venues', 'Science Museums']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Food & Wine")
    else
      false
    end
  end
  def self.tag_holiday(tag_entry, event)
    subtags = ['Ice Skating', 'Holiday Festivals']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Holiday")
    else
      false
    end
  end
  def self.tag_sport_and_fitness(tag_entry, event)
    subtags = ['Running', 'Soccer', 'Other Sports', 'Health & Wellness', 'Yoga', 'Football', 'Sports & Recreation']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Sport & Fitness")
    else
      false
    end
  end
  def self.tag_educational(tag_entry, event)
    subtags = ['Science Museums', 'Arts & Crafts', 'Cultural Museums', 'Arts & Crafts Education', 'Crafts', 'Literary Arts', 'Cultural Festivals', 'Christianity & Churches', 'Film Organizations', 'Spirituality', 'Religion', 'Children\'s Storytelling',
      'Children\'s Festivals & Events', 'Walking Tours', 'Beauty', 'Cultural Venues', 'Other Schools & Classes', 'Educational Organizations', 'Painting & Drawing', 'Book Stores']
    if subtags.collect {|el| el.downcase }.include? tag_entry.name.downcase
      event.tags << Tag.find_by_name("Educational")
    else
      false
    end
  end

end
