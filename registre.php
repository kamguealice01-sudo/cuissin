<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

$nom         =trim($_POST["nom"]?? '');
$email       =trim($_POST["email"]?? '');
$telephone   =trim($_POST["telephone"]?? ''); 
$pays        =trim($_POST["pays"]?? '');
$ville       =trim($_POST["ville"]?? '');
$password    =trim($_POST["password"]?? '');
$confirm_password    =trim($_POST["confirm_password"]?? '');

if (empty($nom) || empty($email) || empty($password) || empty($confirm_password)){
    echo json_encode(['statut' => 'error', 'message' => "toute les champs obligatoire doivent etre remplis" ]);
    exit;
}
if ($password !== $confirm_password){
     echo json_encode(['statut' => 'error', 'message' => 'les mots de passe ne correspondent pas']);
    exit;
}
if (!filter_var($email,FILTER_VALIDATE_EMAIL)){
     echo json_encode(['statut' => 'error', 'message' => 'Email invalide']);
    exit;
}
//connexion a la base de données
$conn = new mysqli('127.0.0.1', 'root', '', 'db_inscription', 3306);

if ($conn->connect_error){
     echo json_encode(['statut' => 'error', 'message' => "erreur de connexion a la base de données" ]);
    exit;
}
//verifier si l'email exist deja
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0){
     echo json_encode(['statut' => 'error', 'message' => "cet email est deja utilisé" ]);
    exit;
}
 $stmt->close();

// hash de mot de passe 
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (nom, email, `password`, telephone, pays, ville) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss" ,$nom, $email, $hashed_password, $telephone, $pays, $ville);

if ($stmt->execute()){
     echo json_encode(['statut' => 'succes', 'message' => "inscription réussie" ]);
}else {
     echo json_encode(['statut' => 'error', 'message' => "erreur lors de l'inscription" ]);
}

$stmt->close();
$conn->close();
?>