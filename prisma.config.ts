import { defineConfig } from "@prisma/config";

export default defineConfig({
  	schema: "./prisma/schema.prisma",
  	datasource: {
    	url: process.env.DATABASE_URL || "postgresql://postgres:postgres123@localhost:5432/tinkerkit?schema=public",
 	},
});