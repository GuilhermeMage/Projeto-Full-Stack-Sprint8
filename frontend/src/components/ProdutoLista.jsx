import { useEffect, useState } from "react";
import { getProdutos } from "../services/api";

function ProdutoLista({ atualizar }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setLoading(true);
        setErro("");

        const dados = await getProdutos();

        setProdutos(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, [atualizar]);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <h2>Produtos cadastrados</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome} - R$ {Number(produto.preco).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProdutoLista;