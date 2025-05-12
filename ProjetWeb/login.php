<?php
require("db_config.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$email = htmlspecialchars($_POST["email"]);
$mdp = htmlspecialchars($_POST["mdp"]);

$sql1 = "SELECT * FROM users WHERE email = ? AND mdp = ?";
$requete1 = $pdo->prepare($sql1);
$requete1->execute([$email, $mdp]);
$utilisateur = $requete1->fetch(PDO::FETCH_ASSOC);

if (empty($utilisateur))
{
    echo json_encode($utilisateur, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($utilisateur["role"] == "student")
{
    $sql2 = "SELECT n.note, n.commentaire,  m.nom
                    FROM notes n
                    JOIN matieres m ON n.id_matiere = m.id_matiere
                    WHERE n.id_user = ?";
    $requete2 = $pdo->prepare($sql2);
    $requete2->execute([$utilisateur["id_user"]]);
    $reponse1 = $requete2->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "utilisateur" => $utilisateur,
        "notes" => $reponse1
    ], JSON_UNESCAPED_UNICODE);
}

else
{
    $donnes = [];
    $eleves = [];

    $sql4 = "SELECT p.id_classe, p.id_matiere, c.nom AS nom_classe, m.nom AS nom_matiere
                FROM prof_classes_matieres p
                JOIN classes c ON p.id_classe = c.id_classe
                JOIN matieres m ON p.id_matiere = m.id_matiere
                WHERE id_user = ?";
    $requete4 = $pdo->prepare($sql4);
    $requete4->execute([$utilisateur["id_user"]]);
    $reponse4 = $requete4->fetchAll(PDO::FETCH_ASSOC);
    
    for ($i = 0; $i < count($reponse4); $i++)
    {
        $sql5 = "SELECT u.nom, u.prenom, u.email, n.note, n.commentaire
                    FROM notes n
                    JOIN users u ON n.id_user = u.id_user
                    JOIN matieres m ON n.id_matiere = m.id_matiere
                    JOIN eleves_classe e ON u.id_user = e.id_user
                    WHERE e.id_classe = ? AND m.id_matiere = ?
                    ORDER BY n.note DESC";
        $requete5 = $pdo->prepare($sql5);
        $requete5->execute([$reponse4[$i]['id_classe'], $reponse4[$i]['id_matiere']]);
        $reponse5 = $requete5->fetchAll(PDO::FETCH_ASSOC);
        
        if (!empty($reponse5))
        {
            $donnes[] = [
                "classes" => $reponse4[$i]['id_classe'],
                "matiere" => $reponse4[$i]['id_matiere'],
                "notes" => $reponse5
            ];
        }

        $sql6 = "SELECT u.prenom, u.nom, u.email
                    FROM eleves_classe e 
                    JOIN users u ON e.id_user = u.id_user
                    WHERE e.id_classe = ?";
        $requete6 = $pdo->prepare($sql6);
        $requete6->execute([$reponse4[$i]['id_classe']]);
        $reponse6 = $requete6->fetchAll(PDO::FETCH_ASSOC);


        if (!empty($reponse6) && !array_key_exists($reponse4[$i]['nom_classe'], $eleves))
        {
            $eleves[$reponse4[$i]['nom_classe']] = $reponse6;
        }

    }

    echo json_encode([
        "utilisateur" => $utilisateur,
        "classes_matieres" => $reponse4,
        "donnes_classes" => $donnes,
        "eleves" => $eleves
    ], JSON_UNESCAPED_UNICODE);


}


?>