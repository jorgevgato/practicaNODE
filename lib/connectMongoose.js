import mongoose, { Mongoose } from 'mongoose'

export default function connectMongoose() {
    return mongoose.connect('mongodb://localhost/mongoPOP')
    .then(mongoose => mongoose.connection)
}