const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

// const storyRoutes = require('./routes/storyRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

// app.use('/api/stories', storyRoutes);

module.exports = app;