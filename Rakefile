require 'rake'

task :build do
  sh 'rm -rf server/public'
  sh 'cd client && ember build production && mv dist ../server/public'
end

task :run do
  pids = [
    spawn("cd server && EMBER_PORT=4900 rails s -p 3900"),
    spawn("cd client && ./node_modules/.bin/ember server --port=4900 --proxy=http://0.0.0.0:3900"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :deploy do
  puts 'Choose option to deploy:'
  puts '[1] - Client Staging'
  puts '[2] - Server Staging'
  puts '[3] - Client Live'
  puts '[4] - Server Live'
  print '-> '
  input = STDIN.gets.strip
  case input
  when '1'
    puts 'Deploying Client Staging...'
    Rake::Task["deploy_client_staging"].execute
  when '2'
    puts 'Deploying Server Staging...'
    Rake::Task["deploy_server_staging"].execute
  when '3'
    puts "Are you sure about deploying to live server? (y/n)"
    input = STDIN.gets.strip
    if input == 'y'
      Rake::Task["deploy_client_live"].execute
    else
      puts "So sorry for the confusion"
    end
  when '4'
    puts "Are you sure about deploying to live server? (y/n)"
    input = STDIN.gets.strip
    if input == 'y'
      Rake::Task["deploy_server_live"].execute
    else
      puts "So sorry for the confusion"
    end
  else
    puts "Sorry, didn't understand your option!"
  end
end

task :deploy_client_staging do
  sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'heroku repo:purge_cache -a coyote-client-staging'
  sh ' git push heroku-clienst-staging `git subtree split --prefix=client rsh-production`:master --force'

  sh 'git checkout -'
end

task :deploy_server_staging do
  sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P server heroku-api-staging master'

  sh 'git checkout -'
end

task :deploy_client_live do
  sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'
  sh 'cd client && ember sitemap https://s3.amazonaws.com/sitemap-eventcoyote/sitemaps/sitemap.xml'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'heroku repo:purge_cache -a event-coyote'
  sh ' git push heroku-client-live `git subtree split --prefix=client rsh-production`:master --force'

  sh 'git checkout -'
end

task :deploy_server_live do
  sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P server heroku-api-live master'

  sh 'git checkout -'
end



task :deploy_staging do
  sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'
  sh 'rm -rf server/public'
  sh 'cd client && ember build production && mv dist ../server/public'
  # sh 'cp -a client/dist/. server/public/'
  # sh 'cd server && rake assets:precompile && cd ..'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P server heroku master'

  release_output = `heroku releases -a afternoon-ocean-1868`.split "\n"
  latest_release = release_output[1].match(/v\d+/).to_s

  tags = `git tag`

  unless tags.include? latest_release
    sh "git tag #{latest_release}"
  end

  sh 'git checkout -'
end
