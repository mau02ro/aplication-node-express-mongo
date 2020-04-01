const express = require('express');
const paht = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const expSession = require('express-session');
const colors = require('colors');

//Initializations
const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: paht.join(app.get('views', 'layouts')),
    partialsDir: paht.join(app.get('views', 'partials')),
    extname: '.hbs'
});

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', paht.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files


//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server to listenning on port: '.green + `${app.get('port')}`.yellow);
})