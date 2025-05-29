import { fa } from "@faker-js/faker";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "test", "test", {
    host: "localhost",
    // host: "185.53.140.24",
    dialect: "postgres",
    ssl: false,
    logging: false,
});

export default sequelize;
