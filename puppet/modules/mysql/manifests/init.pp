class mysql {

  # root mysql password
  $rootpass = "123"

  file { "/vagrant/puppet/crafty-setup.sh":
    mode => 777,
  }

  # install mysql server
  package { "mysql-server":
    ensure => present,
    require => Exec["apt-get update"]
  }

  # Add custom MySQL config for Crafty Vagrant:
  # cf. https://mattstauffer.co/blog/how-to-disable-mysql-strict-mode-on-laravel-forge-ubuntu
  # (nb. only needed for Craft 2 - shouldn't be necessary for Craft 3)
  file { "/etc/mysql/mysql.conf.d/mysqld.crafty.cnf":
    ensure => present,
    source => "/vagrant/puppet/manifests/mysqld.crafty.cnf",
    mode   => '0644',
    notify => Service["mysql"]
  }

  file { [ "/etc", "/etc/mysql", "/etc/mysql/conf.d" ]:
    ensure => directory,
    before => File["/etc/mysql/mysql.conf.d/mysqld.crafty.cnf"],
  }

  #start mysql service
  service { "mysql":
    ensure => running,
    require => Package["mysql-server"]
  }

  # set mysql password
  exec { "set-mysql-password":
    unless => "mysqladmin -uroot -p$rootpass status",
    command => "mysqladmin -uroot password $rootpass",
    require => Service["mysql"],
  }
  ->
  # create database and populate from $db_init:
  exec { "create-database":
    unless  => "/usr/bin/mysql -u$user -p$pass $dbname",
    command => "/usr/bin/mysql -uroot -p$rootpass -e \"create database $dbname; grant all on $dbname.* to $user@localhost identified by '$pass';\";",
    require => Service["mysql"],
    logoutput => on_failure,
  }
}
