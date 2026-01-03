const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/work', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'work.html'));
});

app.get('/interaction', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'interaction.html'));
});

app.get('/learnmore1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learnmore1.html'));
});

app.get('/learnmore2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learnmore2.html'));
});

app.get('/learnmore3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'learnmore3.html'));
});

const form = document.getElementById('contact-form');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        status.textContent = "Thank you! Your message has been sent.";
        form.reset();
    } else {
        status.textContent = "Oops! There was a problem.";
    }
});