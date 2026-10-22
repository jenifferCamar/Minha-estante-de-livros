export default function EstadoVazio({ filtro }) {
  const mensagens = {
    todos: "Sua estante está vazia. Adicione seu primeiro livro!",
    lendo: "Nenhum livro em andamento. Que tal começar um?",
    concluidos: "Você ainda não concluiu nenhum livro.",
  };

  return (
    <div className="estado-vazio" aria-live="polite">
      <svg
        className="estado-vazio__icone"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 4h16v2H4zM4 8h16l-2 10H6L4 8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <p>{mensagens[filtro] ?? mensagens.todos}</p>
    </div>
  );
}
