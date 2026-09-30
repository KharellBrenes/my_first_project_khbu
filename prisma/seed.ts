import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Busca el tenant; si no existe, lo crea
    let tenant = await prisma.tenant.findFirst({
        where: { name: "Tenant Demo" },
    });
    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: { name: "Tenant Demo" },
        });
    }

    // 2. Busca al usuario por email; si no existe, lo crea
    await prisma.user.upsert({
        where: { email: "admin@demo.com" },
        update: {},
        create: {
            email: "admin@demo.com",
            name: "Admin",
            password: await bcrypt.hash("Admin123*", 10),
            role: "ADMIN",
            tenantId: tenant.id,
        },
    });
}

main().finally(() => prisma.$disconnect());