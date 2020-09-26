# ProductsAPI

API de produtos desenvolvida como parte de um desafio técnico. Esta API recebe o cadastro e atualização de produtos. 
Alguns clientes costumam enviar requests com mesmo corpo repetidas vezes ao longo de um curto espaço de tempo, assim a API foi desenvolvida para negar requisições que tem o mesmo corpo num intervalo de 10 minutos. Também possui um mecanismo de proteção impondo um rate-limit a cada IP que acessa o serviço.