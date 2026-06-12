# PLANEJAMENTO REOBOTE - FASE 1

## 1. Empatia: Dor principal

A dor central é:

> O produto chegou no galpão. Como garantir que ele seja conferido, cadastrado, classificado, armazenado no local correto e encontrado rapidamente quando for necessário vender ou movimentar?

### Problemas atuais que o sistema deve evitar

* Produto chegar e não ser cadastrado corretamente.
* Produto novo ficar sem fotos ou sem descrição.
* Falta de padrão na classificação dos produtos.
* Produto ser guardado em local errado.
* Dificuldade para saber quais espaços do armazém estão ocupados.
* Dificuldade para localizar rapidamente um produto.
* Perda de tempo na separação para venda.
* Falta de rastreabilidade sobre entrada, armazenamento e retirada.
* Falta de integração entre operação física e sistema digital.

### Usuários envolvidos

* Operador de recebimento.
* Responsável por cadastro de produtos.
* Responsável por fotos e descrição.
* Responsável pelo estoque/armazém.
* Equipe de vendas/marketplaces.
* Gestores da Reobote.

---

## 2. Definição: qual é o MVP?

O MVP da Fase 1 será um sistema simples de conferência logística e armazenagem inteligente para produtos importados.

O sistema deve ajudar a equipe da Reobote a receber produtos no galpão, cadastrar novos itens, gerar QR Codes, classificar os produtos e indicar automaticamente onde cada item deve ser armazenado.

A ideia é criar uma primeira versão funcional inspirada em operações logísticas como a do Mercado Livre, porém adaptada para a realidade inicial da Reobote.

### MVP proposto

O MVP será composto por:

* Backend em Node.js.
* Frontend em React.
* Banco de dados PostgreSQL.
* QR Code para identificação dos produtos.
* Estrutura de armazém com ruas, prédios e apartamentos.
* Sistema de sugestão de endereço de armazenagem.
* Registro de entrada e retirada de produtos.
* Painel simples para visualizar produtos, endereços e status.

### Fluxo principal do MVP

Produto chega no galpão
↓
Operador abre a caixa
↓
Verifica se o produto já existe no sistema
↓
Se for novo, cadastra produto
↓
Tira fotos
↓
Classifica por categoria e tamanho
↓
Sistema sugere endereço no armazém
↓
QR Code é gerado e impresso
↓
Produto é armazenado no apartamento indicado
↓
Sistema registra onde o produto está
↓
Na retirada, o QR Code é lido novamente
↓
Sistema atualiza o status e libera o endereço

### Estrutura do armazém

O armazém será organizado em três níveis:


Rua
↓
Prédio
↓
Apartamento

Exemplo de endereço:

Rua A / Prédio 01 / Apartamento 03

Cada apartamento terá informações como:

* Código do endereço.
* Tamanho suportado: pequeno, médio ou grande.
* Capacidade máxima.
* Status: disponível, ocupado ou cheio.
* Produtos armazenados.
* Data da última movimentação.

### Regra de armazenamento

O sistema deve indicar o melhor apartamento com base na classificação do produto.

Exemplo:

* Produtos pequenos vão para apartamentos pequenos.
* Produtos médios vão para apartamentos médios.
* Produtos grandes vão para apartamentos grandes.
* Se o apartamento estiver cheio, o sistema indica outro disponível.
* Se não houver espaço disponível, o sistema alerta a equipe.

### QR Code do produto

Cada produto terá um QR Code contendo ou apontando para informações como:

* ID interno do produto.
* Nome do produto.
* Categoria.
* Tamanho.
* Status.
* Endereço no armazém.
* Data de entrada.
* Histórico de movimentações.

O QR Code não precisa conter todos os dados diretamente. O ideal é que ele contenha um identificador único, e o sistema busque as informações completas no banco de dados.

Exemplo:

QR Code → PROD-000123

Ao escanear, o sistema busca no PostgreSQL todas as informações do produto.

### MVP dos dispositivos

A visão futura é usar celulares handheld Zebra, como a linha Zebra TC73, para leitura dos QR Codes, e impressoras móveis Zebra, como a ZQ520, para impressão de etiquetas.

Para o MVP, a Reobote pode validar em duas etapas:

#### MVP 1 - Baixo custo

* Leitura de QR Code usando celular comum.
* Impressão de etiqueta em impressora comum.
* Sistema React responsivo para uso no navegador.
* QR Code gerado pelo backend.
* Operação simulada no galpão.

#### MVP 2 - Operação profissional

