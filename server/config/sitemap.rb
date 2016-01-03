# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.eventcoyote.com"

# pick a place safe to write the files
SitemapGenerator::Sitemap.public_path = 'tmp/'


# store on S3 using Fog
SitemapGenerator::Sitemap.adapter = SitemapGenerator::S3Adapter.new(fog_provider: ENV['FOG_PROVIDER'],
                                         aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                                         aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
                                         fog_directory: ENV['FOG_DIRECTORY'],
                                         fog_region: ENV['FOG_REGION'])


# inform the map cross-linking where to find the other maps
SitemapGenerator::Sitemap.sitemaps_host = "http://#{ENV['FOG_DIRECTORY']}.s3.amazonaws.com/"

# pick a namespace within your bucket to organize your maps
SitemapGenerator::Sitemap.sitemaps_path = 'sitemaps/'

# SitemapGenerator::Sitemap.namer = SitemapGenerator::SimpleNamer.new(:sitemap, :extension => '.xml')
# SitemapGenerator::Sitemap.adapter = Class.new(SitemapGenerator::FileAdapter) { def gzip(stream, data); stream.write(data); stream.close end }.new

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => s
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at

  #   end
  tags_slugs = ["top", "live-music", "bars-clubs", "nightlife", "arts-museums", "comedy", "theatre-dance", "food-wine", "holiday", "sport-fitness", "educational"]
  dates_slugs = ["this-week", "today", "tomorrow", "weekend", "upcoming"]

  dates_slugs.each do |date|
    tags_slugs.each do |tag|
      add "sf/events/#{tag}/#{date}"
    end
  end

  add '/sf/events'
  add '/about'
  add '/contact'

  # Event.find_each do |event|
  #   add "/sf/events/" + event.slug
  # end

  Event.find_each do |event|
    added = false
    event.event_times.each do |date|
      if added == false && date.start_time.future?
        add "/sf/events/" + event.slug
        added = true
      end
    end
  end

  Venue.find_each do |venue|
    add "/venues/" + venue.slug
  end

end
