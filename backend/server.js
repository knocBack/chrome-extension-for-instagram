const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using Mongoose

mongoose.connect('mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/extension', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define the schema
const scrollDataSchema = new mongoose.Schema({
    userId: String,
    scrollData: [{
        scrollY: Number,
        timestamp: Number
    }]
});

// Define the model
const ScrollData = mongoose.model('ScrollData', scrollDataSchema);

// Define the schema for post data
const postDataSchema = new mongoose.Schema({
    userId: String,
    post_data: [{
        receivedPostData: [String]
    }]
});

// Define the model for post data
const PostData = mongoose.model('PostData', postDataSchema);

app.post('/scroll-data', (req, res) => {
    const { userId, scrollData } = req.body;
    ScrollData.findOneAndUpdate(
        { userId: userId },
        { $push: { scrollData: scrollData } },
        { upsert: true, new: true }
    )
    .then(doc => {
        console.log('Scroll data stored successfully:', doc);
        res.sendStatus(200);
    })
    .catch(err => {
        console.error('Error storing scroll data:', err);
        res.status(500).send('Internal Server Error');
    });
});

// Function to insert or update post data for a user
async function insertOrUpdatePostData(userId, postId, receivedPostData) {
    try {
        // Find the document with the specified userId
        let existingDoc = await PostData.findOne({ userId: userId });

        if (existingDoc) {
            // If document exists, update the post data array
            const postDataIndex = existingDoc.post_data.findIndex(data => data.postId === postId);
            if (postDataIndex !== -1) {
                existingDoc.post_data[postDataIndex].receivedPostData = receivedPostData;
            } else {
                existingDoc.post_data.push({ postId: postId, receivedPostData: receivedPostData });
            }
            await existingDoc.save();
            console.log('Post data updated in existing document in MongoDB');
        } else {
            // If document does not exist, create a new one
            const newDoc = new PostData({
                userId: userId,
                post_data: [{ postId: postId, receivedPostData: receivedPostData }]
            });
            await newDoc.save();
            console.log('New document created in MongoDB for post data');
        }
    } catch (error) {
        console.error('Error inserting or updating post data into MongoDB:', error);
    }
}

// Route to handle POST requests for post data
app.post('/post-data', (req, res) => {
    const userId = '123'; // Hardcoded user id for now
    const { postId, postData } = req.body;
    insertOrUpdatePostData(userId, postId, postData); // Insert or update post data into MongoDB
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
