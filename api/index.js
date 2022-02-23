import http from 'http';
import url from 'url';
import axios from 'axios';
import chalk from 'chalk';
import * as config from './config.js';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

const decodeParams = (searchParams) =>
  Array.from(searchParams.keys()).reduce(
    (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
    {}
  );

const server = http.createServer((req, res) => {
  const requestURL = url.parse(req.url);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  const { search, location, country = 'ca' } = decodedParams;

  const targetURL = `http://api.adzuna.com/v1/api/jobs/${country.toLowerCase()}/search/1?app_id=${
    config.APP_ID
  }&app_key=${
    config.API_KEY
  }&results_per_page=20&what=${search}&where=${location}&content-type=application/json`;

  if (req.method === 'GET') {
    console.log(chalk.green('Proxy GET request to : ${targetURL}'));
    axios
      .get(targetURL)
      .then((response) => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(chalk.red(error));
        res.writeHead(500, headers);
        res.end(JSON.stringify(error));
      });
  }
});

server.listen(3000, () => {
  console.log(chalk.green('Server listening'));
});
