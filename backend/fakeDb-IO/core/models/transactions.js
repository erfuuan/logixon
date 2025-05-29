import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"

const Transaction = sequelize.define("transactions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(10),
  },
  amount: {
    type: DataTypes.DECIMAL(18, 2),
  },
  accountid: {
    type: DataTypes.INTEGER,
  },
  partnerid: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING(255),
  },
  createdat: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  tableName: "transactions",
});

export default Transaction;
