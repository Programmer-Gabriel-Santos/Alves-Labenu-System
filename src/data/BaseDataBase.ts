import knex, { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

class BaseDataBase {
    private connection: Knex | null = null;

    protected getConnection() {

        if (!this.connection) {

            this.connection = knex({
                client: 'mysql',
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_SCHEMA,
                    port: 3306,
                    multipleStatements: true
                }
            })         
        }

        return this.connection
    }
}

export default BaseDataBase