import { Sequelize } from "sequelize";
 
const db = new Sequelize('dbauth_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    user: 'root',
    password: 'password',
});
 
export default db; 