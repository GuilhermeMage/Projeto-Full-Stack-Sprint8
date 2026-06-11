import { useState } from "react";
import { criarProduto } from "../services/api";

function ProdutoForm({ aoCadastrar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setErro("");
      setSucesso("");

      const novoProduto = {
        nome,
        preco: Number(preco),
      };

      await criarProduto(novoProduto);

      setNome("");
      setPreco("");
      setSucesso("Produto cadastrado com sucesso!");

      aoCadastrar();
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="eyebrow">Novo produto</p>
        <h2>Cadastrar produto</h2>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome do produto
          <input
            type="text"
            placeholder="Ex: Monitor"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>

        <label>
          Preço
          <input
            type="number"
            placeholder="Ex: 800"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            required
          />
        </label>

        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar produto"}
        </button>
      </form>

      {erro && <p className="message message-error">{erro}</p>}
      {sucesso && <p className="message message-success">{sucesso}</p>}
    </section>
  );
}

export default ProdutoForm;