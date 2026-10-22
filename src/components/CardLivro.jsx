export default function CardLivro({ livro, onAlternarStatus, onEditar, onExcluir }) {
  const { titulo, autor, genero, concluido } = livro;
  const statusClasse = concluido ? "concluido" : "para-ler";
  const statusTexto = concluido ? "Concluído" : "Para ler";

  return (
    <article className={`card-livro ${statusClasse}`}>
      <div className="card-livro__cabecalho">
        <h3 className="card-livro__titulo">{titulo || "Título não informado"}</h3>
        <span className="card-livro__badge">{statusTexto}</span>
      </div>

      {autor && <p className="card-livro__autor">por {autor}</p>}
      {genero && <p className="card-livro__genero">{genero}</p>}

      <div className="card-livro__acoes">
        <button
          type="button"
          className="botao texto"
          onClick={() => onAlternarStatus(livro.id)}
          aria-label={concluido ? "Marcar como lendo" : "Marcar como lido"}
        >
          {concluido ? "↺ Marcar como lendo" : "✓ Marcar como lido"}
        </button>
        <button
          type="button"
          className="botao texto"
          onClick={() => onEditar(livro.id)}
          aria-label="Editar"
        >
          ✎ Editar
        </button>
        <button
          type="button"
          className="botao texto perigo"
          onClick={() => onExcluir(livro.id)}
          aria-label="Excluir"
        >
          ✕ Excluir
        </button>
      </div>
    </article>
  );
}
