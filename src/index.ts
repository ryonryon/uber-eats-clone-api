import Fastify from "fastify";
import { createConnection } from "typeorm";
import apollo from "./graphql";

import "reflect-metadata";

const fastify = Fastify();
fastify.register(apollo.createHandler());

(async () => {
  await createConnection();

  try {
    await fastify.listen({ port: 3000 });

    console.log(`🚀 Server is ready at http://localhost:3000/graphql`);
  } catch (err) {
    fastify.log.error(err);

    process.exit(1);
  }
})();
