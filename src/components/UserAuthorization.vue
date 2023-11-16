<template>
  <div>
    <h1>Authorization...</h1>
  </div>
</template>

<script>
import SDK from '../sdk';

export default {
  mounted() {
    const authorizationCode = this.$route.query.code;
    if (authorizationCode) {
        this.authenticate(authorizationCode);
    } else {
      console.error('Authorization code not found in the URL.');
    }
  },
  methods: {
     authenticate(authorizationCode) {
      SDK.authenticateWithGitHub(authorizationCode)
        .then(() => {
          console.log('Authentication successful');
        })
        .catch(error => {
          console.error('Authentication failed', error);
        });
    },
  }, 
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
};
</script>
