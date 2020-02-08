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
// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {

  // Loader and lazy load img
  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
    callback_loaded: function() {
      const loader = document.querySelector('.loader');
      loader.classList.add('loader_hide');
    }
  });

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

  // Animations
  (function () {

    // Catalog
    const listCatalog = document.querySelector('.list-catalog');
    if (listCatalog) {
      const waypoint = new Waypoint({
        element: listCatalog,
        handler: function(direction) {
          if( direction === 'down' ) {
            anime({
              targets: '.list-catalog__title',
              easing: 'easeInOutSine',
              opacity: [0,1],
              translateX: ['-20px', 0],
              duration: 1200,
              delay: anime.stagger(120, {start: 300})
            });
            anime({
              targets: '.list-catalog__col',
              easing: 'easeInOutSine',
              scale: [1.2,1],
              opacity: [0,1],
              translateY: ['25%', 0],
              rotateY: ['45deg',0],
              duration: 1200,
              delay: anime.stagger(120, {start: 300})
            });
            
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }

    // Collection
    const listCollection = document.querySelector('.list-collection');
    if (listCollection) {
      const waypoint = new Waypoint({
        element: listCollection,
        handler: function(direction) {
          if( direction === 'down' ) {
            anime({
              targets: '.list-collection__col',
              easing: 'easeInOutSine',
              scale: [0.8,1],
              opacity: [0,1],
              translateX: ['10%', 0],
              rotateX: ['45deg',0],
              duration: 1200,
              delay: anime.stagger(120, {start: 300})
            });
            
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();
  

});