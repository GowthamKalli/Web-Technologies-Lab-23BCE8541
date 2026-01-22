const userForm = document.getElementById("userForm");
const userTableBody = document.getElementById("userTableBody");
const clearAllBtn = document.getElementById("clearAll");

function displayUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userTableBody.innerHTML = "";

    users.forEach(function(user, index) {
        const row = userTableBody.insertRow();
        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.mobile;
        
        const deleteCell = row.insertCell(3);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function() {
            deleteUser(index);
        };
        deleteCell.appendChild(deleteBtn);
    });
}

userForm.onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;

    if (mobile.length !== 10) {
        alert("Mobile number must be 10 digits");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(function(user) {
        return user.email === email;
    });

    if (exists) {
        alert("Email already registered");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    userForm.reset();
    displayUsers();
};

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

clearAllBtn.onclick = function() {
    localStorage.removeItem("users");
    displayUsers();
};

displayUsers();