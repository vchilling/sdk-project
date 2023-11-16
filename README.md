# sdk-project

## Project setup
```
npm install
```

### Getting Started
```
node server.js

npm run serve
```

#### Prerequisites
```
file: config/congif.json

```
Update the config file by adding app client clientId & authToken

#### Endpoints

* Application: 

Open in your browser
URL: http://localhost:8080/

After authenticate a user via an GitHub API token, 
you can see fetched user data returned from GitHub API.

* Get access token: 

URL: http://localhost:3000/get_access_token
Type: POST 
<p>
Request Parameters: <br>
client_id: application client id,<br>
client_secret: application client secret,<br>
code: generated authorization code,<br>
</p>


* Get user data: 

URL: http://localhost:3000/get_user_data
Type: GET 
<p>headers: <br>
'Authorization': 'Bearer generated access token',<br>
</p>
