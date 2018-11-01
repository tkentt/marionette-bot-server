import { Prisma } from 'prisma-binding';
import { PRISMA_ENDPOINT, PRISMA_SECRET } from './config';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_SECRET,
  debug: false
});

export default prisma;