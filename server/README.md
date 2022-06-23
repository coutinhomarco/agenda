# Back end

<h2>Tecnologias utilizadas:</h2>
<ul>
    <li>Node</li>
    <li>Express</li>
    <li>JsonWebToken</li>
    <li>Swagger-ui-express</li>
    <li>React Router Dom</li>
    <li>mysql2</li>
    <li>nodemon</li>
    <li>sequelize</li>
    <li>sequelize-cli</li>
    <li>dotenv</li>
    <li>Jest</li>

</ul>
<hr>


```bash
# Acesse a pasta do projeto no seu terminal/cmd
$ cd agenda
$ cd server
# Instale as dependências
$ npm install

Renomeie o arquivo .env.example para .env e mude para suas variáveis locais

exemplo:

MYSQL_PASSWORD=1234567
MYSQL_USER=root
MYSQL_HOST=localhost
MYSQL_DATABASE=agenda
PORT=3001
JWT_SECRET=123456

# Para criar o banco de dados com seus dados iniciais
$ npm run create
# Caso queria apagar o banco para começar de novo basta executar
$ npm run drop

# Caso queria rodar os comandos drop e create junto basta executar
$ npm run all

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

```

<h1>Endpoints:</h1>

Acesse
http://localhost:3001/api-docs
para ver a documentação

