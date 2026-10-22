export default function Filtros({ filtro, onFiltrar, contagem }) {
  const opcoes = [
    { valor: "todos", label: "Todos" },
    { valor: "lendo", label: "Lendo" },
    { valor: "concluidos", label: "Concluídos" },
  ];

  return (
    <nav className="filtros" role="group" aria-label="Filtrar livros">
      {opcoes.map((opcao) => {
        const ativo = filtro === opcao.valor;
        return (
          <button
            key={opcao.valor}
            type="button"
            className={`filtro-botao ${ativo ? "ativo" : ""}`}
            aria-pressed={ativo}
            onClick={() => onFiltrar(opcao.valor)}
          >
            {opcao.label}
            <span className="filtro-contagem">{contagem[opcao.valor]}</span>
          </button>
        );
      })}
    </nav>
  );
}
