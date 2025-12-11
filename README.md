  # SmartStock RFID - Web
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

  Módulo frontend feito em Next.js para gestão de inventário integrado ao projeto SSRFID.

  ## ✨ Funcionalidades

  O front oferece acesso às seguintes funcionalidades:

  - **Histórico de Conferências (Parcialmente implementada)**: Visualize um histórico detalhado de todas as conferências de inventário realizadas, incluindo leituras de produtos e eventos associados.
  - **CRUD de Produtos (Temporária\*)**: Adicione novos produtos ao inventário, especificando nome, código, descrição e localização, e depois consulte e filtre a lista de produtos já cadastrados no sistema.
  - **Gestão de Usuários (Futura)**: Registre novos usuários no sistema e os gerencie, atribuindo diferentes funções como Administrador ou Operador.

  *Devido ao seu caráter temporário, essa funcionalidade foi codificada com auxílio de ferramentas _low-code_. Os arquivos feitos assim podem ser diferenciados pelo comentário "low-code" em seu topo.

  ## 🚀 Tecnologias Utilizadas

  Este projeto foi construído com as seguintes tecnologias:

  - **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
  - **Framework**: [Next.js 16](https://nextjs.org/) (com App Router)
  - **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/),  [shadcn/ui](https://ui.shadcn.com/) e [Lucide](https://lucide.dev/).

  ## ⚙️ Instalação e uso

  ### Pré-requisitos

  Antes de começar, você precisará ter instalado:


  * [Node.js](https://nodejs.org/) (versão 20.9 ou superior)
  * [pnpm](https://pnpm.io/) (gerenciador de pacotes recomendado)


  ### Instalação



  1.  Clone o repositório:
      ```bash
      git clone {repositório do ssrfid-front}
      cd ssrfid-front
      ```

  2.  Instale as dependências:
      ```bash
      pnpm install
      ```

  3.  Crie um arquivo .env com base no .env.example e adicione as configurações necessárias:
      ```bash
      cp .env.example .env
      ```

  ### Executando o Servidor de Desenvolvimento

  Para iniciar a aplicação em modo de desenvolvimento, execute:

  ```bash
  pnpm dev
  ```



  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado. A página será atualizada automaticamente conforme você edita os arquivos.



  ## 📁 Estrutura do Projeto

  A estrutura de pastas do projeto segue as convenções do Next.js App Router:

  ```
  src/
  ├── api/                    # Lógica de comunicação com a API
  │   ├── app/                # Páginas e Layouts
  ├── components/             # Componentes React reutilizáveis
  │   ├── ui                  # Componentes base (shadcn/ui)
  ├── constants.ts            # Configurações da aplicação
  ├── env/                    # Configuração e validação de variáveis de ambiente
  ├── hooks/                  # Hooks customizados
  ├── types.ts                # Definições de tipos TypeScript
  └── utils.ts                # Funções utilitárias
  ```

  ## ✅ Todo

  As seguintes funcionalidades ainda precisam ser implementadas:

  - Visualização dos detalhes do Inventário em formato de Drawer no mobile
  - Em detalhes do Inventário, adicionar lista de produtos e eventos associados a ele
  - Paginação na listagem de Inventários
  - Dockerizar aplicação
  - Adicionar relatórios dos Inventários em CSV/PDF
  - Adicionar gráficos com informações sobre os Inventários em sua listagem
  - Alterar o back pra retornar a data/hora do inventario no GetAll _(em caso de demora)_
  - CRUD de funcionários _(aguardando backend)_
  - Melhorar experiência mobile e completar CRUD no módulo de Produtos _(baixa prioridade)_
  - Adicionar uma cobertura mínima de testes _(desejável)_


## 👀 OBS:

- Onde você ver object instanceof Error, deveria ser object instanceof ApplicationException (para pegar os tipos ExternalAPIException e NetworkFetchException), mas por algum motivo retorna false sempre.
