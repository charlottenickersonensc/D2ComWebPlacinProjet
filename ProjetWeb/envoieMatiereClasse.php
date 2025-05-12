<?php

require "db_config.php";
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$sql1 = "SELECT * FROM classes";
$requete1 = $pdo->query($sql1);
$reponse1 = $requete1->fetchAll(PDO::FETCH_ASSOC);

$sql2 = "SELECT * FROM matieres";
$requete2 = $pdo->query($sql2);
$reponse2 = $requete2->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "classes" => $reponse1,
    "matieres" => $reponse2
], JSON_UNESCAPED_UNICODE);





?>