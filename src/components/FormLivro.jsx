import { useEffect, useState } from "react";

export default function FormLivro({ onSalvar, livroEditando, onCancelarEdicao }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");

  const editando = Boolean(livroEditando);

  useEffect(() => {
    if (livroEditando) {
      setTitulo(livroEditando.titulo ?? "");
      setAutor(livroEditando.autor ?? "");
      setGenero(livroEditando.genero ?? "");
    }
  }, [livroEditando]);

  const resetar = () => {
    setTitulo("");
    setAutor("");
    setGenero("");
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (!titulo.trim()) {
      return;
    }

    onSalvar({
      titulo: titulo.trim(),
      autor: autor.trim(),
      genero: genero.trim(),
    });

    if (!editando) {
      resetar();
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit} aria-labelledby="form-titulo">
      <h2 id="form-titulo">{editando ? "Editar livro" : "Adicionar livro"}</h2>

      <div className="campo">
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título do livro"
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="autor">Autor</label>
        <input
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Digite o nome do autor"
        />
      </div>

      <div className="campo">
        <label htmlFor="genero">Gênero</label>
        <input
          id="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          placeholder="Ex.: Fantasia, Tecnologia"
        />
      </div>

      <div className="formulario-acoes">
        <button type="submit" className="botao primario">
          {editando ? "Salvar alterações" : "Adicionar à estante"}
        </button>
        {editando && onCancelarEdicao && (
          <button
            type="button"
            className="botao secundario"
            onClick={onCancelarEdicao}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
