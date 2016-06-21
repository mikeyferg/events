namespace :scrape do
  desc 'Run each scraper'
  task run: :environment do
    tasks = [:apeconcerts, :sfstation]
    tasks.each do |task|
      puts "Running: #{task}"
      system "rake scrape:#{task}"
    end
  end
end