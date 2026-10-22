import { useEffect, useState } from "react";
import { LIVROS_INICIAIS } from "./data/livros";
import ListaLivros from "./components/ListaLivros";
import FormLivro from "./components/FormLivro";
import EstadoCarregamento from "./components/EstadoCarregamento";

function Header() {
  return (
    <header className="header">
      <h1>📚 Minha Estante de Livros</h1>
      <p>React — JSX, componentes, props, Virtual DOM, listas/keys e renderização condicional</p>
    </header>
  );
}

function gerarId(lista) {
  return lista.length ? Math.max(...lista.map((l) => l.id)) + 1 : 1;
}

function App() {
  const [livros, setLivros] = useState(LIVROS_INICIAIS);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);

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

  return (
    <>
      <Header />
      <main className="conteudo">
        <FormLivro
          onSalvar={editando ? salvarEdicao : adicionarLivro}
          livroEditando={editando}
          onCancelarEdicao={cancelarEdicao}
        />
        <section className="estante">
          <h2>Seus livros</h2>
          {carregando ? (
            <EstadoCarregamento />
          ) : (
            <ListaLivros
              livros={livros}
              filtro="todos"
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
