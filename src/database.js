const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/aplication-node-express-mongo', {
    //config
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is ok'))
    .catch(err => console.error(err));