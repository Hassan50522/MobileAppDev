import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MongoClient } from 'mongodb';

// MongoDB Connection String (replace with your credentials)
const uri = "mongodb+srv://HassanK50522:<eHHqUkujyUgh3fXG>@mycluster.tbxhf.mongodb.net/?retryWrites=true&w=majority&appName=mycluster";

const App = () => {
  useEffect(() => {
    const connectToMongoDB = async () => {
      try {
        const client = new MongoClient(uri);
        await client.connect(); // Connect to MongoDB

        // Verify connection
        const isConnected = client.topology && client.topology.isConnected();
        if (isConnected) {
          console.log("✅ Connected to MongoDB!");
        } else {
          console.log("❌ MongoDB connection failed.");
        }

        // Optional: Fetch databases or collections
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:", databases);

        // Close connection
        await client.close();
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
    };

    connectToMongoDB();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Check the console for MongoDB connection status.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
