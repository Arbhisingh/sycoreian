(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
    // Scroll to top when clicked
    on('click', '.back-to-top', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToggle = select('.mobile-nav-toggle');
  const navbar = select('#navbar');
  if (mobileNavToggle && navbar) {
    on('click', '.mobile-nav-toggle', function(e) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }
  
  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      
      let targetElement = select(this.hash);
      let header = select('#header');
      let offset = header.offsetHeight;

      if (!header.classList.contains('header-scrolled')) {
        offset -= 20; // Adjust if header is not scrolled (larger)
      }
      
      let elementPosition = targetElement.offsetTop;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        let targetElement = select(window.location.hash);
        let header = select('#header');
        let offset = header.offsetHeight;
        if (!header.classList.contains('header-scrolled')) {
            offset -= 20;
        }
        let elementPosition = targetElement.offsetTop;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
  });

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        if (nextElement) nextElement.classList.add('scrolled-offset') // Add padding to next element to avoid content jump
      } else {
        selectHeader.classList.remove('fixed-top')
        if (nextElement) nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials .swiper-container', { // Updated selector to be more specific
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1, // Default to 1 slide for mobile-first approach
    spaceBetween: 30, // Increased space between slides
    pagination: {
      el: '.testimonials .swiper-pagination', // Updated selector
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      // when window width is >= 576px
      576: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3, // Keep 3 slides for larger screens
        spaceBetween: 30
      }
    }
  });

  /**
   * Animation on scroll (AOS)
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /** 
   * Bootstrap Carousel Initialization (Hero Section)
   */
  const heroCarousel = select('#heroCarousel');
  if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 5000, // Change slide every 5 seconds
      wrap: true // Whether the carousel should cycle continuously or stop at the last slide
    });
  }

})();