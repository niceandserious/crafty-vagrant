<?php
namespace Craft;

/**
 * The TemplatesController class is a controller that handles various template rendering related tasks for both the
 * control panel and front-end of a Craft site.
 *
 * Note that all actions in the controller are open to do not require an authenticated Craft session in order to execute.
 *
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.controllers
 * @since     1.0
 */
class TemplatesController extends BaseController
{
	// Properties
	// =========================================================================

	/**
	 * If set to false, you are required to be logged in to execute any of the given controller's actions.
	 *
	 * If set to true, anonymous access is allowed for all of the given controller's actions.
	 *
	 * If the value is an array of action names, then you must be logged in for any action method except for the ones in
	 * the array list.
	 *
	 * If you have a controller that where the majority of action methods will be anonymous, but you only want require
	 * login on a few, it's best to use {@link UserSessionService::requireLogin() craft()->userSession->requireLogin()}
	 * in the individual methods.
	 *
	 * @var bool
	 */
	public $allowAnonymous = true;

	// Public Methods
	// =========================================================================

	/**
	 * Renders a template.
	 *
	 * @param       $template
	 * @param array $variables
	 *
	 * @throws HttpException
	 * @return null
	 */
	public function actionRender($template, array $variables = array())
	{
		// Does that template exist?
		if (craft()->templates->doesTemplateExist($template))
		{
			$this->renderTemplate($template, $variables);
		}
		else
		{
			throw new HttpException(404);
		}
	}

	/**
	 * Shows the 'offline' template.
	 *
	 * @return null
	 */
	public function actionOffline()
	{
		// If this is a site request, make sure the offline template exists
		if (craft()->request->isSiteRequest() && !craft()->templates->doesTemplateExist('offline'))
		{
			// Set PathService to use the CP templates path instead
			craft()->path->setTemplatesPath(craft()->path->getCpTemplatesPath());
		}

		// Output the offline template
		$this->renderTemplate('offline');
	}

	/**
	 * Renders the Manual Update notification template.
	 *
	 * @return null
	 */
	public function actionManualUpdateNotification()
	{
		$this->renderTemplate('_special/dbupdate');
	}

	/**
	 * Renders the Manual Update template.
	 *
	 * @return null
	 */
	public function actionManualUpdate()
	{
		$this->renderTemplate('updates/_go', array(
			'handle' => craft()->request->getSegment(2)
		));
	}

	/**
	 * @throws Exception
	 * @return null
	 */
	public function actionRequirementsCheck()
	{
		// Run the requirements checker
		$reqCheck = new RequirementsChecker();
		$reqCheck->run();

		if ($reqCheck->getResult() == InstallStatus::Failed)
		{
			// Coming from Updater.php
			if (craft()->request->isAjaxRequest())
			{
				$message = '<br /><br />';

				foreach ($reqCheck->getRequirements() as $req)
				{
					if ($req->result == 'failed')
					{
						$message .= $req->notes.'<br />';
					}
				}

				throw new Exception(Craft::t('The update can’t be installed :( {message}', array('message' => $message)));
			}
			else
			{
				$this->renderTemplate('_special/cantrun', array('reqCheck' => $reqCheck));
				craft()->end();
			}
		}
		else
		{
			// Cache the app path.
			craft()->cache->set('appPath', craft()->path->getAppPath());
		}
	}

	/**
	 * Renders an error template.
	 *
	 * @throws \Exception
	 * @return null
	 */
	public function actionRenderError()
	{
		$error = craft()->errorHandler->getError();
		$code = (string) $error['code'];

		if (craft()->request->isSiteRequest())
		{
			$prefix = craft()->config->get('errorTemplatePrefix');

			if (craft()->templates->doesTemplateExist($prefix.$code))
			{
				$template = $prefix.$code;
			}
			else if ($code == 503 && craft()->templates->doesTemplateExist($prefix.'offline'))
			{
				$template = $prefix.'offline';
			}
			else if (craft()->templates->doesTemplateExist($prefix.'error'))
			{
				$template = $prefix.'error';
			}
		}

		if (!isset($template))
		{
			craft()->path->setTemplatesPath(craft()->path->getCpTemplatesPath());

			if (craft()->templates->doesTemplateExist($code))
			{
				$template = $code;
			}
			else
			{
				$template = 'error';
			}
		}

		try
		{
			$variables = array_merge($error);

			// Escape any inner-word underscores, which Markdown mistakes for italics
			// TODO: This won't be necessary in 3.0 thanks to Parsedown
			$variables['message'] = preg_replace('/(?<=[a-zA-Z])_(?=[a-zA-Z])/', '\_', $variables['message']);

			// If this is a PHP error and html_errors (http://php.net/manual/en/errorfunc.configuration.php#ini.html-errors)
			// is enabled, then allow the HTML not get encoded
			if (strncmp($variables['type'], 'PHP ', 4) === 0 && AppHelper::getPhpConfigValueAsBool('html_errors'))
			{
				$variables['message'] = TemplateHelper::getRaw($variables['message']);
			}

			$this->renderTemplate($template, $variables);
		}
		catch (\Exception $e)
		{
			if (YII_DEBUG)
			{
				throw $e;
			}
			else
			{
				// Just output the error message
				echo str_replace(array('“', '”', '‘', '’'), array('"', '"', '\'', '\''), $e->getMessage());
			}
		}
	}
}
