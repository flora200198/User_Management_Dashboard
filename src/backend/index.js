
import express from 'express';

import users from './user.js';


const app = express();
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
