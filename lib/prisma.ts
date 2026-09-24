import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

if (!process.env.SSL_CERT_CONTENT) {
  throw new Error("SSL_CERT_CONTENT is not set in environment variables");
}


const sslCertContent = process.env.SSL_CERT_CONTENT.replace(/\\n/g, "\n");

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
  ssl: {
    ca: sslCertContent,
    rejectUnauthorized: true,
  },
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;