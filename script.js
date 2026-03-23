document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "U")) {
        event.preventDefault();
    }
});


// Pour le scroll de la navbar, on cache la navbar quand on scroll vers le bas et on l'affiche quand on scroll vers le haut
let ancienScroll = 0;
const minimunScroll = 50;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  const scroll = window.scrollY || document.documentElement.scrollTop;

  if (scroll <= 0) {
    navbar.classList.remove("hide");
    ancienScroll = 0;
    return;
  }

  if (scroll - ancienScroll > minimunScroll) {
    navbar.classList.add("hide");
    ancienScroll = scroll;
  } else if (ancienScroll - scroll > minimunScroll) {
    navbar.classList.remove("hide");
    ancienScroll = scroll;
  }

  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }
});

document.addEventListener("click", function (event) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const isClickInside = navbarCollapse.contains(event.target);
  const isNavbarToggler = event.target.closest(".navbar-toggler");

  if (!isClickInside && !isNavbarToggler && navbarCollapse.classList.contains("show")) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  }
});

//Pour changer le bouton mode clair/sombre
function updateToggleButtonText() {
    const toggleBtn = document.getElementById("toggleMode");
    if (document.body.classList.contains("bg-light")) {
        toggleBtn.textContent = "Passer en mode sombre";
    } else {
        toggleBtn.textContent = "Passer en mode clair";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Vérifie le mode actif au chargement et applique le fond d'écran correct
    const accueil = document.getElementById("accueil");

    if (document.body.classList.contains("bg-light")) {
        accueil.classList.remove("accueil-dark");
        accueil.classList.add("accueil-light");
    } else {
        accueil.classList.remove("accueil-light");
        accueil.classList.add("accueil-dark");
    }

    // ajuster les textes mutés au chargement
    document.querySelectorAll('.text-muted').forEach(function(el) {
        if (document.body.classList.contains('bg-dark')) {
            el.classList.remove('text-muted');
            el.classList.add('text-light');
        } else {
            el.classList.remove('text-light');
            el.classList.add('text-muted');
        }
    });

    updateToggleButtonText();
});

document.getElementById("toggleMode").addEventListener("click", function () {
    // Toggle body
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("bg-light");

    document.body.classList.toggle("text-dark");
    document.body.classList.toggle("text-light");

    // Toggle pour les éléments avec .changement-mode
    document.querySelectorAll(".changement-mode").forEach(function (el) {
        el.classList.toggle("bg-dark");
        el.classList.toggle("bg-light");
        el.classList.toggle("text-dark");
        el.classList.toggle("text-light");
    });

    // Mise à jour du style couleur des liens de la navbar
    document.querySelectorAll(".nav-link").forEach(function (link) {
        if (document.body.classList.contains("bg-dark")) {
            link.classList.remove("text-dark");
            link.classList.add("text-light");
        } else {
            link.classList.remove("text-light");
            link.classList.add("text-dark");
        }
    });

    // Fixe bug responsive navbar
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Changement de l'icône du toggler
    const togglerIcon = document.querySelector(".navbar-toggler");
    if (document.body.classList.contains("bg-dark")) {
        togglerIcon.style.filter = "invert(1)";
    } else {
        togglerIcon.style.filter = "invert(0)";
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Si la navbar est visible (déployée)
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
                bsCollapse.hide();
            }
        });
    });

    // const contact = document.getElementById("contact");
    // if (document.body.classList.contains("bg-light")) {
    //     contact.style.backgroundColor = "#343a40"; // Couleur sombre
    // } else {
    //     contact.style.backgroundColor = "red"; // Couleur claire
    // }


    // Changement du fond d'écran d'accueil
    const accueil = document.getElementById("accueil");
    if (document.body.classList.contains("bg-light")) {
        accueil.classList.remove("accueil-dark");
        accueil.classList.add("accueil-light");
    } else {
        accueil.classList.remove("accueil-light");
        accueil.classList.add("accueil-dark");
    }

    const liens = document.querySelectorAll(".lien");

    liens.forEach((lien) => {    //forEach pour désigner chaque lien avec le querySelectorAll
    if (document.body.classList.contains("bg-light")) {
        lien.classList.remove("text-light");
        lien.classList.add("text-dark");
    } else {
        lien.classList.remove("text-dark");
        lien.classList.add("text-light");
    }
    });

    // adjust any muted text for legibility
    document.querySelectorAll('.text-muted').forEach(function(el) {
        if (document.body.classList.contains('bg-dark')) {
            el.classList.remove('text-muted');
            el.classList.add('text-light');
        } else {
            el.classList.remove('text-light');
            el.classList.add('text-muted');
        }
    });

    updateToggleButtonText(); // Met à jour le texte du bouton
});




// API Google Sheets

  const sheetId = '1gDvwcbyvLsSSwE30way_ndas2k6Rl7FMt7GsD4etrL4'; 
  const sheetName = 'Feuille 1'; 
  const apiURL = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('flux-veille');
      if (!container) return;
      
      container.innerHTML = ''; 

      data.reverse().forEach(article => {
        // Changement ici : col-md-6 pour faire 2 colonnes sur PC
        // h-100 sur la carte pour égaliser les hauteurs
        const cardHTML = `
          <div class="col-md-6 mb-4">
            <div class="card p-4 h-100 shadow-sm bg-light text-dark changement-mode border-0 border-start border-success border-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="fw-bold mb-0 text-primary">${article.Titre || 'Article de veille'}</h5>
                </div>
                <p class="small mb-3">${article.Date || ''}</p>
                
                <div class="card-text small mb-4 flex-grow-1">
                    <p class="mb-2"><strong>Constat :</strong> ${article.Constat || 'Non renseigné'}</p>
                    <p class="mb-2"><strong>Technique :</strong> ${article.Technique || 'Non renseigné'}</p>
                    <p class="mb-0"><strong>Lien SLAM :</strong> ${article["Lien SLAM"] || 'Non renseigné'}</p>
                </div>

                <div class="mt-auto">
                    <a href="${article["Lien article"] || '#'}" target="_blank" class="btn btn-sm btn-outline-primary" style="width: fit-content;">
                        Lire l'article source <i class="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                </div>
            </div>
          </div>
        `;
        container.innerHTML += cardHTML;
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('flux-veille').innerHTML = '<p class="text-danger ms-3">Erreur lors de la récupération des articles.</p>';
    });
