# Minha Estante de Livros

Aplicação **React** desenvolvida para a **Aula 08 — Projeto React** da disciplina *Frameworks Front-end*. A aplicação é uma estante de livros onde é possível cadastrar, listar, filtrar, marcar como concluído e excluir livros, exercitando os principais conceitos estudados na aula.

## Demonstrações nos códigos

- **JSX** — sintaxe de componentes com expressões em `{ }`.
- **Componentes** — `Header`, `Filtros`, `FormLivro`, `ListaLivros`, `CardLivro`, `EstadoVazio`, `EstadoCarregamento`.
- **Props** — dados fluem de pai para filho (`livro`, `onAlternarStatus`, `onEditar`, etc.).
- **Virtual DOM / estado** — `useState` e `useEffect` controlam a lista de livros; o React reconcilia e aplica apenas as mudanças.
- **Listas e `key`** — `livros.map(...)` em `ListaLivros`, com `key={livro.id}`.
- **Renderização condicional** — estados de carregamento, lista vazia (por filtro) e modo de edição no formulário.

## Tecnologias

- React 19
- Vite 8 (build e dev server)
- JavaScript (ES modules)
- HTML5 / CSS3 (tema "leitura", responsivo, sem framework CSS)

## Instalação e execução

```bash
npm install
npm run dev
```

Acesse http://localhost:5173.

## Configuração da API

A URL da API é definida por `VITE_API_URL`. Copie o exemplo e ajuste:

```bash
cp .env.example .env
```

Por padrão, o front-end consome a API CRUD de notas no `atividade-crud-api.onrender.com`. Para apontar para uma API local:

```bash
set VITE_API_URL=http://localhost:3000
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy

A publicação é feita na **Vercel** com zero configuração: ao importar o repositório (`jenifferCamar/Minha-estante-de-livros`), a Vercel detecta o Vite, roda `npm install` + `npm run build` e publica automaticamente em cada push de `main`.

> ⚠️ O front-end depende da API no Render (`atividade-crud-api`). Até que o deploy da API esteja ativo, a estante carrega, mas não consegue listar, criar ou atualizar notas.

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Compila a aplicação para produção (`dist/`). |
| `npm run preview` | Visualiza a build de produção localmente. |
| `npm run lint` | Executa o linter (oxidize). |

## Estrutura

```text
Minha-estante-de-livros/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CardLivro.jsx
│   │   ├── EstadoCarregamento.jsx
│   │   ├── EstadoVazio.jsx
│   │   ├── Filtros.jsx
│   │   ├── FormLivro.jsx
│   │   └── ListaLivros.jsx
│   ├── data/
│   │   └── livros.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Atividade

> Desenvolver uma aplicação React que utilize JSX, componentes, props, Virtual DOM, listas/keys e renderização condicional; publicar em repositório público no GitHub com README e deploy na Vercel.

### Critérios atendidos

- [x] Uso de componentes reutilizáveis.
- [x] Passagem de dados via props.
- [x] Listas renderizadas com `map` e `key`.
- [x] Renderização condicional (loading, vazio, edição).
- [x] Estado gerenciado com `useState`.
- [x] Repositório público no GitHub com README.
- [ ] Deploy na Vercel (pendente criação do projeto e push).
