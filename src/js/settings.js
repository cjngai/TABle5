$(document).ready(function() {
    var reader = new FileReader();
    var changed = false;
    var attributes = {};
    
    /**
     * Reader read the file
     */
    reader.onloadend = function() {
        var image = reader.result;
        changed = true;
        attributes.background = image;
        // console.log(attributes);
    };
    
    /**
     * User selected a file for background
     */
    $("#newBackground").on("change", function() {
        reader.readAsDataURL($(this)[0].files[0]);
    });
    
    $("#save").on("click", function(e) {
        e.preventDefault();
        chrome.storage.local.set(attributes, function() {
            window.location.href = "newtab.html"; // Redirects to newtab
        });
    });
    
    $("#cancel").on("click", function(e) {
        if(!changed) {
            e.preventDefault();
            window.location.href = "newtab.html";
        }
    });
    
    $("#destroyChanges").on("click", function(e) {
        e.preventDefault();
        window.location.href = "newtab.html";
    });
});