<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

// Define some constants that let us set up some environment variables:
// (eg. siteUrl)
define('URI_SCHEME', (isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://");
define('SITE_URL',    URI_SCHEME.$_SERVER['SERVER_NAME']);

return array(

  // Defaults for all environments:
  '*' => array(
    'devMode' => false,
    'omitScriptNameInUrls' => true,
    'environmentVariables' => array(
      // siteUrl is set automatically based on server name (see above):
      // Use it to, eg. set assets location: {siteUrl}/assets
      'siteUrl'  => SITE_URL
    ),
  ),

  // Dev site configuration:
  '.dev' => array(
    'devMode' => true,
    // In dev mode we always want to see the latest changes to a template:
    'enableTemplateCaching' => false,
  ),

);
