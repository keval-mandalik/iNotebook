const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 :Get all the Notes GET:"/api/auth/createuser". login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id })
                res.json(notes)
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error")
        }
})


// ROUTE 2 :Add new Notes using  POST:"/api/auth/addnote". login Required
router.post('/addnote', fetchuser, [
        body('title', 'Enter valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
        try {
                const { title, description, tag } = req.body;
                //If there are errors, return bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }
                const notes = new Note({
                        title, description, tag, user: req.user.id
                })
                const saveNote = await notes.save()
                res.json(saveNote)
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error")
        }
})

// ROUTE 3 :Update an existing Notes using  put:"/api/auth/updatenote". login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        try {


                //create new Object
                const newNote = {};
                if (title) { newNote.title = title };
                if (description) { newNote.description = description };
                if (tag) { newNote.tag = tag };

                //find the note to be update and update it
                let note = await Note.findById(req.params.id);
                if (!note) { return res.status(404).send('Not Found') }

                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed")
                }

                note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
                res.json({ note })
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error")
        }

})
// ROUTE 4 :Delete an existing Notes using  DELETE:"/api/auth/deletenote". login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        try {


                //find the note to be deleted and delete it
                let note = await Note.findById(req.params.id);
                if (!note) { return res.status(404).send('Not Found') }
                //Allow deletion only if user owns this Note
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed")
                }

                note = await Note.findByIdAndDelete(req.params.id)
                res.send("Note has been deleted")
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error")
        }
})
module.exports = router;

