import { Sequelize } from 'sequelize'

const database_name = process.env.NODE_ENV === "production" ? process.env.DATABASE_NAME : "inkside"
const hostname = process.env.NODE_ENV === "production" ? process.env.DATABASE_HOST : "localhost"
const username = process.env.NODE_ENV === "production" ? process.env.DATABASE_USER : "root"
const password = process.env.NODE_ENV === "production" ? process.env.DATABASE_PASSWORD : "root"

const sequelize = new Sequelize(
    database_name,
    username,
    password,
    {
        host: hostname,
        dialect: 'mysql'
    }
)

const connect = async () => {
    try {
      await sequelize.authenticate();
      console.log("DATABASE CONNECTION SUCCESSFUL");
  
      await sequelize.sync({ alter: true });
      console.log("sync successful");
    } catch (error) {
      console.log(error);
    }
  }

connect();
  
export default sequelize;