<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inscription</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
   <div class="container">
    <div class="header">
    <h2>s'inscrire</h1>
    </div>
    <div class="form-container">
    <form id="registreForm" method="POST" action="registre.php" >
        <div class="input_group">
            <label for="nom">Nom complet</label>
            <input type="text" name="nom" id="nom" placeholder="entrez votre nom complet" required>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="entrez votre address email" required>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="telephone">télephone</label>
            <input type="tel" name="telephone" id="telephone" placeholder="téléphone" required>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="pays">pays</label>
            <input type="text" name="pays" id="pays" values="cameroun" placeholder="pays" required>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="ville">ville de residance</label>
            <input type="text" name="ville" id="ville" values="yaoundé" placeholder="ville" required>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="password">Mot de passe</label>
            <div class="password-wrapper">
              <input type="password" name="password" id="password" placeholder="mot de passe" required>
              <span class="toggle-password">👀</span>
            </div>
            <span class="error"></span>
        </div>

         <div class="input_group">
            <label for="confirm_password">confirmer le mot de passe</label>
            <div class="password-wrapper">
              <input type="password" name="confirm_password" id="confirm_password" placeholder="confirmer" required>
              <span class="toggle-password">👀</span>
            </div>
            <span class="error"></span>
        </div>
        <button type="submit" id="submitbtn">envoyer </button>
    </form>
    <div id="message"></div>
   </div>
   </div>
 <script src="script.js"></script>

</body>
</html>