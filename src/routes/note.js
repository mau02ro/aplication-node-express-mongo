const express = require('express');
const router = express.Router();
//models
const NoteSchema = require('../models/Notes');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note')
});

router.post('/notes/new-note', async(req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if(!title){
        errors.push({text: 'Please write a title'})
    }
    if(!description){
        errors.push({ text: 'Please write a description' })
    }
    if(errors.length > 0){
        res.render('notes/new-note', { errors, title, description })
    }
    else{
       const newNote = new NoteSchema({ title, description });
       await newNote.save();
       res.redirect('/notes');
    }
});

router.get('/notes', (req, res) => {
    res.send('Notes from db');
})

module.exports = router;