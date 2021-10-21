/* eslint-disable camelcase */
import Sequelize from "sequelize";
import { sequelize } from "../database/connect";

const userModel = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING(255),
    },
    last_name: {
      type: Sequelize.STRING(255),
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    phone_number: { type: Sequelize.INTEGER },
    introduction: { type: Sequelize.TEXT },
    experience: { type: Sequelize.FLOAT },
    achievements: { type: Sequelize.TEXT },
  },
  {
    timestamps: false,
  }
);

export default userModel;
