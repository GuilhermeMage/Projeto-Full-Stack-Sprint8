import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProdutoLista from "./components/ProdutoLista";
import ProdutoForm from "./components/ProdutoForm";

function App() {
  const usuarioSalvo = localStorage.getItem("usuario");

  const [usuario, setUsuario] = useState(
    usuarioSalvo ? JSON.parse(usuarioSalvo) : null
  );

  const [atualizar, setAtualizar] = useState(0);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  function atualizarLista() {
    setAtualizar((valorAtual) => valorAtual + 1);
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  if (!usuario) {
    return (
      <main>
        <h1>Sprint 8 - Autenticação JWT</h1>

        {mostrarCadastro ? (
          <>
            <RegisterForm aoRegistrar={() => setMostrarCadastro(false)} />

            <p>Já tem conta?</p>
            <button onClick={() => setMostrarCadastro(false)}>
              Ir para login
            </button>
          </>
        ) : (
          <>
            <LoginForm aoLogar={setUsuario} />

            <p>Ainda não tem conta?</p>
            <button onClick={() => setMostrarCadastro(true)}>
              Criar conta
            </button>
          </>
        )}
      </main>
    );
  }

  return (
    <main>
      <h1>Sprint 8 - Produtos</h1>

      <p>Usuário logado: {usuario.nome}</p>

      <button onClick={sair}>Sair</button>

      <ProdutoForm aoCadastrar={atualizarLista} />

      <ProdutoLista atualizar={atualizar} />
    </main>
  );
}

export default App;