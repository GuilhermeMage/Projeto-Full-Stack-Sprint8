# 📦 Entrega Sprint [8] - [Guilherme]

## 🎯 O que faz:
o frontend React foi conectado ao backend publicado no Render.  
A aplicação permite listar produtos vindos do banco de dados e cadastrar novos produtos por meio da API.

## 🚀 Como rodar:
1. clonar o repositório github a abaixo
2. na pasta 'Testes-unitarios-Tratamento-de-erros', crie um arquivo .env baseado no .env.example
3. colocar a DATABASE_URL do Supabase
4. para rodar localmente, digite isso no terminal: docker compose up --build
5. você pode testar as rotas GET e POST pelo insomnia

github: https://github.com/GuilhermeMage/Projeto-Full-Stack-Sprint8

deploy do render backend: https://projeto-full-stack-sprint8.onrender.com
deploy do render frontend: https://staticsite-frontend.onrender.com

Localmemte com docker:
Frontend: http://localhost:5173
Backend: http://localhost:3000

Rotas principais:
GET  /produtos
POST /produtos
GET  /produtos/erro

## 🧠 O que aprendi:
- Como criar testes para GET, POST e cenários de erro.
- Como substituir console.log por Winston.
- Como criar um middleware global de erro.
- Como retornar erros em JSON sem quebrar o servidor.

## 🔗 Links:
https://react.dev/reference/react
https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch