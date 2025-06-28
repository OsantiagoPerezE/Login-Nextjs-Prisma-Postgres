import {PrismaClient} from '../generated/prisma';

const globalForPrisma = global;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;