let activities = [];
let clickCount = 0;
const threshold = 25;

function logActivity(type, target) {
    const activity = {
        type: type,
        element: target.tagName,
        time: new Date().toLocaleTimeString()
    };

    activities.push(activity);
    updateLog();

    if (type === "click") {
        clickCount++;
        if (clickCount > threshold) {
            alert("Suspicious activity detected: Too many clicks");
            clickCount = 0;
        }
    }
}

function updateLog() {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML = "";

    activities.forEach(a => {
        const p = document.createElement("p");
        p.innerText = a.time + " - " + a.type + " on " + a.element;
        logDiv.appendChild(p);
    });
}

document.addEventListener("click", e => {
    logActivity("click", e.target);
}, false);

document.addEventListener("click", e => {
    logActivity("click (captured)", e.target);
}, true);

document.addEventListener("keydown", e => {
    logActivity("key press", document.activeElement);
});

document.addEventListener("focusin", e => {
    logActivity("focus", e.target);
});

function resetLog() {
    activities = [];
    clickCount = 0;
    document.getElementById("log").innerHTML = "";
}

function exportLog() {
    let output = "User Activity Log\n\n";
    activities.forEach(a => {
        output += a.time + " | " + a.type + " | " + a.element + "\n";
    });
    alert(output);
}

