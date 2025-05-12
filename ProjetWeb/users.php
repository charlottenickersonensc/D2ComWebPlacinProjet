<?php


header('Access-Control-Allow-Origin: *');

require "db_config.php";
header('Content-Type: application/json');



$prenom = htmlspecialchars($_POST["prenom"]);
$nom = htmlspecialchars($_POST["nom"]);
$email = htmlspecialchars($_POST["email"]);
$mdp = htmlspecialchars($_POST["mdp"]);
$role = htmlspecialchars($_POST["role"]);
$classe = htmlspecialchars($_POST["classe"]);
$pairs = json_decode($_POST['pairs'], true);

if (!empty($prenom) && !empty($nom) && !empty($email) && !empty($mdp) && !empty($role))
{
    $check = $pdo->prepare("SELECT id_user FROM users WHERE email = ?");
    $check->execute([$email]);
    $tabCheck = $check->fetch(PDO::FETCH_ASSOC);
    if ($tabCheck) 
    {
        echo json_encode([
            "error" => "Cet email est déjà utilisé"
        ], JSON_UNESCAPED_UNICODE); 
        exit;
    }
    
    if ($role == "student" && !empty($classe))
    {
        $sql1 = "INSERT INTO users(nom, prenom, email, mdp, role) VALUES(?, ?, ?, ?, ?)";
        $requete1 = $pdo->prepare($sql1);
        $requete1->execute([$nom, $prenom, $email, $mdp, $role]);

        $id1 = $pdo->lastInsertId();

        $sql3 = "SELECT id_classe FROM classes WHERE nom = ?";
        $res3 = $pdo->prepare($sql3);
        $res3->execute([$classe]);
        $reponse3 = $res3->fetch(PDO::FETCH_ASSOC);
        $id2 = $reponse3["id_classe"];

        $sql4 = "INSERT INTO eleves_classe(id_user, id_classe) VALUES(?, ?)";
        $requete2 = $pdo->prepare($sql4);
        $requete2->execute([$id1, $id2]);

        echo json_encode([
            "prenom" => $prenom,
            "nom" => $nom,
            "email" => $email
        ], JSON_UNESCAPED_UNICODE); 
    }

    else if ($role == "prof" && !empty($pairs)) 
    {
        $sql5 = "INSERT INTO users(nom, prenom, email, mdp, role) VALUES(?, ?, ?, ?, ?)";
        $requete5 = $pdo->prepare($sql5);
        $requete5->execute([$nom, $prenom, $email, $mdp, $role]);

        $id2 = $pdo->lastInsertId();
        for ($i = 0; $i < count($pairs); $i++)
        {
            $sql6 = "INSERT INTO prof_classes_matieres(id_user, id_classe, id_matiere) VALUES (?, ?, ?)";
            $requete6 = $pdo->prepare($sql6);
            $requete6->execute([$id2, $pairs[$i]['classe'], $pairs[$i]['matiere']]);
        }
        echo json_encode([
            "prenom" => $prenom,
            "nom" => $nom,
            "email" => $email
        ], JSON_UNESCAPED_UNICODE); 
    }

    else 
    {
        echo json_encode([
            "erreur" => "Remplir toutes les données"
        ], JSON_UNESCAPED_UNICODE); 
    }         
}

else 
{
    echo json_encode([
        "erreur" => "Remplir toutes les données"
    ], JSON_UNESCAPED_UNICODE); 
}

?>