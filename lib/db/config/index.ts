import { Sequelize } from 'sequelize'

const database_name = process.env.NODE_ENV === "production" ? process.env.DATABASE_NAME : "inkside"
const hostname = process.env.NODE_ENV === "production" ? process.env.DATABASE_HOST : "localhost"
const username = process.env.NODE_ENV === "production" ? process.env.DATABASE_USER : "postgres"
const password = process.env.NODE_ENV === "production" ? process.env.DATABASE_PASSWORD : "root"

export const sequelize = new Sequelize(
    database_name,
    username,
    password,
    {
        host: hostname,
        // dialectModule:require("mysql2"),
        // dialect: 'mysql',
        dialect: 'postgres',
        benchmark:true,
        port: 5432,
        // port: 3306,
    }
)


  
