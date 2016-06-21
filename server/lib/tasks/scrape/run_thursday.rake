namespace :scrape do
  desc 'Run tasks every Thursday'
  task run_thursday: :environment do
    system 'rake scrape:run' if Time.now.thursday?
  end
end