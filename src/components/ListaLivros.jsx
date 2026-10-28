import CardLivro from "./CardLivro";
import EstadoVazio from "./EstadoVazio";

export default function ListaLivros({
  livros,
  filtro,
  termoBusca,
  onAlternarStatus,
  onEditar,
  onExcluir,
}) {
  if (!livros.length) {
    return <EstadoVazio filtro={filtro} termoBusca={termoBusca} />;
  }

  return (
    <ul className="lista-livros">
      {livros.map((livro) => (
        <li key={livro.id}>
          <CardLivro
            livro={livro}
            onAlternarStatus={onAlternarStatus}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        </li>
      ))}
    </ul>
  );
}
