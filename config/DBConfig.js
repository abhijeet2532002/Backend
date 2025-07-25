import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const DBConfig = mongoose.connection;
DBConfig.on('error',(err)=>{
  console.log(err)
});

DBConfig.on('open',()=>{
  console.log('db connected');
})


export default DBConfig;