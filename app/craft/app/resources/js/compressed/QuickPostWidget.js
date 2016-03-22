/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(c){Craft.QuickPostWidget=Garnish.Base.extend({params:null,initFields:null,$widget:null,$form:null,$formClone:null,$spinner:null,$errorList:null,loading:!1,init:function(b,a,f){this.params=a;this.initFields=f;this.$widget=c("#widget"+b);b=this.$widget.find("form:first");this.$formClone=b.clone();this.initForm(b)},initForm:function(b){this.$form=b;this.$spinner=this.$form.find(".spinner");this.initFields();b=this.$form.find("> .buttons > .btngroup > .menubtn");var a=b.next().find("> ul > li > a");
b.menubtn();this.addListener(this.$form,"submit","handleFormSubmit");this.addListener(a,"click","saveAndContinueEditing")},handleFormSubmit:function(b){b.preventDefault();this.save(c.proxy(this,"onSave"))},saveAndContinueEditing:function(){this.save(c.proxy(this,"gotoEntry"))},save:function(b){if(!this.loading){this.loading=!0;this.$spinner.removeClass("hidden");var a=Garnish.getPostData(this.$form),a=c.extend({enabled:1},a,this.params);Craft.postActionRequest("entries/saveEntry",a,c.proxy(function(a,
g){this.loading=!1;this.$spinner.addClass("hidden");this.$errorList&&this.$errorList.children().remove();if("success"==g)if(a.success)Craft.cp.displayNotice(Craft.t("Entry saved.")),b(a);else if(Craft.cp.displayError(Craft.t("Couldn\u2019t save entry.")),a.errors){this.$errorList||(this.$errorList=c('<ul class="errors"/>').insertAfter(this.$form));for(var e in a.errors)for(var d=0;d<a.errors[e].length;d++)c("<li>"+a.errors[e][d]+"</li>").appendTo(this.$errorList)}},this))}},onSave:function(b){var a=
this.$formClone.clone();this.$form.replaceWith(a);this.initForm(a);if("undefined"!=typeof Craft.RecentEntriesWidget)for(a=0;a<Craft.RecentEntriesWidget.instances.length;a++){var c=Craft.RecentEntriesWidget.instances[a];c.params.sectionId&&c.params.sectionId!=this.params.sectionId||c.addEntry({url:b.cpEditUrl,title:b.title,postDate:b.postDate,username:b.author.username})}},gotoEntry:function(b){Craft.redirectTo(b.cpEditUrl)}})})(jQuery);

//# sourceMappingURL=QuickPostWidget.min.map
