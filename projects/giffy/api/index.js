import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT ?? 8080;

import userRoutes from "./routes/userRouter.js"

app.use(userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

app.listen(PORT, () => {
    console.log(`Server runnung on port ${PORT}`);
});