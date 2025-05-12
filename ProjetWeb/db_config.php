<?php

$db_dsn = "mysql:host=localhost;dbname=projet";
$username = "root";
$mot_pass = "";

try
{
    $pdo = new PDO($db_dsn, $username, $mot_pass);
}
catch (Exception $e)
{
    die("ERREUR" . $e->getMessage());
}


?>