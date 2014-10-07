class php {

  # package install list
  $packages = [
    "php5",
    "php5-cli",
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
  exec { "php5enmod mcrypt":
    require => Package["php5"]
  }
}
