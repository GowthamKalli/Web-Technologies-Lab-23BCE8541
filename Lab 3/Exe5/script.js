let currentStage = 1;
let data = {};

function showStage() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById("stage" + i).style.display =
            i === currentStage ? "block" : "none";
    }
    document.getElementById("progress").value = currentStage;
}

function validateStage() {
    if (currentStage === 1) {
        const name = document.getElementById("name").value.trim();
        if (name === "") {
            alert("Name required");
            return false;
        }
        data.name = name;
    }

    if (currentStage === 2) {
        const email = document.getElementById("email").value.trim();
        if (email === "" || !email.includes("@")) {
            alert("Valid email required");
            return false;
        }
        data.email = email;
    }

    if (currentStage === 3) {
        const age = document.getElementById("age").value;
        if (age === "" || age <= 0) {
            alert("Valid age required");
            return false;
        }
        data.age = age;
    }

    if (currentStage === 4) {
        const remarks = document.getElementById("remarks").value.trim();
        if (remarks === "") {
            alert("Remarks required");
            return false;
        }
        data.remarks = remarks;
    }

    return true;
}

function nextStage() {
    if (validateStage()) {
        currentStage++;
        showStage();
    }
}

function prevStage() {
    currentStage--;
    showStage();
}

function submitForm() {
    if (validateStage()) {
        alert("Form submitted successfully");
    }
}

