import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js"

const Partner = sequelize.define("partners", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    field: "name",
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(100),
  },
  balance: {
    type: DataTypes.DECIMAL(18, 2),
  },
  createdat: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  tableName: "partners",
});

export default Partner;
