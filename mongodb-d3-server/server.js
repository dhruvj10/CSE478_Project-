
/*const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3003;

const uri = "mongodb+srv://djain30:12345@478projectdb.gbwao.mongodb.net/Titles?retryWrites=true&w=majority&appName=478ProjectDb";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

// Serve the index.html file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Public', 'index.html'));
});

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, '..',  'Public')));

const netflixSchema = new mongoose.Schema({}, { strict: false, collection: 'Netflix' });
const huluSchema = new mongoose.Schema({}, { strict: false, collection: 'Hulu' });
const amazonPrimeSchema = new mongoose.Schema({}, { strict: false, collection: 'Amazon_Prime' });
const disneySchema = new mongoose.Schema({}, { strict: false, collection: 'Disney+' });

const Netflix = mongoose.model('Netflix', netflixSchema);
const Hulu = mongoose.model('Hulu', huluSchema);
const AmazonPrime = mongoose.model('Amazon_Prime', amazonPrimeSchema);
const Disney = mongoose.model('Disney', disneySchema);

app.get('/movies', async (req, res) => {
  try {
    const movies = await Netflix.find({ type: "Movie" });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get('/api', async (req, res) => {
  try {
    const result = await Netflix.find();
    res.json({ "Netflix Movies": result });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/

const express = require('express');
const connectDB = require('./config');
const moviesRoutes = require('./routes/movies');
const path = require('path');
const app = express();
const PORT = 3003;

// Connect to MongoDB
connectDB();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '..',  'Public')));

// API routes
app.use('/api/movies', moviesRoutes);

// Serve index.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
