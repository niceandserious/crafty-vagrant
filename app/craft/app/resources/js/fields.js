/**
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.resources
 */

(function($) {


var FieldsAdmin = Garnish.Base.extend(
{
	$groups: null,
	$selectedGroup: null,

	init: function()
	{
		this.$groups = $('#groups');
		this.$selectedGroup = this.$groups.find('a.sel:first');
		this.addListener($('#newgroupbtn'), 'activate', 'addNewGroup');

		var $groupSettingsBtn = $('#groupsettingsbtn');

		if ($groupSettingsBtn.length)
		{
			var menuBtn = $groupSettingsBtn.data('menubtn');

			menuBtn.settings.onOptionSelect = $.proxy(function(elem)
			{
				var action = $(elem).data('action');

				switch (action)
				{
					case 'rename':
					{
						this.renameSelectedGroup();
						break;
					}
					case 'delete':
					{
						this.deleteSelectedGroup();
						break;
					}
				}
			}, this);
		}
	},

	addNewGroup: function()
	{
		var name = this.promptForGroupName('');

		if (name)
		{
			var data = {
				name: name
			};

			Craft.postActionRequest('fields/saveGroup', data, $.proxy(function(response, textStatus)
			{
				if (textStatus == 'success')
				{
					if (response.success)
					{
						location.href = Craft.getUrl('settings/fields/'+response.group.id);
					}
					else if (response.errors)
					{
						var errors = this.flattenErrors(response.errors);
						alert(Craft.t('Could not create the group:')+"\n\n"+errors.join("\n"));
					}
					else
					{
						Craft.cp.displayError();
					}
				}

			}, this));
		}
	},

	renameSelectedGroup: function()
	{
		var oldName = this.$selectedGroup.text(),
			newName = this.promptForGroupName(oldName);

		if (newName && newName != oldName)
		{
			var data = {
				id:   this.$selectedGroup.data('id'),
				name: newName
			};

			Craft.postActionRequest('fields/saveGroup', data, $.proxy(function(response, textStatus)
			{
				if (textStatus == 'success')
				{
					if (response.success)
					{
						this.$selectedGroup.text(response.group.name);
						Craft.cp.displayNotice(Craft.t('Group renamed.'));
					}
					else if (response.errors)
					{
						var errors = this.flattenErrors(response.errors);
						alert(Craft.t('Could not rename the group:')+"\n\n"+errors.join("\n"));
					}
					else
					{
						Craft.cp.displayError();
					}
				}

			}, this));
		}
	},

	promptForGroupName: function(oldName)
	{
		return prompt(Craft.t('What do you want to name your group?'), oldName);
	},

	deleteSelectedGroup: function()
	{
		if (confirm(Craft.t('Are you sure you want to delete this group and all its fields?')))
		{
			var data = {
				id: this.$selectedGroup.data('id')
			};

			Craft.postActionRequest('fields/deleteGroup', data, $.proxy(function(response, textStatus)
			{
				if (textStatus == 'success')
				{
					if (response.success)
					{
						location.href = Craft.getUrl('settings/fields');
					}
					else
					{
						Craft.cp.displayError();
					}
				}
			}, this));
		}
	},

	flattenErrors: function(responseErrors)
	{
		var errors = [];

		for (var attribute in responseErrors)
		{
			errors = errors.concat(responseErrors[attribute]);
		}

		return errors;
	}
});


Garnish.$doc.ready(function()
{
	Craft.FieldsAdmin = new FieldsAdmin();
});


})(jQuery);
