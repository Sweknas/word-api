import app from './app';

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
