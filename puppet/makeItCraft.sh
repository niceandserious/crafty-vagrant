#!/bin/bash
function coloredEcho(){
    local exp=$1;
    local color=$2;
    if ! [[ $color =~ '^[0-9]$' ]] ; then
       case $(echo $color | tr '[:upper:]' '[:lower:]') in
        black) color=0 ;;
        red) color=1 ;;
        green) color=2 ;;
        yellow) color=3 ;;
        blue) color=4 ;;
        magenta) color=5 ;;
        cyan) color=6 ;;
        white|*) color=7 ;; # white or invalid color
       esac
    fi
    tput setaf $color;
    echo $exp;
    tput sgr0;
}

###############################################################################
#  ______   ______   ______   ______  ______  ______   __    __   ______
# /\  ___\ /\  == \ /\  __ \ /\  ___\/\__  _\/\  ___\ /\ "-./  \ /\  ___\
# \ \ \____\ \  __< \ \  __ \\ \  __\\/_/\ \/\ \ \____\ \ \-./\ \\ \___  \
#  \ \_____\\ \_\ \_\\ \_\ \_\\ \_\     \ \_\ \ \_____\\ \_\ \ \_\\/\_____\
#   \/_____/ \/_/ /_/ \/_/\/_/ \/_/      \/_/  \/_____/ \/_/  \/_/ \/_____/
#
# Installer Script v0.2.0
# By Matt Stauffer (mattstauffer.co)
# Tweaked for Crafty Vagrant by Nick Fraenkel (niceandserious.com)
#
###############################################################################

mkdir -p tmp

echo ''
coloredEcho "Do you accept Craft's license? [http://buildwithcraft.com/license]"
read -p "[y/N]" -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi
echo ''

echo ''
coloredEcho 'Downloading and installing the latest version of Craft...' green
echo ''

curl -L http://buildwithcraft.com/latest.zip?accept_license=yes -o tmp/Craft.zip
unzip tmp/Craft.zip -d app
rm -rf tmp

permLevel=774
chmod $permLevel app/craft/app
chmod $permLevel app/craft/config
chmod $permLevel app/craft/storage
echo ''
coloredEcho "  chmod $permLevel app/craft/app" magenta
coloredEcho "  chmod $permLevel app/craft/config" magenta
coloredEcho "  chmod $permLevel app/craft/storage" magenta
