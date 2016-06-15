# Quick, slightly hacky way of reading the .env file:
# cf. http://stackoverflow.com/a/28748818/180500
env = {}
File.read(".env").split("\n").each do |ef|
  env[ef.split("=")[0]] = ef.split("=")[1]
end

# Configure Vagrant:
Vagrant.configure("2") do |config|
  # If we're using VirtualBox, to improve performance let's try to
  # make sure we assign the VM an appropriate amount of CPU / RAM:
  # cf. http://www.stefanwrobel.com/how-to-make-vagrant-performance-not-suck
  config.vm.provider "virtualbox" do |v|
    host = RbConfig::CONFIG['host_os']

    # Give VM 1/4 system memory & access to all cpu cores on the host
    if host =~ /darwin/
      cpus = `sysctl -n hw.ncpu`.to_i
      # sysctl returns Bytes and we need to convert to MB
      mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
    elsif host =~ /linux/
      cpus = `nproc`.to_i
      # meminfo shows KB and we need to convert to MB
      mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4
    else
      # for Windows, let's just use some sensible defaults...
      cpus = 2
      mem = 2048
    end

    v.customize ["modifyvm", :id, "--memory", mem]
    v.customize ["modifyvm", :id, "--cpus", cpus]
  end

  # Enable the Puppet provisioner, which will look in puppet/manifests:
  config.vm.provision :puppet do |puppet|
    puppet.facter = {
      "user"     => env['CRAFTY_DB_USER'],
      "pass"     => env['CRAFTY_DB_PASS'],
      "dbname"   => env['CRAFTY_DB_NAME']
    }

    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "default.pp"
    puppet.module_path = "puppet/modules"
  end

  # Provision the database from the most recent backup:
  config.vm.provision :shell do |shell|
    shell.path = "puppet/db-setup.sh"
    shell.args = "'#{env['CRAFTY_DB_USER']}' '#{env['CRAFTY_DB_PASS']}' '#{env['CRAFTY_DB_NAME']}'"
  end

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty32"
  config.vm.box_url = "https://vagrantcloud.com/ubuntu/boxes/trusty32"

  # Set hostname
  config.vm.hostname = env['CRAFTY_SERVER_NAME']

  # Forward guest port 80 to host port 8888 and name mapping
  config.vm.network :forwarded_port, guest: 80, host: 8888
  config.vm.network "private_network", ip: "192.168.56.101"
  config.vm.synced_folder "app/", "/vagrant/app/", :owner => "www-data", group: "www-data"
end
