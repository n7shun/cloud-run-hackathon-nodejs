const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  //console.log(req.body);
  
  var arena_width = req.body.arena.dims[0];
  var arena_high = req.body.arena.dims[1];
  var myX = 0;
  var myY = 0;
  var myD = '';
  var state = req.body.arena.state;

  console.log("-----")  
  console.log("rarena_width: " + arena_width);
  console.log("arena_high: " + arena_high);

  // get my location
  for (const property in state) {
    //console.log(`${property}: ${state[property]}`);
    //console.log(`${property}: ${state[property].x}, ${state[property].y} - ${state[property].direction}`);    
    
    if (`${property}` === "https://cloud-run-hackathon-nodejs-cjt3sz6wfq-uc.a.run.app") {
      console.log('***')
      myX = `${state[property].x}`;
      myY = `${state[property].y}`;
      myD = `${state[property].direction}`;

      //console.log(`X: ${state[property].x}`);
      //console.log(`Y: ${state[property].y}`);
      console.log('[x]: ' + myX);
      console.log('[y]: ' + myY);

      console.log(`direction: ${state[property].direction}`);
    }
  }

  // find target
  for (const property in state) {

    if (myD === 'E') {
      if ((myX + 1 == `${state[property].x}`) || (myX + 2 == `${state[property].x}`)) {
        res.send('T');
      }
    }
    if (myD === 'S') {
      if ((myX + 1 == `${state[property].y}`) || (myX + 2 == `${state[property].y}`)) {
        res.send('T');
      }
    }

    if (myD === 'W') {
      if ((myX - 1 == `${state[property].x}`) || (myX - 2 == `${state[property].x}`)) {
        res.send('T');
      }
    }

    if (myD === 'N') {
      if ((myX - 1 == `${state[property].y}`) || (myX - 2 == `${state[property].y}`)) {
        res.send('T');
      }
    }
  }
  
  if (myX == 0) {
    if (myD === 'W') {
      res.send('R');
    }
  }

  if (myY == 0) {
    if (myD === 'N') {
      res.send('R');
    }
  }

  if (myX == arena_width) {
    if (myD === 'E') {
      res.send('R');
    }
  }

  if (myY ==  arena_high) {
    if (myD === 'S') {
      res.send('R');
    }
  }

  res.send('F');


  //console.log("state[0]: " + state[0].x);
  //console.log("state[0].y: " + state[0].y);
  console.log("-----")

  //const moves = ['F', 'T', 'L', 'R'];
  //res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
