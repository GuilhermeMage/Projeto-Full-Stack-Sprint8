import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProdutoLista from "./components/ProdutoLista";
import ProdutoForm from "./components/ProdutoForm";
import "./App.css";

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
      <main className="page auth-page">
        <section className="auth-card">
          <div className="brand">
            <span className="brand-badge">S8</span>
            <div>
              <p className="eyebrow">Sprint 8</p>
              <h1>Autenticação JWT</h1>
            </div>
          </div>

          <p className="subtitle">
            Acesse sua conta para visualizar e cadastrar produtos com segurança.
          </p>

          {mostrarCadastro ? (
            <>
              <RegisterForm aoRegistrar={() => setMostrarCadastro(false)} />

              <div className="form-footer">
                <p>Já tem conta?</p>
                <button
                  className="button button-secondary"
                  onClick={() => setMostrarCadastro(false)}
                >
                  Ir para login
                </button>
              </div>
            </>
          ) : (
            <>
              <LoginForm aoLogar={setUsuario} />

              <div className="form-footer">
                <p>Ainda não tem conta?</p>
                <button
                  className="button button-secondary"
                  onClick={() => setMostrarCadastro(true)}
                >
                  Criar conta
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Painel administrativo</p>
          <h1>Produtos</h1>
          <p className="subtitle">
            Gerencie produtos conectados à API com autenticação JWT.
          </p>
        </div>

        <div className="user-card">
          <div>
            <span className="user-label">Usuário logado</span>
            <strong>{usuario.nome}</strong>
          </div>

          <button className="button button-danger" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      <section className="dashboard-grid">
        <ProdutoForm aoCadastrar={atualizarLista} />
        <ProdutoLista atualizar={atualizar} />
      </section>
    </main>
  );
}

export default App;