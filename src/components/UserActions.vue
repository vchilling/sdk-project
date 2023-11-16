<template>
  <div>
    <div>
        <CustomButton @click="getAuthorizationCode">Authenticate with GitHub</CustomButton>
    </div>
  </div>
</template>

<script>
import SDK from '../sdk';
import CustomButton from './CustomButton.vue';

export default {
  components: {
        CustomButton,
  },
  methods: {
    getAuthorizationCode() {
      SDK.getAuthorizationCode()
        .then(() => {
          console.log('Redirecting to Github for authorization');
        })
        .catch(error => {
          console.error('Redirecting for authorization failed with error', error);
        });
    }, 
  },
};
</script>
