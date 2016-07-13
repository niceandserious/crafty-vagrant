class php {

  # package install list
  $packages = [
    "php7.0",
    # "php7.0-cli",
    "php-imagick",
    "php7.0-mbstring",
    "php7.0-mysql",
    "php-mcrypt",
    "php-curl",
    "libapache2-mod-php7.0"
    # "php7.0-xdebug"
  ]

  package { $packages:
    ensure => present,
    require => Exec["apt-get update"],
    notify => Service["apache2"]
  }

  # Increase xDebug's max nesting level to prevent problems with Craft:
  # cf. http://craftcms.stackexchange.com/a/1560/328
  # exec { 'configure xdebug':
  #   command => "echo 'xdebug.max_nesting_level=200' >> /etc/php7/mods-available/xdebug.ini",
  #   unless => "grep xdebug.max_nesting_level /etc/php7/mods-available/xdebug.ini",
  #   require => Package["php7.0-xdebug"]
  # }
}
