let questions = [];

function generateSurvey() {
    questions = [];
    const form = document.getElementById("surveyForm");
    form.innerHTML = "";

    if (textQ.checked) {
        questions.push({
            id: "name",
            type: "text",
            text: "What is your name?",
            required: true,
            maxLength: 20
        });
    }

    if (radioQ.checked) {
        questions.push({
            id: "gender",
            type: "radio",
            text: "Select your gender",
            required: true,
            options: ["Male", "Female", "Other"]
        });
    }

    if (checkQ.checked) {
        questions.push({
            id: "hobby",
            type: "checkbox",
            text: "Select your hobbies (max 2)",
            required: true,
            options: ["Sports", "Music", "Reading"],
            maxSelect: 2
        });
    }

    if (selectQ.checked) {
        questions.push({
            id: "country",
            type: "select",
            text: "Select your country",
            required: true,
            options: ["India", "USA", "UK"]
        });
    }

    if (textareaQ.checked) {
        questions.push({
            id: "feedback",
            type: "textarea",
            text: "Give your feedback (max 50 chars)",
            required: true,
            maxLength: 50
        });
    }

    if (numberQ.checked) {
        questions.push({
            id: "age",
            type: "number",
            text: "Enter your age",
            required: true,
            min: 18,
            max: 60
        });
    }

    buildForm();
}

function buildForm() {
    const form = document.getElementById("surveyForm");

    questions.forEach(q => {
        const p = document.createElement("p");
        p.innerText = q.text;
        form.appendChild(p);

        let input;

        if (q.type === "text" || q.type === "number") {
            input = document.createElement("input");
            input.type = q.type;
            input.id = q.id;
            form.appendChild(input);
        }

        if (q.type === "textarea") {
            input = document.createElement("textarea");
            input.id = q.id;
            form.appendChild(input);
        }

        if (q.type === "radio" || q.type === "checkbox") {
            q.options.forEach(opt => {
                const el = document.createElement("input");
                el.type = q.type;
                el.name = q.id;
                el.value = opt;
                form.appendChild(el);
                form.appendChild(document.createTextNode(opt));
            });
        }

        if (q.type === "select") {
            input = document.createElement("select");
            input.id = q.id;
            q.options.forEach(opt => {
                const o = document.createElement("option");
                o.value = opt;
                o.innerText = opt;
                input.appendChild(o);
            });
            form.appendChild(input);
        }

        const err = document.createElement("div");
        err.id = "err_" + q.id;
        form.appendChild(document.createElement("br"));
        form.appendChild(err);
    });
}

function validateSurvey() {
    let valid = true;
    let alertErrors = [];

    questions.forEach(q => {
        const err = document.getElementById("err_" + q.id);
        err.innerText = "";

        if (q.type === "text" || q.type === "textarea") {
            const input = document.getElementById(q.id);
            if (q.required && input.value.trim() === "") {
                err.innerText = "Required";
                alertErrors.push(q.text + " is empty");
                valid = false;
            } else if (q.maxLength && input.value.length > q.maxLength) {
                err.innerText = "Max " + q.maxLength + " characters";
                alertErrors.push(q.text + " exceeds limit");
                valid = false;
            }
        }

        if (q.type === "number") {
            const val = document.getElementById(q.id).value;
            if (val === "" || Number(val) <= 0 || val < q.min || val > q.max) {
                err.innerText = "Enter value between " + q.min + " and " + q.max;
                alertErrors.push(q.text + " is invalid");
                valid = false;
            }
        }

        if (q.type === "radio") {
            if (!document.querySelector(`input[name="${q.id}"]:checked`)) {
                err.innerText = "Select one option";
                alertErrors.push(q.text + " not selected");
                valid = false;
            }
        }

        if (q.type === "checkbox") {
            const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
            if (checked.length === 0) {
                err.innerText = "Select at least one";
                alertErrors.push(q.text + " not selected");
                valid = false;
            } else if (checked.length > q.maxSelect) {
                err.innerText = "Select max " + q.maxSelect;
                alertErrors.push(q.text + " selection exceeded");
                valid = false;
            }
        }

        if (q.type === "select") {
            const sel = document.getElementById(q.id);
            if (q.required && !sel.value) {
                err.innerText = "Select an option";
                alertErrors.push(q.text + " not selected");
                valid = false;
            }
        }
    });

    if (!valid) {
        alert("Please fix the following errors:\n\n" + alertErrors.join("\n"));
    }

    return valid;
}
