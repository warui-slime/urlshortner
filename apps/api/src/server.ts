import app from './app.js';
import dbConnect from './lib/dbConnect.js';

const startServer = async () => {
  await dbConnect();
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};


if (!process.env.VERCEL) {
  startServer();
}

export default app;