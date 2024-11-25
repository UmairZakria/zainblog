import Post from "@/app/models/Post";
import { connectMongo } from "@/lib/mongodb";
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'This is a GET request' }));
} 

export async function POST(request) {
    try {
      const {title} = await request.json();
  

      await connectMongo();
  
  
      const post = await Post.findOne({ title: title });
      if (!post) {
        throw new Error("No user found with this email");
      }
  
      return new Response(JSON.stringify({ message: 'success',post : post }), {
        status: 201,
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'error',err : error }), {
        status: 500,
      });
    }
  }
  