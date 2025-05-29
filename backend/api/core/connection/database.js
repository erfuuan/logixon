import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('test', 'test', 'test', {
    host: 'localhost',         
    dialect: 'postgres',
    logging: false,           
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}


export  { sequelize, connect };
