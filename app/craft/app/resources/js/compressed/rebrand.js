/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(b){function f(a,d){"undefined"!=typeof d.html&&($html=b(d.html),"object"==typeof a.data("imageUpload")&&(a.data("imageUpload").destroy(),a.data("imageUpload",null)),a.replaceWith($html),g($html))}function g(a){var d=a.data("type"),c={modalClass:"cp-image-modal",uploadAction:"rebrand/uploadSiteImage",deleteMessage:Craft.t("Are you sure you want to delete the uploaded image?"),deleteAction:"rebrand/deleteSiteImage",cropAction:"rebrand/cropSiteImage",constraint:300,areaToolOptions:{aspectRatio:"",
initialRectangle:{mode:"auto"}}};c.onImageSave=b.proxy(function(a){f(b(this),a)},a);c.onImageDelete=b.proxy(function(a){f(b(this),a)},a);c.uploadButton=a.find(".upload");c.deleteButton=a.find(".delete");c.postParameters={type:d};a.data("imageUpload",new Craft.ImageUpload(c))}for(var h=b(".cp-image"),e=0;e<h.length;e++)g(h.eq(e))})(jQuery);

//# sourceMappingURL=rebrand.min.map
