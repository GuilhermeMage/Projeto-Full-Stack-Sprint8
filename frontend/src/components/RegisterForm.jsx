import { useState } from "react";
import { registrarUsuario } from "../services/api";

function RegisterForm({ aoRegistrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setErro("");
      setSucesso("");

      await registrarUsuario(nome, email, senha);

      setNome("");
      setEmail("");
      setSenha("");
      setSucesso("Usuário cadastrado com sucesso!");

      aoRegistrar();
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-section">
      <h2>Criar conta</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>

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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {erro && <p className="message message-error">{erro}</p>}
      {sucesso && <p className="message message-success">{sucesso}</p>}
    </div>
  );
}

export default RegisterForm;