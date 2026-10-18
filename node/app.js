const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send("WELCOME TO HOMEPAGE")
})

app.get('/about', (req,res) => {
    res.send("WELCOME TO ABOUT PAGE")
})

app.listen( 3000 , () => {
    console.log("Server running on http://localhost:3000")
})