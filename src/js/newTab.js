$(document).ready(function () {
    /**
     * Loads saved background if it exists
     */
    var loadBackground = function() {
        chrome.storage.local.get(null, function (result) {
            if (result.backgroundImage) {
                jQuery("body").css("background-image", "url(" + result.backgroundImage + ")");
            }
            if (result.backgroundColor) {
                jQuery("body").css("background-color", result.backgroundColor);
            }
        });
    };

    /**
     * Initializes clock
     */
    var loadClock = function() {
        var time = function () {
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time = hours * 3600 + minutes * 60 + seconds;
            if (time > 46799) {
                time -= 43200;
            }
            return time;
        };

        var clock = $("#clock").FlipClock({});
        clock.setTime(time());
    };
    
    var init = function() {
        loadBackground();
        loadClock();
    };
    
    init();
    
    /********************************************
     * Functions
     ********************************************/
    $("#addNote").on("click", function(e) {
        e.preventDefault();
        var $li = $("<li></li>");
        var $form = $("<form></form>");
        var $textarea = $("<textarea></textarea>");
        var $save = $("<button></button>");
        $textarea.attr({
            id: "note",
            rows: "4",
            cols: "25"
        });
        $save.attr({
            type: "button",
            id: "saveNote",
            class: "btn btn-primary"
        });
        $save.append("Save");
        $textarea.append("Start typing");
        $form.append($textarea);
        $form.append($save);
        $li.append($form);
        $("#notes").append($li);
        $("#editNote").hide();
        $textarea.focus();
        $textarea.select();
    });
    
});