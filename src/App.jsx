import { LIVROS_INICIAIS } from "./data/livros";
import ListaLivros from "./components/ListaLivros";

function App() {
  const livros = LIVROS_INICIAIS;

  return (
    <>
      <header className="header">
        <h1>📚 Minha Estante de Livros</h1>
        <p>React — JSX, componentes, props, Virtual DOM, listas/keys e renderização condicional</p>
      </header>

      <main className="conteudo">
        <section className="estante">
          <h2>Seus livros</h2>
          <ListaLivros livros={livros} filtro="todos" />
        </section>
      </main>

      <footer className="rodape">
        <small>Projeto da Aula 08 — Frameworks Front-end (SENÃO/SC).</small>
      </footer>
    </>
  );
}

export default App;
