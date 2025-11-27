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

    updateToggleButtonText(); // Met à jour le texte du bouton
});