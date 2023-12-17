const S = require('fluent-json-schema');

const recipeSearchSchema = {
  querystring: S.object()
    .prop('keyword', S.string().minLength(1).maxLength(100).required())
    .prop('fromNumResults', S.integer().minimum(0).required())
    .prop('toNumResults', S.integer().required())
    .valueOf(),
};

module.exports = recipeSearchSchema;