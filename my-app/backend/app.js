const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(express.static(
    path.join(__dirname, '../frontend')
));

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            message: "Invalid JSON request body."
        });
    }

    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error"
    });
});

module.exports = app;

