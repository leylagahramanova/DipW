import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;
const Maintenances = db.define('maintenances', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Date:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },  
    SIM:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    Found_problems: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    How_to_fix: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    }
}, {
    freezeTableName: true
});
Users.hasMany(Maintenances);
Maintenances.belongsTo(Users, {foreignKey:'userId'});
export default Maintenances;