const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({ extname: '.hbs' }));

const url = `https://www.indeed.com/jobs?q=web+developer&l=St.+Louis%2C+MO`;

app.set("PORT", PORT);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  axios.get(url).then((response) => {
    let data = response.data;
    let jobs = getJobPostingData(data);
    res.render("index", {title:"Scrappy McScrappums", jobs: jobs})

  }).catch(e => {
    console.log(e);
  });
});

app.listen(app.get('PORT'), () => {
    console.log('App started on port ' + PORT);
});

let getJobPostingData = (html) => {
  let data = []
  const $ = cheerio.load(html);
  $('div.jobsearch-SerpJobCard').each((i, elem) => {
    data.push({
      title: $(elem).find('div.title').text().trim(),
      company: $(elem).find('span.company').text().trim(),
      location: $(elem).find('div.location').text().trim(),
      summary: $(elem).find('div.summary').text().trim()
    });
  });
  return data;
}
