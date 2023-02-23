//set up express into variable app
const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//use express.static
app.use(express.static('public'));

// list of top books
let topMovies = [
  {
    title: '',
    director: ''
  },
  {
    title: '',
    director: ''
  },
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
  ,
  {
    title: '',
    director: ''
  }
];


//listens to http request and sends list of books
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//sends introduction
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

//error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error!');
});

//listen request
app.listen(8080, () => {
  console.log('Your app is listening to port 8080.');
});

