/*
 * Gestion des actions diverses / générales sur l'ensemble des pages
 */

var menuIsOpen = false; // Défini que le menu est fermé
var currentPageIndex = 1; // Défini l'index mininm / courant
var maxPageIndex = 5; // Défini l'index maximum 
var isScrolling = false; // Défini que le scroll n'a pas commencé

// Ouverture & Fermeture du menu
$('#menu-toggle, .nav-item').click(function () {
  menuToggle();
});

// Scroll jusqu'à la div choisis dans le menu
$('#menu ul li a').click(function () {
  let that = $(this).attr('href');
  $('html').animate({
    scrollTop: $(that).offset().top
  }, 1000);
  currentPageIndex = that.substr(1);
  // Différentes action en fonction de l'index de la page
  switch (currentPageIndex) {
    case '1':
      portfolioOut();
      competencesOut();
      experiencesOut();
      diplomesOut();
      break;
    case '2':
      portfolioIn();
      // ------------
      experiencesOut();
      competencesOut();
      diplomesOut();
      break;
    case '3':
      portfolioIn();
      competencesIn();
      // ------------
      experiencesOut();
      diplomesOut();
      break;
    case '4':
      portfolioIn();
      competencesIn();
      experiencesIn();
      // ------------
      diplomesOut();
      break;
    case '5':
      portfolioIn();
      competencesIn();
      experiencesIn();
      diplomesIn();
      break;
  }
  changePageNumber();
  return currentPageIndex;
});

$('.view-case-action').click(function() {
  var viewCaseId = $(this).attr('data-target');
  viewCase(viewCaseId);
});

$('.view-case-close').click(function() {
  closeCase();
});

// Gestion de l'ouverture du menu
function menuToggle() {
  if (menuIsOpen == false) {
    $('#menu').addClass('active');
    menuIsOpen = true;
  } else {
    $('#menu').removeClass('active');
    menuIsOpen = false;
  }
}

// Gestion du scroll page par page
function scrollPage() {
  event.preventDefault();
  if (event.deltaY > 0) {
    scrollPageDown();
  } else {
    scrollPageUp();
  }
}

// Scroll vers le bas
function scrollPageDown() {
  if (!isScrolling) {
    if (currentPageIndex != maxPageIndex) currentPageIndex++;
    var currentPage = '#' + currentPageIndex;
    isScrolling = true;
    setTimeout(scrollOver, 1000);
    $('html').animate({
      scrollTop: $(currentPage).offset().top
    }, 1000);
    // Différentes action en fonction de l'index de la page
    switch (currentPageIndex) {
      case 2:
        portfolioIn();
        break;
      case 3:
        competencesIn();
        break;
      case 4:
        experiencesIn();
        break;
      case 5:
        diplomesIn();
        break;
    }
    changePageNumber();
  }
}

// Scroll vers le haut
function scrollPageUp() {
  if (!isScrolling) {
    if (currentPageIndex != 1) currentPageIndex--;
    var currentPage = '#' + currentPageIndex;
    isScrolling = true;
    setTimeout(scrollOver, 1000);
    $('html').animate({
      scrollTop: $(currentPage).offset().top
    }, 1000);
    // Différentes action en fonction de l'index de la page
    switch (currentPageIndex) {
      case 1:
        portfolioOut();
        break;
      case 2:
        competencesOut();
        break;
      case 3:
        experiencesOut();
        break;
      case 4:
        diplomesOut();
        break;
    }
    changePageNumber();
  }
}

// Permets un nouveau scroll après la fin du précédent
function scrollOver() {
  isScrolling = false;
}

// Gestion du changement de page
function changePageNumber() {
  $('#current-page-number').animate({
    'opacity': '0'
  }, 500);
  setTimeout(changeText, 500)
  $('#current-page-number').animate({
    'opacity': '1'
  }, 500);
}

// Change le texte au bon moment
function changeText() {
  $('#current-page-number').text(currentPageIndex);
}

// Apparition & Disparition portfolio
function portfolioIn() {
  $('.cardProjet').addClass('active')
}

function portfolioOut() {
  $('.cardProjet').removeClass('active')
}

// Apparition & Disparition compétences
function competencesIn() {
  $('.cardCompetence').addClass('active');
  setTimeout(growDot, 750);
}

function competencesOut() {
  $('.cardCompetence').removeClass('active');
  $('.frontCompetence, .backCompetence').removeClass('growDot');
}

// Grossissement du point 
function growDot() {
  $('.frontCompetence, .backCompetence').addClass('growDot');
}

// Apparition & Disparition expériences
function experiencesIn() {
  $('.cardExperience').addClass('active');
}

function experiencesOut() {
  $('.cardExperience').removeClass('active');
}

// Apparition & Disparition diplômes
function diplomesIn() {
  footerIn();
  $('.cardDiplome').addClass('active');
}

function diplomesOut() {
  footerOut();
  $('.cardDiplome').removeClass('active');
}

// Apparition & Disparition footer
function footerIn() {
  $('footer').addClass('show-footer');
  $('.page-number').addClass('last-page');
}

function footerOut() {
  $('footer').removeClass('show-footer');
  $('.page-number').removeClass('last-page');
}

// View case
function viewCase(viewCaseId) {
  let id = '#' + viewCaseId;
  $(id).addClass('active');
  isScrolling = true;
}

function closeCase() {
  $('.view-case').removeClass('active');
  scrollOver();
}