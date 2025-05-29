import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"


const Invoice = sequelize.define("invoices", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  partnerid: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.DECIMAL(18, 2),
  },
  status: {
    type: DataTypes.STRING(20),
  },
  createdat: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  tableName: "invoices",
});

export default Invoice;
