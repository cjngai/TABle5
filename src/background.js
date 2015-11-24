// The user is typing
chrome.omnibox.onInputChanged.addListener(
        function (text, suggest) {
            suggest([
                {content: "note " + text, description: "Add note"},
                {content: "todo " + text, description: "Do later"}
            ]);
        });

// The user entered data
chrome.omnibox.onInputEntered.addListener(
        function (text) {
            var text = text.split(" ");
            switch(text[0]) {
                case "note":
                    addNote(text[1]);
                    break;
                case "todo":
                    addTodo(text[1]);
                    break;
                default:
                    alert("Unsupported command!");
            }
        });

function addNote(note) {
    
}