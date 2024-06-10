const express = require('express');
const dbCon = require('../dbConnection');
const router = express.Router();


// ----------------- Routes -----------------
// It will add student data.
router.post('/', (req, res) => {
    const { name, stu_class, rollno, age, phone } = req.body;
    const sql = 'INSERT INTO students (name, class, rollno, age, phone) VALUES (?, ?, ?, ?, ?)';
    dbCon.query(sql, [name, stu_class, rollno, age, phone], (err, result) => {
        if (err) {
            res.status(500).send('Error creating student');
            throw err;
        }
        res.status(201).send('Student created successfully');
    });
});


// It Will Show all the students data.
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    dbCon.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Error fetching students');
            throw err;
        }
        res.json(result);
    });
});

// It Will Show student with specific id only.
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM students where id = ?';
    dbCon.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).send('Error fetching students');
            throw err;
        }

        if (result.length == 0) {
            res.json("Student doesn't exist.");
        }
        res.json(result);
    });
});


// Update Student
router.put('/:id', (req, res) => {
    const { name, stu_class, rollno, age, phone } = req.body;
    const id = req.params.id;

    const fieldsToUpdate = {};
    // Check if each field is present in the request body, and add it to the fieldsToUpdate object if it exists
    if (name) {
        // fieldsToUpdate['name'] = name; // This is the another way of key and values.
        fieldsToUpdate.name = name;
    }
    if (stu_class) {
        // fieldsToUpdate['class'] = stu_class;
        fieldsToUpdate.class = stu_class;
    }
    if (rollno) {
        // fieldsToUpdate['rollno'] = rollno;
        fieldsToUpdate.rollno = rollno;
    }
    if (age) {
        // fieldsToUpdate['age'] = age;
        fieldsToUpdate.age = age;
    }
    if (phone) {
        // fieldsToUpdate['phone'] = phone;
        fieldsToUpdate.phone = phone;
    }

    // If no fields are provided, send a response indicating no fields were provided
    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).send('No fields provided for update');
    }


    // Construct the SQL UPDATE statement dynamically based on the fields to update.
    const fieldNames = Object.keys(fieldsToUpdate); // It is js method which returns an array of keys of an object.
    const columns = fieldNames.map(field => `${field} = ?`).join(', '); // It will insert comma between the fields.

    // console.log("Joined String: ", columns); // This is for testing only.
    // console.log("Values", Object.values(fieldsToUpdate)); // This is for testing only.

    const sql = `UPDATE students SET ${columns} WHERE id = ?`; // Here, we are passing field dynamically in place of columns.
    dbCon.query(sql, [...Object.values(fieldsToUpdate), id], (err, result) => { // Spread operator is used to get the values.
        if (err) {
            res.status(500).send('Error updating student');
            throw err;
        }
        res.send('Student updated successfully');
    });
});


// Delete Student
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const check = 'SELECT * FROM students WHERE id = ?';
    dbCon.query(check, id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error.");
            throw err;
        }

        if (result.length == 0) { // It means no rows were returned.
            res.status(404).send("Student not found.");
        }


        const sql = 'DELETE FROM students WHERE id = ?';
        dbCon.query(sql, id, (err, result) => {
            if (err) {
                res.status(500).send('Error deleting student');
                throw err;
            }
            res.send('Student deleted successfully');
        });

    });
});


module.exports = router;