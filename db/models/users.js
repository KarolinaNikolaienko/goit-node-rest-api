import sequelize from "../connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: { type: DataTypes.STRING },
});

export default User;
