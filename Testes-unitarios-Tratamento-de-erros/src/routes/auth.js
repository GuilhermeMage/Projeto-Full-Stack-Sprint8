import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      const erro = new Error("Nome, email e senha são obrigatórios");
      erro.statusCode = 400;
      throw erro;
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      const erro = new Error("Este email já está cadastrado");
      erro.statusCode = 400;
      throw erro;
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      const erro = new Error("Email e senha são obrigatórios");
      erro.statusCode = 400;
      throw erro;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      const erro = new Error("Email ou senha inválidos");
      erro.statusCode = 401;
      throw erro;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      const erro = new Error("Email ou senha inválidos");
      erro.statusCode = 401;
      throw erro;
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;