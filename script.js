const registerForm = document.getElementById('registreForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const messagediv = document.getElementById('message');
        const submitbtn = document.getElementById('submitbtn');

        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        if (messagediv) messagediv.style.display = 'none';
        

        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmePassword = document.getElementById('confirm_password').value;
        let isValid = true;

        if (password.length < 6) {
            showError('password', 'Le mot de passe doit contenir au moins 6 caractères');
            isValid = false;
        }

        if (password !== confirmePassword) {
            showError('confirm_password', 'Le mot de passe ne correspond pas');
            isValid = false;
        }

        if (!isValid) return;

        submitbtn.disabled = true;
        submitbtn.textContent = 'Inscription en cours...';

        const formData = new FormData(registerForm);

        try {
            const response = await fetch('registre.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.statut === 'succes') {
                messagediv.className = 'succes';
                messagediv.innerHTML = '✅ Inscription réussie!<br>Redirection en cours...';
                messagediv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'login.php';
                }, 2500);
            } else {
                messagediv.className = 'error-msg';
                messagediv.innerHTML = '❌ ' + data.message;
                messagediv.style.display = 'block';
            }
        } catch (error) {
            console.log(error);
            messagediv.className = 'error-msg';
            messagediv.innerHTML = '❌ erreur de connexion au serveur';
            messagediv.style.display = 'block';
        }


        submitbtn.disabled = false;
        submitbtn.textContent = "s'inscrire";
    });
}

 //pour afficher et masquer le mot de passe dans le formulaire d'inscription
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const wrapper = this.closest('.password-wrapper');
         if (!wrapper) return;
        const input =  wrapper.querySelector('input');
        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
            this.textContent = '🙈';
        } else {
            input.type = 'password';
            this.textContent = '👀';
        }
    });
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const errorSpan = field.parentElement.querySelector('.error');
    if (errorSpan) errorSpan.textContent = message;
}

const hamburger = document.querySelector('.hamburger');
const navline = document.querySelector('.navline');
const navLinks = document.querySelectorAll('.navline ul li a');

if (hamburger && navline) {
    hamburger.addEventListener('click', () => {
        navline.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navline) {
            navline.classList.remove('active');
        }
        const icon = hamburger ? hamburger.querySelector('i') : null;
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });
  });


const recipeModal = document.getElementById('recipe-modal');
const modalTitle = recipeModal ? recipeModal.querySelector('.modal-title') : null;
const modalDescription = recipeModal ? recipeModal.querySelector('.modal-description') : null;
const modalIngredients = recipeModal ? recipeModal.querySelector('.modal-ingredients') : null;
const modalInstructions = recipeModal ? recipeModal.querySelector('.modal-instructions') : null;
const modalClose = recipeModal ? recipeModal.querySelector('.modal-close') : null;

