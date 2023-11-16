import store from '../store';
import router from '@/router'; 

export default {
  async fetchConfig() {
    try {
      let response = await fetch('/config/config.json'); 
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching configuration:', error.message);
      throw error;
    }
  },
  async getConfigValue(key) {
    try {
      let config = await this.fetchConfig();
      let value = config[key];

      if (!config || !value) {
        throw new Error('Config value not found in the config file.');
      }
      return value;
    } catch (error) {
      console.error('Error reading or parsing the config file:', error.message);
      throw error;
    }
  },
  async getAuthorizationCode() {
    let clientId = await this.getConfigValue('clientId');
    let redirectUri = 'http://localhost:8080/user-authorization/';
    let redirectUriencoded = encodeURIComponent(redirectUri);
    let state = await this.getConfigValue('state');
    let gitHubOauthAuthorizeUrl = await this.getConfigValue('gitHubOauthAuthorizeUrl');
    let githubAuthUrl = `${gitHubOauthAuthorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUriencoded}&scope=repo&state=${state}`;

    window.location.href = githubAuthUrl;
  },
  async authenticateWithGitHub(authorizationCode) {
    try {
      let clientId = await this.getConfigValue('clientId');
      let clientSecret = await this.getConfigValue('authToken');
      let requestData = {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
      };

      let response = await fetch(('http://localhost:3000/get_access_token'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        },
        body: JSON.stringify(requestData),
        mode: 'cors', 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      
      if (data.error) {
        throw new Error(`Error: ${data.error}`);
      } 

      let accessToken = data.access_token;

      this.createOrUpdateSession(true, accessToken, Date.now() + 10 * 60 * 1000); 

      this.goToAnotherView('/user-data');
      return true;
    } catch (error) {
      console.error('Error authenticating with GitHub:', error.message);
    }
  },
  async fetchUserData() {        
    let accessToken = store.state.token;
    let response = await fetch('http://localhost:3000/get_user_data', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      mode: 'cors', 
    });

    let userData = await response.json();
    
    if (userData.error) {
      throw new Error(`Error: ${response.error}`);
    } 
    return userData;
  },
  goToAnotherView(viewPath) {
    router.push(viewPath);
  },
  createOrUpdateSession(isAuthenticated, token, expiration) {
    store.commit('setSession', { isAuthenticated, token, expiration });
  }
};
