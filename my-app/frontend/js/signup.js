
const form = document.getElementById("signupForm");
const message = document.getElementById("message");
const button = document.getElementById("signupButton");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    button.disabled = true;
    button.textContent = "Creating account...";

    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName, email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Signup failed.");
        }

        message.textContent = result.message;
        form.reset();
    } catch (error) {
        message.textContent =
            error.message || "Unable to contact the server.";
    } finally {
        button.disabled = false;
        button.textContent = "Create Account";
    }
});
