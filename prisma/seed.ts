// To keep it simple I will use a single seed file. It might make sense to have multiple seed files in a real project.

import { PrismaClient } from '@prisma/client';

// This might help to keep the seed files small and focused on a single task.
const prisma = new PrismaClient();
async function main() {
  const alreadySignedUpUser = await prisma.user.upsert({
    where: { email: 'test@experial.ai' },
    update: {},
    create: {
      email: 'test@experial.ai',
      id: 'cloh64bqh0000356q2139ephu',
    },
  });
  console.log('User created: ', alreadySignedUpUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
