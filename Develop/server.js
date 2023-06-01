const express = require ('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//PUBLIC HTML ROUTES
//Route that returns the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
//route that returs the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index'))
});



app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);