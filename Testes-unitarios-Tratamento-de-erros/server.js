import app from './src/app.js';
import 'dotenv/config';
import {logger} from './src/utils/logger.js'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
});    