* Leitura com handheld Zebra.
* Impressão com impressora Zebra.
* Interface adaptada para tela pequena.
* Fluxo mais rápido para operador.
* Testes reais no ambiente físico do armazém.

Essa abordagem reduz custo inicial e permite validar a lógica do sistema antes de investir completamente nos dispositivos profissionais.


## 3. Ideação: arquitetura técnica

A arquitetura da Fase 1 deve conectar o processo físico do galpão com um sistema digital simples, rastreável e escalável.

### Arquitetura geral

Operador no galpão
↓
Celular comum ou handheld Zebra
↓
Frontend React
↓
API Node.js/Express
↓
PostgreSQL + Prisma
↓
Sistema de endereçamento e movimentação
↓
Produto armazenado ou retirado

### Tecnologias principais

#### Backend

* Node.js.
* Express.
* Prisma.
* PostgreSQL.
* JWT para autenticação.
* Winston para logs.
* Helmet para segurança.
* Express Rate Limit para limitar requisições.
* Jest e Supertest para testes.

#### Frontend

* React.
* Vite.
* Interface responsiva.
* Tela de login.
* Tela de cadastro de produtos.
* Tela de endereços do armazém.
* Tela de leitura de QR Code.
* Tela de movimentações.

#### Banco de dados

O PostgreSQL será usado para armazenar:

* Usuários.
* Produtos.
* Categorias.
* Fotos.
* Endereços do armazém.
* Movimentações.
* Status dos produtos.
* Histórico de leitura dos QR Codes.

#### Integrações futuras

* Evolution API para alertas via WhatsApp.
* Notificação quando um produto for recebido.
* Notificação quando um produto estiver pronto para venda.
* Notificação quando um item for retirado do estoque.
* Envio de alertas para equipe interna.

### Modelos principais do sistema

#### Produto

Campos sugeridos:

* ID.
* Nome.
* Descrição.
* Categoria.
* Subcategoria.
* Tamanho: pequeno, médio ou grande.
* Peso aproximado.
* Status.
* QR Code.
* Endereço atual.
* Data de entrada.
* Data de saída.

#### Endereço

Campos sugeridos:

* ID.
* Rua.
* Prédio.
* Apartamento.
* Tamanho suportado.
* Capacidade máxima.
* Capacidade ocupada.
* Status.

#### Movimentação

Campos sugeridos:

* ID.
* Produto.
* Tipo: entrada, armazenamento, retirada ou venda.
* Endereço anterior.
* Novo endereço.
* Usuário responsável.
* Data e horário.

#### Foto

Campos sugeridos:

* ID.
* Produto.
* URL da imagem.
* Tipo: principal, detalhe, embalagem ou etiqueta.
* Data de criação.

### Exemplo de status do produto

Recebido
Cadastrado
Fotografado
Classificado
Armazenado
Separado para venda
Anunciado
Vendido
Retirado do estoque

## 4. Prototipação: roadmap de 4 sprints

## Sprint 9 - Cadastro logístico e estrutura do armazém

### Objetivo

Criar a base do sistema de conferência logística da Reobote.

### Entregas

* Criar model de produtos no banco.
* Criar model de endereços do armazém.
* Criar estrutura de ruas, prédios e apartamentos.
* Criar cadastro de produto.
* Criar classificação por categoria e tamanho.
* Criar listagem de produtos.
* Criar listagem de endereços disponíveis e ocupados.

### Resultado esperado

A equipe consegue cadastrar produtos e visualizar a estrutura inicial do armazém no sistema.


## Sprint 10 - QR Code e endereçamento automático

### Objetivo

Adicionar identificação por QR Code e sugestão automática de local de armazenamento.

### Entregas

* Gerar QR Code para cada produto.
* Criar tela de impressão de etiqueta.
* Criar lógica para sugerir apartamento com base no tamanho do produto.
* Marcar apartamento como ocupado ou cheio.
* Exibir endereço completo do produto.
* Criar leitura de QR Code pelo navegador/celular.
* Registrar movimentação de armazenamento.

### Resultado esperado

Ao cadastrar e classificar um produto, o sistema gera um QR Code e sugere onde ele deve ser guardado.


## Sprint 11 - Retirada, movimentação e rastreabilidade

### Objetivo

Criar o fluxo de retirada do produto do estoque e registrar o histórico de movimentações.

### Entregas

* Criar tela de busca por QR Code.
* Criar tela de retirada do produto.
* Atualizar status do produto ao ser retirado.
* Liberar apartamento quando o produto sair.
* Registrar histórico de movimentações.
* Criar filtro por status.
* Criar logs de operação.

