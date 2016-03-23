/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(b){Craft.UserPermissions=Garnish.Base.extend({$wrapper:null,$selectAllBtn:null,$allCheckboxes:null,$rootCheckboxes:null,init:function(a){this.$wrapper=a;this.$selectAllBtn=b(".select-all",this.$wrapper);this.$allCheckboxes=b("input[type=checkbox]",this.$wrapper);this.$rootCheckboxes=b(this.$wrapper).find("> ul > li > input[type=checkbox]");this.addListener(this.$selectAllBtn,"click","toggleSelectAll");this.addListener(this.$allCheckboxes,"click","toggleCheckbox");this.updateSelectAllBtn()},
toggleSelectAll:function(a){this.$allCheckboxes.filter(":checked").length<this.$allCheckboxes.length?this.$allCheckboxes.filter(":not(:checked)").trigger("click"):this.$rootCheckboxes.filter(":checked").trigger("click");a.preventDefault()},toggleCheckbox:function(a){a=b(a.currentTarget);a.parent("li").find("> ul");var c=a.parent("li").find("> ul > li > input[type=checkbox]");a.prop("checked")?c.prop("disabled",!1):(c.filter(":checked").trigger("click"),c.prop("disabled",!0));this.updateSelectAllBtn()},
updateSelectAllBtn:function(){this.$allCheckboxes.filter(":checked").length<this.$allCheckboxes.length?this.$selectAllBtn.text(Craft.t("Select All")):this.$selectAllBtn.text(Craft.t("Deselect All"))}});var d=b(".user-permissions");b.each(d,function(){new Craft.UserPermissions(this)})})(jQuery);

//# sourceMappingURL=UserPermissions.min.map
