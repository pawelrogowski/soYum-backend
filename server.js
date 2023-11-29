require('dotenv').config();
const connectDb = require('./db/connectDb.js');
const userRoutes = require('./routes/userRoutes');
const { PORT, SECRET, HOSTNAME } = require('./envConfig');
const logger = require('./logs/logsConfig.js');

const fastify = require('fastify')({
  logger: logger,
});

fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.log.on('error', err => {
  console.error('Error while writing to log file:', err);
});

fastify.register(require('@fastify/jwt'), { secret: SECRET });

fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'SoYummy API',
      version: '0.1.0',
    },
    servers: [{ url: `https://${HOSTNAME}` }, { url: 'http://localhost:' + PORT }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  swagger: {
    openapi: '3.0.0',
  },
});
fastify.register(userRoutes, { prefix: '/api/user' });

fastify.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: `Sorry, this route does not exist, to see all available routes visit ${HOSTNAME}:${PORT}/docs`,
  });
});

fastify.setErrorHandler(function (error, request, reply) {
  if (error.name === 'ValidationError') {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
    });
  } else {
    reply.send(error);
  }
});

async function startServer() {
  try {
    await connectDb();
    await fastify.listen({ port: PORT });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
