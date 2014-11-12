class sendmail {
  # install sendmail:
  package { "sendmail":
    ensure => present,
    require => Exec["apt-get update"]
  }
}