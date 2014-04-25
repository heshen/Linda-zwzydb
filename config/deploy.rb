# adjust if you are using RVM, remove if you are not
# add a line here...
$:.unshift(File.expand_path('./lib', ENV['rvm_path']))
require "rvm/capistrano"
set :rvm_ruby_string, '1.9.3'
set :rvm_type, :user

set :application, "Linda-zwzydb"
set :repository,  "git@github.com:hitfishking/Linda-zwzydb.git"
set :deploy_to, "/opt/nginx/html/rails_apps/Linda-zwzydb"
set :scm, :git
set :branch, "master"
set :user, "hitfishking"
set :use_sudo, false
set :rails_env, "production"

set :deploy_via, :copy
set :copy_cache, true
set :copy_exclude, %w(.git)

set :ssh_options, { :forward_agent => true, :port => 4321 }
ssh_options[:user] = "hitfishking"
ssh_options[:keys] = ["f:/aaa/id_rsa"]    #ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "id_rsa")]

set :keep_releases, 5
default_run_options[:pty] = true

server "115.28.43.56", :app, :web, :db, :primary => true

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

#role :web, "your web-server here"                          # Your HTTP server, Apache/etc
#role :app, "your app-server here"                          # This may be the same as your `Web` server
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"
after "deploy", "deploy:symlink_config_files"
after "deploy", "deploy:restart"
after "deploy", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
	desc "Symlink shared config files"
	task :symlink_config_files do
		run "#{ try_sudo } ln -s #{ deploy_to }/shared/config/database.yml #{ current_path }/config/database.yml"
		#run "#{ try_sudo } ln -s #{ deploy_to }/shared/config/mongoid.yml #{ current_path }/config/mongoid.yml"
		run "#{ try_sudo } ln -s #{ deploy_to }/shared/config/secrets.yml #{ current_path }/config/secrets.yml"
	end


	desc "Human readable description of task"
	task :start do ; end
	task :stop do ; end

	desc "Restart Passenger app"
	task :restart, :roles => :app, :except => { :no_release => true } do
		run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
	end

end