### Resultado esperado

A equipe consegue localizar um produto pelo endereço, retirar o item e registrar essa movimentação no sistema.


## Sprint 12 - Preparação para marketplace e validação operacional

### Objetivo

Organizar o produto para seguir para a etapa de venda em marketplaces.

### Entregas

* Criar status “Pronto para anunciar”.
* Organizar fotos do produto.
* Criar campos para título, descrição e categoria de venda.
* Criar painel simples de produtos prontos para marketplace.
* Testar o fluxo completo no galpão.
* Validar leitura por celular.
* Planejar adaptação para handheld Zebra.
* Documentar o processo operacional.

### Resultado esperado

A Reobote terá um MVP funcional para receber, cadastrar, classificar, armazenar, localizar e retirar produtos, preparando a operação para venda em marketplaces.


## 5. Teste: critérios de sucesso

A Fase 1 será considerada bem-sucedida se o sistema conseguir reduzir erros e organizar o fluxo físico dos produtos no galpão.

### KPIs técnicos

* API respondendo em menos de 2 segundos.
* Rota `/health` retornando status `ok`.
* Sistema com autenticação JWT funcionando.
* Rotas privadas protegidas.
* Testes automatizados passando no GitHub Actions.
* Banco PostgreSQL registrando produtos, endereços e movimentações.
* QR Code gerado corretamente para cada produto.
* QR Code lido corretamente pelo celular.
* Frontend carregando em menos de 3 segundos.
* Sem erros críticos no console do navegador.

### KPIs operacionais

* 95% dos produtos cadastrados com endereço correto.
* 95% de acerto na sugestão de apartamento por tamanho.
* Redução do tempo de localização de produto.
* Produto encontrado pelo endereço em menos de 1 minuto.
* 100% dos produtos recebidos com QR Code gerado.
* 100% das retiradas registradas no sistema.
* Nenhum produto armazenado sem endereço.
* Nenhum endereço ocupado sem produto vinculado.
* Histórico de movimentação disponível para cada produto.

### Testes práticos do MVP

#### Teste 1 - Entrada de produto novo

* Abrir caixa.
* Cadastrar produto.
* Classificar tamanho.
* Gerar QR Code.
* Sistema sugerir apartamento.
* Armazenar produto.
* Confirmar que o produto aparece no endereço correto.

Critério de aceite:

Produto cadastrado, etiquetado e armazenado com endereço correto.

#### Teste 2 - Produto já existente

* Buscar produto no sistema.
* Confirmar dados existentes.
* Gerar nova unidade ou movimentação.
* Armazenar em apartamento disponível.

Critério de aceite:

Produto já cadastrado deve ser reaproveitado sem criar duplicidade desnecessária.

#### Teste 3 - Apartamento cheio

* Tentar armazenar produto em endereço cheio.
* Sistema bloquear ou alertar.
* Sistema sugerir novo apartamento disponível.

Critério de aceite:

Sistema não deve permitir armazenar produto em apartamento cheio.

#### Teste 4 - Retirada de produto

* Buscar produto pelo QR Code.
* Visualizar endereço.
* Ir até rua, prédio e apartamento.
* Retirar produto.
* Confirmar retirada no sistema.
* Sistema liberar ou atualizar o endereço.

Critério de aceite:

Produto retirado deve mudar de status e gerar movimentação no histórico.

#### Teste 5 - Preparação para marketplace

* Produto classificado como pronto para venda.
* Fotos vinculadas.
* Dados organizados.
* Status atualizado para “Pronto para anunciar”.

Critério de aceite:

Produto deve estar pronto para seguir para cadastro ou anúncio nos marketplaces.


## Visão futura

A Fase 1 cria a base do sistema logístico da Reobote.

Depois da validação inicial, o sistema poderá evoluir para:

* Integração direta com marketplaces.
* Geração automática de anúncios.
* Controle de múltiplos galpões.
* Controle de lotes de importação.
* Dashboard de estoque.
* Integração com fornecedores.
* Conferência por nota fiscal.
* Impressão profissional com Zebra ZQ520.
* Operação com handheld Zebra.
* Alertas via WhatsApp usando Evolution API.
* Relatórios de giro de estoque.
* Previsão de reposição.
* Automação de separação e expedição.

A visão da Reobote é construir uma operação de importação organizada, rastreável e automatizada, reduzindo processos manuais e preparando a empresa para vender com eficiência em marketplaces, empresas e lojistas.
