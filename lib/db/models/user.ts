import sequelize from '../config'
import { DataTypes, Model, Optional } from 'sequelize';

export interface IUserAttributes {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profileImg?: string;
    followers: string[];
    followingUsers: string[];
    followingCategories: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public id!: string;
    public username!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public profileImg!: string;
    public followers!: string[];
    public followingUsers!: string[];
    public followingCategories!: string[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    followers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    followingUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    followingCategories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    profileImg:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;