import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"


const AccountingDocument = sequelize.define("accountingdocuments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    docnumber: {
        type: DataTypes.STRING(20),
    },
    description: {
        type: DataTypes.STRING(255),
    },
    createdat: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: false,
    tableName: "accountingdocuments",
});

export default AccountingDocument;
