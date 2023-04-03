require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
const orgUrls = [];
const shrtUrls =[];

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url
  const index = orgUrls.indexOf(url)

  if(!url.includes('https://') && !url.includes('http://')) {
    return res.json({ error: 'invalid url' })
  }
  
  if(index < 0) {
    id = shrtUrls.length
    orgUrls.push(url)
    shrtUrls.push(id)

    return res.json({
      original_url: url,
      short_url: id
    })
  }
});

app.get('/api/shorturl/:id', function(req, res) {
  const shrturl = parseInt(req.params.id)
  const index = shrtUrls.indexOf(shrturl)

  if (index < 0)
    return res.json({
      "error": "No short URL found for the given input"
    })

  res.redirect(orgUrls[index])
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
