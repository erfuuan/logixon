import { DataTypes } from 'sequelize';
import { sequelize } from '../connection/database.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rule_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountingdocuments_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountingentries_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accounts_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  invoices_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  partners_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactions_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'report',
  timestamps: false,
});

export default Report;
