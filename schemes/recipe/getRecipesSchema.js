const S = require('fluent-json-schema');

const getRecipesSchema = {
  description: 'Search recipes',
  summary: 'Search the recipe library by keyword or meal type',
  tags: ['Recipe'],
  querystring: S.object()
    .prop('keyword', S.string().description('Keyword to search for'))
    .prop('random', S.boolean().description('Whether the results should be random'))
    .default(false)
    .prop(
      'mealType',
      S.string()
        .enum(['breakfast', 'brunch', 'lunch', 'dinner', 'snack', 'teatime'])
        .default('dinner')
        .description('Meal type to search for')
    )

    .prop(
      'imageSize',
      S.string()
        .enum(['thumbnail', 'small', 'regular', 'large'])
        .default('large')
        .description('Size of the image to return')
    ),
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        from: { type: 'number', description: 'Starting index of results' },
        to: { type: 'number', description: 'Ending index of results' },
        count: { type: 'number', description: 'Total count of results' },
        _links: {
          type: 'object',
          properties: {
            self: {
              type: 'object',
              properties: {
                href: { type: 'string', description: 'Self link href' },
                title: { type: 'string', description: 'Self link title' },
              },
            },
            next: {
              type: 'object',
              properties: {
                href: { type: 'string', description: 'Next link href' },
              },
            },
          },
        },
        hits: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe: {
                type: 'object',
                properties: {
                  uri: { type: 'string', description: 'Recipe URI' },
                  label: { type: 'string', description: 'Recipe name' },
                  image: { type: 'string', description: 'Recipe image URL' },
                  source: { type: 'string', description: 'Recipe source' },
                  url: { type: 'string', description: 'Recipe URL' },
                  yield: { type: 'number', description: 'Recipe yield' },
                  ingredients: {
                    type: 'array',
                    description: 'Ingredients',
                    items: {
                      type: 'object',
                      properties: {
                        text: { type: 'string', description: 'Ingredient text' },
                        quantity: { type: 'number', description: 'Ingredient quantity' },
                        measure: { type: 'string', description: 'Ingredient measure' },
                        food: { type: 'string', description: 'Ingredient food' },
                        foodId: { type: 'string', description: 'Ingredient foodId' },
                      },
                    },
                  },
                  calories: { type: 'number', description: 'Total calories' },
                  totalWeight: { type: 'number', description: 'Total weight' },
                  totalTime: { type: 'number', description: 'Total time' },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getRecipesSchema;
