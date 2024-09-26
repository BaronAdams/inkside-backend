import { sequelize } from "../config";
import BlackListedTokenModel from "../models/blt";
import CommentModel from "../models/comment";
import PostModel from "../models/post";
import UserModel from "../models/user";

export const User = UserModel(sequelize)
export const Post = PostModel(sequelize)
export const BlackListedToken = BlackListedTokenModel(sequelize)
export const Comment = CommentModel(sequelize)

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Comment, { foreignKey: 'authorId' });
Comment.belongsTo(User, { foreignKey: 'authorId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export const connect = async () => {
    try {
      await sequelize.authenticate();
      console.log("DATABASE CONNECTION SUCCESSFUL");
  
      await sequelize.sync({alter:true});
      console.log("sync successful");
    } catch (error) {
      console.log(error);
    }
}
