import ApiService from '../services/ApiService';

export default {
  fetchConfig: ApiService.fetchConfig,
  getConfigValue: ApiService.getConfigValue,
  getAuthorizationCode: ApiService.getAuthorizationCode,
  authenticateWithGitHub: ApiService.authenticateWithGitHub,
  fetchUserData: ApiService.fetchUserData,
  createOrUpdateSession: ApiService.createOrUpdateSession,
  goToAnotherView: ApiService.goToAnotherView,
};
