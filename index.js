const axios = require('axios');
const cheerio = require('cheerio');

const url = `https://www.indeed.com/jobs?q=web+developer&l=St.+Louis%2C+MO`;

axios.get(url).then((response) => {
  const results = response.data;
  getJobPostingData(results);
}).catch(e => {
  console.log(e);
})

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
  console.log(data);
}
