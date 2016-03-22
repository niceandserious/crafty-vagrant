/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(d){Craft.NewUsersWidget=Garnish.Base.extend({settings:null,data:null,startDate:null,endDate:null,$widget:null,$body:null,init:function(b,a){this.setSettings(a);this.$widget=d("#widget"+b);this.$body=this.$widget.find(".body:first");this.$chartContainer=d('<div class="chart hidden"></div>').appendTo(this.$body);this.$error=d('<div class="error"/>').appendTo(this.$body);switch(this.settings.dateRange){case "d7":this.startDate=Craft.NewUsersWidget.getDateByDays("7");this.endDate=new Date;break;
case "d30":this.startDate=Craft.NewUsersWidget.getDateByDays("30");this.endDate=new Date;break;case "lastweek":this.startDate=Craft.NewUsersWidget.getDateByDays("14");this.endDate=Craft.NewUsersWidget.getDateByDays("7");break;case "lastmonth":this.startDate=Craft.NewUsersWidget.getDateByDays("60"),this.endDate=Craft.NewUsersWidget.getDateByDays("30")}var e={startDate:Craft.NewUsersWidget.getDateValue(this.startDate),endDate:Craft.NewUsersWidget.getDateValue(this.endDate),userGroupId:this.settings.userGroupId};
Craft.postActionRequest("charts/getNewUsersData",e,d.proxy(function(c,b){if("success"==b&&"undefined"==typeof c.error){this.$chartContainer.removeClass("hidden");this.chart=new Craft.charts.Area(this.$chartContainer);var a=new Craft.charts.DataTable(c.dataTable);this.chart.draw(a,{orientation:c.orientation,dataScale:c.scale,formats:c.formats});window.dashboard.grid.on("refreshCols",d.proxy(this,"handleGridRefresh"))}else a=Craft.t("An unknown error occurred."),"undefined"!=typeof c&&c&&"undefined"!=
typeof c.error&&(a=c.error),this.$error.html(a),this.$error.removeClass("hidden")},this));this.$widget.data("widget").on("destroy",d.proxy(this,"destroy"));Craft.NewUsersWidget.instances.push(this)},handleGridRefresh:function(){this.chart.resize()},destroy:function(){Craft.NewUsersWidget.instances.splice(d.inArray(this,Craft.NewUsersWidget.instances),1);this.base()}},{instances:[],getDateByDays:function(b){var a=new Date,a=a.getTime()-864E5*b;return new Date(a)},getDateValue:function(b){return b.getFullYear()+
"-"+(b.getMonth()+1)+"-"+b.getDate()}})})(jQuery);

//# sourceMappingURL=NewUsersWidget.min.map
