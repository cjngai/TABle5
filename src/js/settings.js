$(document).ready(function() {
    var reader = new FileReader();
    var changed = false;
    var attributes = {};
    
    /************************
     * Reader read the file *
     ************************/
    reader.onloadend = function() {
        var image = reader.result;
        changed = true;
        attributes.backgroundImage = image;
        jQuery("#backgroundPrev").css("background-image", "url(" + image + ")");
        jQuery("#backgroundPrev").show();
    };
    
    /**********************************
     * Selected a file for background *
     **********************************/
    $("#newBackground").on("change", function() {
        reader.readAsDataURL($(this)[0].files[0]);
        previewIcon();
    });
    
    /*******************************
     * Selected a background color *
     *******************************/
    $("#backgroundColor").on("input", function() {
        changed = true;
        attributes.backgroundColor = $(this).val();
    });
    
    /**********************************
     * Clicked on save changes button *
     **********************************/
    $("#save").on("click", function(e) {
        e.preventDefault();
        chrome.storage.local.set(attributes, function() {
            window.location.href = "newtab.html"; // Redirects to newtab
        });
    });
    
    /************************************
     * Clicked on cancel changes button *
     ************************************/
    $("#cancel").on("click", function(e) {
        if(!changed) {
            e.preventDefault();
            window.location.href = "newtab.html"; // Redirects to newtab
        }
    });
    
    /*************************************
     * Clicked on destroy changes button *
     *************************************/
    $("#destroyChanges").on("click", function(e) {
        e.preventDefault();
        window.location.href = "newtab.html"; // Redirects to newtab
    });
});