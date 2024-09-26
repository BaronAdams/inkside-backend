import { Model, DataTypes, Optional, type Sequelize } from 'sequelize';
import { sequelize } from '../config';

export interface IBlackListedTokenAttributes {
    id: string;
    token: string;
}

export interface IAdminCreationAttributes extends Optional<IBlackListedTokenAttributes, 'id'> {}

class BlackListedToken extends Model<IBlackListedTokenAttributes, IAdminCreationAttributes> implements IBlackListedTokenAttributes {
    public id!: string;
    public token!: string;
}

export default function BlackListedTokenModel(sequelize: Sequelize){
    BlackListedToken.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'BlackListedToken',
        tableName:"blacklistedtokens"
    });
    
    return BlackListedToken;
}