import app from './app.js';
import dbConnect from './lib/dbConnect.js';


await dbConnect();


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;