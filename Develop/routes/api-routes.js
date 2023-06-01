const apiRouter = require('express').Router();
const { response } = require('express');
const fs = require('fs');
const { parse } = require('path');
const { v4: uuidv4 } = require('uuid');
dataBase = require('../db/db.json');

//API ROUTES

//READS THE FILE AND RESPONDS WITH JSON DATA
apiRouter.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err){
            throw err; 
        }
        res.json(JSON.parse(data));
    });
});

//CHECKS FOR A BODY AND TITLE AND IF IT EXISTS READS THE FILE AND ADDS IT TO THE DB AND RESPONDS WITH THE NEWLY ADDED DATA 
apiRouter.post('/notes', (req, res) => {
    if (req.body.title && req.body.text){
        const newNote = {
            title:req.body.title,
            text:req.body.text,
            id: uuidv4()
        };
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            let parsedJson = JSON.parse(data);
            parsedJson.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parsedJson, null, 4), (error) => {
                if(error){
                    res.send('error writing to file');
                }else{
                    res.json(newNote);
                }
            })
        })
    }else{
        res.status(400).json('Note should contain a title and text');
    }
});

// BONUS TODO: DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

    module.exports = apiRouter;