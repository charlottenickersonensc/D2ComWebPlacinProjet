<?php

require "db_config.php";
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$note = isset($_POST['note']) ? htmlspecialchars($_POST['note']) : null;
$commentaire = isset($_POST['commentaire']) ? htmlspecialchars($_POST['commentaire']) : "";
$email_eleve = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : null;
$id_matiere = isset($_POST['id_matiere']) ? htmlspecialchars($_POST['id_matiere']) : null;
$date = date('Y-m-d');

if (empty($note) || empty($email_eleve) || empty($id_matiere))
{
    echo json_encode(["message" => "❌ Données manquantes", "note" => $note, "email" => $email_eleve, "id_matiere" => $id_matiere]);
    exit;
}

// Récupération de l'id de l'élève
$sql2 = "SELECT id_user FROM users WHERE email = ?";
$requete2 = $pdo->prepare($sql2);
$requete2->execute([$email_eleve]);
$reponse2 = $requete2->fetch(PDO::FETCH_ASSOC);

if (!$reponse2) 
{
    echo json_encode(["message" => "❌ Élève non trouvé"]);
    exit;
}


// Insertion de la note
$sql = "INSERT INTO notes(id_user, id_matiere, note, date, commentaire) VALUES (?, ?, ?, ?, ?)";
$requete = $pdo->prepare($sql);
$requete->execute([
    $reponse2["id_user"],
    $id_matiere,
    $note,
    $date,
    $commentaire
]);

if ($requete->rowCout > 0)
{
    echo json_encode(["message" => "✅ Note ajoutée avec succès"]);
}
else 
{
    echo json_encode(["message" => "❌ Erreur lors de l'ajout de la note"]);
}

?>
