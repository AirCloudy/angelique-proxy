require('newrelic');
const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const request = require('request');
// const morgan = require('morgan');

app.use('/:songid', express.static(path.join(__dirname, '../')));
app.use(express.json());
// app.use(morgan('dev'));

app.get('/songs/:songid', (req, res) => {
  request(`http://3.134.67.84:5001/songs/${req.params.songid}`, (error, response, body) => {
    if (error) {
      console.log(error);
      return res.status(500).end();
    }
    res.send(JSON.parse(body));
  });
});

app.post('/songs', (req, res) => {
  var options = {
    method: 'POST',
    url: 'http://3.134.67.84:5001/songs',
    json: true,
    body: req.body
  };
  request(options, (error, response, body) => {
    if (error) {
      console.log(error);
      return res.status(500).end();
    }
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
