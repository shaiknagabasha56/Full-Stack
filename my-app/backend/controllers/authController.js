
const authService = require("../services/authService");

async function signup(req, res, next) {
    try {
        const { fullName, email, password } = req.body || {};

        if (
            typeof fullName !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        const name = fullName.trim();
        const normalizedEmail = email.trim();

        if (name.length < 2 || name.length > 100) {
            return res.status(400).json({
                message: "Name must contain 2–100 characters."
            });
        }

        if (
            normalizedEmail.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
        ) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        if (
            Buffer.byteLength(password, "utf8") < 8 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {
            return res.status(400).json({
                message: "Password must be 8–72 bytes long."
            });
        }

        const user = await authService.createUser({
            fullName: name,
            email: normalizedEmail,
            password
        });

        return res.status(201).json({
            message: "Account created successfully.",
            user
        });
    } catch (error) {
        if (error.statusCode === 409) {
            return res.status(409).json({
                message: error.message
            });
        }

        next(error);
    }
}

module.exports = { signup };
