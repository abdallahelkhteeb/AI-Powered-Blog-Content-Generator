const express = require("express");
const postRouter = require('./routes/postRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();




app.use(express.json());    

app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1', postRouter);
app.use('/api/v1/auth', userRoutes);

//Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to AI blog generator");
});

module.exports = app;