const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images',express.static('./images'));

app.use(userRoutes);

db.getDb().then(connection => {
  app.listen(3000);
  console.log('listening on http://localhost:3000');
}).catch(err => {
 console.err({message: err.message});
});
