/**
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.resources
 */

Craft.FeedWidget = Garnish.Base.extend(
{
	$widget: null,

	init: function(widgetId, url, limit)
	{
		this.$widget = $('#widget'+widgetId);
		this.$widget.addClass('loading');

		var data = {
			url: url,
			limit: limit
		};

		Craft.postActionRequest('dashboard/getFeedItems', data, $.proxy(function(response, textStatus)
		{
			this.$widget.removeClass('loading');

			if (textStatus == 'success')
			{
				var $tds = this.$widget.find('td');

				for (var i = 0; i < response.items.length; i++)
				{
					var item = response.items[i],
						$td = $($tds[i]);

					var widgetHtml = '<a href="'+item.permalink+'" target="_blank">'+item.title+'</a> ';

					if (item.date) {
						widgetHtml += '<span class="light nowrap">'+item.date+'</span>';
					}

					$td.html(widgetHtml);
				}
			}

		}, this));
	}
});
