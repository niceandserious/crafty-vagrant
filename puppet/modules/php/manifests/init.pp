class php {

  # package install list
  $packages = [
    "php5",
    "php5-cli",
    "php5-imagick",
    "php5-mysql",
    "php-pear",
    "php5-dev",
    "php5-gd",
    "php5-mcrypt",
    "libcurl3",
    "libcurl3-dev",
    "php5-curl",
    "libapache2-mod-php5",
    "php5-xdebug"
  ]

  package { $packages:
    ensure => present,
    require => Exec["apt-get update"]
  }
  ->
  # in Ubuntu 14.04, it seems mcrypt has to be manually enabled:
  exec { "php5enmod mcrypt && service apache2 reload":
    require => Package["php5-mcrypt"]
  }

  # Increase xDebug's max nesting level to prevent problems with Craft:
  # cf. http://craftcms.stackexchange.com/a/1560/328
    exec { 'configure xdebug':
      command => "echo 'xdebug.max_nesting_level=200' >> /etc/php5/mods-available/xdebug.ini",
      unless => "grep xdebug.max_nesting_level /etc/php5/mods-available/xdebug.ini",
      require => Package["php5-xdebug"]
    }
}
