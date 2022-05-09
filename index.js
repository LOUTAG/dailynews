const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');


/*** mongoose connect ***/
mongoose.connect(keys.mongoURI);

//optional //
mongoose.connection.on('connected', ()=>{
    console.log('MongoDB is connected');
});
mongoose.connection.on('error', ()=>{
    console.log('MongoDB connection failed');
});

/*** creation de notre app ***/
const app = express();


/*** middlewares ***/
app.use(bodyParser.json());

/*** routes ***/
const newItemRoutes = require('./routes/newItemRoutes');
const userRoutes = require ('./routes/userRoutes');

newItemRoutes(app);
userRoutes(app);

if(process.env.NODE_ENV==='production'){
    
    app.use(express.static('client/build'));

    const path= require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

/*** le port ***/
const PORT = process.env.PORT || 5000;
app.listen(PORT);