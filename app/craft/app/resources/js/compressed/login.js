/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(b){var d=Garnish.Base.extend({$form:null,$loginNameInput:null,$loginFields:null,$passwordPaneItem:null,$passwordInput:null,$forgotPasswordLink:null,$rememberMeCheckbox:null,$sslIcon:null,$submitBtn:null,$spinner:null,$error:null,passwordInputInterval:null,forgotPassword:!1,loading:!1,init:function(){this.$form=b("#login-form");this.$loginNameInput=b("#loginName");this.$loginFields=b("#login-fields");this.$passwordPaneItem=this.$loginFields.children();this.$passwordInput=b("#password");this.$forgotPasswordLink=
b("#forgot-password");this.$sslIcon=b("#ssl-icon");this.$submitBtn=b("#submit");this.$spinner=b("#spinner");this.$rememberMeCheckbox=b("#rememberMe");new Craft.PasswordInput(this.$passwordInput,{onToggleInput:b.proxy(function(a){this.removeListener(this.$passwordInput,"textchange");this.$passwordInput=a;this.addListener(this.$passwordInput,"textchange","validate")},this)});this.addListener(this.$loginNameInput,"textchange","validate");this.addListener(this.$passwordInput,"textchange","validate");
this.addListener(this.$forgotPasswordLink,"click","onForgetPassword");this.addListener(this.$form,"submit","onSubmit");this.addListener(this.$sslIcon,"mouseover",function(){this.$sslIcon.hasClass("disabled")||this.$submitBtn.addClass("hover")});this.addListener(this.$sslIcon,"mouseout",function(){this.$sslIcon.hasClass("disabled")||this.$submitBtn.removeClass("hover")});this.addListener(this.$sslIcon,"mousedown",function(){this.$sslIcon.hasClass("disabled")||(this.$submitBtn.addClass("active"),this.addListener(Garnish.$doc,
"mouseup",function(){this.$submitBtn.removeClass("active");this.removeListener(Garnish.$doc,"mouseup")}))});this.passwordInputInterval=setInterval(b.proxy(this,"validate"),250);this.addListener(this.$sslIcon,"click",function(){this.$submitBtn.click()})},validate:function(){if(this.$loginNameInput.val()&&(this.forgotPassword||6<=this.$passwordInput.val().length))return this.$sslIcon.enable(),this.$submitBtn.enable(),!0;this.$sslIcon.disable();this.$submitBtn.disable();return!1},onSubmit:function(a){a.preventDefault();
this.validate()&&(this.$submitBtn.addClass("active"),this.$spinner.removeClass("hidden"),this.loading=!0,this.$error&&this.$error.remove(),this.forgotPassword?this.submitForgotPassword():this.submitLogin())},submitForgotPassword:function(){var a={loginName:this.$loginNameInput.val()};Craft.postActionRequest("users/sendPasswordResetEmail",a,b.proxy(function(a,b){"success"==b&&(a.success?new c:this.showError(a.error));this.onSubmitResponse()},this))},submitLogin:function(){var a={loginName:this.$loginNameInput.val(),
password:this.$passwordInput.val(),rememberMe:this.$rememberMeCheckbox.prop("checked")?"y":""};Craft.postActionRequest("users/login",a,b.proxy(function(a,b){if("success"==b)a.success?window.location.href=Craft.getUrl(a.returnUrl):(Garnish.shake(this.$form),this.onSubmitResponse(),this.showError(a.error));else this.onSubmitResponse()},this));return!1},onSubmitResponse:function(){this.$submitBtn.removeClass("active");this.$spinner.addClass("hidden");this.loading=!1},showError:function(a){a||(a=Craft.t("An unknown error occurred."));
this.$error=b('<p class="error" style="display:none">'+a+"</p>").insertAfter(b(".buttons",this.$form));this.$error.velocity("fadeIn")},onForgetPassword:function(a){a.preventDefault();Garnish.isMobileBrowser()||this.$loginNameInput.focus();this.$error&&this.$error.remove();a=parseInt(this.$form.css("margin-top"));var b=this.$loginFields.height();a+=Math.round(b/2);this.$form.velocity({marginTop:a},"fast");this.$loginFields.velocity({height:0},"fast");this.$form.addClass("reset-password");this.$submitBtn.addClass("reset-password");
this.$submitBtn.attr("value",Craft.t("Reset Password"));this.$submitBtn.enable();this.$sslIcon.remove();this.forgotPassword=!0;this.validate()}}),c=Garnish.Modal.extend({init:function(){var a=b('<div class="modal fitted email-sent"><div class="body">'+Craft.t("Check your email for instructions to reset your password.")+"</div></div>").appendTo(Garnish.$bod);this.base(a)},hide:function(){}});new d})(jQuery);

//# sourceMappingURL=login.min.map
