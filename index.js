//set up express into variable app
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path');
  const morgan = require('morgan');


  app.use(bodyParser.json());

//use express.static
app.use(express.static('public'));

//use common preset
app.use(morgan('common'));




// list of top books
let topMovies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994'
  },
  {
    title: 'The Godfather',
    year: '1972'
  },
  {
    title: 'The Dark Knight',
    year: '2008'
  }
  ,
  {
    title: 'The Godfather Part II',
    year: '1974'
  }
  ,
  {
    title: '12 Angry Men',
    year: '1957'
  }
  ,
  {
    title: 'Schindler\'s List',
    year: '1993'
  }
  ,
  {
    title: 'The Lord of The Rings: The Return of the King',
    year: '2003'
  }
  ,
  {
    title: 'Pulp Fiction',
    year: '1994'
  }
  ,
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001'
  }
  ,
  {
    title: 'The Good, the Bad and the Ugly',
    year: '1966'
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


// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((student) =>
    { return movie.title === req.params.title }));
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

