import * as mysql from "mysql";

/**
 * MySQLConnector
 */
export class MySQLConnector {
    connection: mysql.IConnection;

    constructor( host?: string, user?: string, password?: string, database?: string ) {
        this.connection = this.createConnection( host, user, password, database );
    }

    private createConnection( host?: string, user?: string, password?: string, database?: string ): mysql.IConnection {
        return mysql.createConnection( {
            host: ( host || process.env.DB_HOST || "localhost" ),
            user: ( user || process.env.DB_USER || "user" ),
            password: ( password || process.env.DB_PASSWORD || "password" ),
            database: ( database || process.env.DB_DATABASE || "test" )
        } );
    }
}

export default MySQLConnector;