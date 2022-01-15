const express = require('express');
const {buildSchema}= require('graphql');
const {graphqlHTTP}= require('express-graphql');
const app=express()
const user=[
    {name: "Lakshu",age: 10,pass:"djkkdjk"},
    {name: "Neeraj",age: 20,pass:"jgkddddk"},
    {name: "syed",age: 20,pass:"jgkdjknk"},
    {name: "Nose",age: 10,pass:"gjhsuho"},
    {name: "Raj",age: 20,pass:"gjnj"},
    {name: "RajU",age: 10,pass:"jgjghkdk"},
]
const schema=buildSchema(`
    type User {
        name: String!
        age:Int!
        pass:String!
    }
    type Query {
        hello:String!
        welcome(name:String,data:String!):String
        getuser(age:Int):[User!]
    }
    type Mutation {
        adduser(name:String,age:Int,pass:String):[User!]
    }
`);
const root={
    hello:()=>{
        return "Hello World!";
    },
    welcome:(req)=>{
        console.log(req);
        return `Hello ${req.name}! ${req.data}`;
    },
    getuser:(req)=>{
 
        const list=user.filter(c=>c.age >= req.age)
        console.log(list)
        return list;
    },
    adduser:(req)=>{
        var newuser={
            name: req.name,
            age: req.age,
            pass:req.pass,
        }
        user.push(newuser);
        console.log(user);
        return user
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema:schema,
    rootValue:root,
}))
app.listen(3000,()=>{
    console.log('app listening at 3000')
});