import request from "supertest";
import app from "../app.js";

describe("Rotas de produtos", () => {
  let token;

  beforeAll(async () => {
    const emailTeste = `teste${Date.now()}@email.com`;

    await request(app).post("/auth/register").send({
      nome: "Usuário Teste",
      email: emailTeste,
      senha: "123456",
    });

    const loginResponse = await request(app).post("/auth/login").send({
      email: emailTeste,
      senha: "123456",
    });

    token = loginResponse.body.token;
  });

  test("Deve bloquear GET /produtos sem token", async () => {
    const response = await request(app).get("/produtos");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token não enviado",
      code: 401,
    });
  });

  test("Deve listar produtos com GET /produtos usando token", async () => {
    const response = await request(app)
      .get("/produtos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Deve criar um produto com POST /produtos usando token", async () => {
    const novoProduto = {
      nome: "monitor",
      preco: 800,
    };

    const response = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send(novoProduto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("monitor");
    expect(response.body.preco).toBe(800);
  });

  test("Deve retornar erro ao criar produto sem preço usando token", async () => {
    const response = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Produto sem preço",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Nome e preço são obrigatórios",
      code: 400,
    });
  });

  test("Deve retornar erro simulado sem quebrar o servidor usando token", async () => {
    const response = await request(app)
      .get("/produtos/erro")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Erro simulado de banco de dados",
      code: 500,
    });
  });
});