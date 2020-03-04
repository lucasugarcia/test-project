# Projeto de Teste

Projeto de teste utilizando Python + Flask e JavaScript + React.
Neste repositório, estão contidas a API REST e a aplicação web. A primeira solução recebe as requisições nas rotas definidas e faz a comunicação com o banco de dados PostgreSQL, enquanto a segunda contém as funcionalidades de exibição, criação, alteração e exclusão de um funcionário cadastrado, importação de funcionários com base em um arquivo csv, exportação e filtragem dos dados da tabela e exibição de um gráfico de barras com a informação de quantidade de funcionários cadastrados por dia.

### Pré-requisitos

Para executar esse projeto, três softwares são imprescindíveis: Python 3, Node.js e PostgreSQL.

O Python 3 será utilizado para executar a API em Flask, o Node.js para conseguir usar o comando npm e executar a aplicação web em React e o PostgreSQL, que vai ser acessado pela API.

Então, por favor, antes de tentar rodar algum comando listado abaixo, instale e configure os três softwares citados nesta seção.

Para instalar o Python 3, basta ir até a [página de downloads do Python](https://www.python.org/downloads), baixar a versão mais recente do Python e realizar a instalação.

Para instalar o Node.js, é preciso ir até a [página de downloads do Node.js](https://nodejs.org/en/download/), fazer o download da versão mais recente e instalar o que pacote baixado.

Para o PostgreSQL, escolha seu sistema operacional na [página de downloads do PostgreSQL](https://www.postgresql.org/download/), selecionar o sistema operacional (S.O.) da sua máquina e seguir as instruções da página referente ao S.O. selecionado.
Após a instalação do PostgreSQL, é muito importante garantir que o usuário que foi configurado e acessará o banco de dado, tenha a permissão para criar um banco de dados. Isso pode ser feito através do seguinte comando SQL:

```
ALTER USER <usuário_que_foi_configurado> CREATEDB;
```

### Instalações prévias

Com os pré-requisitos atendidos, é necessário instalar os pacotes usado pela solução. No Python, são precisos os pacotes Flask, flask-cors e psycopg2. Isso pode ser feito com os seguintes comandos:

```
pip3 install Flask
```
```
pip3 install flask-cors
```
```
pip3 install psycopg2
```

Assim, já é possível fazer o clone ou o fork do projeto para ser executado, testado e utilizado.

## Execução da API Rest com o Flask

Com os arquivos deste repositório em seu computador, o primeiro passo é alterar o arquivo create_database.py, onde serão adicionados o usuário, a senha e banco de dados inicial do seu acesso do PostgreSQL. Basta alterar as seguintes linhas do arquivo:

```
db_user = '<usuário_que_foi_configurado>' # Put your user with creationdb permission
db_password = '<senha_do_usuário>' # Put the user's password
initial_db = '<banco_de_dados_inicial>' # Put the database name which your user has access
```

Com esta alteração feita, é possível executar este arquivo para criar nossa estrutura inicial do banco, com o seguinte comando no terminal:

```
python3 create_database.py
```

Assim teremos o banco de dados criado, permitindo fazer a mesma etapa no arquivo api.py, nas linhas:

```
db_user =  '<usuário_que_foi_configurado>'
db_password = '<senha_do_usuário>'
```

Dessa forma, é possível executar a API com o comando em seu terminal:

```
python3 api.py
```

Para testar, basta acessa o endereço localhost:5000 e verificar se a mensagem 'Welcome!' está sendo exibida.

## Execução da aplicação web React

Para fazer funcionar este projeto, é preciso deixar executando a API em Flask e realizar o comando de instalação dos módulos dessa aplicação. Portanto, abra seu terminal, navegue até o diretório /React Application e escreva:

```
npm install
```

Após a instalação, navegue com seu terminal até a pasta /React Application/react-webapp e escreva:

```
npm install
```

E depois:

```
npm start
```

Assim, seu navegador padrão será aberto com a página inicial da aplicação web.

## Imagens do sistema

