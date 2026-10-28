export default function BarraBusca({ termo, onBuscar, onLimpar }) {
  return (
    <div className="barra-busca">
      <span className="barra-busca__icone" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="barra-busca__input"
        placeholder="Buscar por título, autor ou gênero..."
        value={termo}
        onChange={(e) => onBuscar(e.target.value)}
        aria-label="Buscar livros"
      />
      {termo && (
        <button
          type="button"
          className="barra-busca__limpar"
          onClick={onLimpar}
          aria-label="Limpar busca"
        >
          ✕
        </button>
      )}
    </div>
  );
}

