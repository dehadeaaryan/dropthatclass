import { MongoClient, ServerApiVersion } from "mongodb";

// Get the MongoDB URI from the environment variables
const uri: string = (process.env.MODE === "prod" ? process.env.MONGODB_URI : process.env.TEST_MONGODB_URI) as string;

// Congifure the MongoClientOptions object
const mongoClientOptions = {
    serverApi: {
        appName: "dropthatclass",
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

// Create a MongoClient with the specified options
const client: MongoClient = new MongoClient(uri, mongoClientOptions);

// Connect to MongoDB and create a promise
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
