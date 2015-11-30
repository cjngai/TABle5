$(document).ready(function () {
    /*********************************************
     * HTML mapping to escape special characters *
     *********************************************/
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    
    /***************************************************
     * Escapes HTML string based on entityMap variable *
     ***************************************************/
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
                    var $li = $("<li></li>");
                    var $x = $("<span></span>");
                    $li.attr({
                        "data-index": i
                    });
                    $li.text(notes[i]);
                    $x.attr({
                        "class": "x glyphicon glyphicon-remove",
                        "aria-hidden": "hidden"
                    });
                    $li.append($x);
                    $("#notes").append($li);
                }
            } else {
                saveChanges({"notes": []});
            }

        });
    };

    /*********************
     * Initializes todos *
     *********************/
    var loadTodos = function () {
        chrome.storage.local.get("todos", function (result) {
            if(result.hasOwnProperty("todos")) {
                var todos = result.todos;
                for (var i = 0; i < todos.length; i++) {
                    var $li = $("<li></li>");
                    var $x = $("<span></span>");
                    $li.attr({
                        "data-index": i
                    });
                    $li.text(todos[i]);
                    $x.attr({
                        "class": "x glyphicon glyphicon-remove",
                        "aria-hidden": "hidden"
                    });
                    $li.append($x);
                    $("#todos").append($li);
                }
            } else {
                saveChanges({"todos": []});
            }

        });
    };

    /********************
     * Initializes page *
     ********************/
    var init = function () {
        loadBackground();
        loadClock();
        loadNotes();
        loadTodos();
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
            // console.log(notes);
            saveChanges({"notes": notes});
            var $li = $("<li></li>");
            var $x = $("<span></span>");
            $li.attr({
                "data-index": (notes.length - 1)
            });
            $li.text(note);
            $x.attr({
                "class": "x glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $li.append($x);
            $("#notes").append($li);
            $("#noteContainer").remove();
            $("#editNote").show();
        });
    });
    
    /********************
     * Clicked add todo *
     ********************/
    $("#addTodo").on("click", function (e) {
        e.preventDefault();
        var $li = $("<li></li>");
        var $form = $("<form></form>");
        var $textarea = $("<textarea></textarea>");
        var $save = $("<button></button>");
        $li.attr({
            id: "todoContainer"
        });
        $textarea.attr({
            id: "todo",
            rows: "4",
            cols: "25",
            placeholder: "What do you need to do later?"
        });
        $save.attr({
            type: "button",
            id: "saveTodo",
            class: "btn btn-primary"
        });
        $save.append("Save");
        $form.append($textarea);
        $form.append("<br />");
        $form.append($save);
        $li.append($form);
        $("#todos").append($li);
        $("#editTodo").hide();
        $textarea.focus();
    });

    /*********************
     * Clicked save todo *
     *********************/
    $("#todos").delegate("#saveTodo", "click", function (e) {
        e.preventDefault();
        chrome.storage.local.get("todos", function (result) {
            var todos = result.todos;
            var todo = escapeHtml(jQuery("#todo").val());
            todos.push(todo);
            // console.log(todos);
            saveChanges({"todos": todos});
            var $li = $("<li></li>");
            var $x = $("<span></span>");
            $li.attr({
                "data-index": (todos.length - 1)
            });
            $li.text(todo);
            $x.attr({
                "class": "x glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $li.append($x);
            $("#todos").append($li);
            $("#todoContainer").remove();
            $("#editTodo").show();
        });
    });
});