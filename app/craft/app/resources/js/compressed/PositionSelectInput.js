/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
PositionSelectInput=Garnish.Base.extend({$container:null,$options:null,$selectedOption:null,$input:null,init:function(a){this.$container=$("#"+a);this.$options=this.$container.find(".btn");this.$selectedOption=this.$options.filter(".active");this.$input=this.$container.next("input");this.addListener(this.$options,"click","onOptionSelect")},onOptionSelect:function(a){a=$(a.currentTarget);a.hasClass("active")||(this.$selectedOption.removeClass("active"),this.$selectedOption=a.addClass("active"),this.$input.val(a.data("option")))}});

//# sourceMappingURL=PositionSelectInput.min.map
