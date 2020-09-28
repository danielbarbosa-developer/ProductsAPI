# ProductsAPI

API desenvolvida como parte de um desafio técnico. Esta API recebe o cadastro e atualização de produtos. 
Alguns clientes costumam enviar requests com mesmo corpo repetidas vezes ao longo de um curto espaço de tempo, assim a API foi desenvolvida para negar requisições que tem o mesmo corpo num intervalo de 10 minutos. Também possui um mecanismo de proteção impondo um limite de requisições por IP durante um intervalo de tempo.

## Instalando a aplicação

Antes de executar a aplicação certifique-se de instalar todas a dependências descritas no arquivo package.json, para realizar a instalção abra um terminal e na pasta principal do projeto execute o comando:
```
$ npm install
```
## Testando a aplicação

### Através de testes automatizados:

Após todas as dependências terem sido instaladas, abra um terminal e na pasta principal do projeto execute o comado:
```
$ npm test
```
Automaticamente os testes incluídos na pasta "test" do projeto serão executados e os resultados serão informados no próprio terminal.

## Executando a aplicação

Para executar a API, abra um terminal e acesse a pasta "src" do projeto:
```
ProductsAPI$ cd src
```
Ao acessar a pasta "src" execute o comando abaixo:
```
ProductsAPI/src$ node server.js
```
Isso executará o arquivo javascript principal da API. Uma mensagem como essa deverá aparecer em seu terminal:
```
ProductsAPI/src$ node server.js
Listening on port: 3000
```
Agora requisições http poderão feitas através da porta exibida no terminal.

## Alguns recursos utilizados no processo de desenvolvimento

- Visual Studio Code August 2020 (version 1.49)
- Node.js
- Express.js
- Mocha
- JavaScript
- Programação Orientada a Objeto
- Git e controle de versão
- Testes Automatizados



