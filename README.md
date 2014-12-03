# Crafty Vagrant

A neat starting point / development environment for [Craft](http://buildwithcraft.com/)-based projects, with Vagrant configured and (very nearly) ready to go.

## Pre-requisites
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Vagrant](http://www.vagrantup.com/)
* [Virtual Box](https://www.virtualbox.org/)

## Installation

Be sure to follow these steps carefully if you want Crafty Vagrant to behave!

1. First - if it's not already there - you'll need to download [Craft](http://buildwithcraft.com/) and unzip it into the `app` directory (so the project has `app/craft` and `app/public` directories)

2. Next, run the command `bash install.sh` (you might need to `sudo` this). This will install and set up everything necessary (bower packages, grunt tasks, git submodules, etc) on your local machine. If this is a fresh Craft install, answer 'y' to the prompt about replacing Craft's templates + config, otherwise - if this is an existing project - answer 'n'.

3. If this is the first time you've used Crafty Vagrant, open `/etc/hosts` and add

	    192.168.56.101    craft.dev

4. Launch vagrant: `vagrant up`

...and hopefully (after a short wait while your Vagrant machine is set up) you should be ready to go! The webserver should now be accessible from `http://craft.dev/`. If Craft backups are present in `/app/craft/storage/backups`, the most recent one should automatically have been used to populate the database. Otherwise, you can install Craft by going to [http://craft.dev/admin/install](http://craft.dev/admin/install)

## Notes

* If this is a fresh install of Craft, you may see error pages until you've installed it by visiting  [http://craft.dev/admin/install](http://craft.dev/admin/install)
* Crafty has a database-provisioning shell script. If you run `vagrant provision --provision-with shell`, the most recent backup in `app\craft\storage\backups` will be restored. (Of course, you'll lose any current state of the database, so only do this when you're happy for that to happen)

## Environment

* Ubuntu 14.04 (Trusty Tahr)
* Apache 2.4
* PHP 5 (with xdebug and all Craft's [required PHP extensions](http://buildwithcraft.com/docs/requirements#required-php-extensions))

## Thanks!
Crafty Vagrant's pattern library is adapted from [Bitters](http://bitters.bourbon.io/) © 2013–2014 [thoughtbot, inc.](http://thoughtbot.com/)

Crafty Vagrant is also based on work by:
* [PerishableDave/puppet-lamp-stack](https://github.com/PerishableDave/puppet-lamp-stack).
* [jas0nkim/my-vagrant-puppet-lamp](https://github.com/jas0nkim/my-vagrant-puppet-lamp).
* [jrodriguezjr/puppet-lamp-stack](https://github.com/jrodriguezjr/puppet-lamp-stack).

## License

Copyright © 2014 [Nice and Serious](http://niceandserious.com/). Crafty Vagrant is free software, and may be redistributed under the terms specified in the license.
