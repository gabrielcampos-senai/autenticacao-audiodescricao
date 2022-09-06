# Autenticação - Áudiodescrição

Esse projeto é um microsserviço de autenticação para um aplicativo flutter de áudiodescrição. 
Que tem como objetivo fazer a autenticação da pessoa apenas por senha pois possui um único usuario o sistema também é feita a rotina de recuperação de senha com a geração de token e o enviando por e-mail para os e-mails cadastrados na base do DynamoDB.
Existem Endpoints de Administrador para ver os e-mails e seus status(status para recebimento ou não de e-mails de recuperação de senha via token), cadastro de email e remoção de email.

dentro da API não foi feita autenticação de segurança pois utilizamos a da provedora de cloud.

<details><summary>Arquitetura do serviço</summary>

![audescricao-autenticacao](https://user-images.githubusercontent.com/62681139/188652185-697cf44e-733d-4078-aa57-4b4cfa320c62.png)
</details>
