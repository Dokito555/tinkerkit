// server/db/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// Pakai connection string dari .env
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({ adapter });

export default prisma;