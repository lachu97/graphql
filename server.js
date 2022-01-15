const express=require('express');
const {ApolloServer,gql}= require('apollo-server-express')
const Model=require('./Model.model.js')
const mongo=require('mongoose')
//Type Definitions for graphql
const typedef=gql`
type Model{
    id:ID,
    title:String,
    description:String
}
input Modelinput{
    title:String,
    description:String
}
type Mutation{
    createModel(modelinput:Modelinput) :Model
    updateModel(id:String,Modelinput:Modelinput):Model
}
type Query{
    hello:String
    getmodels:[Model]
    getpostbyid(id:String) :Model
    deletepost(id:String) :String
}`
//Resolvers for GraphQL Queries
const resolvers={
    Query:{
        hello:()=>{
            return "hello graphql server"
        },
        getmodels:async ()=>{
             const model=await Model.find()
             return model  
        },
        getpostbyid:async (_a,{id},_p,_i)=>{
            return await Model.findById(id)
        },
        deletepost:async (_a,{id},_p,_i)=>{
            await Model.findByIdAndDelete(id)
            return 'Ok Item Deleted with ID=${id}'
        }
    },
    Mutation:{
        createModel:async (parent,args,ctx,info)=>{
            const {title,description}=args.modelinput
            console.log(args)
            console.log(parent)
            console.log(ctx)
            console.log(info)
            console.log(title)
            console.log(description)
            const model= new Model({title,description})
            await model.save()
            return model
        },
        updateModel:async (_parent,args,_ctx,_info)=>{
            const {id}=args
            const {title,description}=args.Modelinput
            const updateModel=await Model.findByIdAndUpdate(id,
              {title,description} ,
              {new:true} 
            )
            return updateModel
        }
    }
 }
//Driver Function to start the server and MongoDB Apollo Server
async function startServer() {
    const app=express()
    const apolloserver=new ApolloServer({
      typeDefs:  typedef,
       resolvers: resolvers,
    })
    await apolloserver.start()
    apolloserver.applyMiddleware({app:app,path:'/lakshu'})
    app.use((req,res)=>{
        res.send("Hello we are in express app not in graphql")
    })
    await mongo.connect('mongodb://localhost:27017/Model_db',{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })
    console.log("MongDB connected")
    //console.log("MongDB connected")
    app.listen(4000,()=>{console.log("Server Started and listening at port 4000")})
}
//Using try catch since its an Async Function
try {
    startServer()
}
catch (err) {
    console.log("Error starting server "+err)
}