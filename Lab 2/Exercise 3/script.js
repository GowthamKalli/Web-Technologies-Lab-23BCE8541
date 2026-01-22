const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const columns = document.querySelectorAll(".column");

addBtn.onclick = function() {
    if (taskInput.value === "") return;

    const card = document.createElement("div");
    card.className = "task-card";
    card.draggable = true;
    card.id = "task-" + Date.now();
    
    const taskName = taskInput.value;
    const date = new Date().toLocaleDateString();
    
    card.innerHTML = "<strong>" + taskName + "</strong><br>" + date;

    card.ondragstart = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    document.getElementById("todo").appendChild(card);
    taskInput.value = "";
};

columns.forEach(function(col) {
    col.ondragover = function(event) {
        event.preventDefault();
    };

    col.ondrop = function(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData("text");
        const element = document.getElementById(id);
        col.appendChild(element);

        if (col.id === "completed") {
            element.style.backgroundColor = "lightgreen";
            if (!element.innerHTML.includes("(Task Completed Successfully)")) {
                element.innerHTML = element.innerHTML.replace("</strong>", " (Task Completed Successfully)</strong>");
            }
        } else {
            element.style.backgroundColor = "white";
            element.innerHTML = element.innerHTML.replace(" (Task Completed Successfully)", "");
        }
    };
});