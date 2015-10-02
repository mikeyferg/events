require 'rake'

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

task :test do
  pids = [
    spawn("cd server && EMBER_PORT=4900 rails s -p 3900 -e test"),
    spawn("cd client && ./node_modules/.bin/ember test --server"),
  ]
end

task :deploy do
  # sh 'git checkout rsh-production'
  # sh 'git merge origin/rails-served-html -m "Merging master for deployment"'
  # sh 'rm -rf server/public'
  sh 'cd client && ember build'
  sh 'cp -a client/dist/. ./server/public/'
  sh 'cd server && rake assets:precompile && cd ..'

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
