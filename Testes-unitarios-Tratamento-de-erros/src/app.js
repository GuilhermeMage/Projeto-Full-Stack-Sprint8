import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import produtosRoutes from './routes/produtos.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/produtos', produtosRoutes)

app.get('/', (req,res) => {
    res.json({message: "API rodando"})
});

app.use(errorHandler);

export default app;