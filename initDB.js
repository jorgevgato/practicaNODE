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

await initProducts()
await initUsers()

await connection.close()

async function initProducts() {
	const result = await Product.deleteMany()
	console.log(`${result.deletedCount} products deleted`)

	const insertResult = await Product.insertMany([
		{
			name : "Peugeot clásica",
			price : 250,
			image : "/PopLogo.png",
			tags : [ "vehicle" ]
		},
		{
			name : "Nokia 3310",
			price : 28,
			image : "/PopLogo.png",
			tags : [ "mobile", "lifestyle" ]
		},
		{
			name : "Blackberry",
			price : 5,
			image : "source",
			tags : [ "mobile" ]
		},
		{
			name : "Megamo West 15",
			price : 2300,
			image : "source",
			tags : [ "vehicle" ]
		},
		{
			name : "Bianchi Oltre Pro Race",
			price : 2999,
			image : "source",
			tags : [ "vehicle" ]
		},
		{
			name : "Orbea Terra",
			price : 3500,
			image : "source",
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