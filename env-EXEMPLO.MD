### Variáveis do arquivo .env

 `LOGIN_EXPIRATION_SECONDS=99999`

 - Tempo de expiração do cookie em segundos, deve bater com o valor de `LOGIN_EXPIRATION_STRING`
 ----------
`LOGIN_EXPIRATION_STRING=99999d`
- Adcionar o tempo de duração do cookie em formato string, aceito pela lib **Jose**
 ----------
`LOGIN_COOKIE_NAME=nomeDoCookie`
- Adicione o nome que desejar para o cookie
 ----------
`JWT_SECRET_KEY=chave_secreta_do_JWT`
- Adicione o chave secreta do JWT
