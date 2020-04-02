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
       req.flash('success_msg', 'Note add successfully');
       res.redirect('/notes');
    }
});

router.get('/notes', async(req, res) => {
    const allNotes = await NoteSchema.find().sort({ date: 'desc' });
    const notes = [];
    allNotes.map((dataNote) => {
        let preObject = {
            title: dataNote.title,
            _id: dataNote._id,
            description: dataNote.description,
            date: dataNote.date
        }
        notes.push(preObject);
    })
    res.render('notes/all-notes', { notes });
})

router.get('/notes/edit/:id', async(req, res) => {
    const dataNote = await NoteSchema.findById(req.params.id);
    const preObject ={
        title: dataNote.title,
        _id: dataNote._id,
        description: dataNote.description,
        date: dataNote.date
    }
    res.render('notes/edit-note', { preObject });
})

router.put('/notes/edit/:id', async(req, res) => {
    const { title, description } = req.body;
    console.log(req.body)
    await NoteSchema.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note update successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async(req, res) => {
    await NoteSchema.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note delete successfully');
    res.redirect('/notes');
})

module.exports = router;