const recipes = {
    'poulet-dg': {
        title: 'Poulet DG',
        description: 'Un grand classique camerounais, riche en épices et en légumes.',
        ingredients: [
            '1 poulet entier',
            '250 g de feuilles de ndolé',
            '150 g de crevettes',
            '1 oignon',
            '2 tomates',
            '1 cube de bouillon'
        ],
        instructions: [
            'Couper le poulet en morceaux et le faire dorer.',
            'Ajouter l’oignon, la tomate et le cube de bouillon.',
            'Incorporer les feuilles de ndolé et laisser mijoter.',
            'Ajouter les crevettes en fin de cuisson.',
            'Servir chaud avec du plantain ou du manioc.'
        ]
    },
    'riz-saute': {
        title: 'Riz sauté',
        description: 'Riz parfumé aux légumes et épices, parfait quand on veut un plat simple et savoureux.',
        ingredients: [
            '250 g de riz',
            '1 carotte',
            '1 poivron',
            '100 g de viande ou poulet',
            '1 gousse d’ail',
            '1 cuillère à soupe de sauce soja'
        ],
        instructions: [
            'Cuire le riz puis le laisser refroidir.',
            'Faire revenir les légumes et la viande.',
            'Ajouter le riz et mélanger avec les épices.',
            'Assaisonner avec la sauce soja.',
            'Servir chaud et croustillant.'
        ]
    },
    'poisson-braise': {
        title: 'Poisson braisé',
        description: 'Un poisson grillé aux épices, accompagné de manioc ou d’igname.',
        ingredients: [
            '1Kg de poisson frais',
            '1 oignon',
            '5 piment',
            '2 cuillères à soupe d’huile',
            'cube bouillon, sel, ',
            "2 rondell, 2 pébé, du njansans, du piovre blancs, de l'herbe de provence et  de l'anis verte",
            "poivron, proirot, une gousse d'ail"
        ],
        instructions: [
            'Nettoyer et laver le poisson.',
            'Préparer une marinade avec l’oignon, le piment et les épices.',
            'Badigeonner généreusement le poisson.',
            'Griller sur feu moyen jusqu’à cuisson complète.',
            'Servir accompagné de manioc braisé.'
        ]
    },
    'riz-arachide': {
        title: 'Riz sauce arachide',
        description: 'Une sauce onctueuse à base d’arachide pour accompagner le riz.',
        ingredients: [
            '250 g de riz',
            '3 cuillères à soupe de pâte d’arachide',
            '1 oignon',
            '1 tomate',
            'Épices au choix'
        ],
        instructions: [
            'Cuire le riz à part.',
            'Faire revenir l’oignon et la tomate.',
            'Ajouter la pâte d’arachide et diluer avec un peu d’eau.',
            'Laisser mijoter jusqu’à épaississement.',
            'Servir avec le riz chaud.'
        ]
    },
    'bhb': {
        title: 'BHB',
        description: 'Une spécialité riche et parfumée, préparée avec un mélange d’épices locales.',
        ingredients: [
            'Viande au choix',
            'Épices locales',
            'Huile',
            'Légumes'
        ],
        instructions: [
            'Faire revenir la viande et les épices.',
            'Ajouter les légumes coupés.',
            'Cuire à feu doux jusqu’à tendreté.',
            'Rectifier l’assaisonnement.',
            'Servir bien chaud.'
        ]
    },
    'soya': {
        title: 'Soya',
        description: 'Brochettes de viande grillées, très populaires au Cameroun.',
        ingredients: [
            'Viande marinée',
            'Ail',
            'Épices',
            'Huile de cuisson'
        ],
        instructions: [
            'Couper la viande en petits morceaux.',
            'Laisser mariner avec les épices.',
            'Enfiler sur des brochettes.',
            'Griller jusqu’à dorure.',
            'Servir avec une salade ou du plantain.'
        ]
    },
    'koki': {
        title: 'Koki',
        description: 'Plat traditionnel à base de haricots et d’huile de palme.',
        ingredients: [
            'Haricots',
            'Huile de palme',
            'Épices',
            'Feuilles de bananier (si possible)'
        ],
        instructions: [
            'Tremper et éplucher les haricots.',
            'Mixer en purée lisse.',
            'Ajouter l’huile de palme et les épices.',
            'Cuire en papillote dans les feuilles ou dans un moule.',
            'Servir chaud.'
        ]
    },
    'mbongo-tjobi': {
        title: 'Mbongo tjobi',
        description: 'Sauce noire parfumée aux épices locales, traditionnelle des Bassas.',
        ingredients: [
            'Poisson ou viande',
            'Pâte de cannelle',
            'Piments',
            'Épices locales'
        ],
        instructions: [
            'Préparer la pâte d’épices et la cannelle.',
            'Faire revenir la viande ou le poisson.',
            'Ajouter la pâte et laisser mijoter.',
            'Couvrir et cuire lentement.',
            'Servir avec du riz ou du manioc.'
        ]
    },
    'corn-chaff': {
        title: 'Corn chaff',
        description: 'Ragoût de maïs, haricots et viande, plat réconfortant du Cameroun.',
        ingredients: [
            'Maïs concassé',
            'Haricots',
            'Viande',
            'Épices'
        ],
        instructions: [
            'Faire tremper le maïs et les haricots.',
            'Cuire la viande avec les épices.',
            'Ajouter le maïs et les haricots.',
            'Laisser mijoter jusqu’à tendreté.',
            'Servir chaud.'
        ]
    },
    'pomme-pile': {
        title: 'Pomme pilé',
        description: 'Purée de pomme de terre et haricots noirs aromatisée à l’huile de palme.',
        ingredients: [
            'Pommes de terre',
            'Haricots noirs',
            'Huile de palme',
            'Oignon'
        ],
        instructions: [
            'Cuire les pommes de terre et écraser.',
            'Préparer les haricots avec oignon et épices.',
            'Mélanger et chauffer avec l’huile de palme.',
            'Servir en accompagnement.'
        ]
    },
    'eru': {
        title: 'Eru',
        description: 'Ragoût de feuilles d’okok et de waterleaf avec viande fumée et crevettes.',
        ingredients: [
            'Feuilles d’okok',
            'Waterleaf',
            'Viande fumée',
            'Crevettes',
            'Huile de palme'
        ],
        instructions: [
            'Laver et préparer les feuilles.',
            'Faire sauter la viande et les crevettes.',
            'Ajouter les feuilles et cuire lentement.',
            'Incorporer l’huile de palme.',
            'Servir avec du water-fufu.'
        ]
    },
    'taro-jaune': {
        title: 'Taro sauce jaune',
        description: 'Taro pilé servi avec une sauce jaune crémeuse à l’huile de palme.',
        ingredients: [
            'Taro',
            'Huile de palme',
            'Sel',
            'Épices'
        ],
        instructions: [
            'Cuire le taro jusqu’à tendreté.',
            'Écraser pour obtenir une purée lisse.',
            'Préparer une sauce jaune avec huile de palme.',
            'Servir le taro avec la sauce chaude.'
        ]
    },
    'pistache': {
        title: 'Mets de pistache',
        description: 'Plat riche et parfumé, préparé avec des ingrédients locaux et des épices.',
        ingredients: [
            'Légumes',
            'Épices',
            'Viande',
            'Huile'
        ],
        instructions: [
            'Faire revenir les légumes et la viande.',
            'Ajouter les épices et cuire lentement.',
            'Laisser mijoter jusqu’à tendreté.',
            'Servir chaud.'
        ]
    },
    'ndole-royal': {
        title: 'Ndolé royal',
        description: 'Ndolé crémeux et riche, parfait avec du manioc ou du plantain.',
        ingredients: [
            'Feuilles de ndolé',
            'Arachides',
            'Viande ou crevettes',
            'Épices'
        ],
        instructions: [
            'Préparer les feuilles de ndolé.',
            'Cuisiner la viande avec les épices.',
            'Ajouter la pâte d’arachide et le ndolé.',
            'Mijoter jusqu’à cuisson complète.',
            'Servir avec du plantain.'
        ]
    }
};

if (recipeModal && modalTitle && modalDescription && modalIngredients && modalInstructions) {
    const recipeButtons = document.querySelectorAll('[data-recipe]');

    recipeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const slug = button.dataset.recipe;
            const recipe = recipes[slug];
            if (!recipe) return;

            modalTitle.textContent = recipe.title;
            modalDescription.textContent = recipe.description;
            modalIngredients.innerHTML = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
            modalInstructions.innerHTML = recipe.instructions.map(step => `<li>${step}</li>`).join('');
            recipeModal.classList.add('open');
            recipeModal.setAttribute('aria-hidden', 'false');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            recipeModal.classList.remove('open');
            recipeModal.setAttribute('aria-hidden', 'true');
        });
    }

    recipeModal.addEventListener('click', event => {
        if (event.target === recipeModal) {
            recipeModal.classList.remove('open');
            recipeModal.setAttribute('aria-hidden', 'true');
        }
    });
}
