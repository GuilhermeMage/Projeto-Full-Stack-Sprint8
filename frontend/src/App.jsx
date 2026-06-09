import { useEffect, useState } from "react";

import ProdutoLista from "./components/ProdutoLista";
import ProdutoForm from "./components/ProdutoForm";

import { getProdutos } from "./services/api";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      setLoading(true);

      const dados = await getProdutos();

      setProdutos(dados);
      setErro("");
    } catch (error) {
      setErro("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <>
      <ProdutoForm
        atualizarProdutos={carregarProdutos}
      />

      <hr />

      <ProdutoLista
        produtos={produtos}
        loading={loading}
        erro={erro}
      />
    </>
  );
}

export default App;