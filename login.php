<?php
session_start();
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        $message = 'Veuillez remplir tous les champs.';
    } else {
        $conn = new mysqli('localhost', 'root', '', 'db_inscription');
        if ($conn->connect_error) {
            $message = 'Erreur de connexion à la base de données.';
        } else {
            $stmt = $conn->prepare('SELECT id_users, nom, password FROM users WHERE email = ?');
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows === 1) {
                $stmt->bind_result($id, $nom, $hashed_password);
                $stmt->fetch();
                if (password_verify($password, $hashed_password)) {
                    $_SESSION['user_id'] = $id;
                    $_SESSION['user_name'] = $nom;
                    $message = 'Connexion réussie !';
                } else {
                    $message = 'Mot de passe incorrect.';
                }
            } else {
                $message = 'Aucun compte trouvé pour cet e-mail.';
            }
            $stmt->close();
            $conn->close();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Se connecter</h2>
        </div>
        <div class="form-container">
            <?php if ($message): ?>
                <div id="message" class="<?php echo strpos($message, 'réussie') !== false ? 'succes' : 'error-msg'; ?>">
                    <?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?>
                </div>
            <?php endif; ?>
            <form id="loginForm" method="POST" action="login.php">
                <div class="input_group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Entrez votre adresse email" required>
                </div>
                <div class="input_group">
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" required>
                </div>
                <button type="submit" id="submitbtn">Connexion</button>
            </form>
        </div>
    </div>
</body>
</html>
