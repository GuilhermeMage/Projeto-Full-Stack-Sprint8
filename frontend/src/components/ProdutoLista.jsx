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

  return (
    <section className="panel product-panel">
      <div className="panel-header">
        <p className="eyebrow">Banco de dados</p>
        <h2>Produtos cadastrados</h2>
      </div>

      {loading && <p className="state-text">Carregando produtos...</p>}

      {erro && <p className="message message-error">{erro}</p>}

      {!loading && !erro && produtos.length === 0 && (
        <div className="empty-state">
          <strong>Nenhum produto cadastrado</strong>
          <p>Cadastre um produto para visualizar ele nesta lista.</p>
        </div>
      )}

      {!loading && !erro && produtos.length > 0 && (
        <div className="product-list">
          {produtos.map((produto) => (
            <article className="product-card" key={produto.id}>
              <div>
                <span className="product-id">#{produto.id}</span>
                <h3>{produto.nome}</h3>
              </div>

              <strong className="product-price">
                R$ {Number(produto.preco).toFixed(2)}
              </strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProdutoLista;