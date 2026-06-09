const API_URL = import.meta.env.VITE_API_URL;

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}

export async function criarProduto(produto) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto");
  }

  return response.json();
}