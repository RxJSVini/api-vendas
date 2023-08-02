<h1>Estrutura do Projeto</h1>

<strong> config </strong> - configurações de bibliotecas externas, como por exemplo, autenticação, upload, email, etc.

<strong>modules</strong> - abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: customers, products, orders e users.

<strong>shared</strong> - módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

<strong>services</strong> - estarão dentro de cada módulo da aplicação e serão responsáveis por todas as regras que a aplicação precisa atender, como por exemplo:

A senha deve ser armazenada com criptografia;
Não pode haver mais de um produto com o mesmo nome;
Não pode haver um mesmo email sendo usado por mais de um usuário;
E muitas outras...



<strong>Configurando as importações</strong>
Podemos usar um recurso que facilitará o processo de importação de arquivos em nosso projeto.

Iniciamos configurando o objeto paths do <strong> tsconfig.json </strong>, que permite criar uma base para cada path a ser buscado no projeto, funcionando de forma similar a um atalho:


```json
"paths": {
  "@config/*": ["src/config/*"],
  "@modules/*": ["src/modules/*"],
  "@shared/*": ["src/shared/*"]
}
```
>  Durante a aula, ficou faltando instalar a biblioteca que irá indicar ao nosso script do `ts-node-dev`, como interpretar os atalhos que configuramos iniciando com o caracter `@`.

O nome dessa biblioteca é `tsconfig-paths`, e para instalar execute o seguinte comando no terminal (na pasta do projeto):

```shell
yarn add -D tsconfig-paths
```

Depois de instalar o `tsconfig-paths`, ajustar o script `dev` no arquivo `package.json`, incluindo a opção `-r tsconfig-paths/register`. Deverá ficar assim:

</em>
<strong>Docker: Instanciando banco de dados </strong>
docker run --name api-vendas -p 5432:5432 -e POSTGRES_USER=seu_usuario -e POSTGRES_PASSWORD=suasenha -itd postgres

<h2>Comandos:</h2>
<ul>
   <li>Acessar o shell interativo do PostgreSQL no contêiner: docker exec -it nome-do-container psql -U postgres</li>
   <li>Listar todos os bancos de dados: \l</li>
   <li>Conectar-se a um banco de dados: \c nome-do-banco-de-dados</li>
   <li>Listar todas as tabelas de um banco de dados: \dt</li>
   <li>Sair do shell interativo do PostgreSQL: \q</li>
</ul>


<strong>Migrações</strong>

<p>Primeiro de tudo, adicionamos o comando abaixo, no package.json, na parte de scripts:</p>
<code>
   "typeorm":"ts-node-dev ./node_modules/typeorm/cli.js"
</code>

</br>
<p>Depois rodamos o comando: <strong>yarn typeorm migration:create -n CreateProducts</strong></p>


<p>Rodando as migrações: <strong>yarn typeorm migration:run </strong></p>