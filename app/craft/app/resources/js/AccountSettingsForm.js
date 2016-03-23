/**
 * @author    Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://craftcms.com/license Craft License Agreement
 * @see       http://craftcms.com
 * @package   craft.app.resources
 */

(function($) {


Craft.AccountSettingsForm = Garnish.Base.extend(
{
	userId: null,
	isCurrent: null,

	$copyPasswordResetUrlBtn: null,
	$actionSpinner: null,

	currentPasswordModal: null,
	$lockBtns: null,
	$currentPasswordInput: null,
	$currentPasswordSpinner: null,
	afterVerifyPassword: null,
	currentPassword: null,

	confirmDeleteModal: null,
	$deleteBtn: null,

	init: function(userId, isCurrent)
	{
		this.userId = userId;
		this.isCurrent = isCurrent;

		this.$lockBtns = $('.btn.lock');
		this.$copyPasswordResetUrlBtn = $('#copy-passwordreset-url');
		this.$actionSpinner = $('#action-spinner');
		this.$deleteBtn = $('#delete-btn');

		this.addListener(this.$lockBtns, 'click', 'showCurrentPasswordForm');
		this.addListener(this.$copyPasswordResetUrlBtn, 'click', 'getPasswordResetUrl');
		this.addListener(this.$deleteBtn, 'click', 'showConfirmDeleteModal');
	},

	showCurrentPasswordForm: function()
	{
		if (!this.currentPasswordModal)
		{
			if (this.isCurrent)
			{
				var $passwordMessage = Craft.t('Please enter your current password.');
			}
			else
			{
				var $passwordMessage = Craft.t('Please enter your password.');
			}

			var $form = $('<form id="verifypasswordmodal" class="modal fitted"/>').appendTo(Garnish.$bod),
				$body = $('<div class="body"><p>'+$passwordMessage+'</p></div>').appendTo($form),
				$passwordWrapper = $('<div class="passwordwrapper"/>').appendTo($body),
				$buttons = $('<div class="buttons right"/>').appendTo($body),
				$cancelBtn = $('<div class="btn">'+Craft.t('Cancel')+'</div>').appendTo($buttons),
				$submitBtn = $('<input type="submit" class="btn submit" value="'+Craft.t('Continue')+'" />').appendTo($buttons);

			this.$currentPasswordInput = $('<input type="password" class="text password fullwidth"/>').appendTo($passwordWrapper);
			this.$currentPasswordSpinner = $('<div class="spinner hidden"/>').appendTo($buttons);
			this.currentPasswordModal = new Garnish.Modal($form, {
				onHide: $.proxy(function()
				{
					this.afterVerifyPassword = null;
				}, this)
			});

			new Craft.PasswordInput(this.$currentPasswordInput, {
				onToggleInput: $.proxy(function($newPasswordInput) {
					this.$currentPasswordInput = $newPasswordInput;
				}, this)
			});

			this.addListener($cancelBtn, 'click', function() {
				this.currentPasswordModal.hide();
			});

			this.addListener($form, 'submit', 'submitCurrentPassword');
		}
		else
		{
			this.currentPasswordModal.show();
		}

		// Auto-focus the password input
		if (!Garnish.isMobileBrowser(true))
		{
			setTimeout($.proxy(function() {
				this.$currentPasswordInput.focus();
			}, this), 100);
		}
	},

	submitCurrentPassword: function(ev)
	{
		ev.preventDefault();

		var password = this.$currentPasswordInput.val();

		if (password)
		{
			this.$currentPasswordSpinner.removeClass('hidden');

			var data = {
				password: password
			};

			Craft.postActionRequest('users/verifyPassword', data, $.proxy(function(response, textStatus)
			{
				this.$currentPasswordSpinner.addClass('hidden');

				if (textStatus == 'success')
				{
					if (response.success)
					{
						this.currentPassword = password;
						$('<input type="hidden" name="password"/>').val(password).appendTo('#userform');
						var $newPasswordInput = $('#newPassword');
						$('#email').add($newPasswordInput).removeClass('disabled').removeAttr('disabled');
						this.$lockBtns.remove();

						new Craft.PasswordInput($newPasswordInput);

						if (this.afterVerifyPassword)
						{
							this.afterVerifyPassword();
						}

						this.currentPasswordModal.hide();
					}
					else
					{
						Garnish.shake(this.currentPasswordModal.$container);
					}
				}

			}, this));
		}
	},

	getPasswordResetUrl: function()
	{
		// Make sure they've entered their password first
		if (!this.currentPassword)
		{
			this.afterVerifyPassword = $.proxy(this, 'getPasswordResetUrl');
			this.showCurrentPasswordForm();
			return;
		}

		this.$actionSpinner.removeClass('hidden');

		var data = {
			password: this.currentPassword,
			userId: this.userId
		};

		Craft.postActionRequest('users/getPasswordResetUrl', data, $.proxy(function(response, textStatus)
		{
			this.$actionSpinner.addClass('hidden');

			if (textStatus == 'success')
			{
				var message = Craft.t('{ctrl}C to copy.', {
					ctrl: (navigator.appVersion.indexOf('Mac') ? '⌘' : 'Ctrl-')
				});

				prompt(message, response);
			}
		}, this));
	},

	showConfirmDeleteModal: function()
	{
		if (!this.confirmDeleteModal)
		{
			this.confirmDeleteModal = new Craft.DeleteUserModal(this.userId);
		}
		else
		{
			this.confirmDeleteModal.show();
		}
	}
});


})(jQuery)
