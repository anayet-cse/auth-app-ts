import express from 'express';
import bodyParser from 'body-parser';
import db from './infrastructure/database';
import userRoutes from './routes/usersRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

async function dbConnection() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbConnection();

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
