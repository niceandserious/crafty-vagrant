/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(b){Craft.RecentEntriesWidget=Garnish.Base.extend({params:null,$widget:null,$body:null,$container:null,$tbody:null,hasEntries:null,init:function(a,c){this.params=c;this.$widget=b("#widget"+a);this.$body=this.$widget.find(".body:first");this.$container=this.$widget.find(".recententries-container:first");this.$tbody=this.$container.find("tbody:first");this.hasEntries=!!this.$tbody.length;this.$widget.data("widget").on("destroy",b.proxy(this,"destroy"));Craft.RecentEntriesWidget.instances.push(this)},
addEntry:function(a){this.$container.css("margin-top",0);var c=this.$container.height();if(!this.hasEntries){var d=b('<table class="data fullwidth"/>').prependTo(this.$container);this.$tbody=b("<tbody/>").appendTo(d)}this.$tbody.prepend('<tr><td><a href="'+a.url+'">'+a.title+'</a> <span class="light">'+a.postDate+(Craft.edition>=Craft.Client?", "+a.username:"")+"</span></td></tr>");a=this.$container.height()-c;this.$container.css("margin-top",-a);a={"margin-top":0};this.hasEntries||(a["margin-bottom"]=
-c,this.hasEntries=!0);this.$container.velocity(a)},destroy:function(){Craft.RecentEntriesWidget.instances.splice(b.inArray(this,Craft.RecentEntriesWidget.instances),1);this.base()}},{instances:[]})})(jQuery);

//# sourceMappingURL=RecentEntriesWidget.min.map
