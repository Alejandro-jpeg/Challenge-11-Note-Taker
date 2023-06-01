const express = require ('express');
const fs = require('fs');
const path = require('path');

const apiRouter = require('./routes/api-routes.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//API ROUTER
app.use('/api', apiRouter);

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