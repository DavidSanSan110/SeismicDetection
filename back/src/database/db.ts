import pg from 'pg';

export class PostgresSingleton {
  
    static instance: PostgresSingleton;
    client: pg.Client | null = null;

    static getInstance(): PostgresSingleton {
        if (!PostgresSingleton.instance) {
            PostgresSingleton.instance = new PostgresSingleton();
        }
        return PostgresSingleton.instance;
    }

    constructor() {
        this._connect();
    }

    async _connect() {

        let host = process.env.PG_HOST;
        let user = process.env.PG_USER;
        let password = process.env.PG_PASSWORD;
        let database = process.env.PG_DATABASE;
        let port = parseInt(process.env.PG_PORT || '5432');

        this.client = new pg.Client({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port
        });
        await this.client.connect();
        console.log("Connected to Postgres");
    }
}