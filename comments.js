// Create web server 
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        res.send(comments);
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send('Comment added successfully');
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});