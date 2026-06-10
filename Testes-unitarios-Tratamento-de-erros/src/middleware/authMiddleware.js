import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const erro = new Error('Token não enviado');
            erro.statusCode = 401;
            throw erro;
        }

        const [tipo, token] = authHeader.split(' ');

        if (tipo !== "Bearer" || !token) {
            const erro = new Error("Token inválido");
            erro.statusCode = 401;
            throw erro;
        }

        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = usuario

        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
}