<?php

return [
    'jwt' => [
        'issuer' => 'http://equipment.test',  //name of your project (for information only)
        'audience' => 'http://equipment.test',  //description of the audience, eg. the website using the authentication (for info only)
        'id' => 'JWTID',  //a unique identifier for the JWT, typically a random string
        'expire' => 1800,  //the short-lived JWT token is here set to expire after 5 min.
    ],
];
