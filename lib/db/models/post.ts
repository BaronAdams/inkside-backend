import { DataTypes, Model, Optional, type Sequelize } from 'sequelize';
import User from './user';

export interface IPostAttributes{
    id: string;
    title?: string;
    isDraft?: boolean;
    content?: string;
    categories?: string;
    authorId: string;
    coverPic?: string;
    views?: number;
    likes?: string;
    shares?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostCreationAttributes extends Optional<IPostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<IPostAttributes, IPostCreationAttributes> implements IPostAttributes {
    public id!: string;
    public title!: string;
    public isDraft: boolean;
    public content!: string;
    public categories: string;
    public authorId!: string;
    public coverPic!: string;
    public views!: number;
    public likes: string;
    public shares!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function PostModel(sequelize: Sequelize){
    Post.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isRequiredWhenNotDraft(this: Post) {
                    if (!this.isDraft && !this.title) {
                        throw new Error('Title is required when post is not a draft.');
                    }
                },
            },
        },
        isDraft: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isRequiredWhenNotDraft(this: Post) {
                    if (!this.isDraft && !this.content) {
                        throw new Error('Content is required when post is not a draft.');
                    }
                },
            },
        },
        categories: {
            type: DataTypes.JSON,
            validate: {
                hasValidCategories(this: Post, categories: string) {
                    if (!this.isDraft && (!categories || categories.length === 0)) {
                        throw new Error('At least one category is required when post is not a draft.');
                    }
                },
            },
            get: function(){
                const value = this.getDataValue("categories")
                return value ? JSON.parse(value) : [];
            },
            set:function(value){
                return this.setDataValue("categories",JSON.stringify(value))
            }
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        coverPic: {
            type: DataTypes.STRING,
            allowNull:true
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        likes: {
            type: DataTypes.JSON,
            allowNull:true,
            get: function(){
                const value = this.getDataValue("likes")
                return value ? JSON.parse(value) : [];
            },
            set:function(value){
                return this.setDataValue("likes",JSON.stringify(value))
            }
        },
        shares: {
            type: DataTypes.JSON,
            allowNull:true,
            get: function(){
                const value = this.getDataValue("shares")
                return value ? JSON.parse(value) : [];
            },
            set:function(value){
                return this.setDataValue("shares",JSON.stringify(value))
            }
        }
    }, {
        sequelize,
        modelName: 'Post',
        timestamps: true,
        tableName: "posts"
    });
    
    return Post;
}

