const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const storyRoutes = require('./routes/story');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

app.use('/api/stories', storyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});