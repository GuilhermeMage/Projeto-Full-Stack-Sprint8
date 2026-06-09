function ProdutoLista({ produtos, loading, erro }) {
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <h2>Produtos</h2>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>Preço: R$ {produto.preco}</p>
        </div>
      ))}
    </div>
  );
}

export default ProdutoLista;