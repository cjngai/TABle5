$(document).ready(function() {
    var reader = new FileReader();
    
    $("#saveBackground").on("click", function(e) {
        e.preventDefault();
        // TODO: save background
        $("#backgroundDialog").modal('hide');
    });
    
    /**
     * Reader read the file
     */
    reader.onloadend = function() {
        jQuery("body").css("background-image", "url(" + reader.result + ")");
    };
    
    /**
     * User selected a file for background
     */
    $("#newBackground").on("change", function() {
        reader.readAsDataURL($(this)[0].files[0]);
    });
    
    /**
     * Initializes clock
     */
    var time = function() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return hours * 3600 + minutes * 60 + seconds;
    };
    var clock = $("#clock").FlipClock({});
    clock.setTime(time());
});