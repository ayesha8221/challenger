const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const con = require('./index');

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
    const sql = "SELECT * FROM Users";
    con.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// // GET /users/:id - Display a single user's information based on their ID
// app.get('/users/:id', (req, res) => {
//     const userID = req.params.id;
//     const sql = "SELECT * FROM Users WHERE userID = '?'";
//     con.query(sql, [userID], (error, results) => {
//         if (error) {
//             res.status(500).json({ error: 'Database error' });
//         } else if (results.length === 0) {
//             res.status(404).json({ error: 'User not found' });
//         } else {
//             res.json(results[0]); // Return the first result (single user)
//         }
//     });
// });

// // PUT /user/:id - Update user's record
// app.get('/user/:id', (req, res)  => {
//     const userID = req.params.id;
//     const updatedUser = {
//         firstName: 'Ayesha',
//         lastName: 'Galant',
//         userDOB: '99/12/28',
//         emailAdd: 'ayesha@gmail.com',
//         userpass: 'ayesha123',
//         profileURL:''
//     };
    
//     const sql = "UPDATE Users SET ? WHERE userID = ?";
//     con.query(sql, [updatedUser, userID], function (err, result) {
//         if (err) {
//             console.error('Database error:', err);
//             res.status(500).json({ error: 'Database error' });
//         } else {
//             console.log(result.affectedRows + " record(s) updated");
//             res.json(`${result.affectedRows} record(s) updated`);
//         }
//     });
// });



// // // PATCH /user/:id - Modify a user's record
// app.get('/user/:id', (req, res) => {
//     const userID = req.params.id;
//     const updatedFields = {
//         firstName: '',
//         lastName : ''
//         //and whatever else you wanna add
//     }

//     const sql = 'UPDATE Users SET ? WHERE userID = ?';
//     con.query(sql, [updatedFields, userID], (error, result) => {
//         if (error) {
//             console.error('Database error:', error);
//             res.status(500).json({ error: 'Database error' });
//         } else if (result.affectedRows === 0) {
//             res.status(404).json({ error: 'User not found' });
//         } else {
//             console.log(result.affectedRows + " record(s) modified");
//             res.json('User record modified successfully');
//         }
//     });
// });

// POST /register - Register a new user
app.get('/register', (req, res) => {
    const newUser = {
        userID: 3,
        firstName : 'Asiphe',
        lastName : 'Ndimlana',
        userDOB: '04-09-17',
        emailAdd: 'asiphe@gmail.com',
        userpass: 'asiphe789',
        profileURL:''
    }

    const sql = 'INSERT INTO Users SET ?';
    con.query(sql, newUser, (error, result) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json('Database error');
        } else {
            console.log("User registered successfully");
            res.json('User registered successfully');
        }
    });
});

// DELETE / Delete - delete a user's record
// app.get('/user/:id', (req, res) => {
//     const userID = req.params.id;

//     const sql = 'DELETE FROM Users WHERE userID = ?';
//     con.query(sql, [userID], (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             res.status(500).json({ error: 'Database error' });
//         } else if (result.affectedRows === 0) {
//             res.status(404).json('User not found');
//         } else {
//             console.log("User deleted successfully");
//             res.json("User deleted successfully");
//         }
//     });
// });


// POST / Adds a new book to the database
app.get('/book', (req, res) => {
    const newBook = {
        bookID: 2,
        bookTITLE: 'City of Bones',
        category: 'Fantasy',
        bookURL: ''
    }

    const sql = 'INSERT INTO Books SET ?';
    con.query(sql, newBook, (err, books) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else {
            console.log("User data successfully");
            res.json("User data successfully");
        }
    });
});

// GET -display the list of books
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM Books';
    con.query(sql, (err, books) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else {
            res.json(books);
        }
    });
});


// GET - displays a single books information by ID
// app.get('/book/:id', (req, res) => {
//     const bookID = req.params.id;

//     const sql = 'SELECT * FROM Books WHERE bookID = ?';
//     con.query(sql, [bookID], (err, books) => {
//         if (err) {
//             console.error('Database error:', err);
//             res.status(500).json('Database error');
//         } else if (books.length === 0) {
//             res.status(404).json('Book not found');
//         } else {
//             res.json(books[0]);
//         }
//     });
// });

// PUT/PATCH /book/:id - Modify or replace a book's record
app.get('/book/:id', (req, res) => {
    const bookID = req.params.id;
    const updatedBook = {
        bookID: 1,
        bookTITLE: 'ACOTAR',
        category: 'Fantasy',
        bookURL: ''
    }

    const sql = 'UPDATE Books SET ? WHERE bookID = ?';
    con.query(sql, [updatedBook, bookID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Book not found' );
        } else {
            console.log("Book updated data successfully");
            res.json('Book updated successfully');
        }
    });
});


