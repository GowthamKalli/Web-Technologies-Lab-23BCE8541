const form = document.getElementById("regForm");
const role = document.getElementById("role");
const skillsBox = document.getElementById("skillsBox");

function showError(input, msgId, message) {
    input.style.border = "2px solid red";
    document.getElementById(msgId).innerText = message;
}

function clearError(input, msgId) {
    input.style.border = "";
    document.getElementById(msgId).innerText = "";
}

function validateEmail(email) {
    return email.endsWith("@gmail.com") || email.endsWith("@edu.in");
}

function validatePassword(password, role) {
    if (role === "admin") {
        return /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!]).{10,}/.test(password);
    }
    return password.length >= 6;
}

role.addEventListener("change", () => {
    skillsBox.style.display = (role.value === "teacher") ? "block" : "none";
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const age = document.getElementById("age");
    const skills = document.getElementById("skills");

    if (name.value.trim() === "") {
        showError(name, "nameErr", "Name required");
        valid = false;
    } else clearError(name, "nameErr");

    if (!validateEmail(email.value)) {
        showError(email, "emailErr", "Invalid email domain");
        valid = false;
    } else clearError(email, "emailErr");

    if (!validatePassword(password.value, role.value)) {
        showError(password, "passErr", "Weak password");
        valid = false;
    } else clearError(password, "passErr");

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "confirmErr", "Passwords do not match");
        valid = false;
    } else clearError(confirmPassword, "confirmErr");

    if (age.value < 18) {
        showError(age, "ageErr", "Must be 18+");
        valid = false;
    } else clearError(age, "ageErr");

    if (!role.value) {
        showError(role, "roleErr", "Select role");
        valid = false;
    } else clearError(role, "roleErr");

    if (role.value === "teacher" && skills.value.trim() === "") {
        showError(skills, "skillsErr", "Skills required");
        valid = false;
    } else clearError(skills, "skillsErr");

    if (valid) {
        alert("Registration Successful!");
        form.reset();
        skillsBox.style.display = "none";
    }
});