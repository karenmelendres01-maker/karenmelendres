const formContainer = document.getElementById("form-container");

// Toggle between login and register
function toggleForm() {
    formContainer.classList.toggle("show-register");
}

// ===== Users in LocalStorage =====
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// ===== Register =====
function doRegister() {
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();

    if(!email || !pass) return alert("Fill all fields!");

    let users = getUsers();

    if(users.some(u => u.email === email)) return alert("Email already registered!");

    users.push({email, pass});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please login.");
    toggleForm(); // Switch to login
}

// ===== Login =====
function doLogin() {
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-pass").value.trim();

    if(!email || !pass) return alert("Fill all fields!");

    let users = getUsers();
    const user = users.find(u => u.email === email && u.pass === pass);

    if(!user) return alert("Invalid email or password!");

    // Save logged in user
    localStorage.setItem("currentUser", email);

    // Redirect to homepage
    window.location.href = "homepage.html";
}
