import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"

const Account = sequelize.define("accounts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        field: "name",
    },
    bankname: {
        type: DataTypes.STRING(100),
    },
    accountnumber: {
        type: DataTypes.STRING(50),
    },
    isblacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: "accounts",
});

export default Account;