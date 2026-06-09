const API_URL =
  "https://projeto-full-stack-sprint8.onrender.com";

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return await response.json();
}

export async function criarProduto(produto) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto");
  }

  return await response.json();
}