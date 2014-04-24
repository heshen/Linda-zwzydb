
config=YAML.load_file('config/secrets.yml')
set :repo_pwd, config["repo_pwd"]

# Ensure that bundle is used for rake tasks
SSHKit.config.command_map[:rake] = "bundle exec rake"

# config valid only for Capistrano 3.1
lock '3.2.0'

set :application, 'Linda-zwzydb'
#set :repo_url, "https://hitfishking:#{fetch(:repo_pwd)}@github.com/hitfishking/Linda-zwzydb.git"
set :repo_url, 'git@github.com:hitfishking/Linda-zwzydb.git'
set :branch, "master"
set :deploy_via, :remote_cache
set :bundle_flags, '--quiet'   # '--deployment --quiet' is the default

#set :repository, 'https://github.com/hitfishking/Linda-zwzydb.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, "/opt/nginx/html/rails_apps/#{fetch(:application)}"

# Default value for :scm is :git
#
set :scm, :git
set :scm_passphrase, "yasun000"
set :user, "hitfishking"


#We are only going to use a single stage: production
set :stages, ["production"]

set :default_env, { rvm_bin_path: '~/.rvm/bin' }


# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
