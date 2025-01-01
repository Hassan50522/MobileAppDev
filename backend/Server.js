const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000; // Port for the server

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// MongoDB Connection URL (replace with your actual MongoDB connection string)
const uri = 'mongodb+srv://HassanK50522:<eHHqUkujyUgh3fXG>@mycluster.tbxhf.mongodb.net/?retryWrites=true&w=majority&appName=mycluster'; // Example: 'mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority'

// MongoDB Client
const client = new MongoClient(uri);

// Connect to MongoDB and verify the connection
client.connect()
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

// Route to check the server and database connection
app.get('/', (req, res) => {
  res.send('MongoDB API is working');
});

// Route to get data from MongoDB (change the database and collection name accordingly)
app.get('/data', async (req, res) => {
  try {
    // Access the database and collection
    const db = client.db('myDatabase');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();
    
    // Send the data as JSON response
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
