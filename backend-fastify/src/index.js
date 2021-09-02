import dotenv from "dotenv";
import Fastify from "fastify";
// Local Files
import { usersRoutes } from "./routes/users.js";
import { authRoutes } from "./routes/auth.js";

dotenv.config();
const PORT = process.env.PORT;

export const fastify = await Fastify({ logger: true });

fastify.get("/", (_, res) => {
  res.send(true);
});
fastify.register(usersRoutes, { prefix: "/users" });
fastify.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    fastify.listen(PORT, () => {
      console.log("Listening on PORT: " + PORT);
    });
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
