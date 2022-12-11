<p align="center">
    <h1 align="center">Equipment Fleet WEB App</h1>
    <br>
</p>


DIRECTORY STRUCTURE
-------------------

      assets/             contains assets definition
      commands/           contains console commands (controllers)
      config/             contains application configurations
      controllers/        contains Web controller classes
      mail/               contains view files for e-mails
      models/             contains model classes
      runtime/            contains files generated during runtime
      tests/              contains various tests for the basic application
      vendor/             contains dependent 3rd-party packages
      views/              contains view files for the Web application
      web/                contains the entry script and Web resources


### Database

Edit the file `config/db.php` with real data, for example:

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
];
```

### Step to live the application
Download the required vendor files using the following command:
~~~
composer install 
~~~
Now run the command php yii migrate to create the necessary schemas in database.
~~~
php yii migrate 
~~~
To insert some test data in database we will run php yii seed . By doing this we will get a Test user and some fake equipment data. We can test our API with this user and can run the client application with those data.
~~~
php yii seed 
~~~
At this point our application is ready to live. Run php yii serve to run the application.


