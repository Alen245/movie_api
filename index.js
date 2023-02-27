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
let movies = [
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


//listens to http request and sends list of movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//sends introduction
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

//get documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

//Return data about a genre (description) by name/title

app.get('/movies/genre/:genreName', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.genreName === req.params.genreName }));
});

//Returns data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.directorName === req.params.directorName }));
});

//Allows new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Allow users to update their user info (username)
app.put('/users/:Username',(req, res) => {
  res.send("PUT Request Called")});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID	', (req, res) => {
  res.send("Movie was removed")
});


// Deletes a user by ID
app.delete('/users/:Username', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
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

