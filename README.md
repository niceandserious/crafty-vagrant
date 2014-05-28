# Crafty Vagrant

A starting point for Craft-based projects, with Vagrant configured and (very nearly) ready to go.

## Prerequisites
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Vagrant](http://www.vagrantup.com/)
* [Virtual Box](https://www.virtualbox.org/)

## Installation

1. First - if it's not already there - you'll need to download [Craft](http://buildwithcraft.com/) and unzip it into the 'app' directory so the project has app/craft and app/public directories.

2. Next, run the command `install.sh`. This will install and set up everything necessary on your local machine. If this is a fresh Craft install, answer 'y' to the prompt about replacing Craft's templates + config, otherwise - if this is an existing project - answer 'n'.

3. If this is the first time you've used Crafty Vagrant, open `/etc/hosts` and add

	192.168.56.101    craft.dev

4. Launch vagrant: `vagrant up`

...and hopefully (after a minute or so while your Vagrant machine is set up) you should be ready to go! The webserver should now be accessible from `http://craft.dev/`. If Craft backups are present in `/app/craft/storage/backups`, the most recent one should automatically have been used to populate the database. Otherwise, you can install Craft by going to [http://craft.dev/admin/](http://craft.dev/admin/)

## System Package include

* apache2 - rewrite mode enabled, having virtual host with config - refer manifest/vagrant_webroot.sample
* php5
* php5-cli
* php5-mysql
* php-pear - installed packages: phpunit and its dependencies
* php5-dev
* php5-gd
* php5-mcrypt
* php5-xdebug
* libapache2-mod-php5
* mysql-server
* curl
* vim
* htop
* apt
* stdlib
* wget
* nodejs
* npm
* git
* rubygems
* libjpeg-turbo-progs
* optipng
* phantomjs
* python-software-properti
* compass
* grunt-cli
* bower

## Thanks!
Based on work by:
* [PerishableDave/puppet-lamp-stack](https://github.com/PerishableDave/puppet-lamp-stack).
* [jas0nkim/my-vagrant-puppet-lamp](https://github.com/jas0nkim/my-vagrant-puppet-lamp).
* [jrodriguezjr/puppet-lamp-stack](https://github.com/jrodriguezjr/puppet-lamp-stack).
* [willdurand/nodejs](https://github.com/willdurand/puppet-nodejs)
* [nickhartjes/puppet-yeoman](https://github.com/nickhartjes/puppet-yeoman)
