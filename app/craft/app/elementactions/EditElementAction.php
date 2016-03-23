<?php
namespace Craft;

/**
 * Edit Element Action
 *
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @link      http://craftcms.com
 * @package   craft.app.elementactions
 * @since     2.3
 */
class EditElementAction extends BaseElementAction
{
	// Public Methods
	// =========================================================================

	/**
	 * @inheritDoc IComponentType::getName()
	 *
	 * @return string
	 */
	public function getName()
	{
		return $this->getParams()->label;
	}

	/**
	 * @inheritDoc IElementAction::getTriggerHtml()
	 *
	 * @return string|null
	 */
	public function getTriggerHtml()
	{
		$js = <<<EOT
(function()
{
	var trigger = new Craft.ElementActionTrigger({
		handle: 'Edit',
		batch: false,
		validateSelection: function(\$selectedItems)
		{
			return Garnish.hasAttr(\$selectedItems.find('.element'), 'data-editable');
		},
		activate: function(\$selectedItems)
		{
			new Craft.ElementEditor(\$selectedItems.find('.element'));
		}
	});
})();
EOT;

		craft()->templates->includeJs($js);
	}

	// Protected Methods
	// =========================================================================

	/**
	 * @inheritDoc BaseElementAction::defineParams()
	 *
	 * @return array
	 */
	protected function defineParams()
	{
		return array(
			'label' => array(AttributeType::String, 'default' => Craft::t('Edit')),
		);
	}
}
