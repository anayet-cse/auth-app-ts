import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../infrastructure/database';

interface AuthAttributes {
  id: number;
  email: string;
  password: string;
  auth_token?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthCreationAttributes extends Optional<AuthAttributes, 'id' | 'auth_token' | 'createdAt' | 'updatedAt'> {}

class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public auth_token?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'auths',
  }
);

export default Auth;
