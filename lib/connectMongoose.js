import mongoose, { Mongoose } from 'mongoose'

export default function connectMongoose() {
    return mongoose.connect(process.env.MONGODB_CONNECT)
    .then(mongoose => mongoose.connection)
}