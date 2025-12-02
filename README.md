# 📱 GeFi Frontend - App Mobile


Aplicativo mobile de gestão financeira desenvolvido com React Native e Expo.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** ou **yarn** (incluído com Node.js)
- **Expo CLI** (será instalado automaticamente)
- **Android Studio** (para emulador Android) ou **Xcode** (para iOS/Mac)
- **Git** (opcional, para clonar o repositório)

---

## 🚀 Instalação e Execução


### 🔹 Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git

```

---

### 1. Instalar Dependências

```bash
cd seu-repo
npm install
```



### 2. Iniciar o Metro Bundler

```bash
npm start
```

O Expo DevTools abrirá no navegador. Você verá um QR code e opções para abrir o app.

### 3. Abrir o App

#### Opção 1: Emulador Android
```bash
npm run android
```
Ou pressione **`a`** no terminal do Expo

#### Opção 2: Simulador iOS (apenas Mac)
```bash
npm run ios
```
Ou pressione **`i`** no terminal do Expo

#### Opção 3: Dispositivo Físico
1. Instale o app **Expo Go** na Google Play Store ou App Store
2. Escaneie o QR code com o app Expo Go (Android) ou câmera nativa (iOS)

#### Opção 4: Navegador Web
Pressione **`w`** no terminal do Expo

---

## 🔧 Comandos Úteis

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Limpar cache e reiniciar
npm start -- --clear

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no navegador
npm run web

# Instalar nova dependência
npm install nome-do-pacote

# Atualizar dependências
npm update
```

---

## 🎨 Funcionalidades

### 🔐 Autenticação
- Cadastro de usuário com validação
- Login com JWT
- Recuperação de senha via código
- Alteração de senha

### 💰 Gestão Financeira
- Cadastro de entradas (receitas)
- Cadastro de saídas (despesas)
- Transações recorrentes
- Categorização de transações
- Edição e exclusão de registros

### 📊 Análises
- Balanço financeiro (entradas - saídas)
- Próximas saídas recorrentes
- Visualização por período

### 📈 Investimentos
- Lista de investimentos recomendados
- Ações em alta do dia
- Títulos do Tesouro Direto
- Cotações em tempo real

### 👤 Perfil
- Visualização de dados do usuário
- Edição de perfil
- Configurações da conta
- Alternância de tema (Claro/Escuro)

---

## 🗂️ Estrutura do Projeto

```
Frontend/
├── App.js                     # Componente raiz
├── index.ts                   # Entrada do app
├── app.json                   # Configuração Expo
├── package.json               # Dependências
├── .env                       # Variáveis de ambiente
├── screens/                   # Telas do app
│   ├── TelaCadastro.js       # Cadastro de usuário
│   ├── TelaLogin.js          # Login
│   ├── TelaRecuperarSenha.js # Recuperação de senha
│   ├── TelaUsuario.js        # Navegação por abas
│   ├── TelaPerfil.js         # Perfil financeiro
│   ├── TelaPerfilUser.js     # Perfil do usuário
│   ├── TelaConfig.js         # Configurações
│   ├── TelaAlterarSenha.js   # Alterar senha
│   ├── TelaFinancas.js       # Gestão de entradas/saídas
│   └── TelaInvestimento.js   # Investimentos e gráficos
├── styles/                    # Estilos por componente
│   ├── EstiloApp.js
│   ├── EstiloCadastro.js
│   ├── EstiloLogin.js
│   ├── EstiloPerfil.js
│   ├── EstiloFinancas.js
│   └── EstiloInvestimento.js
├── services/
│   └── api.js                 # Configuração Axios
├── context/
│   └── ThemeContext.js        # Gerenciamento de tema
├── theme/
│   └── themes.js              # Temas claro/escuro
└── assets/                    # Imagens e ícones
```

---

## 📦 Dependências Principais

```json
{
  "expo": "^54.0.25",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@react-navigation/native": "*",
  "@react-navigation/native-stack": "*",
  "@react-navigation/bottom-tabs": "*",
  "axios": "^1.12.2",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "react-native-chart-kit": "^6.12.0",
  "react-native-vector-icons": "*",
  "@react-native-community/datetimepicker": "8.4.4",
  "react-native-keyboard-aware-scroll-view": "^0.9.5"
}
```

---

## 🎨 Temas

O app suporta **tema claro e escuro** com alternância automática:

### Tema Escuro (padrão)
- Fundo preto (#000000)
- Texto branco (#FFFFFF)
- Verde neon para destaque (#57FF5A)

### Tema Claro
- Fundo cinza claro (#F7F9FC)
- Texto cinza escuro (#111827)
- Verde para destaque (#089C01)

**Como alternar**: Toque no ícone de lua/sol nas telas de perfil

---


## 🔒 Segurança

- Tokens JWT armazenados com **AsyncStorage**
- Interceptors automáticos para autenticação
- Timeout de 10 segundos nas requisições
- Renovação automática de token em desenvolvimento

---


## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é parte do trabalho acadêmico do curso de Desenvolvimento de Software Multiplataforma.

---

## 📧 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Consulte a documentação do Expo: https://docs.expo.dev/

---

## 🔗 Links Úteis

- [Documentação React Native](https://reactnative.dev/docs/getting-started)
- [Documentação Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Axios](https://axios-http.com/docs/intro)

**🎉 App pronto para desenvolvimento!**
