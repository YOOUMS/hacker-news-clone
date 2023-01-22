import  * as postsDAO from "../database/DAOs/postsDAO.js";
import * as crypto from 'node:crypto'

export async function postsGET(request,response){
   let posts= await postsDAO.getAllPosts();
   response.send(posts);
}

export async function postsPOST(request,response){
   try{

      let post =request.body;
      if(!post.postName||!post.link||!post.userId){
         response.status(400).send("Bad Request");
         return;
      }
         if( await postsDAO.checkPostLink(post.link)){
            response.status(400).send("post link already exist");
            return;
         }
         post.id = crypto.randomUUID();
         console.log(post);
         await postsDAO.insertPost(post);
         response.sendStatus(200);
      
   
   }catch(e){
      console.error(e)
      response.sendStatus(500);
   }
}