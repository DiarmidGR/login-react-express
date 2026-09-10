const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const authRoutes = require('./routes/auth.route');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

require('dotenv').config();

app.use('/api/', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
