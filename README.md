# Crafty Vagrant

A neat starting point / development environment for [Craft](http://buildwithcraft.com/)-based projects, with [Vagrant](https://www.vagrantup.com/) configured and ready to go, [Grunt](http://gruntjs.com/) set up to take care of things like rendering Sass, bundling Javascript, minifying CSS and images, and asset-syncing, [Neat](http://neat.bourbon.io/) for elegant, semantic grid layouts, and a couple of shell scripts to simplify installing / restoring the database from backup.

## Pre-requisites
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Vagrant](http://www.vagrantup.com/)
* [Virtual Box](https://www.virtualbox.org/)
* rsync (optional, for asset-syncing)

## Installation

Be sure to follow these steps carefully if you want Crafty Vagrant to behave!

1. First - if it's not already there - you'll need to download [Craft](http://buildwithcraft.com/) and unzip it into the `app` directory (so the project has `app/craft` and `app/public` directories)

2. Next, run the command `bash install.sh` (you might need to `sudo` this). This will install and set up everything necessary (bower packages, grunt tasks, git submodules, etc) on your local machine. If this is a fresh Craft install, answer 'y' to the prompt about replacing Craft's templates + config, otherwise - if this is an existing project - answer 'n'.

3. If this is the first time you've used Crafty Vagrant, open `/etc/hosts` and add

	    192.168.56.101    craft.dev

4. Launch vagrant: `vagrant up`

...and hopefully (after a short wait while your Vagrant machine is set up) you should be ready to go! The webserver should now be accessible from `http://craft.dev/`. If Craft backups are present in `/app/craft/storage/backups`, the most recent one should automatically have been used to populate the database. Otherwise, you can install Craft by going to [http://craft.dev/admin/install](http://craft.dev/admin/install)

## Notes

* `grunt watch` when you're ready to start developing: this will watch for changes to Sass, Javascript, or images, and perform appropriate tasks (compiling Sass, bundling javascript, etc)
* If this is a fresh install of Craft, you may see error pages until you've installed it by visiting  [http://craft.dev/admin/install](http://craft.dev/admin/install)
* Crafty has a database-provisioning shell script. If you run `vagrant provision --provision-with shell`, the most recent backup in `app\craft\storage\backups` will be restored. (Of course, you'll lose any current state of the database, so only do this when you're happy for that to happen)
* Crafty uses [Browserify](http://browserify.org/) to keep Javascript modular. If you haven't used Browserify before, there's an example module in the /scripts directory.

## Development

Because Crafty's templates are in the `src` directory (and copied into Craft's template directory when you start a new project), if you want to work on Crafty itself (on the starting templates), the easiest thing is to add the line `define('CRAFT_TEMPLATES_PATH', "../src/craft/templates");` to the top of Craft's `app/public/index.php` file, and then gitignore the `app/craft` and `app/public` directories. This allows to work directly on the source templates alongside a working installation of Craft.

## Environment

* Ubuntu 14.04 (Trusty Tahr)
* Apache 2.4
* PHP 5 (with xdebug and all Craft's [required PHP extensions](http://buildwithcraft.com/docs/requirements#required-php-extensions))
* [Bourbon](http://bourbon.io/)
* [Neat](http://neat.bourbon.io/)
* [jQuery](http://jquery.com/)
* [Modernizr](http://modernizr.com/)

## Thanks!
Crafty Vagrant's pattern library is adapted from [Bitters](http://bitters.bourbon.io/) © 2013–2014 [thoughtbot, inc.](http://thoughtbot.com/)

Crafty Vagrant is also based on work by:
* [PerishableDave/puppet-lamp-stack](https://github.com/PerishableDave/puppet-lamp-stack).
* [jas0nkim/my-vagrant-puppet-lamp](https://github.com/jas0nkim/my-vagrant-puppet-lamp).
* [jrodriguezjr/puppet-lamp-stack](https://github.com/jrodriguezjr/puppet-lamp-stack).

## License

Copyright © 2014 [Nice and Serious](http://niceandserious.com/). Crafty Vagrant is free software, and may be redistributed under the terms specified in the [license](https://github.com/niceandserious/crafty-vagrant/blob/master/LICENSE.md).
