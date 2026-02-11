import { Injectable, Logger } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class DatabaseService {
    private logger = new Logger(DatabaseService.name);
    private pool: Pool;

    async onModuleInit() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        this.logger.log('Database connection established');
    }

    async onModuleDestroy() {
        await this.pool.end();
        this.logger.log('Database connection closed');
    }

    getPool(): Pool {
        return this.pool;
    }

    async query<T>(text: string, params?: any[]): Promise<T[]> {
        const client = await this.pool.connect();
        try {
            const result = await client.query(text, params);
            return result.rows;
        } finally {
            client.release();
        }
    }

    async queryOne<T>(text: string, params?: any[]): Promise<T | null> {
        const row = await this.query<T>(text, params);
        return row.length > 0 ? row[0] : null;
    }

    async insert<T>(table: string, data: Record<string, unknown>): Promise<T> {
        const key = Object.keys(data);
        const values = Object.values(data);
        const placeholder = key.map((_, index) => `$${index + 1}`);
        const columns = key.join(", ");

        const text = `INSERT INTO ${table} (${columns}) VALUES (${placeholder.join(", ")}) RETURNING *`;
        const row = await this.query<T>(text, values);
        return row[0];
    }
}