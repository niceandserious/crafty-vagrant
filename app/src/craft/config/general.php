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
define('BASEPATH',     realpath(dirname(__FILE__) . '/../'));

return array(

  // ------------------------------------------------------------
  // Environment: All
  // ------------------------------------------------------------
  '*' => array(
    'devMode' => false,
    'omitScriptNameInUrls' => true,
    'siteUrl'  => SITE_URL,

    // Environmental variables
    // We can use these variables in the URL and Path settings
    // within the Craft Control Panel. For example:
    //    siteUrl   can be references as {siteUrl}
    //    basePath  can be references as {basePath}
    'environmentVariables' => array(
      'basePath' => BASEPATH,
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
