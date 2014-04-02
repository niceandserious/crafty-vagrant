#!/bin/bash

## Check whether there's a database backup:
db_init=`ls /vagrant/app/craft/storage/backups | tail -1`;

## If there is, restore it:
if test ! -s $db_init
then
	echo
	echo "Populating Craft database from latest backup ($db_init)";
	mysql -u $1 -p$2 $3 < /vagrant/app/craft/storage/backups/$db_init;
	echo
else
	echo
	echo 'No Craft database backups found. Please install Craft manually.';
	echo
fi