/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
Craft.FeedWidget=Garnish.Base.extend({$widget:null,init:function(c,d,e){this.$widget=$("#widget"+c);this.$widget.addClass("loading");Craft.postActionRequest("dashboard/getFeedItems",{url:d,limit:e},$.proxy(function(g,c){this.$widget.removeClass("loading");if("success"==c)for(var d=this.$widget.find("td"),a=0;a<g.items.length;a++){var b=g.items[a],e=$(d[a]),f='<a href="'+b.permalink+'" target="_blank">'+b.title+"</a> ";b.date&&(f+='<span class="light nowrap">'+b.date+"</span>");e.html(f)}},this))}});

//# sourceMappingURL=FeedWidget.min.map
