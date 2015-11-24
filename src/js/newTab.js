$(document).ready(function () {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    var escapeHtml = function(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    };
    
    /**************************
     * Initializes background *
     **************************/
    var loadBackground = function () {
        chrome.storage.local.get(["backgroundImage", "backgroundColor"], function (result) {
            if (result.hasOwnProperty("backgroundImage")) {
                jQuery("body").css("background-image", "url(" + result.backgroundImage + ")");
            }
            if (result.hasOwnProperty("backgroundColor")) {
                jQuery("body").css("background-color", result.backgroundColor);
            }
        });
    };

    /*********************
     * Initializes clock *
     *********************/
    var loadClock = function () {
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

    /*********************
     * Initializes notes *
     *********************/
    var loadNotes = function () {
        chrome.storage.local.get("notes", function (result) {
            if(result.hasOwnProperty("notes")) {
                var notes = result.notes;
                for (var i = 0; i < notes.length; i++) {
                    $("#notes").append("<li data-index=\"" + i + "\">" + notes[i] + "</li>");
                }
            } else {
                saveChanges({"notes": []});
            }

        });
    };

    var init = function () {
        loadBackground();
        loadClock();
        loadNotes();
    };

    init();

    /*************
     *           *
     * Functions *
     *           *
     *************/
    /*********************
     * Saves all changes *
     *********************/
    var saveChanges = function (attributes) {
        chrome.storage.local.set(attributes, function () {
            // Saved changes callback
            // Nothing to see here
        });
    };

    /********************
     * Clicked add note *
     ********************/
    $("#addNote").on("click", function (e) {
        e.preventDefault();
        var $li = $("<li></li>");
        var $form = $("<form></form>");
        var $textarea = $("<textarea></textarea>");
        var $save = $("<button></button>");
        $li.attr({
            id: "noteContainer"
        });
        $textarea.attr({
            id: "note",
            rows: "4",
            cols: "25",
            placeholder: "Enter your note!"
        });
        $save.attr({
            type: "button",
            id: "saveNote",
            class: "btn btn-primary"
        });
        $save.append("Save");
        $form.append($textarea);
        $form.append("<br />");
        $form.append($save);
        $li.append($form);
        $("#notes").append($li);
        $("#editNote").hide();
        $textarea.focus();
    });

    /*********************
     * Clicked save note *
     *********************/
    $("#notes").delegate("#saveNote", "click", function (e) {
        e.preventDefault();
        chrome.storage.local.get("notes", function (result) {
            var notes = result.notes;
            var note = escapeHtml(jQuery("#note").val());
            notes.push(note);
            saveChanges({"notes": notes});
            $("#notes").append("<li data-index=\"" + (notes.length - 1) + "\">" + note + "</li>");
            $("#noteContainer").remove();
            $("#editNote").show();
        });
    });
});