class apache {

  # install apache
  package { "apache2":
    ensure => present,
    require => Exec["apt-get update"]
  }

  # ensures that mode_rewrite is loaded and modifies the default configuration file
  file { "/etc/apache2/mods-enabled/rewrite.load":
    ensure => link,
    target => "/etc/apache2/mods-available/rewrite.load",
    require => Package["apache2"]
  }

  # create directory
  file {"/etc/apache2/sites-enabled":
    ensure => directory,
    recurse => true,
    purge => true,
    force => true,
    before => File["/etc/apache2/sites-enabled/vagrant_webroot.conf"],
    require => Package["apache2"],
  }

  # create apache config from main vagrant manifests
  file { "/etc/apache2/sites-available/vagrant_webroot.conf":
    ensure => present,
    source => "/vagrant/puppet/manifests/vagrant_webroot.conf",
    require => Package["apache2"],
  }

  # symlink apache site to the site-enabled directory
  file { "/etc/apache2/sites-enabled/vagrant_webroot.conf":
    ensure => link,
    target => "/etc/apache2/sites-available/vagrant_webroot.conf",
    require => File["/etc/apache2/sites-available/vagrant_webroot.conf"],
    notify => Service["apache2"],
  }

  # starts the apache2 service once the packages installed, and monitors changes to its configuration files and reloads if nesessary
  service { "apache2":
    ensure => running,
    require => Package["apache2"],
    subscribe => [
      File["/etc/apache2/mods-enabled/rewrite.load"],
      File["/etc/apache2/sites-available/vagrant_webroot.conf"]
    ],
  }
}
