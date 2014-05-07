Vagrant.configure("2") do |config|

  # Enable the Puppet provisioner, with will look in manifests
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "default.pp"
    puppet.module_path = "puppet/modules"
  end

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  # Set hostname
  config.vm.hostname = "craft.dev"
  
  # Forward guest port 80 to host port 8888 and name mapping
  config.vm.network :forwarded_port, guest: 80, host: 8888

  config.vm.network "private_network", ip: "192.168.56.101"

  config.vm.synced_folder "app/", "/vagrant/app/", :owner => "www-data", group: "www-data"
end
