# default path
Exec {
  path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"]
}

# DB user:
$user = "craft"
$pass = "123"
$dbname = "craft"

include bootstrap
include tools
include apache
include php
include php::pear
include php::pecl
include mysql

# class { 'nodejs':
#   version => 'stable',
# }

# include yeoman