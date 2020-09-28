# ProductsAPI

API desenvolvida como parte de um desafio técnico. Esta API recebe o cadastro e atualização de produtos. 
Alguns clientes costumam enviar requests com mesmo corpo repetidas vezes ao longo de um curto espaço de tempo, assim a API foi desenvolvida para negar requisições que tem o mesmo corpo num intervalo de 10 minutos. Também possui um mecanismo de proteção impondo um rate-limit a cada IP que acessa o serviço.

## Instalando a aplicação

Antes de executar a aplicação certifique-se de instalar todas a dependências descritas no arquivo package.json,para realizar a instalção abra um terminal e na pasta principal do projeto execute o comando:
```
$ npm install

```
## Testando a aplicação:

### Através de testes automatizados:

Após todas as dependências terem sido instaladas, abra um terminal e na pasta principal do projeto execute o comado:
```
$ npm test

```
Automaticamente os testes incluídos na pasta "test" do projeto serão executados e os resultados serão informados no próprio terminal.


