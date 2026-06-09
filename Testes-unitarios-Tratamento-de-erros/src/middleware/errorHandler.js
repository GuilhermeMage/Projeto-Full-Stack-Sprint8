import {logger} from '../utils/logger.js';

export function errorHandler(err,req,res,next) {
    logger.error({
        message: err.message,
        route: req.originalUrl,
        method: req.method
    });

    res.status(err.statusCode || 500).json({
        error:err.message || "Erro interno no servidor",
        code: err.statusCode || 500
    });

        res.status(err.statusCode || 400).json({
        error:err.message || "Nome e preço são obrigatórios",
        code: err.statusCode || 500
    });

}