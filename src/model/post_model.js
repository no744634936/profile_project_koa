const Post=require("../db/post.js");
const { context } = require("../app.js");

class PostModel{
    create_post=async({userId,text,name,avatar})=>{
        let new_post=new Post({
            userId,
            text,
            name,
            avatar,
        })
        let response =await new_post.save();
        return response
    }

    find_all_post=async()=>{
        let result=await Post.find({}).sort({date:-1}); //逆序排列
        return result
    }

    find_post_by_id=async(id)=>{
        let result= await Post.findOne({_id:id})
        return result;
    }


    delete_post_by_id=async(postId)=>{
        let post= await Post.findOne({_id:postId})
        let result=await post.remove();
        return result;
    }

    create_comment=async({postId,userId,text,name,avatar})=>{
        let post=await this.find_post_by_id(postId);
        let new_comment={
            userId,
            text,
            name,
            avatar,
        }
        post.comments.unshift(new_comment);
        let result=await post.save()
        return result;
    }
}

module.exports=new PostModel();