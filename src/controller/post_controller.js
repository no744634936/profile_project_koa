const {Success,Error}=require("../config/api_result_format.js")
const {
    create_profile_failed,
    record_not_exist,
    system_error,
    create_post_failed,
    no_auth_error,
    already_liked,
    not_liked,
    comment_not_exist
}=require("../config/error_info.js")
const postModel=require("../model//post_model.js")



class PostController{
    add_post=async(ctx,next)=>{
        try{
            console.log(ctx.state.user);
            let userId=ctx.state.user._id;
            let name=ctx.state.user.name;
            let avatar=ctx.state.user.avatar;

            let {text}=ctx.request.body;
            let result=await postModel.create_post({userId,text,name,avatar})
            ctx.body=result;
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }
    get_all_posts=async(ctx,next)=>{
        try{
            let result=await postModel.find_all_post();
            if(result){
                ctx.body=result;
            }else{
                ctx.body=new Error(record_not_exist)
            }
        }catch(e){
            console.error(e);
            ctx.body=new Error(create_post_failed)
        }
    }

    get_post_by_id=async(ctx,next)=>{
        try{        
            let id=ctx.params.id;
            let result=await postModel.find_post_by_id(id);
            if(result){
                ctx.body=result;
            }else{
                ctx.body=new Error(record_not_exist)
            }
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }

    //写删除接口得时候要检查是否为本人，如果不是本人就要提示，没有权限。
    delete_post_by_id=async(ctx,next)=>{
        try{
            let id=ctx.params.id;
            let find_result=await postModel.find_post_by_id(id);

            if(find_result.userId.toString()===ctx.state.user._id.toString()){
                let delete_result=await postModel.delete_post_by_id(id)
                ctx.body=new Success(delete_result)
            }else{
                ctx.body=new Error(no_auth_error)
            }
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }


    click_like=async(ctx,next)=>{
        try{
            let post_id=ctx.params.id;
            let post=await postModel.find_post_by_id(post_id);
            let current_user_id=ctx.state.user._id

            //如果like里面有当前用户的id，就不能点赞。
            let flag=post.likes.filter(like=>{like.userId.toString()===current_user_id.toString()});
            if(flag.length>0){
                ctx.body=new Error(already_liked)
                return 
            }
            post.likes.unshift({userId:current_user_id})
            let save_result=await post.save();
            ctx.body=new Success(save_result)
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }

    remove_like=async(ctx,next)=>{
        try{
            let post_id=ctx.params.id;
            let post=await postModel.find_post_by_id(post_id);
            let current_user_id=ctx.state.user._id

            //如果like里面有当前用户的id，就不能点赞。
            let flag=post.likes.filter(like=>{like.userId.toString()===current_user_id.toString()});
            if(flag.length=0){
                ctx.body=new Error(not_liked)
                return 
            }
            let remove_index=post.likes.map(elem=>elem.userId.toString()).indexOf(current_user_id.toString())
            post.likes.splice(remove_index,1)
            let remove_result=await post.save();
            ctx.body=new Success(remove_result)
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }

    write_comment=async(ctx,next)=>{
        try{
            let postId=ctx.params.id;
            let userId=ctx.state.user._id;
            let avatar=ctx.state.user.avatar;
            let {text,name}=ctx.request.body
            let result=await postModel.create_comment({postId,userId,text,name,avatar})
            ctx.body=new Success(result)
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }

    remove_comment=async(ctx,next)=>{
        try{
            let post_id=ctx.params.id;
            let commentId=ctx.params.commentId;
            let post=await postModel.find_post_by_id(post_id);
            let current_user_id=ctx.state.user._id

            console.log(typeof post_id);
            console.log(typeof commentId);
            console.log(post);


            //查看评论是否存在
            let comment=post.comments.find(comment=>comment._id.toString()===commentId);
            if(!comment){
                ctx.body=new Error(comment_not_exist)
                return 
            }

            //查看是否是本人在进行删除操作。
            if(comment.userId.toString()!==current_user_id.toString()){
                ctx.body=new Error(no_auth_error)
                return 
            }

            //找到要删的comment的位置，
            let remove_index=post.comments.map(comment=>comment._id.toString()).indexOf(commentId)

            post.comments.splice(remove_index,1)
            let result=await post.save();
            ctx.body=new Success(result)
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

}

module.exports=new PostController();