import { Prisma } from 'prisma-binding';
// import { PRISMA_SECRET } from './config';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  // secret: PRISMA_SECRET,
  debug: false
});

export default prisma;