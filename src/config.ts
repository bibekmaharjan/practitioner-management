import Config from './domain/misc/Config';

const config: Config = {
  endpoints: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    practitioners: '/practitioners',
    editPractitioners: '/practitioners/{id}',
    deletePractitioners: '/practitioners/{id}',
    practitionerDetails: '/practitioners/{id}',
  },
};

export default config;
