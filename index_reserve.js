//set up express into variable app
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');
  
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
    genre:'Drama',
   
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
switch (genre) {
  case "Drama":
 res.send("Drama: A genre that focuses on realistic characters, situations, and emotions. Dramas often deal with serious themes and explore human relationships, conflicts, and experiences. They may feature strong performances from actors and tend to have a more serious tone than other genres.")
  break;
    case "Crime":
 res.send("Crime: A genre that explores criminal activity, usually through the eyes of law enforcement officials or criminals themselves. Crime films may involve heists, murders, or other illegal activities, and often include suspenseful or action-packed scenes. They may also focus on the ethical dilemmas faced by law enforcement officials or the criminals themselves.")
  break;
    case "Biography":
 res.send("Biography: A genre that portrays the life story of a real person, often a historical figure or a public figure. Biographical films may explore their subject's personal life, achievements, and struggles, and may include significant events or moments from their life. They often incorporate archival footage or photos and may feature a strong central performance.")
  break;
    case "Action":
 res.send("Action: A genre that typically features fast-paced, high-energy scenes of physical activity or combat. Action films may include stunts, car chases, or martial arts fights, and often have a high degree of visual effects and/or special effects. They may also incorporate elements of other genres, such as science fiction or adventure.")
  break;
    case "Adventure":
 res.send("Adventure: A genre that typically features a journey or quest, often involving a heroic protagonist who faces challenges or obstacles along the way. Adventure films may take place in exotic or fantastical settings, and often involve elements of danger, suspense, or exploration. They may also incorporate elements of other genres, such as action or fantasy.")
  break;
  default:
  res.status(400).send("Genre does not exist.")
}
});






//Returns data about a director by name
app.get('/movies/director/:directorName',(req,res)=>{
  const{directorName} =req.params;
  const director =topMovies.find(movie=> movie.director===directorName).director;
 switch(director) {
  case "Frank_Darabont":
    res.send("A director known for his adaptations of Stephen King's novels, including 'The Shawshank Redemption' and 'The Green Mile.' He is also known for his work on the TV series 'The Walking Dead' and 'The Pacific.'")
    break;
     case "Francis_Ford_Coppola":
    res.send("A director and producer known for his work on classics such as 'The Godfather' trilogy and 'Apocalypse Now.' He is also known for his work in the independent film industry and for founding the production company Zoetrope Studios.")
    break;
     case "Christopher_Nolan":
    res.send("A director known for his complex narratives and visual style in films such as 'Inception,' 'The Dark Knight' trilogy, and 'Interstellar.' He is also known for his use of practical effects and non-linear storytelling.")
    break;
     case "Sidney_Lumet":
    res.send("A director known for his ability to elicit strong performances from actors in films such as '12 Angry Men,' 'Dog Day Afternoon,' and 'Network.' He is also known for his realistic portrayal of social issues and his use of multiple cameras to capture performances.")
    break;
     case "Steven_Spielberg":
    res.send("A director known for his blockbuster films such as 'Jaws,' 'E.T. the Extra-Terrestrial,' and 'Jurassic Park.' He is also known for his work on more serious dramas such as 'Schindler's List' and 'Saving Private Ryan.'")
    break;
     case "Peter_Jackson":
    res.send("A director known for his adaptations of J.R.R. Tolkien's 'The Lord of the Rings' trilogy and 'The Hobbit' trilogy. He is also known for his use of special effects and his work on films such as 'King Kong' and 'Heavenly Creatures.'")
    break;
     case "Quentin_Tarantino":
    res.send("A director known for his nonlinear storytelling, witty dialogue, and use of violence in films such as 'Pulp Fiction,' 'Kill Bill,' and 'Django Unchained.' He is also known for his love of genre films and his eclectic musical choices.")
    break;
     case "Sergio_Leone":
    res.send("An Italian director known for his iconic Spaghetti Westerns such as 'The Good, the Bad and the Ugly' and 'Once Upon a Time in the West.' He is also known for his use of close-ups and extreme long shots to convey emotion and his collaborations with composer Ennio Morricone.")
    break;
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

