import { DataTypes, Model, Optional, type Sequelize } from 'sequelize';
// fn("uuid_generate_v4")

export interface IUserAttributes {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profileImg?: string;
    address?:string;
    followers?: string[];
    followingUsers?: string;
    followingCategories?: string;
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
    public address!: string;
    public followers!: string[];
    public followingUsers!: string;
    public followingCategories!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function UserModel(sequelize: Sequelize){
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
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
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue:[],
            // get: function(){
            //     const value = this.getDataValue("followers")
            //     return value ? value : [];
            // },
            // set:function(value){
            //     return this.setDataValue("followers",JSON.stringify(value))
            // }
            // defaultValue: []
        },
        followingUsers: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue:[],
            // get: function(){
            //     const value = this.getDataValue("followingUsers")
            //     return value ? value : [];
            // },
            // set:function(value){
            //     return this.setDataValue("followingUsers",JSON.stringify(value))
            // }
            // defaultValue: []
        },
        followingCategories: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[],
            // get: function(){
            //     const value = this.getDataValue("followingCategories")
            //     return value ? value : [];
            // },
            // set:function(value){
            //     return this.setDataValue("followingCategories",JSON.stringify(value))
            // }
            // defaultValue: []
        },
        profileImg:{
            type: DataTypes.STRING,
            allowNull:true
        },
        address:{
            type: DataTypes.STRING,
            allowNull:true
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });
    
    return User;
}