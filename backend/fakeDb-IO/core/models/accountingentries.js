import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"


const AccountingEntry = sequelize.define("accountingentries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  documentid: {
    type: DataTypes.INTEGER,
  },
  accountid: {
    type: DataTypes.INTEGER,
  },
  debit: {
    type: DataTypes.DECIMAL(18, 2),
  },
  credit: {
    type: DataTypes.DECIMAL(18, 2),
  },
  description: {
    type: DataTypes.STRING(255),
  },
}, {
  timestamps: false,
  tableName: "accountingentries",
});

export default AccountingEntry;
