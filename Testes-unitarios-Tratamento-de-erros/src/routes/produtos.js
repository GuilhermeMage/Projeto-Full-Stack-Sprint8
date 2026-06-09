import express from "express";
import { prisma } from "../database/prisma.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    logger.info("Listando produtos");

    const produtos = await prisma.produto.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(produtos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
      const erro = new Error("Nome e preço são obrigatórios");
      erro.statusCode = 400;
      throw erro;
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        preco: Number(preco),
      },
    });

    logger.info({
      message: "Produto criado",
      produto: novoProduto,
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    next(error);
  }
});

router.get("/erro", (req, res, next) => {
  const erro = new Error("Erro simulado de banco de dados");
  erro.statusCode = 500;

  next(erro);
});

export default router;