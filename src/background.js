// The user is typing
chrome.omnibox.onInputChanged.addListener(
        function (text, suggest) {
            suggest([
                {content: "note " + text, description: "Add note"}, // Adds a note
                {content: "todo " + text, description: "Do later"}  // Adds a todo
            ]);
        });

// The user entered data
chrome.omnibox.onInputEntered.addListener(
        function (text) {
            var text = text.split(" ");
            switch(text[0]) {
                case "note": // User wants to add a note
                    addNote(text[1]);
                    break;
                case "todo": // User wants to add a todo
                    addTodo(text[1]);
                    break;
                default:
                    alert("Unsupported command!");
            }
        });

// Adds a note
var addNote = function(note) {
    alert("Adding note " + note);
};

// Adds a todo
var addTodo =  function(todo) {
    alert("Adding todo " + todo);
};