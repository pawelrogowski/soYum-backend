const S = require('fluent-json-schema');

const registerSchema = {
  description: 'Register a new user',
  tags: ['User'],
  body: S.object()
    .prop('name', S.string().minLength(2).maxLength(30).pattern('John Doe').required())
    .prop('email', S.string().format('email').required())
    .prop('password', S.string().minLength(8).pattern('pasSword1!').required())
    .valueOf(),
  response: {
    200: S.object()
      .prop('message', S.string())
      .prop(
        'user',
        S.object()
          .prop('name', S.string())
          .prop('email', S.string())
          .prop('avatarUrl', S.string())
          .prop('isEmailConfirmed', S.boolean())
      )
      .prop('tokens', S.object().prop('accessToken', S.string()).prop('refreshToken', S.string()))
      .valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = registerSchema;
