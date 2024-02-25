import fastify from 'fastify';

const server = fastify();

server.get('/ping', async function () {
  return { pong: true };
});

async function main() {
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on port 3000');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
