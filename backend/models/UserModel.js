import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Users = db.define('users', {
    uuid: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: true
        }
    },
    Surename: {
        type: DataTypes.STRING,
        validate: {
            notEmpty:true
        }
    },   Firstname: {
        type: DataTypes.STRING,
        validate: {
            notEmpty:true
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    phone:{
        type: DataTypes.INTEGER,
        validate: {
            notEmpty:true
        }
    },
    post: {
        type: DataTypes.STRING,
        validate: {
            notEmpty:true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty:true
        }
    }
   

}, {
    freezeTableName: true
});
export default Users;