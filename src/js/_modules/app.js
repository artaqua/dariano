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
  slideDown,
} from './functions.js';
import { customSelect } from './customSelect.js';

// APP
// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {

  // Lazy load imgs
  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  // Loader
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader_hide');
  }, 100);

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
      const popups = document.querySelectorAll('.popup');
      popups.forEach((popup) => {
        popup.classList.remove('popup_active');
      });
      toggleScroll('show');
    }
  }, false);

  // Preview slider
  const previewSlider = document.querySelector('.preview-slider');
  if ( previewSlider ) {
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
  }

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
              delay: anime.stagger(80, {start: 300})
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
              delay: anime.stagger(80, {start: 300})
            });
            
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();
  
  // Select
  customSelect();

  // toggle options
  const linksOption = document.querySelectorAll('.list-options__link');
  if ( linksOption ) {
    linksOption.forEach(function(link) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const body = event.currentTarget.closest('.list-options__item').querySelector('.list-options__body');
        event.currentTarget.classList.toggle('list-options__link_active');
        slideToggle(body, 400);
      });
    });
  }

  // toggle full materials
  const linksMaterialMore = document.querySelectorAll('.list-materials__more');
  if ( linksMaterialMore ) {
    linksMaterialMore.forEach(function(link) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const content = event.currentTarget.closest('.list-materials').querySelector('.list-materials__hidden-content');

        event.currentTarget.classList.toggle('list-materials__more_active');
        slideToggle(content, 500);
        if ( target.classList.contains('list-materials__more_active') ) {
          target.textContent = 'Скрыть';
        } else {
          target.textContent = 'Показать еще';
        }
      });
    });
  }

  // change inputs size
  const inputSize = document.querySelectorAll('.list-size__input');
  if ( inputSize ) {
    inputSize.forEach(function(input) {
      input.addEventListener('change', (event) => {
        const target = event.currentTarget;
        const inputs = target.closest('.list-options__item').querySelectorAll('.list-size__input');

        inputs.forEach((input) => {
          if ( input.checked ) {
            const name = input.closest('.list-options__item').querySelector('.list-options__name');
            name.textContent = input.value;
          }
        });
      });
    });
  }

  // change inputs materials
  const inputMaterials = document.querySelectorAll('.list-materials__input');
  if ( inputMaterials ) {
    inputMaterials.forEach(function(input) {
      input.addEventListener('change', (event) => {
        const target = event.currentTarget;
        const inputs = target.closest('.list-options__item').querySelectorAll('.list-materials__input');

        inputs.forEach((input) => {
          if ( input.checked ) {
            const name = input.closest('.list-options__item').querySelector('.list-options__name');
            const labelBg = input.nextElementSibling.getAttribute('data-bg').slice(4,-1);
            const img = input.closest('.list-options__item').querySelector('.list-options__icon-img');

            name.textContent = input.value;
            img.src = labelBg;
          }
        });
      });
    });
  }

  // change inputs hardware
  const inputHardware = document.querySelectorAll('.list-hardware__input');
  if ( inputHardware ) {
    inputHardware.forEach(function(input) {
      input.addEventListener('change', (event) => {
        const target = event.currentTarget;
        const inputs = target.closest('.list-options__item').querySelectorAll('.list-hardware__input');

        inputs.forEach((input) => {
          if ( input.checked ) {
            const name = input.closest('.list-options__item').querySelector('.list-options__name');
            name.textContent = input.value;
          }
        });
      });
    });
  }

  // Tabs
  (function () {
    const tabs = document.querySelectorAll('.tab');
    if (tabs) {
      tabs.forEach(tab => {
        const dataTab = tab.querySelector('.tab__link_active').getAttribute('data-tab');
        const contentItems = tab.querySelectorAll('.tab__content-item');
        const tabLinks = tab.querySelectorAll('.tab__link');
        const dataTitle = tab.querySelector('.tab__link_active').getAttribute('data-title');

        // Init
        contentItems.forEach(block => {
          block.classList.remove('tab__content-item_active');
        }, false);
        tab.querySelector(dataTab).classList.add('tab__content-item_active');

        // Change tab
        tabLinks.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedLinkData = clickedLink.getAttribute('data-tab');
            const clickedLinkDataTitle = clickedLink.getAttribute('data-title');

            tabLinks.forEach(link => {
              link.classList.remove('tab__link_active');
            }, false);
            clickedLink.classList.add('tab__link_active');

            contentItems.forEach(item => {
              item.classList.remove('tab__content-item_active');
            }, false);
            tab.querySelector(clickedLinkData).classList.add('tab__content-item_active');

          }, false);
        }, false);
      }, false);
    }
  })();

  const galleryElem = document.querySelector('.gallery-top');
  if ( galleryElem ) {
    // Slider card gallery
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      loop: true,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 3,
      direction: 'vertical',
      slideToClickedSlide: true,
    });
    const galleryTop = new Swiper('.gallery-top', {
      effect: 'fade',
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      initialSlide: 0,
      slideToClickedSlide: true,
      autoHeight: true,
      thumbs: {
        swiper: galleryThumbs,
      }
    });
    galleryThumbs.update();
    galleryTop.update();
  }

  // Вызов заявки
  const btnRequest = document.querySelectorAll('.product-options__btn');
  if ( btnRequest ) {
    btnRequest.forEach(function(link) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const popupRequest = document.querySelector('.popup_request');

        toggleScroll('hide');
        popupRequest.classList.add('popup_active');
      });
    });
  }
  // Вызов заявка успешно отправлена
  const btnRequestSend = document.querySelectorAll('.form-request__btn');
  if ( btnRequestSend ) {
    btnRequestSend.forEach(function(link) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const popup = event.currentTarget.closest('.popup');
        const popupDone = document.querySelector('.popup_done');

        popup.classList.remove('popup_active');
        toggleScroll('hide');
        popupDone.classList.add('popup_active');
      });
    });
  }
  // Закрытие попапа
  const popupBtnClose = document.querySelectorAll('.popup__close');
  if ( popupBtnClose ) {
    popupBtnClose.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const popup = event.currentTarget.closest('.popup');
        
        toggleScroll('show');
        popup.classList.remove('popup_active');
      });
    });
  }
  
  const slederInContacts = document.querySelector('.gallery-contacts');
  if ( slederInContacts ) {
    // Slider gallery contacts
    const galleryContacts = new Swiper('.gallery-contacts', {
      speed: 700,
      // autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  }


});