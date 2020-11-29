import { FastifyRequest } from "fastify";
import injectDataLoaders, { DataLoaders } from "./injectDataLoaders";

export default async (request: FastifyRequest) => {
  let context = {};

  context = await injectDataLoaders(request, context);

  return context;
};

export interface Context {
  dataLoaders: DataLoaders;
}
