$(document).ready(function () {
    /**************************
     * Conway's Game Variable *
     **************************/
    var game;
    var is_game = false;

    /*********************************************
     * HTML mapping to escape special characters *
     *********************************************/
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };

    /***************************************************
     * Escapes HTML string based on entityMap variable *
     ***************************************************/
    var escapeHtml = function (string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    };

    /**************************
     * Initializes background *
     **************************/
    var loadBackground = function () {
        chrome.storage.local.get(["backgroundImage", "backgroundColor", "gol"], function (result) {
            if (result.gol === "true") {
                console.log(result);
                gameOfLife();
            } else {
                if (result.hasOwnProperty("backgroundImage")) {
                    jQuery("body").css("background-image", "url(" + result.backgroundImage + ")");
                }
                if (result.hasOwnProperty("backgroundColor")) {
                    jQuery("body").css("background-color", result.backgroundColor);
                }
            }
        });
    };

    var gameOfLife = function () {
        var $canvas = $("<canvas></canvas>");
        $canvas.attr({
            id: "gol-background",
            class: "life-game"
        });
        $("body").append($canvas);
        var cells = [];
        var width = window.screen.availWidth / 10;
        var height = window.screen.availHeight / 10;
        for (var i = 0; i < height; i++) {
            cells[i] = [];
            for (var j = 0; j < width; j++) {
                cells[i][j] = Math.floor(Math.random() * 2);
            }
        }
        game = new GameOfLife({
            canvas_id: "gol-background",
            cell_width: 10,
            cell_height: 10,
            init_cells: cells,
            colorful: true
        });
        game_toggle(game, "start");
        is_game = true;
    };

    var game_toggle = function (game, force) {
        var interval = game.getInterval();
        if (force === "stop" || interval !== null) {
            clearInterval(interval);
            game.setTheInterval(null);
        } else {
            interval = setInterval(game.step, 100);
            game.setTheInterval(interval);
        }
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
            if (result.hasOwnProperty("notes")) {
                var notes = result.notes;
                for (var i = 0; i < notes.length; i++) {
                    var $li = $("<li></li>");
                    var $x = $("<span></span>");
                    var $p = $("<span></span>");
                    $li.attr({
                        "data-index": i
                    });
                    $li.html(notes[i]);
                    $x.attr({
                        "class": "notex glyphicon glyphicon-remove",
                        "aria-hidden": "hidden"
                    });
                    $p.attr({
                        "class": "notep glyphicon glyphicon-pencil",
                        "aria-hidden": "hidden"
                    });
                    $li.append($x);
                    $li.append($p);
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
            if (result.hasOwnProperty("todos")) {
                var todos = result.todos;
                for (var i = 0; i < todos.length; i++) {
                    var $li = $("<li></li>");
                    var $x = $("<span></span>");
                    var $p = $("<span></span>");
                    $li.attr({
                        "data-index": i
                    });
                    $li.html(todos[i]);
                    $x.attr({
                        "class": "todox glyphicon glyphicon-remove",
                        "aria-hidden": "hidden"
                    });
                    $p.attr({
                        "class": "todop glyphicon glyphicon-pencil",
                        "aria-hidden": "hidden"
                    });
                    $li.append($x);
                    $li.append($p);
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

    /*******************************
     * Window blur stop background *
     *******************************/
    $(window).on("blur", function () {
        if (is_game) {
            game_toggle(game, "stop");
        }
    });

    /*********************************
     * Window focus start background *
     *********************************/
    $(window).on("focus", function () {
        if (is_game) {
            game_toggle(game, "start");
        }
    });

    /********************
     * Clicked add note *
     ********************/
    $("#addNote").on("click", function () {
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
        $("#editNoteButton").hide();
        $textarea.focus();
    });

    /*********************
     * Clicked save note *
     *********************/
    $("#notes").on("click", "#saveNote", function () {
        chrome.storage.local.get("notes", function (result) {
            var notes = result.notes;
            var note = escapeHtml(jQuery("#note").val());
            notes.push(note);
            // console.log(notes);
            saveChanges({"notes": notes});
            var $li = $("<li></li>");
            var $x = $("<span></span>");
            var $p = $("<span></span>");
            $li.attr({
                "data-index": (notes.length - 1)
            });
            $li.html(note);
            $x.attr({
                "class": "notex glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $p.attr({
                "class": "notep glyphicon glyphicon-pencil",
                "aria-hidden": "hidden"
            });
            $li.append($x);
            $li.append($p);
            $("#notes").append($li);
            $("#noteContainer").remove();
            $("#editNoteButton").show();
        });
    });

    /*********************
     * Clicked edit note *
     *********************/
    $("#notes").on("click", ".notep", function () {
        var $parent = $(this).parent();
        var $form = $("<form></form>");
        var $textarea = $("<textarea></textarea>");
        var $save = $("<button></button>");
        $textarea.attr({
            id: "note" + $parent.data("index"),
            rows: "4",
            cols: "25",
            placeholder: "Enter your note!"
        });
        $textarea.append($parent.text());
        $save.attr({
            type: "button",
            class: "updateNote btn btn-primary"
        });
        $save.append("Update");
        $form.append($textarea);
        $form.append("<br />");
        $form.append($save);
        $parent.html($form);
    });

    /***********************
     * Clicked update note *
     ***********************/
    $("#notes").on("click", "[class~='updateNote']", function () {
        var $parent = $(this).parent().parent();
        var index = $parent.data("index");
        chrome.storage.local.get("notes", function (result) {
            var notes = result.notes;
            var note = escapeHtml(jQuery("#note" + index).val());
            notes[index] = note;
            var $x = $("<span></span>");
            var $p = $("<span></span>");
            $x.attr({
                "class": "notex glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $p.attr({
                "class": "notep glyphicon glyphicon-pencil",
                "aria-hidden": "hidden"
            });
            $parent.html(note);
            $parent.append($x);
            $parent.append($p);
            saveChanges({"notes": notes});
        });
    });

    /***********************
     * Clicked delete note *
     ***********************/
    $("#notes").on("click", ".notex", function () {
        var $parent = $(this).parent();
        var index = $parent.data("index");
        chrome.storage.local.get("notes", function (result) {
            var notes = result.notes;
            notes.splice(index, 1);
            $parent.remove();
            saveChanges({"notes": notes});
            $("#notes li").each(function (index) {
                $(this).data("index", index);
            });
        });
    });

    /********************
     * Clicked add todo *
     ********************/
    $("#addTodo").on("click", function () {
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
        $("#editTodoButton").hide();
        $textarea.focus();
    });

    /*********************
     * Clicked save todo *
     *********************/
    $("#todos").on("click", "#saveTodo", function () {
        chrome.storage.local.get("todos", function (result) {
            var todos = result.todos;
            var todo = escapeHtml(jQuery("#todo").val());
            todos.push(todo);
            // console.log(todos);
            saveChanges({"todos": todos});
            var $li = $("<li></li>");
            var $x = $("<span></span>");
            var $p = $("<span></span>");
            $li.attr({
                "data-index": (todos.length - 1)
            });
            $li.html(todo);
            $x.attr({
                "class": "todox glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $p.attr({
                "class": "todop glyphicon glyphicon-pencil",
                "aria-hidden": "hidden"
            });
            $li.append($x);
            $li.append($p);
            $("#todos").append($li);
            $("#todoContainer").remove();
            $("#editTodoButton").show();
        });
    });

    /*********************
     * Clicked edit todo *
     *********************/
    $("#todos").on("click", ".todop", function () {
        var $parent = $(this).parent();
        var $form = $("<form></form>");
        var $textarea = $("<textarea></textarea>");
        var $save = $("<button></button>");
        $textarea.attr({
            id: "todo" + $parent.data("index"),
            rows: "4",
            cols: "25",
            placeholder: "What do you need to do later?"
        });
        $textarea.append($parent.text());
        $save.attr({
            type: "button",
            class: "updateTodo btn btn-primary"
        });
        $save.append("Update");
        $form.append($textarea);
        $form.append("<br />");
        $form.append($save);
        $parent.html($form);
    });

    /***********************
     * Clicked update todo *
     ***********************/
    $("#todos").on("click", "[class~='updateTodo']", function () {
        var $parent = $(this).parent().parent();
        var index = $parent.data("index");
        chrome.storage.local.get("todos", function (result) {
            var todos = result.todos;
            var todo = escapeHtml(jQuery("#todo" + index).val());
            todos[index] = todo;
            var $x = $("<span></span>");
            var $p = $("<span></span>");
            $x.attr({
                "class": "todox glyphicon glyphicon-remove",
                "aria-hidden": "hidden"
            });
            $p.attr({
                "class": "todop glyphicon glyphicon-pencil",
                "aria-hidden": "hidden"
            });
            $parent.html(todo);
            $parent.append($x);
            $parent.append($p);
            saveChanges({"todos": todos});
        });
    });

    /***********************
     * Clicked delete Todo *
     ***********************/
    $("#todos").on("click", ".todox", function () {
        var $parent = $(this).parent();
        var index = $parent.data()["index"];
        chrome.storage.local.get("todos", function (result) {
            var todos = result.todos;
            todos.splice(index, 1);
            $parent.remove();
            saveChanges({"todos": todos});
            $("#todos li").each(function (index) {
                $(this).data("index", index);
            });
        });
    });
});