// DELETE - deletes a books information by id
app.get('/book/:id', (req, res) => {
    const bookID = req.params.id;

    const sql = 'DELETE FROM Books WHERE bookID = ?';
    con.query(sql, [bookID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Book not found');
        } else {
            console.log("Book deleted successfully");
            res.json('Book deleted successfully');
        }
    });
});

// POST - adds a book authors details
app.get('/bookAuthor', (req, res) => {
    const newAuthor = {
        id : 1,
        authorName : 'Saarah J',
        authorSurname : 'Maas',
        bookID : 2
    }

    const sql = 'INSERT INTO BookAuthor SET ?';
    con.query(sql, newAuthor, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else {
            console.log('Author details added successfully');
            res.json('Author details added successfully');
        }
    });
});


//GET - display a list of books and authors
app.get('/bookDetails', (req, res) => {
    const sql = `
        SELECT Books.bookTITLE AS book, 
        BookAuthor.authorName AS author
        FROM Books
        LEFT JOIN BookAuthor ON Books.bookID = BookAuthor.bookID
    `;

    con.query(sql, (err, bookDetails) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else {
            const booksWithAuthors = {};
            bookDetails.forEach(book => {
                if (!booksWithAuthors[book.id]) {
                    booksWithAuthors[book.id] = {
                        id: book.id,
                        title: book.title,
                        authorNames: []
                    };
                }
                if (book.authorName) {
                    booksWithAuthors[book.id].authorNames.push(book.authorName);
                }
            });

            res.json(Object.values(booksWithAuthors));
        }
    });
});

// PUT/PATCH /bookAuthor/:id - Update book author details
app.get('/bookAuthor/:id', (req, res) => {
    const authorId = req.params.id;
    const updatedAuthor = {
        id : 1,
        authorName : 'Saara J',
        authorSurname : 'Maas',
        bookID : 2
    }

    const sql = 'UPDATE BookAuthor SET ? WHERE id = ?';
    con.query(sql, [updatedAuthor, authorId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json( 'Database error');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Author not found');
        } else {
            console.log('Author details updated successfully');
            res.json('Author details updated successfully');
        }
    });
});

// DELETE /bookAuthor/:id - Remove book author detail
app.get('/bookAuthor/:id', (req, res) => {
    const authorId = req.params.id;

    const sql = 'DELETE FROM BookAuthor WHERE id = ?';
    con.query(sql, [authorId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Author not found');
        } else {
            console.log('Author details removed successfully');
            res.json('Author detail removed successfully');
        }
    });
});

// POST /order/:userID/:bookID - Add to cart
app.get('/order/:userID/:bookID', (req, res) => {
    const userID = req.params.userID;
    const bookID = req.params.bookID;

    // You can handle additional order details in the request body
    const newOrder = {
        orderID : 1,
        userID : 2,
        bookID : 2,
        orderDate : 23/7/13
    }

    // Assuming your orders table has appropriate columns
    const sql = 'INSERT INTO Orders SET ?';
    con.query(sql, newOrder, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else {
            console.log('Item added to cart');
            res.json('Item added to cart');
        }
    }); 
});

// PUT/PATCH /order/:userID/:bookID - Update order detail
app.get('/order/:userID/:bookID', (req, res) => {
    const userID = req.params.userID;
    const bookID = req.params.bookID;

    // Assuming your orders table has appropriate columns
    const updatedOrder = {
        orderID : 1,
        userID : 2,
        bookID : 2,
        orderDate : '22/10/23'
    }

    const sql = 'UPDATE Orders SET ? WHERE userID = ? AND bookID = ?';
    con.query(sql, [updatedOrder, userID, bookID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Order detail not found' });
        } else {
            console.log('Order detail updated successfully');
            res.json('Order detail updated successfully');
        }
    });
});

// DELETE /order/:userID/:bookID - Delete an order detail
app.get('/order/:userID/:bookID', (req, res) => {
    const userId = req.params.userID;
    const bookId = req.params.bookID;

    const sql = 'DELETE FROM Orders WHERE userID = ? AND bookID = ?';
    con.query(sql, [userId, bookId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json('Database error');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Order detail not found');
        } else {
            console.log('Order detail deleted successfully');
            res.json('Order detail deleted successfully');
        }
    });
});

// GET /checkout/:userID/:bookID - Display list of users with products to pay
app.get('/checkout/:userID/:bookID', (req, res) => {
    const userId = req.params.userID;
    const bookId = req.params.bookID;

    const sql = `
        SELECT Users.*, Orders.*
        FROM Users
        INNER JOIN Orders ON Users.id = Orders.userID
        WHERE Users.id = ? AND Orders.bookID = ?
    `;

    con.query(sql, [userId, bookId], (err, checkoutDetails) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(checkoutDetails);
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});