/**
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.resources
 */

(function($) {


Craft.RecentEntriesWidget = Garnish.Base.extend(
{
	params: null,
	$widget: null,
	$body: null,
	$container: null,
	$tbody: null,
	hasEntries: null,

	init: function(widgetId, params)
	{
		this.params = params;
		this.$widget = $('#widget'+widgetId);
		this.$body = this.$widget.find('.body:first');
		this.$container = this.$widget.find('.recententries-container:first');
		this.$tbody = this.$container.find('tbody:first');
		this.hasEntries = !!this.$tbody.length;

		this.$widget.data('widget').on('destroy', $.proxy(this, 'destroy'));

		Craft.RecentEntriesWidget.instances.push(this);
	},

	addEntry: function(entry)
	{
		this.$container.css('margin-top', 0);
		var oldHeight = this.$container.height();


		if (!this.hasEntries)
		{
			// Create the table first
			var $table = $('<table class="data fullwidth"/>').prependTo(this.$container);
			this.$tbody = $('<tbody/>').appendTo($table);
		}

		this.$tbody.prepend(
			'<tr>' +
				'<td>' +
					'<a href="'+entry.url+'">'+entry.title+'</a> ' +
					'<span class="light">' +
						entry.postDate +
						(Craft.edition >= Craft.Client ? ', '+entry.username : '') +
					'</span>' +
				'</td>' +
			'</tr>'
		);

		var newHeight = this.$container.height(),
			heightDiff = newHeight - oldHeight;

		this.$container.css('margin-top', -heightDiff);

		var props = { 'margin-top': 0 };

		// Also animate the "No entries exist" text out of view
		if (!this.hasEntries)
		{
			props['margin-bottom'] = -oldHeight;
			this.hasEntries = true;
		}

		this.$container.velocity(props);
	},

	destroy: function()
	{
		Craft.RecentEntriesWidget.instances.splice($.inArray(this, Craft.RecentEntriesWidget.instances), 1);
		this.base();
	}
}, {
	instances: []
});


})(jQuery);
