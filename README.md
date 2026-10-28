# 📚 Minha Estante de Livros — Aplicação React

Aplicação web desenvolvida com **React** e **Vite** para gerenciar uma estante pessoal de livros, exercitando na prática os principais fundamentos do ecossistema React: **JSX**, **Componentes**, **Props**, **Virtual DOM**, **Listas com chaves (`key`)** e **Renderização Condicional**.

---

## 🎯 Sumário

- [Descrição](#-descrição)
- [Funcionalidades](#-funcionalidades)
- [Conceitos do React Aplicados](#-conceitos-do-react-aplicados)
  - [1. JSX](#1-jsx-javascript-xml)
  - [2. Componentes](#2-componentes)
  - [3. Props](#3-props-propriedades)
  - [4. Virtual DOM](#4-virtual-dom-e-reconciliação)
  - [5. Listas e Keys](#5-listas-e-prop-key)
  - [6. Renderização Condicional](#6-renderização-condicional)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar Localmente](#-como-executar-localmente)
- [Passo a Passo: Criando o Repositório Público no GitHub](#-passo-a-passo-criando-o-repositório-público-no-github)
- [Deploy na Vercel](#-deploy-na-vercel)

---

## 📖 Descrição

A **Minha Estante de Livros** é um gerenciador de leituras intuitivo, moderno e responsivo. Permite que os leitores organizem suas obras favoritas, controlem o progresso entre obras em andamento e lidas, busquem por títulos em tempo real, adicionem novos títulos ou editem informações existentes, tudo persistido automaticamente no navegador via `localStorage`.

---

## ✨ Funcionalidades

- **Listagem de livros**: visualização em cards com título, autor, gênero e badge de status.
- **Busca em tempo real**: campo de pesquisa instantânea por título, autor ou gênero literário com botão para limpar busca.
- **Cadastro de novos livros**: formulário com validação de campos obrigatórios.
- **Edição em tempo real**: alteração de título, autor e gênero de qualquer livro já cadastrado, reaproveitando o mesmo componente de formulário.
- **Alternância de status**: botão de alternância rápida entre concluído ("✓ Marcar como lido") e em andamento ("↺ Marcar como lendo").
- **Exclusão de livros**: remoção imediata de títulos da estante.
- **Filtro dinâmico por status**: botões com contadores atualizados em tempo real:
  - *Todos* (total de livros)
  - *Lendo* (obras em andamento)
  - *Concluídos* (obras finalizadas)
- **Persistência local (`localStorage`)**: os dados inseridos, editados ou excluídos permanecem salvos mesmo após recarregar ou fechar a página.
- **Feedback de carregamento**: animação suave com SVG simulando a sincronização inicial.
- **Estado vazio amigável**: mensagens contextuais caso a lista geral esteja vazia, um filtro não contenha livros ou uma busca não retorne resultados.

---

## 🧠 Conceitos do React Aplicados

### 1. JSX (JavaScript XML)
O JSX permite escrever estruturas declarativas mesclando HTML e JavaScript:
- Interpolação de variáveis e expressões dinâmicas com chaves `{}`.
- Composição de classes CSS dinâmicas baseadas no status: `className={`card-livro ${statusClasse}`}`.
- Manipuladores de eventos inline: `onClick={() => onAlternarStatus(livro.id)}` e `onChange={(e) => setBusca(e.target.value)}`.

### 2. Componentes
A aplicação foi dividida em componentes funcionais e modulares, seguindo o princípio da responsabilidade única:
- `Header.jsx`: Cabeçalho informativo e temático da aplicação.
- `BarraBusca.jsx`: Componente controlado para filtragem textual em tempo real.
- `FormLivro.jsx`: Formulário controlado para criação e edição de livros.
- `Filtros.jsx`: Barra de navegação com filtros por status e badges de contagem.
- `ListaLivros.jsx`: Container responsável por iterar sobre os livros e renderizar a coleção.
- `CardLivro.jsx`: Card individual de cada livro com botões de ação (status, editar, excluir).
- `EstadoCarregamento.jsx`: Indicador visual de loading com SVG animado.
- `EstadoVazio.jsx`: Feedback visual e mensagens orientativas quando a lista não tem itens.

### 3. Props (Propriedades)
O fluxo de dados no React é estritamente unidirecional (*top-down*). As propriedades foram usadas para:
- Passar dados dos componentes pais para os filhos (ex.: `livro`, `filtro`, `contagem`, `termo`).
- Passar funções de *callback* (ex.: `onSalvar`, `onAlternarStatus`, `onEditar`, `onExcluir`, `onBuscar`, `onLimpar`), permitindo a comunicação filho ➔ pai para atualização do estado.

```jsx
// Exemplo em ListaLivros.jsx repassando dados e callbacks para CardLivro
<CardLivro
  livro={livro}
  onAlternarStatus={onAlternarStatus}
  onEditar={onEditar}
  onExcluir={onExcluir}
/>
```

### 4. Virtual DOM e Reconciliação
O React gerencia uma cópia virtual do DOM na memória:
- Ao interagir com a aplicação (ex.: marcar um livro como lido ou digitar no campo de busca), o estado do componente raiz é modificado via `useState`.
- O React recalcula o Virtual DOM e, através do **algoritmo de reconciliação** (*diffing*), determina exatamente as menores alterações necessárias.
- Apenas os nós HTML alterados são atualizados no DOM real (como a classe do card e o texto do badge), sem re-renderizar nem redesenhar a página inteira.

### 5. Listas e Prop `key`
A renderização de coleções dinâmicas é realizada com o método `.map()` do JavaScript:
- Cada elemento gerado recebe uma prop `key` estável e única (`key={livro.id}` ou `key={opcao.valor}`).
- As chaves permitem ao algoritmo de reconciliação do Virtual DOM identificar exatamente quais itens foram criados, excluídos ou alterados na ordem da lista.

```jsx
// Exemplo em ListaLivros.jsx
<ul className="lista-livros">
  {livros.map((livro) => (
    <li key={livro.id}>
      <CardLivro livro={livro} ... />
    </li>
  ))}
</ul>
```

### 6. Renderização Condicional
Diversos padrões de renderização condicional foram integrados:
- **Operador Ternário (`condicao ? a : b`)**:
  - Exibição de carregamento vs. lista: `{carregando ? <EstadoCarregamento /> : <ListaLivros ... />}`
  - Modos de texto e botão: `{editando ? "Salvar alterações" : "Adicionar à estante"}` e `{concluido ? "Concluído" : "Para ler"}`.
- **Operador Lógico `&&` (Short-circuit)**:
  - Exibição de atributos opcionais: `{autor && <p className="card-livro__autor">por {autor}</p>}`
  - Botão de limpar busca: `{termo && <button className="barra-busca__limpar" ...>✕</button>}`
  - Botão de cancelamento: `{editando && onCancelarEdicao && <button ...>Cancelar</button>}`.
- **Retorno Antecipado (*Early Return*)**:
  - Em `ListaLivros.jsx`, se `!livros.length`, retorna imediatamente `<EstadoVazio filtro={filtro} termoBusca={termoBusca} />`.

---

## 🛠 Tecnologias Utilizadas

- **React 19**
- **Vite 8**
- **JavaScript Moderno (ES Modules)**
- **CSS3 Moderno** (sem frameworks externos, variáveis CSS e design totalmente responsivo)

---

## 📁 Estrutura do Projeto

```text
Minha-estante-de-livros/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BarraBusca.jsx
│   │   ├── CardLivro.jsx
│   │   ├── EstadoCarregamento.jsx
│   │   ├── EstadoVazio.jsx
│   │   ├── Filtros.jsx
│   │   ├── FormLivro.jsx
│   │   ├── Header.jsx
│   │   └── ListaLivros.jsx
│   ├── data/
│   │   └── livros.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior).

### Passo a passo
1. Clone este repositório:
   ```bash
   git clone https://github.com/jenifferCamar/Minha-estante-de-livros.git
   cd Minha-estante-de-livros
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra no navegador: [http://localhost:5173](http://localhost:5173).

---

## 🐙 Repositório Público no GitHub

O projeto está versionado com histórico de commits semânticos:
- `feat`: inclusão de novas funcionalidades (componentes, estante, filtros, busca, formulário).
- `style`: estilização completa com tema acolhedor de leitura.
- `refactor`: modularização de componentes e otimização do fluxo de estado.
- `ci/config`: configuração do `vercel.json` para deploy contínuo.
- `docs`: documentação completa cobrindo todos os requisitos pedagógicos.

Comandos para sincronizar com o GitHub:
```bash
git add .
git commit -m "docs: atualizar documentacao no README"
git push origin main
```

---

## 🌐 Deploy na Vercel

O projeto conta com o arquivo `vercel.json` pré-configurado para hospedagem na **Vercel**:

1. Acesse [vercel.com](https://vercel.com) e conecte com sua conta GitHub.
2. Clique em **Add New...** > **Project**.
3. Selecione o repositório **`Minha-estante-de-livros`**.
4. A Vercel detectará automaticamente a configuração do Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em **Deploy**. A cada novo `git push` na branch `main`, a Vercel publica a nova versão automaticamente!
