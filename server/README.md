```bash
# Clone este repositório
# Foi utilizado SSH
$ git clone git@github.com:coutinhomarco/agenda.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd agenda
$ cd server
# Instale as dependências
$ npm install

# Renomeie o arquivo .env.example para .env e mude para suas variáveis locais

# Para criar o banco de dados com seus dados iniciais
$ npm run create
# Caso queria apagar o banco para começar de novo basta executar
$ npm run drop

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

```