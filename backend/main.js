const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
require('./lib/database.js');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/', require('./routes/routes.js'));


app.listen(app.get('port'), () => console.log('Server on port: ', app.get('port')));