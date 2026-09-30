import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    const tenant = await prisma.tenant.create({ data: { name: "Tenant Demo" } });
    await prisma.user.create({
        data: {
            email: "admin@demo.com",
            name: "Admin",
            password: await bcrypt.hash("Admin123*", 10),
            role: "ADMIN",
            tenantId: tenant.id,
        },
    });
}

main().finally(() => prisma.$disconnect());