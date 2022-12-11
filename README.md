# Equipment Fleet WEB App

## Java console application
Requirements
- Oracle JDK or Open JDK >= 15
- Maven = 3.6.3

Procedure to run the application:
To build and run the app, you must install the required dependency.

If you want to import any dataset into your database, please rename the file name to "1000_equipment.sql" and put it in the source directory. I already added one with 1000 dummy equipment data.

Run your terminal from the same directory where you store the source code. Then run the following command in your terminal.

Build project:

`mvn install `

Run project:

`mvn exec:java -Dexec.mainClass="org.example.Main" -Dexec.cleanupDaemonThreads=false`

> After running the code, you will get some instructions in console mode.

`Please etner DB URL [jdbc:mysql://localhost:3306/mydb]:`
> Here you need to be enter your Database url. You can also provide any remote database also.

`Please enter DB user name [dbuser]:`
> Here you need to be enter your Database username.

`Please enter user pass [12345qwsa]:`
> Here you need to be enter your Database password.

After pressing enter it will take some time and will show you a success picture like below picture.

![alt text](https://i.ibb.co/312RKgr/image.png)

 
Now you can check the database. Your required data are imported successfully into your targeted database. 

 ![alt text](https://i.ibb.co/LQ7GJdj/image.png)

Clean project: 
You can clean the project directory with this command.

`mvn clean`

---

## WEB APPLICATION

System Requirements:
To run the web application your system, you need some application/program installed in your system/server. 
To run API server/backend application developed on Yii framework you will need
1.	PHP >=7.4
2.	Composer >=2.4
3.	MySQL 

To run the client/frontend application developed on Angular and Bootstrap you will need
1.	NodeJS >=16
2.	Angula CLI = 14

Now I am going to describe the procedure how you run the application and I hope you have all those required in your system.

### Yii API/Backend Application
Run your terminal from the same directory where you store the source code I provided in api folder. 

- First you need to be run `composer install` to download the required vendor files.
- Create a MySQL database for the project.
- Now connect your database to the project. To connect your database, go to config/db.php and edit host, dbname, username and password
- Now run the command 'php yii migrate' to create the necessary schemas in database.
- To insert some test data in database we will run `php yii seed` . By doing this we will get a Test user and some fake equipment data. We can test our API with this user and can run the client application with those data.
- At this this point our application is ready to live. Run `php yii serve` to run the application.


 ![alt text](https://i.ibb.co/M96Hn7n/image.png)




### API Endpoint References 
| Function | Method | Endpoint | Auth | Body |
| -------- | ------ | -------- | -----| ---- |
| Login	| POST | /auth/login | No need | email: test@gmail.com  password: 123456 |
|Get All Equipment|	GET |	/equipment	| Bearer Token|	none|
|Add New Equipment | POST |	/equipment	| Bearer Token | name, type, construction_number, construction_year, description, image |
| Update Equipment	|POST	|/equipment/update-data	|Bearer Token|	id, name, type, construction_number, construction_year, description|
|Get Single Equipment|	GET|	/equipment/id|	Bearer Token|	none|
|Delete Equipment|	DEL	|/equipment/id|	Bearer Token|	none|

You can also see more about api endpoints by this postman documentation here [API References](https://documenter.getpostman.com/view/9802662/2s8YswQBiD)





### Angular/Bootstrap Client Application
As like Yii, here we also need to run some command to build and run our frontend application.
1.	At first we will run `npm i`  to download node_modules. Those files are dependency of our application. 
2.	Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

 

You will get a screen like this. Write the email  `test@gmail.com` and password `123456` and hit “Submit” or press “Enter” button to enter into the application.

 ![alt text](https://i.ibb.co/SVNGFGP/image.png)
 
You will get a page like this; Here you can check the equipment list. You can add new equipment and also can edit and delete existing equipment. 

 ![alt text](https://i.ibb.co/FYfS7h7/image.png)