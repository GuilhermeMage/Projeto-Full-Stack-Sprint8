import request from "supertest";
import app from "../app";

describe("Rotas de produtos", () => {
    test("Deve listar produtos com get /produtos", async () => {
        const response = await request(app).get("/produtos");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("Deve criar um produto com POST /produtos", async () => {
        const novoProduto = {
            nome: "monitor",
            preco: 800
        };

        const response = await request(app)
            .post("/produtos")
            .send(novoProduto);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("monitor");
        expect(response.body.preco).toBe(800);
    });

    describe("Testes de Produtos", () => {
        test("Deve retornar erro ao criar produto sem preço", async () => {
            const response = await request(app)
                .post("/produtos")
                .send({ nome: "Produto sem preço" });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Nome e preço são obrigatórios",
                code: 400
            });
        });

        test("Deve retornar erro simulado sem quebrar o servidor", async () => {
            const response = await request(app).get("/produtos/erro");

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                error: "Erro simulado de banco de dados",
                code: 500
            });
        });
    });
});