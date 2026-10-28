import { useEffect, useState } from "react";
import { LIVROS_INICIAIS } from "./data/livros";
import Header from "./components/Header.jsx";
import ListaLivros from "./components/ListaLivros";
import FormLivro from "./components/FormLivro";
import Filtros from "./components/Filtros";
import BarraBusca from "./components/BarraBusca";
import EstadoCarregamento from "./components/EstadoCarregamento";
import "./App.css";

const CHAVE_STORAGE = "minha_estante_livros";

function obterLivrosIniciais() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (dados) {
      const parsed = JSON.parse(dados);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Falha ao recuperar livros do localStorage:", err);
  }
  return LIVROS_INICIAIS;
}

function gerarId(lista) {
  return lista.length ? Math.max(...lista.map((l) => l.id)) + 1 : 1;
}

function App() {
  const [livros, setLivros] = useState(obterLivrosIniciais);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(livros));
    } catch (err) {
      console.warn("Falha ao salvar livros no localStorage:", err);
    }
  }, [livros]);

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

  const livrosFiltrados = livros
    .filter((l) => {
      if (filtro === "concluidos") return l.concluido;
      if (filtro === "lendo") return !l.concluido;
      return true;
    })
    .filter((l) => {
      if (!busca.trim()) return true;
      const termo = busca.trim().toLowerCase();
      return (
        l.titulo.toLowerCase().includes(termo) ||
        (l.autor && l.autor.toLowerCase().includes(termo)) ||
        (l.genero && l.genero.toLowerCase().includes(termo))
      );
    });

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
          <div className="estante__cabecalho">
            <h2>Seus livros</h2>
            <BarraBusca
              termo={busca}
              onBuscar={setBusca}
              onLimpar={() => setBusca("")}
            />
          </div>
          <Filtros filtro={filtro} onFiltrar={setFiltro} contagem={contagem} />
          {carregando ? (
            <EstadoCarregamento />
          ) : (
            <ListaLivros
              livros={livrosFiltrados}
              filtro={filtro}
              termoBusca={busca}
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
