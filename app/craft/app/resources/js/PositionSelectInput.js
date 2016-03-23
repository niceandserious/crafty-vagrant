/**
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.resources
 */

PositionSelectInput = Garnish.Base.extend({

	$container: null,
	$options: null,
	$selectedOption: null,
	$input: null,

	init: function(id)
	{
		this.$container = $('#'+id);
		this.$options = this.$container.find('.btn');
		this.$selectedOption = this.$options.filter('.active');
		this.$input = this.$container.next('input');

		this.addListener(this.$options, 'click', 'onOptionSelect');
	},

	onOptionSelect: function(ev)
	{
		var $option = $(ev.currentTarget);

		if ($option.hasClass('active'))
		{
			return;
		}

		this.$selectedOption.removeClass('active');
		this.$selectedOption = $option.addClass('active');
		this.$input.val($option.data('option'));
	}

});
