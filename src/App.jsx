import { useEffect, useState } from "react";
import { LIVROS_INICIAIS } from "./data/livros";
import Header from "./components/Header.jsx";
import ListaLivros from "./components/ListaLivros";
import FormLivro from "./components/FormLivro";
import Filtros from "./components/Filtros";
import EstadoCarregamento from "./components/EstadoCarregamento";
import "./App.css";

function gerarId(lista) {
  return lista.length ? Math.max(...lista.map((l) => l.id)) + 1 : 1;
}

function App() {
  const [livros, setLivros] = useState(LIVROS_INICIAIS);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const adicionarLivro = (livro) => {
    const novo = { id: gerarId(livros), ...livro, concluido: false };
    setLivros([novo, ...livros]);
  };

  const salvarEdicao = (livro) => {
    setLivros(
      livros.map((l) => (l.id === editando.id ? { ...editando, ...livro } : l))
    );
    setEditando(null);
  };

  const alternarStatus = (id) =>
    setLivros(
      livros.map((l) => (l.id === id ? { ...l, concluido: !l.concluido } : l))
    );

  const excluirLivro = (id) => setLivros(livros.filter((l) => l.id !== id));

  const iniciarEdicao = (id) => setEditando(livros.find((l) => l.id === id));
  const cancelarEdicao = () => setEditando(null);

  const contagem = {
    todos: livros.length,
    lendo: livros.filter((l) => !l.concluido).length,
    concluidos: livros.filter((l) => l.concluido).length,
  };
  const livrosFiltrados =
    filtro === "todos"
      ? livros
      : livros.filter((l) =>
          filtro === "concluidos" ? l.concluido : !l.concluido
        );

  return (
    <>
      <Header />
      <main className="conteudo">
        <FormLivro
          key={editando ? editando.id : "novo"}
          onSalvar={editando ? salvarEdicao : adicionarLivro}
          livroEditando={editando}
          onCancelarEdicao={cancelarEdicao}
        />
        <section className="estante">
          <h2>Seus livros</h2>
          <Filtros filtro={filtro} onFiltrar={setFiltro} contagem={contagem} />
          {carregando ? (
            <EstadoCarregamento />
          ) : (
            <ListaLivros
              livros={livrosFiltrados}
              filtro={filtro}
              onAlternarStatus={alternarStatus}
              onEditar={iniciarEdicao}
              onExcluir={excluirLivro}
            />
          )}
        </section>
      </main>
      <footer className="rodape">
        <small>Projeto da Aula 08 — Frameworks Front-end (SENÃO/SC).</small>
      </footer>
    </>
  );
}

export default App;
