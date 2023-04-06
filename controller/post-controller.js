
import Post from '../model/post.js';

export const createPost= async(request,response)=>{
    try{
        const post=await new Post(request.body);
        console.log(post)
        post.save();

        return response.status(200).json({msg:'Post saved Successfully'});

    }catch(err){
        return response.status(500).json(err);
    }
}

export const getAllPosts =async(request,response)=>{
    let category=request.query.category;
    let posts;
    try{
        if(category){
            posts=await Post.find({categories:category})
        }
        else { posts=await Post.find({});}

        return response.status(200).json(posts);
    }catch(err){
        return response.status(500).json({msg:err.message});
    }
}

export const getPost=async(request,response)=>{

    try{
        const post=await Post.findById(request.params.id);
        // console.log(request.params)
        return response.status(200).json(post);
    }catch(err){
        return response.status(500).json({msg:err.message});
    }
}

export const updatePost=async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id);
        console.log(post)

        if(!post){
            return response.status(404).json({msg:'post not found'});
        }

        await Post.findByIdAndUpdate(request.params.id,{$set:request.body})  //$set , $addToSet

        return response.status(200).json({msg:'post was updated successfully'})
    }catch(err){
        return response.status(500).json({msg:err.message});
    }
}

export const deletePost=async(request,response)=>{
    try{
        // const post=Post.findById(request.params.id);
        // console.log(post)

        // if(!post){
        //     return response.status(404).json({msg:'post not found'});
        // }

        // await post.delete()
        await Post.findByIdAndDelete(request.params.id)

        return response.status(200).json({msg:"post deleted successfully"});
    }catch(err){
        return response.status(500).json({error:err.message});
    }
}