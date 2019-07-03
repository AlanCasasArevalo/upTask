
# UpTask
## Servidor de desarrollo

Para desplegar esta aplicacion en su maquina local es necesario realizar las siguientes configuraciones:
* Tener instalado en tu maquina MySQL
* Tener instalada en tu maquina nodeJS
* En la el archivo de constantes en el primer apartado de setup de sequelize usar la configuracion que realizo en MySQL:
    * Nombre de la tabla
    * Administrador
    * Password
    * Puerto
    * Y el dialeto que use, en este caso el que ya tiene el proyecto seria el correcto para correrlo con MySQL    
* Tener la instancia de MySQL corriendo

## Compliacion
Una vez realizada la configuracion del servidor de desarrollo se procedera a realizar la descarga de las dependencias del mismo que se ejecuta con el siguiente comando:
`npm install` o `npm i`. 
Como se puede comprobar en el archivo ***package.json*** se puede realizar dos comandos para comenzar, uno de desarrollo y otro de produccion:

    * dev
    * start

Una vez realizados todos los pasos descritos deberiamos obtener en consola una serie de logs entre ellos aparecera el siguiente:

***Conectado a la base de datos.***

Lo cual indica que esta el proyecto corriendo correctamente y conectado a la base de datos MySQL.

Se esta usando la pagina de emails gratuita, en la cual llegaran los correos que se envian desde el back end:
#### [Mailtrap](https://mailtrap.io)

Para la realizacion de dicha funcionalidad se ha usado la siguiente dependencia:
#### [Nodemailer](https://nodemailer.com)









