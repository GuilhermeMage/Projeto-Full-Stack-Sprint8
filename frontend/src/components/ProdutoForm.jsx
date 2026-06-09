import { useState } from "react";
import { criarProduto } from "../services/api";

function ProdutoForm({ atualizarProdutos }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await criarProduto({
        nome,
        preco: Number(preco),
      });

      setNome("");
      setPreco("");

      atualizarProdutos();

      alert("Produto cadastrado!");
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <br />

      <button type="submit">
        Cadastrar
      </button>
    </form>
  );
}

export default ProdutoForm;