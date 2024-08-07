const mongoose=require('mongoose')
const dbUri='mongodb+srv://ankitraj7987:Ankit%40600@cluster0.wwfqw5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/codepark'
const clientOptions={
    serverApi:{
    version:'1',
    strict:true,
    deprecationErrors:true
    },
    useNewUrlParser:true,
    useUnifiedTopology:true
};

async function connectDB(){
    try{
    await mongoose.connect(dbUri,clientOptions)
    console.log('connected to MongoDB Atlas')
    }
    catch(error){
        console.log("MongoDB connection error:",error);
        process.exit(1);
    }
}
connectDB();
module.exports=connectDB;
