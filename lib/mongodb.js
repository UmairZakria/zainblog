import mongoose from 'mongoose';

const uri ='mongodb+srv://zainmukhtar2222:XBv3PVj6xo2euD5w@zain.91dmj.mongodb.net/?retryWrites=true&w=majority&appName=Zain';
// const uri = 'mongodb://localhost:27017/zain'

if (!uri) {
  throw new Error('Please add your MongoDB URI to the .env file');
}

let isConnected = false;

export async function connectMongo() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(uri);

  isConnected = true;
}
