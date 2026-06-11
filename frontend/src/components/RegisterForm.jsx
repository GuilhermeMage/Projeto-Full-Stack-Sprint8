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
    <div>
      <h2>Criar conta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {erro && <p>{erro}</p>}
      {sucesso && <p>{sucesso}</p>}
    </div>
  );
}

export default RegisterForm;