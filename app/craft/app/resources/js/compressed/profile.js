/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(a){function c(d){"undefined"!=typeof d.html&&(a(".user-photo").replaceWith(d.html),"undefined"!=typeof changeSidebarPicture&&changeSidebarPicture&&a("#user-photo > img").replaceWith(a("#current-photo > img").clone()),e())}function e(){b.uploadButton=a(".user-photo-controls .upload-photo");b.deleteButton=a(".user-photo-controls .delete-photo");new Craft.ImageUpload(b)}var b={postParameters:{userId:a(".user-photo").attr("data-user")},modalClass:"profile-image-modal",uploadAction:"users/uploadUserPhoto",
deleteMessage:Craft.t("Are you sure you want to delete this photo?"),deleteAction:"users/deleteUserPhoto",cropAction:"users/cropUserPhoto",areaToolOptions:{aspectRatio:"1",initialRectangle:{mode:"auto"}},onImageSave:function(a){c(a)},onImageDelete:function(a){c(a)}};a("input[name=userId]").val()&&e()})(jQuery);

//# sourceMappingURL=profile.min.map
