const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/github-api', createProxyMiddleware({
  target: 'https://api.github.com',
  changeOrigin: true,
  pathRewrite: { '^/github-api': '' },
}));

app.post('/get_access_token', async (req, res) => {
  try {
    let response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        code: req.body.code,
      }),
    });

    let data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get_user_data', async (req, res) => {
  try {
    let authorizationHeader = req.headers.authorization;

    let githubUserDataResponse  = await fetch("https://api.github.com/user", {
      method: 'GET',
      headers: {
        'Authorization': `${authorizationHeader}`,
        'Accept': 'application/json',
      },
    });

     if (!githubUserDataResponse.ok) {
      throw new Error(`Failed to fetch GitHub user data. Status: ${githubUserDataResponse.status}`);
    }

    let githubUserData = await githubUserDataResponse.json();

    res.json(githubUserData);
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
