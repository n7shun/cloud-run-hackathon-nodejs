const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body);
  
  var arena_width = req.body.arena.dims[0];
  var arena_high = req.body.arena.dims[1];
  var state = req.body.arena.state;

  console.log("-----")  
  console.log("rarena_width: " + arena_width);
  console.log("rarena_width: " + arena_high);
  console.log("state: " + state.length);
  console.log("state[0].x: " + state[0].x);
  console.log("state[0].y: " + state[0].y);
  console.log("-----")

  const moves = ['F', 'T', 'L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
