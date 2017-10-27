# Crafty Vagrant

A neat starting point / development environment for [Craft](http://buildwithcraft.com/)-based projects, with [Vagrant](https://www.vagrantup.com/) configured and ready to go, [Gulp](http://gulpjs.com/) set up to take care of things like rendering Sass, bundling Javascript, minifying CSS and images, and asset-syncing, [Neat](http://neat.bourbon.io/) for elegant, semantic grid layouts, and a couple of shell scripts to simplify installing / restoring the database from backup.

[![bitHound Score](https://www.bithound.io/github/niceandserious/crafty-vagrant/badges/score.svg)](https://www.bithound.io/github/niceandserious/crafty-vagrant)

## Pre-requisites
* [npm](https://www.npmjs.com/)
* [Gulp](http://gulpjs.com/)
* [Vagrant](http://www.vagrantup.com/)
* [Virtual Box](https://www.virtualbox.org/)
* rsync (optional, for asset-syncing)

## Installation

Be sure to follow these steps carefully if you want Crafty Vagrant to behave!

1. Run the command `bash install.sh` - this will install and set up everything necessary (including Craft) in your project directory. If this is a fresh Craft install, answer 'y' to the prompt about replacing Craft's templates + config, otherwise - if this is an existing project - answer 'n'.

2. If this is the first time you've used Crafty Vagrant, open your `hosts` file and add

      192.168.56.101    craft.dev

  (the hosts file is usually found at `/etc/hosts` on OSX/Linux; `%SystemRoot%\System32\drivers\etc\hosts` on Windows)

3. Launch vagrant: `vagrant up`

...and hopefully (after a short wait while your Vagrant machine is set up) you should be ready to go! The webserver should now be accessible from `http://craft.dev/`. If Craft backups are present in `/app/craft/storage/backups`, the most recent one will automatically have been used to populate the database. Otherwise, you can install Craft by going to [http://craft.dev/admin/install](http://craft.dev/admin/install)

## Usage

* `gulp watch` when you're ready to start developing: this will watch for changes to Sass, Javascript, or images, and perform appropriate tasks (compiling Sass, bundling javascript, etc)

* While `gulp watch` is running, any browser tabs with your dev site open in will update live (via the magic of [Browsersync](https://www.browsersync.io/)) as you edit styles, templates, etc. If you don't want live updating, `gulp watch:tasks` will perform the same tasks (compiling Sass, etc) without the autorefresh.

* `gulp watch` also generates a custom [Modernizr](https://modernizr.com/) build (at `public/scripts/modernizr.js`) which only tests for features you're actually using in your styles and scripts (and which should therefore be a lot smaller and more performant than loading the whole Modernizr library). Note that this is not updated on every change of CSS or Javascript because that would slow things down too much, so if you add a new feature you'd like to detect you'll either need to stop and restart `gulp watch` or, alternatively, run `gulp modernizr` to update the build.

* Crafty has a database-provisioning shell script. If you run `gulp db:restore`, the most recent backup in `app\craft\storage\backups` will be restored. (Of course, you'll lose any current state of the database, so only do this when you're happy for that to happen)

* Crafty uses [Browserify](http://browserify.org/) to keep Javascript modular. If you haven't used Browserify before, there's an example module in the /scripts directory.

## Troubleshooting

* If this is a fresh install of Craft, you may see error pages until you've installed it by visiting  [http://craft.dev/admin/install](http://craft.dev/admin/install)

* Crafty Vagrant will not install properly if the `unzip` command is not available from the command line. On Linux / OSX this is not usually a problem, but for Windows you might need to get an unzip executable file [here](http://stahlworks.com/dev/index.php?tool=zipunzip) and put it somewhere accessible from your PATH.

* Vagrant 1.8.7 (the current version at the time of writing) seems to have issues installing boxes on some machines. If `vagrant up` fails, try installing [Vagrant 1.8.6](https://releases.hashicorp.com/vagrant/1.8.6/) instead.

## Development

If you want to work on Crafty Vagrant itself (ie. on the default config / starting templates), three steps are required:

1. Run the install step with a `--dev` flag: eg. `bash install.sh --dev`. This leaves copies of Crafty's default template / config files in the `/src` folder (without the `--dev` flag they are deleted from this directory as part of the install process, to avoid the potential confusion of having an unused templates directory kicking around)

2. Add the line `define('CRAFT_TEMPLATES_PATH', "../src/craft/templates");` to the top of Craft's `app/public/index.php` file. This lets you work directly on the source templates alongside a working installation of Craft.

3. gitignore everything inside the `app` directory apart from `app/src` to prevent it being checked into Crafty Vagrant itself. ie. add the following lines to `.gitignore`:

        app/*
        !app/src*


## Environment

* Ubuntu 16.04 (Xenial Xerus)
* Apache 2.4
* PHP 7 (with all Craft's [required PHP extensions](http://buildwithcraft.com/docs/requirements#required-php-extensions))
* [Bourbon](http://bourbon.io/)
* [Neat](http://neat.bourbon.io/)
* [jQuery](http://jquery.com/)
* [Modernizr](http://modernizr.com/)

## Thanks!

Crafty Vagrant's pattern library is adapted from [Bitters](http://bitters.bourbon.io/) © 2013–2014 [thoughtbot, inc.](http://thoughtbot.com/)

Crafty Vagrant's install script uses part of [makeItCraft](https://github.com/mattstauffer/makeItCraft) by [Matt Stauffer](https://mattstauffer.co/).

Crafty Vagrant is also based on work by:
* [PerishableDave/puppet-lamp-stack](https://github.com/PerishableDave/puppet-lamp-stack).
* [jas0nkim/my-vagrant-puppet-lamp](https://github.com/jas0nkim/my-vagrant-puppet-lamp).
* [jrodriguezjr/puppet-lamp-stack](https://github.com/jrodriguezjr/puppet-lamp-stack).

## License

Copyright © 2014 [Nice and Serious](http://niceandserious.com/). Crafty Vagrant is free software, and may be redistributed under the terms specified in the [license](https://github.com/niceandserious/crafty-vagrant/blob/master/LICENSE.md).
