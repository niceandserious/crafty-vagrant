#!/bin/bash

## This script is no longer run by Puppet, but is called separately by Vagrant

## Check whether there's a database backup:
if [ -d "/vagrant/app/craft/storage/backups" ]; then
  db_init=`ls /vagrant/app/craft/storage/backups | tail -1`;
else
  db_init='';
fi

## If there is, restore it:
if test ! -s $db_init
then
  echo
  echo "Populating Craft database from latest backup ($db_init)";
  mysql -u$1 -p$2 $3 < /vagrant/app/craft/storage/backups/$db_init;
  echo
else
  echo
  echo "No Craft database backups found.";
  echo "Please finish installing Craft by visiting craft.dev/admin/install in your browser.";
  echo
fi
