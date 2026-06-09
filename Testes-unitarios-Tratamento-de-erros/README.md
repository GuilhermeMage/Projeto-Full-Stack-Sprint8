# 📦 Entrega Sprint [7] - [Guilherme]

## 🎯 O que faz:
É uma API de produtos para produção que faz testes automaticos, logs estruturados e tratamento de erros.

## 🚀 Como rodar:
1. clonar o repositório
2. criar um arquivo .env baseado no .env.example
3. colocar a DATABASE_URL do Supabase
4. rodar: docker compose up --build
5. você pode testar as rotas GET e POST pelo insomnia

github: https://github.com/GuilhermeMage/Testes-unitarios-Tratamento-de-erros

deploy do render: https://testes-unitarios-tratamento-de-erros.onrender.com

Endpoints:
GET /
GET /produtos
POST /produtos
GET /produtos/erro

## 🧠 O que aprendi:
- Como criar testes para GET, POST e cenários de erro.
- Como substituir console.log por Winston.
- Como criar um middleware global de erro.
- Como retornar erros em JSON sem quebrar o servidor.

## 🔗 Links:
https://www.youtube.com/watch?v=ct7Rnh8dgtY&t=1152s
https://www.youtube.com/watch?v=GR9thD85iLQ
https://www.youtube.com/watch?v=Ru6Tr7Q75IQ&t=1058s

Jest: https://jestjs.io/
Supertest: https://github.com/ladjs/supertest
Winston: https://github.com/winstonjs/winston
Express Middleware: https://expressjs.com/en/resources/middleware.html