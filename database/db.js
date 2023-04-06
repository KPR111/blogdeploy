import mongoose from 'mongoose'



const Connection= async(URL)=>{
    try{

        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log('db connected successfully')

    }catch(err){
         console.log('error while connecting whith db check here -->', err)
    }
}


export default Connection