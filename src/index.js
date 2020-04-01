const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const expSession = require('express-session');
const colors = require('colors');


//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false }));//entender datos
app.use(methodOverride('_method'));//foumularios puedan enviar otros tipos de metodos
app.use(expSession({
    //config basicas
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Global Variables


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/note'));
app.use(require('./routes/users'));

//Static Files


//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server to listenning on port: '.green + `${app.get('port')}`.yellow);
})