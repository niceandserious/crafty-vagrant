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

  #start mysql service
  service { "mysql":
    ensure => running,
    require => Package["mysql-server"],
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
  # ->
  # exec { "populate-database":
  #   command => "/vagrant/puppet/crafty-setup.sh '$user' '$pass' '$dbname';",
  #   logoutput => true,
  #   require => File["/vagrant/puppet/crafty-setup.sh"],
  # }
}
