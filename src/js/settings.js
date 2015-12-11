$(document).ready(function() {
    var
    reader = new FileReader(),
    changed = false,
    attributes = {},
    
    saveChanges = function(attr, callBack) {
        chrome.storage.local.set(attr, callBack);
    };
    
    chrome.storage.local.get(["backgroundColor", "backgroundImage"], function (result) {
        var bgcolor = result.backgroundColor;
        jQuery("#backgroundColor").val(bgcolor);
        if(result.hasOwnProperty("backgroundImage")) {
            jQuery("#backgroundPrev").css("background-image", "url(" + result.backgroundImage + ")");
            jQuery("#backgroundPrev").show();
        }
    });
    
    chrome.storage.local.get("gol", function(result) {
        if(result.gol === "true") {
            $("#golon").attr("checked", true);
        } else {
            $("#goloff").attr("checked", true);
        }
    });
    
    chrome.storage.local.get("zipCode", function (result) {
        if(result.hasOwnProperty("zipCode")) {
            $("#zipCode").val(result.zipCode);
            $("#zipCode").data("original", result.zipCode);
        }
    });
    
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
    
    $("input[name=gol]").on("change", function() {
        changed = true;
        attributes.gol = $("input[name=gol]:checked").val();
    });
    
    /**********************************
     * Clicked on save changes button *
     **********************************/
    $("#save").on("click", function(e) {
        e.preventDefault();
        saveChanges(attributes, function() {
            window.location.href = "newTab.html"; // Redirects to newtab
        });
    });
    
    /************************************
     * Clicked on cancel changes button *
     ************************************/
    $("#cancel").on("click", function(e) {
        if(!changed) {
            e.preventDefault();
            window.location.href = "newTab.html"; // Redirects to newtab
        }
    });
    
    /*************************************
     * Clicked on destroy changes button *
     *************************************/
    $("#destroyChanges").on("click", function(e) {
        e.preventDefault();
        window.location.href = "newTab.html"; // Redirects to newtab
    });
    
    /********************
     * Changed zip code *
     ********************/
    $("#zipCode").keyup(function() {
        if($(this).val() !== $(this).data("original")) {
            changed = true;
            attributes.zipCode = $(this).val();
        } else {
            changed = false;
            attributes.zipCode = $(this).data("original");
        }
    });
});