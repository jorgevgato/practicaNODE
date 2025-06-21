import { confirm } from '@inquirer/prompts';
import connectMongoose from './lib/connectMongoose.js'
import Product from "./models/Product.js"
import User from './models/User.js';

const connection = await connectMongoose()
console.log('Connected to MongoDB: ', connection.name)

const answer = await confirm({message: "Delete database?"})
if (answer === false) {
	console.log('Operation aborted.')
	process.exit()
}

await initUsers()
await initProducts()

await connection.close()

async function initProducts() {
	const result = await Product.deleteMany()
	console.log(`${result.deletedCount} products deleted`)

	const [user1, user2] = await Promise.all([
		User.findOne({email: 'user1@example.com'}),
		User.findOne({email: 'user2@example.com'})
	])

	const insertResult = await Product.insertMany([
		
		{
			name : "Nokia 3330",
			owner: user2._id,
			price : 28,
			image : "nokia3330.jpg",
			tags : [ "mobile" ]
		},
		{
			name : "Blackberry",
			owner: user2._id,
			price : 5,
			image : "blackberry.jpg",
			tags : [ "mobile" ]
		},
		{
			name : "iPhone XXI GOLD",
			owner: user2._id,
			price : 25000,
			image : "iphonegold.jpg",
			tags : [ "mobile" ]
		},
		{
			name : "Peugeot clásica",
			owner: user1._id,
			price : 270,
			image : "aubi.jpg",
			tags : [ "vehicle" ]
		},
		{
			name : "Megamo West 15",
			owner: user1._id,
			price : 2300,
			image : "west.jpg",
			tags : [ "vehicle" ]
		},
		{
			name : "Bianchi Oltre Pro Race",
			owner: user1._id,
			price : 3399,
			image : "bianchi.jpg",
			tags : [ "vehicle" ]
		},
		{
			name : "Orbea Terra",
			owner: user1._id,
			price : 3500,
			image : "orbea.jpg",
			tags : [ "vehicle" ]
		}
	])
	console.log(`${insertResult.length} products inserted.`)
}

async function initUsers() {
	const result = await User.deleteMany()
	console.log(`${result.deletedCount} users deleted`)

	const insertResult = await User.insertMany([
		{email: 'user1@example.com', password: await User.hashPassword('1234')},
		{email: 'user2@example.com', password: await User.hashPassword('1234')}
	])
	console.log(`${insertResult.length} users inserted.`)
}