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
    allowNull: true,
  },
  accountingdocuments_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accountingentries_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accounts_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  invoices_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  partners_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  transactions_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
