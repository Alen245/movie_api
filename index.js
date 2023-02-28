//set up express into variable app
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();

  app.use(bodyParser.json());

//use express.static
app.use(express.static('public'));

//use common preset
app.use(morgan('common'));

//list of users
let users = [
    {
        id: '1',
        name: 'Jake',
        favoriteMovies:[]
    },
    {
        id: '2',
        name: 'John',
        favoriteMovies:['The_Shawshank_Redemption']
        
    },
    {
        id: '3',
        name: 'Sarah',
        favoriteMovies:[]
    }
]


// list of top movies
let topMovies = [
  {
    title: 'The_Shawshank_Redemption',
    year: '1994',
    director: 'Frank_Darabont',
    genre: 'Drama'
  },
  {
    title: 'The_Godfather',
    year: '1972',
    director:'Francis_Ford_Coppola',
    genre:'Crime'
  },
  {
    title: 'The_Dark_Knight',
    year: '2008',
    director:'Christopher_Nolan',
    genre:'Action'

  }
  ,
  {
    title: 'The_Godfather_Part_II',
    year: '1974',
    director:'Francis_Ford_Coppola',
    genre:'Crime'
  }
  ,
  {
    title: '12_Angry_Men',
    year: '1957',
    director:'Sidney_Lumet',
    genre:'Crime'
  }
  ,
  {
    title: 'Schindler\'s_List',
    year: '1993',
    director:'Steven_Spielberg',
    genre:'Biography'
  }
  ,
  {
    title: 'The_Lord_of_The_Rings:_The_Return_of_the_King',
    year: '2003',
    director:'Peter_Jackson',
    genre:'Action'
  }
  ,
  {
    title: 'Pulp_Fiction',
    year: '1994',
    director:'Quentin_Tarantino',
    genre:'Crime'
  }
  ,
  {
    title: 'The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring',
    year: '2001',
    director:'Peter_Jackson',
    genre:'Action'

  }
  ,
  {
    title: 'The_Good,_the_Bad_and_the_Ugly',
    year: '1966',
    director:'Sergio_Leone',
    genre:'Adventure'
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

//Return data (description, genre, director, image URL, whether featured or not) about a single movie by title to the user;
app.get('/movies/:title', (req, res)=> {
  const {title}=req.params;
  const movie=topMovies.find(movie=>movie.title === title);
  if(movie){
      res.status(201).json(movie);
  }else{
      res.status(400).send('no movie found');
  }
});

//Return data about a genre (description) by name/title
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName}=req.params;
  const genre=topMovies.find(movie=>movie.genre === genreName).genre; 
  if(genre){
      res.status(201).json(genre);
  }else{
      res.status(400).send('no genre found');
  }
});

//Returns data about a director by name
app.get('/movies/director/:directorName',(req,res)=>{
  const{directorName} =req.params;
  const director =topMovies.find(movie=> movie.director===directorName).director;
  if (director){
      res.status(201).json(director);
  }else{
      res.status(400).send('no director found');
  }
});

//Allows new users to register
app.post('/users',(req,res)=>{
  let newUser=req.body;

  if(!newUser.name){
      const message='Missing name in request body';
      res.status(400).send(message);
  }else{
      newUser.id=uuid.v4();
      users.push(newUser);
      res.status(201).send(newUser);
  }
});

//Allow users to update their user info (username)
app.put('/users/:id', (req, res)=>{
  const {id}=req.params;
  const userUpdate=req.body;

  let user=users.find(user=>user.id === id);

  if(user){
      user.name=userUpdate.name;
      res.status(201).json(user);
  }else{
      res.status(400).send('cannot update');
  }
});

//Allow users to add a movie to their list of favorites
app.post('/users/:id/:favoriteMovieTitle', (req,res)=>{
  const{id, favoriteMovieTitle}=req.params;

  let user=users.find(user=>user.id ==id);

  if(user){
      user.favoriteMovies.push(favoriteMovieTitle);
      res.status(201).send('movie added to your favorites list');
      console.log(favoriteMovieTitle);
  }else{
      res.status(400).send('movie not added');
  }
});

//Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:favoriteMovieTitle', (req,res)=>{
  const {id, favoriteMovieTitle} =req.params;
  let user = users.find(user=>user.id ==id);
  if(user){ user.favoriteMovies=user.favoriteMovies.filter(title=>title !== favoriteMovieTitle);
      res.status(201).send('movie was deleted from your favorites');
  }else{
      res.status(400).send('movie was not deleted');
  }
});

//Allows existing users to deregister
app.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  let user = users.find(user => user.id === id );

  if (user) {
    users = users.filter(user => user.id !== req.params.id);
    res.status(201).send('User account ' + req.params.id + ' was deleted.');
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

