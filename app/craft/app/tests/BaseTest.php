<?php
namespace Craft;

use \Mockery as m;

/**
 * Base test class.
 *
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.tests
 * @since     1.0
 */
abstract class BaseTest extends \CTestCase
{
	// Properties
	// =========================================================================

	/**
	 * @var
	 */
	private $_originalComponentValues;

	/**
	 * @var
	 */
	private $_originalApplication;

	// Public Methods
	// =========================================================================

	/**
	 * Tear down once all tests have been run.
	 *
	 * @return null
	 */
	public function tearDown()
	{
		// Restore any modified component values. Go backwards in case the same component was set twice.
		if (isset($this->_originalComponentValues))
		{
			for ($i = count($this->_originalComponentValues)-1; $i >= 0; $i--)
			{
				$obj = $this->_originalComponentValues[$i][0];
				$name = $this->_originalComponentValues[$i][1];
				$val = $this->_originalComponentValues[$i][2];

				$obj->setComponent($name, $val);
			}
		}

		// Restore the original app
		if (isset($this->_originalApplication))
		{
			$this->setApplication($this->_originalApplication);
		}

		// Clean up the Mockery container for this test, and run any verification tasks needed for the expectations.
		// @see https://github.com/padraic/mockery#phpunit-integration
		m::close();
	}

	// Protected Methods
	// =========================================================================

	/**
	 * Sets a component, while taking care to restore it in the tear down.
	 *
	 * @param \CModule $obj
	 * @param string   $name
	 * @param mixed    $val
	 *
	 * @return null
	 */
	protected function setComponent(\CModule $obj, $name, $val)
	{
		// Save the original value for tearDown()
		$this->_originalComponentValues[] = array($obj, $name, $obj->getComponent($name));

		// Set the new one
		$obj->setComponent($name, $val);
	}

	/**
	 * @param $val
	 *
	 * @return null
	 */
	protected function setApplication($val)
	{
		// Save the original one for tearDown()
		if (!isset($this->_originalApplication))
		{
			$this->_originalApplication = craft();
		}

		// Call null to clear the app singleton.
		Craft::setApplication(null);

		// Set the new one.
		Craft::setApplication($val);
	}

	/**
	 * @return mixed
	 */
	protected function mockApplication()
	{
		$app = m::mock('Craft\WebApp')->makePartial();
		$this->setApplication($app);
		return $app;
	}

	/**
	 * Returns an accessible ReflectionMethod for a given class/object and method name.
	 *
	 * @param mixed  $obj
	 * @param string $name
	 *
	 * @return \ReflectionMethod
	 */
	protected function getMethod($obj, $name)
	{
		$class = new \ReflectionClass($obj);
		$method = $class->getMethod($name);
		$method->setAccessible(true);
		return $method;
	}
}
