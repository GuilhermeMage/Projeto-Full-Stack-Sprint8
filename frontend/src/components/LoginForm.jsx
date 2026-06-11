import { useState } from "react";
import { login } from "../services/api";

function LoginForm({ aoLogar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setErro("");

      const resposta = await login(email, senha);

      localStorage.setItem("token", resposta.token);
      localStorage.setItem("usuario", JSON.stringify(resposta.usuario));

      aoLogar(resposta.usuario);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-section">
      <h2>Entrar na conta</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {erro && <p className="message message-error">{erro}</p>}
    </div>
  );
}

export default LoginForm;