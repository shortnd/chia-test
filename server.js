let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./controllers/routes/book');
let config = require('config');

mongoose.connect(config.DBHost)
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to our Bookstore!'
  })
})

app.route('/books')
  .get(book.getBooks)
  .post(book.postBook)
app.route('/books/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log(`listing on port ${port}`);

module.exports = app;
