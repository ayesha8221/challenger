const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./index');

var fs = require('fs');

app.use(bodyParser.json());

// GET '/' - Navigates to the home page
app.get('/', (req, res) => {
    fs.readFile('./html/index.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
         return res.end();
        });
}) 

// GET /users - Display a list of users from the database
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// GET /users/:id - Display a single user's information based on their ID
app.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    const query = 'SELECT * FROM Users WHERE userID = ?';
    db.query(query, [userID], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(results[0]); // Return the first result (single user)
        }
    });
});

// PUT /user/:id - Update user's record
app.put('/user/:id', (req, res) => {
    const userID = req.params.id;
    const updatedUser = req.body;

    const query = 'UPDATE Users SET ? WHERE userID = ?';
    db.query(query, [updatedUser, userID], (error, result) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
});

// PATCH /user/:id - Modify a user's record
app.patch('/user/:id', (req, res) => {
    const userId = req.params.id;
    const updatedFields = req.body;

    const query = 'UPDATE Users SET ? WHERE id = ?';
    db.query(query, [updatedFields, userId], (error, result) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User record modified successfully' });
        }
    });
});

// POST /register - Register a new user
app.post('/register', (req, res) => {
    const newUser = req.body;

    const query = 'INSERT INTO Users SET ?';
    pool.query(query, newUser, (error, result) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'User registered successfully' });
        }
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});