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

A **Minha Estante de Livros** é um gerenciador de leituras intuitivo e responsivo. Ela permite que os leitores organizem suas obras favoritas, controlem o progresso entre obras em andamento e lidas, além de adicionar novos títulos ou editar informações existentes, tudo em uma interface limpa com tema acolhedor inspirado em leitura.

---

## ✨ Funcionalidades

- **Listagem de livros**: visualização em cards com título, autor, gênero e badge de status.
- **Cadastro de novos livros**: formulário com validação de campos obrigatórios.
- **Edição em tempo real**: alteração de título, autor e gênero de qualquer livro já cadastrado, reaproveitando o mesmo componente de formulário.
- **Alternância de status**: botão rápido para marcar como lido ("✓ Marcar como lido") ou reabrir leitura ("↺ Marcar como lendo").
- **Exclusão de livros**: remoção simplificada de títulos da estante.
- **Filtro dinâmico por status**: botões com contadores atualizados em tempo real para:
  - *Todos* (quantidade total)
  - *Lendo* (em andamento)
  - *Concluídos* (finalizados)
- **Feedback de carregamento**: animação de *loading* com SVG simulando a sincronização inicial.
- **Estado vazio amigável**: mensagens contextuais caso a lista geral ou um filtro específico não contenha livros cadastrados.

---

## 🧠 Conceitos do React Aplicados

### 1. JSX (JavaScript XML)
O JSX permite escrever estruturas semelhantes a HTML diretamente no código JavaScript, combinando lógica e interface de forma declarativa:
- Expressões e valores dinâmicos são interpolados utilizando chaves `{}`.
- Atributos dinâmicos como `className={`card-livro ${statusClasse}`}` e eventos como `onClick={() => onAlternarStatus(livro.id)}`.

### 2. Componentes
A aplicação foi modularizada em componentes funcionais e reutilizáveis, cada um com sua responsabilidade bem definida:
- `Header.jsx`: Cabeçalho informativo da aplicação.
- `FormLivro.jsx`: Formulário controlado para criação e edição de livros.
- `Filtros.jsx`: Barra de navegação com filtros e contadores.
- `ListaLivros.jsx`: Container responsável por iterar sobre os livros.
- `CardLivro.jsx`: Card de apresentação individual com botões de ação.
- `EstadoCarregamento.jsx`: Indicador visual de carregamento.
- `EstadoVazio.jsx`: Mensagem amigável quando nenhum livro é encontrado.

### 3. Props (Propriedades)
O fluxo de dados no React é unidirecional (*top-down*). As propriedades foram usadas para:
- Passar dados dos componentes pais para os filhos (ex.: `livro` passado de `ListaLivros` para `CardLivro`).
- Passar funções de *callback* (ex.: `onAlternarStatus`, `onEditar`, `onExcluir`, `onSalvar`) permitindo que componentes filhos comuniquem eventos de volta aos seus pais.

```jsx
// Exemplo em ListaLivros.jsx passando props para CardLivro
<CardLivro
  livro={livro}
  onAlternarStatus={onAlternarStatus}
  onEditar={onEditar}
  onExcluir={onExcluir}
/>
```

### 4. Virtual DOM e Reconciliação
O React mantém uma representação leve da interface em memória chamada **Virtual DOM**:
- Sempre que o estado (`useState`) de `livros`, `filtro` ou `editando` é alterado, o React gera uma nova árvore do Virtual DOM.
- Por meio do algoritmo de reconciliação (*diffing algorithm*), o React compara a nova árvore com a anterior e calcula o menor número de operações necessárias.
- Apenas os elementos HTML que de fato mudaram são atualizados no DOM real (por exemplo, apenas o badge e o título do card cujo status foi alterado, sem re-renderizar a página inteira), proporcionando máxima performance e fluidez.

### 5. Listas e Prop `key`
A renderização de coleções é realizada através do método `.map()` do JavaScript:
- É obrigatório fornecer uma prop `key` única para cada item (neste projeto, `key={livro.id}`).
- O `key` é essencial para o Virtual DOM identificar de forma eficiente quais itens foram adicionados, removidos ou reordenados entre as renderizações.

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
Diferentes abordagens de renderização condicional foram implementadas no projeto:
- **Operador Ternário (`condicao ? a : b`)**:
  - Exibição de carregamento vs. lista: `{carregando ? <EstadoCarregamento /> : <ListaLivros ... />}`
  - Rótulos e textos: `{concluido ? "Concluído" : "Para ler"}` e `{editando ? "Salvar alterações" : "Adicionar à estante"}`.
- **Operador Lógico `&&` (Short-circuit)**:
  - Exibição condicional de campos opcionais: `{autor && <p className="card-livro__autor">por {autor}</p>}`
  - Botão de cancelamento visível apenas durante edição: `{editando && onCancelarEdicao && <button ...>Cancelar</button>}`.
- **Retorno Antecipado (*Early Return*)**:
  - Em `ListaLivros.jsx`, se a lista filtrada estiver vazia, retorna diretamente o componente `<EstadoVazio />`.

---

## 🛠 Tecnologias Utilizadas

- **React 19**
- **Vite 8**
- **JavaScript (ES Modules)**
- **CSS3 Moderno** (sem frameworks externos, variáveis CSS customizadas e design responsivo)

---

## 📁 Estrutura do Projeto

```text
Minha-estante-de-livros/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
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
└── vite.config.js
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado (versão 18 ou superior recomendada).

### Passo a passo
1. Clone este repositório ou baixe os arquivos do projeto.
2. Acesse a pasta do projeto no terminal:
   ```bash
   cd Minha-estante-de-livros-1
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador no endereço indicado no terminal (normalmente [http://localhost:5173](http://localhost:5173)).

---

## 🐙 Passo a Passo: Criando o Repositório Público no GitHub

Para publicar esta aplicação em um repositório público no GitHub:

1. Acesse o [GitHub](https://github.com) e entre na sua conta.
2. Clique no botão **New** (ou no ícone `+` no topo direito > **New repository**).
3. Preencha os campos:
   - **Repository name**: `Minha-estante-de-livros` (ou o nome de sua preferência).
   - **Description**: `Aplicação React para gerenciamento de livros explorando JSX, componentes, props, Virtual DOM, listas e renderização condicional.`
   - **Visibility**: Selecione obrigatoriamente **Public** (Público).
   - **Initialize this repository with**: Deixe todas as opções desmarcadas (não adicione README, .gitignore ou licença agora, pois o projeto já possui).
4. Clique em **Create repository**.
5. No seu terminal, na pasta do projeto, execute os comandos:
   ```bash
   # 1. Adicione os arquivos ao controle de versão
   git add .

   # 2. Faça o commit das alterações
   git commit -m "feat: implementacao completa da estante de livros em React"

   # 3. Garanta que a branch principal se chama main
   git branch -M main

   # 4. Conecte o repositório remoto (substitua SEU-USUARIO pelo seu username do GitHub)
   git remote add origin https://github.com/SEU-USUARIO/Minha-estante-de-livros.git
   # (Se a origin já existir, use: git remote set-url origin https://github.com/SEU-USUARIO/Minha-estante-de-livros.git)

   # 5. Envie o código para o GitHub
   git push -u origin main
   ```

---

## 🌐 Deploy na Vercel

A aplicação está configurada para deploy automático:
1. Acesse [vercel.com](https://vercel.com) e conecte com sua conta GitHub.
2. Clique em **Add New...** > **Project**.
3. Importe o repositório público criado (`Minha-estante-de-livros`).
4. A Vercel detecta automaticamente o **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em **Deploy**. A aplicação estará online e com HTTPS configurado!
