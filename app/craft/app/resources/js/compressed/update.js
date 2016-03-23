/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(b){Craft.Updater=Garnish.Base.extend({$graphic:null,$status:null,$errorDetails:null,data:null,init:function(a,d){this.$graphic=b("#graphic");this.$status=b("#status");a?(this.data={handle:a,manualUpdate:d},this.postActionRequest("update/prepare")):this.showError(Craft.t("Unable to determine what to update."))},updateStatus:function(a){this.$status.html(a)},showError:function(a){this.updateStatus(a);this.$graphic.addClass("error")},postActionRequest:function(a){Craft.postActionRequest(a,
{data:this.data},b.proxy(function(a,c,b){if("success"==c&&a.alive)this.onSuccessResponse(a);else this.onErrorResponse(b)},this),{complete:b.noop})},onSuccessResponse:function(a){a.data&&(this.data=a.data);a.errorDetails&&(this.$errorDetails=a.errorDetails);a.nextStatus&&this.updateStatus(a.nextStatus);a.nextAction&&this.postActionRequest(a.nextAction);if(a.finished){var b=!1;a.rollBack&&(b=!0);this.onFinish(a.returnUrl,b)}},onErrorResponse:function(a){this.$graphic.addClass("error");a="<p>"+Craft.t("A fatal error has occurred:")+
'</p><div id="error" class="code"><p><strong class="code">'+Craft.t("Status:")+"</strong> "+Craft.escapeHtml(a.statusText)+'</p><p><strong class="code">'+Craft.t("Response:")+"</strong> "+Craft.escapeHtml(a.responseText)+'</p></div><a class="btn submit big" href="mailto:support@craftcms.com?subject='+encodeURIComponent("Craft update failure")+"&body="+encodeURIComponent("Describe what happened here.\n\n-----------------------------------------------------------\n\nStatus: "+a.statusText+"\n\nResponse: "+
a.responseText)+'">'+Craft.t("Send for help")+"</a>";this.updateStatus(a)},onFinish:function(a,b){if(this.$errorDetails){this.$graphic.addClass("error");var c=Craft.t("Craft was unable to install this update :(")+"<br /><p>",c=b?c+(Craft.t("The site has been restored to the state it was in before the attempted update.")+"</p><br /><p>"):c+(Craft.t("No files have been updated and the database has not been touched.")+"</p><br /><p>"),c=c+(this.$errorDetails+"</p>");this.updateStatus(c)}else this.updateStatus(Craft.t("All done!")),
this.$graphic.addClass("success"),setTimeout(function(){window.location=a?Craft.getUrl(a):Craft.getUrl("dashboard")},500)}})})(jQuery);

//# sourceMappingURL=update.min.map
