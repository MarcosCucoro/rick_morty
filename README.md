# 🛸 Rick and Morty Universe Explorer

### *"Wubba Lubba Dub Dub!"* - Uma jornada interdimensional através do Angular 20

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-40.5%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-29.2%25-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Rick and Morty API](https://img.shields.io/badge/Rick%20%26%20Morty-API-97ce4c?style=for-the-badge)](https://rickandmortyapi.com/)

---

*Bem-vindo ao multiverso infinito de Rick Sanchez! Este projeto é um portal interdimensional construído com as tecnologias mais avançadas da Terra C-137 (também conhecida como Angular 20) para explorar personagens, localizações e episódios da série Rick and Morty.*

</div>

---

## 🌌 Sobre o Projeto

Imagine ter acesso ao **Portal Gun** de Rick, mas em vez de viajar entre dimensões, você explora dados! Este é um projeto educacional desenvolvido em **Angular 20** que consome a [Rick and Morty API](https://rickandmortyapi.com/) para fornecer uma experiência imersiva no universo da série.

O projeto foi construído sem instalação global do Angular CLI, utilizando `npx` para manter o ambiente limpo e modular, assim como Rick mantém seu laboratório... bem, na verdade, o laboratório dele é uma bagunça, mas você entendeu a ideia.

### 🎯 Objetivos de Aprendizado

Este portal interdimensional foi criado para explorar conceitos avançados de desenvolvimento web:

- **Angular 20**: A versão mais recente do framework, com todas as funcionalidades de ponta que nem mesmo o Conselho de Ricks conhece
- **Server-Side Rendering (SSR)**: Para renderização mais rápida que o carro voador do Jerry
- **Consumo de APIs REST**: Integrando dados externos como Rick integra tecnologia alienígena
- **Gerenciamento de Estado**: Mantendo o controle do caos interdimensional
- **Roteamento e Navegação**: Navegando entre páginas como Rick navega entre dimensões
- **TypeScript**: Tipagem estática para evitar bugs que nem mesmo o Rick conseguiria resolver

---

## ✨ Funcionalidades Interdimensionais

### 🧬 Exploração de Personagens
Navegue por centenas de personagens do multiverso, desde o genial Rick Sanchez até o inocente Morty Smith, passando por Pickle Rick, Mr. Meeseeks e todos os outros habitantes das infinitas dimensões.

### 🌍 Localizações do Multiverso
Descubra localizações icônicas como a Cidadela dos Ricks, Planeta Gazorpazorp, Dimensão C-137 e muitas outras. Cada localização vem com informações detalhadas sobre seus residentes e características únicas.

### 📺 Episódios da Série
Acesse informações completas sobre todos os episódios da série, incluindo datas de exibição, personagens que aparecem e muito mais. Reviva suas aventuras favoritas!

### 🔍 Busca Avançada
Sistema de busca em tempo real para encontrar rapidamente qualquer personagem, localização ou episódio. Mais eficiente que o mecanismo de busca do Google da Dimensão J19ζ7.

### 🎨 Interface Responsiva
Design adaptável que funciona perfeitamente em qualquer dispositivo, desde o smartphone do Morty até o computador multidimensional do Rick.

---

## 🚀 Tecnologias do Laboratório

Este projeto utiliza as seguintes tecnologias de ponta (aprovadas pelo Conselho de Ricks):

| Tecnologia | Versão | Uso | Porcentagem |
|------------|--------|-----|-------------|
| **Angular** | 20.3.7 | Framework principal | - |
| **TypeScript** | Latest | Linguagem de programação | 40.5% |
| **HTML5** | - | Estrutura e marcação | 30.3% |
| **SCSS** | - | Estilização avançada | 29.2% |
| **RxJS** | Latest | Programação reativa | - |
| **Angular CLI** | 20.3.7 | Ferramentas de desenvolvimento | - |

### 🔧 Ferramentas Auxiliares

- **Server-Side Rendering (SSR)**: Para performance interdimensional
- **Karma**: Test runner para testes unitários
- **TypeScript Compiler**: Transpilação e verificação de tipos
- **SCSS Preprocessor**: Compilação de estilos avançados

---

## 📦 Instalação e Configuração

### Pré-requisitos

Antes de abrir o portal, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - O combustível do portal
- **npm** ou **pnpm** - Gerenciador de pacotes interdimensionais

### Clonando o Repositório

```bash
# Clone este repositório para sua dimensão local
git clone https://github.com/MarcosCucoro/rick_morty.git

# Entre no diretório do projeto
cd rick_morty
```

### Instalando Dependências

```bash
# Instale todas as dependências necessárias
npm install
```

---

## 🎮 Comandos de Execução

### 🌐 Servidor de Desenvolvimento

Para iniciar o portal interdimensional em modo de desenvolvimento:

```bash
# Usando npm
npm start

# Ou usando Angular CLI diretamente (sem instalação global)
npx ng serve
```

Após a inicialização, abra seu navegador e acesse `http://localhost:4200/`. O portal recarregará automaticamente sempre que você modificar os arquivos fonte. É como ter um portal que se auto-repara!

### 🏗️ Build de Produção

Para compilar o projeto para produção:

```bash
# Usando npm
npm run build

# Ou usando Angular CLI
npx ng build
```

Os artefatos de build serão armazenados no diretório `dist/`. O build de produção otimiza automaticamente a aplicação para máxima performance e velocidade - mais rápido que o carro espacial do Rick!

### 🧪 Executando Testes

#### Testes Unitários

```bash
# Usando npm
npm test

# Ou usando Angular CLI
npx ng test
```

Os testes unitários são executados com [Karma](https://karma-runner.github.io), garantindo que cada componente funcione perfeitamente em todas as dimensões.

#### Testes End-to-End (E2E)

```bash
npx ng e2e
```

> **Nota:** O Angular CLI não vem com um framework de testes E2E por padrão. Você pode escolher o que melhor atende suas necessidades interdimensionais.

---

## 🗂️ Estrutura do Projeto

```
rick_morty/
│
├── .vscode/                 # Configurações do VS Code
├── public/                  # Arquivos públicos estáticos
├── src/                     # Código fonte do portal
│   ├── app/                 # Componentes da aplicação
│   │   ├── core/            # Componentes reutilizáveis
│   │   ├── features/        # Páginas principais
│   │   ├── services/        # Serviços e integrações
│   │   └── models/          # Interfaces e tipos
│   ├── assets/              # Imagens, fontes e recursos
│   ├── environments/        # Configurações de ambiente
│   └── styles/              # Estilos globais
│
├── angular.json             # Configuração do Angular
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Este arquivo
```

---

## 🎨 Funcionalidades Detalhadas

### 1. **Explorador de Personagens**

Visualize todos os personagens do multiverso com informações detalhadas:
- Nome e imagem
- Status (Vivo, Morto, Desconhecido)
- Espécie e tipo
- Gênero
- Origem e localização atual
- Lista de episódios em que aparece

### 2. **Catálogo de Localizações**

Explore as diversas localizações do multiverso:
- Nome da localização
- Tipo (Planeta, Dimensão, Estação Espacial, etc.)
- Dimensão de origem
- Lista de residentes conhecidos

### 3. **Guia de Episódios**

Acesse informações completas sobre cada episódio:
- Título do episódio
- Código do episódio (S01E01, etc.)
- Data de exibição
- Personagens que aparecem

### 4. **Sistema de Busca Inteligente**

Busque por qualquer termo em tempo real:
- Busca por nome de personagem
- Busca por localização
- Busca por episódio
- Resultados instantâneos

### 5. **Navegação Interdimensional**

Sistema de rotas bem estruturado:
- Página inicial com visão geral
- Páginas dedicadas para personagens, localizações e episódios
- Páginas de detalhes individuais
- Navegação intuitiva entre seções relacionadas

---

## 🔐 Sistema de Autenticação e Guards

### Proteção de Rotas Interdimensionais

O projeto implementa um sistema completo de autenticação usando **Angular Guards** para proteger as rotas do multiverso. Apenas viajantes autorizados (usuários logados) podem acessar o portal!

### 🛡️ Como Funciona

O sistema de segurança utiliza dois guards principais:

#### **1. Auth Guard** - Protege rotas autenticadas
```typescript
// Verifica se o usuário está logado
// Se NÃO estiver → Redireciona para /login
// Se estiver → Permite acesso à rota
```

#### **2. Login Guard** - Impede acesso ao login quando já autenticado
```typescript
// Verifica se o usuário já está logado
// Se estiver → Redireciona para a página principal
// Se NÃO estiver → Permite acesso ao login
```

### 🔑 Funcionalidades de Autenticação

| Funcionalidade | Descrição |
|----------------|------------|
| **Login sem Back-end** | Sistema de autenticação fake para fins educacionais |
| **Token JWT Fake** | Gera e armazena token JWT simulado no localStorage |
| **Proteção de Rotas** | Guards impedem acesso não autorizado às páginas |
| **Auto-redirecionamento** | Usuários logados são redirecionados automaticamente |
| **Sign Out** | Botão de logout limpa o token e redireciona para login |
| **Return URL** | Após login, usuário é redirecionado para a página que tentou acessar |
| **Validação de Token** | Verifica expiração e validade do token |

### 📝 Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────┐
│              FLUXO DE AUTENTICAÇÃO                       │
└─────────────────────────────────────────────────────────┘

1. Usuário acessa /characters (rota protegida)
                    ↓
2. authGuard verifica se existe token
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
   Token EXISTE          Token NÃO EXISTE
        ↓                       ↓
   Acesso OK            Redireciona /login
        ↓                       ↓
   Mostra página         Usuário faz login
                              ↓
                      Token salvo no localStorage
                              ↓
                      Redireciona para /characters
```

### 🚀 Como Usar

#### **Fazer Login**

1. Acesse a página de login em `/login`
2. Digite qualquer username e senha (não precisa ser real)
3. Clique em "Entrar"
4. Você será redirecionado para a página principal

> 💡 **Dica:** Como não há back-end, qualquer combinação de username/senha funciona!

#### **Fazer Logout**

1. Clique no botão **"Sign Out"** no navbar
2. Confirme a ação
3. O token será removido e você será redirecionado para o login

### 🔧 Estrutura de Arquivos

```
src/app/
├── guards/
│   ├── auth.guard.ts        # Protege rotas autenticadas
│   └── login.guard.ts       # Redireciona se já logado
├── services/
│   └── auth.service.ts      # Gerencia autenticação e token
└── pages/
    └── login/
        └── login.component.ts  # Página de login
```

### 📦 AuthService - Métodos Principais

```typescript
// Fazer login e salvar token
login(username: string, password: string): boolean

// Fazer logout e limpar token
logout(): void

// Verificar se está autenticado
isAuthenticated(): boolean

// Obter token atual
getToken(): string | null

// Obter informações do usuário
getUserInfo(): any
```

### 🎨 Exemplo de Uso nos Componentes

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export class NavbarComponent {
  private authService = inject(AuthService);
  
  // Obter informações do usuário logado
  get userInfo() {
    return this.authService.getUserInfo();
  }
  
  // Fazer logout
  onLogout(): void {
    this.authService.logout();
  }
}
```

### 🔒 Rotas Protegidas

Todas as rotas principais do projeto são protegidas pelo `authGuard`:

- `/` - Página inicial (Characters)
- `/locations` - Listagem de localizações
- `/episodes` - Listagem de episódios
- `/character/:id` - Detalhes do personagem
- `/location/:id` - Detalhes da localização
- `/episode/:id` - Detalhes do episódio

Apenas a rota `/login` é pública e protegida pelo `loginGuard` para evitar que usuários já autenticados acessem novamente.

### 💾 Armazenamento do Token

O token JWT fake é armazenado no **localStorage** do navegador:

```javascript
// Estrutura do token
{
  "header": { "alg": "HS256", "typ": "JWT" },
  "payload": {
    "sub": "username",
    "name": "username",
    "iat": 1234567890,
    "exp": 1234654290  // Expira em 24h
  },
  "signature": "fake-signature"
}
```

### ⚠️ Importante

Este sistema de autenticação é **apenas para fins educacionais** e **não deve ser usado em produção**. Em um ambiente real, você deve:

- Implementar back-end com autenticação real
- Usar HTTPS para todas as requisições
- Validar tokens no servidor
- Implementar refresh tokens
- Usar bibliotecas de segurança como JWT
- Adicionar proteção contra CSRF e XSS

---

## 🔌 Integração com a API

Este projeto consome a [Rick and Morty API](https://rickandmortyapi.com/), uma API REST pública e gratuita que fornece dados sobre:

- **826 Personagens**
- **126 Localizações**
- **51 Episódios**

### Endpoints Utilizados

| Endpoint | Descrição |
|----------|-----------|
| `/character` | Lista todos os personagens |
| `/character/:id` | Detalhes de um personagem específico |
| `/location` | Lista todas as localizações |
| `/location/:id` | Detalhes de uma localização específica |
| `/episode` | Lista todos os episódios |
| `/episode/:id` | Detalhes de um episódio específico |

### Exemplo de Resposta da API

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2"
  ]
}
```

---

## 🧪 Geração de Código

O Angular CLI inclui ferramentas poderosas de scaffolding para gerar código automaticamente:

### Gerar um Novo Componente

```bash
npx ng generate component nome-do-componente

# Ou usando a forma abreviada
npx ng g c nome-do-componente
```

### Outros Geradores Disponíveis

```bash
# Gerar um serviço
npx ng generate service nome-do-servico

# Gerar uma diretiva
npx ng generate directive nome-da-diretiva

# Gerar um pipe
npx ng generate pipe nome-do-pipe

# Gerar um módulo
npx ng generate module nome-do-modulo

# Ver lista completa de opções
npx ng generate --help
```

---

## 📚 Recursos e Documentação

### Documentação Oficial

- [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation) - Documentação completa da API
- [Angular Documentation](https://angular.dev) - Documentação oficial do Angular
- [Angular CLI Overview](https://angular.dev/tools/cli) - Referência de comandos do Angular CLI
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Documentação do TypeScript
- [SCSS Documentation](https://sass-lang.com/documentation) - Documentação do SCSS

### Tutoriais e Guias

- [Angular Tutorial](https://angular.dev/tutorials) - Tutoriais oficiais do Angular
- [RxJS Documentation](https://rxjs.dev/) - Documentação da biblioteca RxJS
- [Angular Best Practices](https://angular.dev/best-practices) - Melhores práticas recomendadas

---

## 🎓 Conceitos Aprendidos

Este projeto é uma excelente oportunidade para aprender e praticar:

### **Fundamentos do Angular**
- Componentes e templates
- Data binding (one-way e two-way)
- Diretivas estruturais e de atributo
- Pipes para transformação de dados
- Injeção de dependências

### **Arquitetura e Padrões**
- Arquitetura baseada em componentes
- Separação de responsabilidades
- Services para lógica de negócio
- Observables e programação reativa
- Roteamento e navegação
- **Guards para proteção de rotas**
- **Autenticação e autorização**
- **Gerenciamento de tokens JWT**

### **Integração com APIs**
- HttpClient do Angular
- Requisições HTTP (GET, POST, etc.)
- Tratamento de erros
- Transformação de dados
- Cache e otimização

### **Boas Práticas**
- Código limpo e organizado
- Tipagem estática com TypeScript
- Componentização e reutilização
- Testes automatizados
- Performance e otimização

---

## 🌟 Próximos Passos

Ideias para expandir o portal interdimensional:

- [x] Implementar sistema de autenticação com Guards
- [x] Criar página de login
- [x] Proteger rotas com authGuard
- [ ] Implementar sistema de favoritos
- [ ] Adicionar filtros avançados
- [ ] Criar comparador de personagens
- [ ] Implementar modo escuro/claro
- [ ] Adicionar animações e transições
- [ ] Criar quiz sobre a série
- [ ] Implementar sistema de comentários
- [ ] Adicionar gráficos e estatísticas
- [ ] Criar timeline de episódios
- [ ] Implementar PWA (Progressive Web App)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tem ideias para melhorar o portal ou encontrou algum bug interdimensional, sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este é um projeto educacional e de código aberto. Sinta-se livre para usar, modificar e distribuir conforme necessário.

---

## 👨‍💻 Autor

**Marcos Cucoro**

- GitHub: [@MarcosCucoro](https://github.com/MarcosCucoro)
- Projeto: [rick_morty](https://github.com/MarcosCucoro/rick_morty)

---

## 🙏 Agradecimentos

- **[Rick and Morty API](https://rickandmortyapi.com/)** - Por fornecer os dados do multiverso
- **[Angular Team](https://angular.dev)** - Pelo incrível framework
- **[Adult Swim](https://www.adultswim.com/)** - Pela série fantástica
- **Dan Harmon e Justin Roiland** - Criadores do universo Rick and Morty

---

<div align="center">

### 🛸 *"Get schwifty! It's time to get schwifty in here!"* 🎵

**Desenvolvido com 💚 e muito suco de mega-árvores**

---

[![Rick and Morty](https://img.shields.io/badge/Rick%20%26%20Morty-Approved-97ce4c?style=for-the-badge)](https://www.adultswim.com/videos/rick-and-morty)
[![Wubba Lubba Dub Dub](https://img.shields.io/badge/Wubba%20Lubba-Dub%20Dub-blue?style=for-the-badge)](https://github.com/MarcosCucoro/rick_morty)

**[⬆ Voltar ao topo](#-rick-and-morty-universe-explorer)**

