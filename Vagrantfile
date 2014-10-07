## DB config:
db_user = "craft"
db_pass = "123"
db_name = "craft"

Vagrant.configure("2") do |config|

  # Enable the Puppet provisioner, which will look in puppet/manifests:
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "default.pp"
    puppet.module_path = "puppet/modules"
  end

  # Provision the database from the most recent backup:
  config.vm.provision :shell do |shell|
    shell.path = "puppet/db-setup.sh"
    shell.args = "'#{db_user}' '#{db_pass}' '#{db_name}'"
  end

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty32"
  config.vm.box_url = "https://vagrantcloud.com/ubuntu/boxes/trusty32/versions/1/providers/virtualbox.box"

  # Set hostname
  config.vm.hostname = "craft.dev"
  
  # Forward guest port 80 to host port 8888 and name mapping
  config.vm.network :forwarded_port, guest: 80, host: 8888
  config.vm.network "private_network", ip: "192.168.56.101"
  config.vm.synced_folder "app/", "/vagrant/app/", :owner => "www-data", group: "www-data"
end
