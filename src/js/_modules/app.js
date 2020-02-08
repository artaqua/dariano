;'use strict';

import LazyLoad from 'vanilla-lazyload';
import Swiper from 'swiper';
// import 'lightgallery.js';
import anime from 'animejs/lib/anime.es.js';
import 'waypoints/lib/noframework.waypoints.js';
import { 
  toggleScroll,
  hasClass,
  slideToggle,
  slideUp,
  slideDown
} from './functions.js';

// APP
let lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {

  lazyLoadInstance.loadAll();

  // Loader Page
  (function() {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader_hide');
  })();

  // Menu
  const btnMenu = document.querySelector('.btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', (event) => {
      event.preventDefault();
      const sidebarMenu = document.querySelector('.sidebar-menu');
      if ( !hasClass(btnMenu, 'btn-menu_active') ) {
        btnMenu.classList.add('btn-menu_active')
        sidebarMenu.classList.add('sidebar-menu_active');
        toggleScroll('hide');
        anime({
          targets: '.list-nav-sidebar__item, .sidebar-menu__bottom',
          easing: 'easeOutBack',
          opacity: [0,1],
          translateX: ['30px',0],
          rotateX: [90,0],
          duration: 1000,
          delay: anime.stagger(120, {start: 300})
        });
      } else {
        btnMenu.classList.remove('btn-menu_active')
        sidebarMenu.classList.remove('sidebar-menu_active');
        toggleScroll('show');
      }
    }, false);
  }

  const SidebarClose = document.querySelector('.sidebar-menu__close');
  if (SidebarClose) {
    SidebarClose.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      toggleScroll('show');
    }, false);
  }

  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      toggleScroll('show');
    }
  }, false);

  // Preview slider
  const swiper = new Swiper('.preview-slider', {
    speed: 700,
    effect: 'fade',
    autoplay: {
      delay: 7000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });

  // SlideToggle category
  const categoryHeadLink = document.querySelector('.category-head-link');
  if (categoryHeadLink) {
    categoryHeadLink.addEventListener('click', (event) => {
      event.preventDefault();
      const category = document.querySelector('.category');

      if ( !category.classList.contains('category_active') ) {
        category.classList.add('category_active');
      } else {
        category.classList.remove('category_active');
      }
    }, false);
  }

  // // Tabs
  // (function () {
  //   const tabs = document.querySelectorAll('.tab');
  //   if (tabs) {
  //     tabs.forEach(tab => {
  //       const dataTab = tab.querySelector('.tab__link_active').getAttribute('data-tab');
  //       const contentItems = tab.querySelectorAll('.tab__content-item');
  //       const tabLinks = tab.querySelectorAll('.tab__link');
  //       const dataTitle = tab.querySelector('.tab__link_active').getAttribute('data-title');

  //       // Init
  //       contentItems.forEach(block => {
  //         block.classList.remove('tab__content-item_active');
  //       }, false);
  //       tab.querySelector(dataTab).classList.add('tab__content-item_active');

  //       // Change tab
  //       tabLinks.forEach(link => {
  //         link.addEventListener('click', (event) => {
  //           event.preventDefault();
  //           const clickedLink = event.currentTarget;
  //           const clickedLinkData = clickedLink.getAttribute('data-tab');
  //           const clickedLinkDataTitle = clickedLink.getAttribute('data-title');

  //           tabLinks.forEach(link => {
  //             link.classList.remove('tab__link_active');
  //           }, false);
  //           clickedLink.classList.add('tab__link_active');

  //           contentItems.forEach(item => {
  //             item.classList.remove('tab__content-item_active');
  //           }, false);
  //           tab.querySelector(clickedLinkData).classList.add('tab__content-item_active');

  //         }, false);
  //       }, false);
  //     }, false);
  //   }
  // })();

  // // Animations
  // (function () {
  //   const animServices = document.querySelector('.services__row');

  //   function doAnimate() {
  //     anime({
  //       targets: '.services__row, .services__col',
  //       easing: 'easeInOutQuad',
  //       opacity: [0,1],
  //       rotateX: [-45,0],
  //       translateY: [-20,0],
  //       duration: 1000,
  //       delay: anime.stagger(100, {start: 300})
  //     });
  //   }

  //   // Когда доскролили до елемента начать анимацию
  //   if ( animServices ) {
  //     const waypoint = new Waypoint({
  //       element: animServices,
  //       handler: function(direction) {
  //         if( direction === 'down' ) {
  //           doAnimate();
  //           // Animate once
  //           this.destroy();
  //         }
  //       },
  //       offset: '100%'
  //     });
  //   }

  //   const featuresSpecialCol = document.querySelector('.features-special');

  //   if (featuresSpecialCol) {
  //     const waypoint = new Waypoint({
  //       element: featuresSpecialCol,
  //       handler: function(direction) {
  //         if( direction === 'down' ) {
  //           console.log('test');
  //           anime({
  //             targets: '.features-special__col',
  //             easing: 'easeInOutSine',
  //             scale: [0.8,1],
  //             opacity: [0,1],
  //             rotateX: [90,0],
  //             translateY: ['-50%',0],
  //             duration: 1200,
  //             delay: anime.stagger(120, {start: 300})
  //           });
            
  //           // Animate once
  //           this.destroy();
  //         }
  //       },
  //       offset: '100%'
  //     });
  //   }
  // })();
  

});