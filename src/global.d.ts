import { PrismaClient } from "@prisma/client";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXTAUTH_SECRET: string;
			NEXTAUTH_JWT_SECRET: string;
		}
	}
	namespace globalThis {
		var prismadb: PrismaClient;

	}
}