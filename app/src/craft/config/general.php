<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

// Define some constants that let us set up some environment variables:
// (eg. sitePath)
define('URI_SCHEME', (isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://");
define('SITE_URL',    URI_SCHEME.$_SERVER['SERVER_NAME'].'/');

return array(
  '*' => array(
    'devMode' => false,
    'omitScriptNameInUrls' => true,
    'environmentVariables' => array(
      'siteUrl'  => SITE_URL
    ),
  ),
  '.dev' => array(
    'devMode' => true,
  ),
);
