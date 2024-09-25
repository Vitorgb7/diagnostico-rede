# 🚀 Diagnóstico de Problemas em Redes Domésticas

## 📖 Descrição

Esta é uma aplicação que permite **diagnosticar** e **resolver problemas de conectividade** em redes domésticas. Os usuários podem identificar questões como interferências, baixa qualidade de sinal, dispositivos com mau desempenho e obter sugestões para melhorar o ambiente de conectividade.

---

## 🛠️ Funcionalidades

- **Diagnóstico Detalhado:**  
  Realiza um diagnóstico completo de problemas comuns em redes Wi-Fi domésticas.

- **Sugestões Automáticas:**  
  Fornece sugestões automáticas para melhorar o sinal e o desempenho da rede.

- **Detecção de Interferências:**  
  Identifica interferências de outros dispositivos ou redes vizinhas.

- **Classificação da Frequência:**  
  Classifica a frequência da rede em boas, médias ou ruins e fornece orientações sobre como melhorar a conectividade.

---

## 🧩 Tecnologias Utilizadas

- **Backend:** Node.js com Express
- **Pacote Wi-Fi:** `node-wifi` para detectar informações de rede
- **CORS:** Para permitir requisições de outros domínios

---

## 📋 Pré-requisitos

Antes de começar, verifique se você tem os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [NPM](https://www.npmjs.com/get-npm) (geralmente instalado junto com o Node.js)

---

## 📥 Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Vitorgb7/diagnostico-rede.git
   cd diagnostico-rede
2. Instale as dependências:
    ```bash
   npm install
3. Configure a interface de rede:

### Abra o arquivo app.js e localize a linha onde a interface é definida:
    npm install

## iface: 'Wi-Fi'
Substitua 'Wi-Fi' pelo nome correto da sua interface conforme encontrado no comando ipconfig.

Inicie o servidor:

    npm start


# 📄 Licença
Este projeto está licenciado sob a `MIT License.`