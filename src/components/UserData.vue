<template>
  <div>
    <h1>User Data</h1>
    <div v-if="userData">

      <div class="userInfoContainer">
        <img class="profilePicture" :src="userData.avatar_url"  alt="User Profile">
        <div class="userDetails">
          <p><span>User name: </span>{{ userData.login }}</p>
          <p><span>User type: </span>{{ userData.type }}</p>
          <p><span>User profile: </span>{{ userData.html_url }}</p>
          <p><span>User url: </span>{{ userData.url }}</p>
          <p><span>Public repos url: </span>{{ userData.repos_url }}</p>
          <p><span>Public repos number: </span>{{ userData.public_repos }}</p>
          <p><span>Followers: </span>{{ userData.followers }}</p>
          <p><span>Following: </span>{{ userData.following }}</p>
        </div>
        <div class="additionalInfo">
          <p><span>User created at: </span>{{ formatDate(userData.created_at) }}</p>
          <p><span>User updated at: </span>{{ formatDate(userData.updated_at) }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SDK from '../sdk';

export default {
  data() {
    return {
        userData: null,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
     fetchUserData() {
      SDK.fetchUserData()
        .then(response => {
          console.log(response);
          this.userData = response;
        })
        .catch(error => {
          console.error('Fetched User Data failed with error', error);
        });
    }, 
    formatDate(dateString) {
      let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      let formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
      return formattedDate;
    }
  }, 
};
</script>

<style scoped> 
.userInfoContainer {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.profilePicture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.userDetails {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.additionalInfo {
  color: #555;
}
</style>

