// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ഈ വരി പുതുതായി ചേർത്തു
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// അപ്‌ലോഡ് ചെയ്ത ഫയലുകൾ പുറമേക്ക് ലഭ്യമാക്കാനുള്ള Static Folder
app.use('/public', express.static(path.join(__dirname, 'public'))); // ഈ വരി പുതുതായി ചേർത്തു

// Database Connection
mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/forms', require('./routes/userRoutes/formRoutes.js'));
app.use('/api/auth', require('./routes/adminRoutes/authRoutes.js'));
app.use('/api/gallery', require('./routes/adminRoutes/galleryRoutes.js')); // ഈ വരി പുതുതായി ചേർത്തു

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});