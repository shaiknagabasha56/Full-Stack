
const bcrypt = require("bcryptjs");

const users = [];
let nextUserId = 1;

async function createUser({ fullName, email, password }) {
    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
        user => user.email === normalizedEmail
    );

    if (existingUser) {
        const error = new Error(
            "An account with this email already exists."
        );
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = {
        id: nextUserId++,
        fullName: normalizedName,
        email: normalizedEmail,
        passwordHash,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    // Never print passwords or password hashes.
    console.log("User registered:", {
        id: user.id,
        fullName: user.fullName,
        email: user.email
    });

    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
    };
}

module.exports = { createUser };
