#!/bin/bash

##
##	This install script handles everything that Crafty Vagrant needs on the
##	local machine. Puppet handles everything on the Vagrant box.
##
##	Before running this, unzip a copy of Craft into the 'app' directory
##

prompt () {
    while true; do
        read -p "$1 " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

if ! prompt "Do you wish to install? [yn] "; then
	echo 'Ok. Install cancelled.';
	exit;
fi

## If Craft isn't present:
if [ ! -d "app/craft" ]; then
	echo "For the install process to work, please unzip a copy of Craft into the 'app' directory...";
	exit;
fi	

## Install node modules:
echo "
## npm install";
npm install;

## Install bower components:
echo "
## bower install";
bower install;

## Initialise Git submodules:
echo "
## git submodule init && git submodule update";
git submodule init && git submodule update;

## Set up Craft stuff:
echo "
## Setting up Craft...";

## Activate the htaccess (rename 'htaccess' --> '.htaccess'):
if [ -f "app/public/htaccess" ]; then 
	echo "## Activating htaccess...";
	mv app/public/htaccess app/public/.htaccess;
fi

## Replace the default templates + config:
CRAFT_SRC="app/src/craft";

if [ -d $CRAFT_SRC ] && prompt "Replace Craft's default templates + config? [yn] "; then
	echo "Replacing Craft files... (copying from $CRAFT_SRC)";
	
	## Remove existing remplates, if present:
	[ -d "app/craft/templates" ] || rm -r app/craft/templates;

	## Copy everything from app/src/craft to the app/craft directory,
	## overwriting existing files:
	cp -R $CRAFT_SRC app;
fi

## Run Grunt, to render CSS / Javascript / etc:
echo "
## grunt";
grunt;

echo "
## Finished!
##
## 'vagrant up' to start the server.
## 'grunt watch' to watch Sass + JS for changes.";