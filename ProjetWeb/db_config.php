<?php

$db_dsn = "mysql:host=localhost;dbname=ahadi";
$username = "ahadi";
$mot_pass = "Hadi49022000";

try
{
    $pdo = new PDO($db_dsn, $username, $mot_pass);
}
catch (Exception $e)
{
    die("ERREUR" . $e->getMessage());
}


?>