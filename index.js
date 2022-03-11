document.querySelector('.header__burger-btn').addEventListener('click', function () {
  document.querySelector('.header__burger-btn').classList.toggle('is-active')
 document.querySelector('.header__nav').classList.toggle('is-active')
  document.querySelector('body').classList.toggle('lock')
});

document.querySelectorAll('.header__nav-link').forEach(function(headerNavLink) {
  headerNavLink.addEventListener('click', function () {
  document.querySelector('.header__nav').classList.remove('is-active')
  document.querySelector('.header__burger-btn').classList.remove('is-active')
});
});

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  
  search.addEventListener('click', function(evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;
    this.style.opacity = 0;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });
  
  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    openBtn.style.opacity = '';
    search.classList.add(params.hiddenClass);
  });
  
  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      openBtn.style.opacity = '';
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close-search", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

//NAV-LINK

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    });
   });
});

//HERO

const swiper = new Swiper('.top-swiper', {

  loop: true,

  allowTouchMove: false,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

//HEADER

const params = {
  btnClassName: "header__item-btn",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

//GALLERY//

const element = document.querySelector('#selectGallery');
const choises = new Choices(element, {
  searchEnabled: false,
  placeholder: false,

});

let gallerySlider = new Swiper(".slides-container", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 50,
  pagination: {
    el: ".gallery-pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev",
    disabledClass: "nav-btn--disabled",
  },

  breakpoints: {

    421: {
      slidesPerGroup: 3,
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 34
    },

    971: {
      slidesPerGroup: 3,
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 34
    },

    1281: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 34
    },

    1601: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 50
    },

  },

  a11y: false,
  keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

  // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми 
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: 'slide-visible',

  on: {
    init: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    }
  }
});

//CATALOG//

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.catalog__item-btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.catalog__tab').forEach(function (tabContent) {
        tabContent.classList.remove('catalog__tab-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog__tab-active')
    })
  })
});


$(function () {
  $("#accordion").accordion({ active: 0, collapsible: true, icons: false }, { heightStyle: "content" });
});

//EDITIONS//
(() => {
document.querySelector('.editions__checkbox-btn').addEventListener('click', function () {
  document.querySelector('.editions__checkbox-btn').classList.toggle('is-active')
  document.querySelector('.editions__checkbox').classList.toggle('is-active');
});
})();

document.addEventListener('DOMContentLoaded', () => {
  (() => {
const MOBILE_WIDTH = 610;

const sliderParamsNotMobile = {
  sliderWrap: "editions__slider-wrap",
  cardsContainerName: "editions__slider",
  cardsWrapName: "editions__slides-wrap",
  card: "editions__content",
  paginationClassName: "gallery-pagination",
  navClassName: "gallery-navigation",
  navBtnClassName: "nav-btn",
  navPrev: "gallery-prev",
  navNext: "gallery-next"
};

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function activateSlider(params) {
  const navigation = document.createElement("div");
  const pagination = document.createElement("div");
  const navBtnPrev = document.createElement("button");
  const navBtnNext = document.createElement("button");

  navigation.classList.add(params.navClassName);

  navBtnPrev.classList.add(params.navBtnClassName);
  navBtnPrev.classList.add(params.navPrev);
  navigation.prepend(navBtnPrev);

  pagination.classList.add(params.paginationClassName);
  navigation.append(pagination);

  navBtnNext.classList.add(params.navBtnClassName);
  navBtnNext.classList.add(params.navNext);
  navigation.append(navBtnNext);

  params.sliderWrapElem.prepend(navigation);

  params.cardsContainer.classList.add("swiper-container");
  params.cardsWrap.classList.add("swiper-wrapper");

  params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
    breakpoints: {
      611: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 7,
      },
      971: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 49,
      },
      1281: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 20
      },
      1601: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50
      },
    },

    pagination: {
      el: `.${params.sliderWrap} .${params.paginationClassName}`,
      type: "fraction"
    },

    navigation: {
      nextEl: `.${params.navNext}`,
      prevEl: `.${params.navPrev}`,
      disabledClass: "nav-btn--disabled",
    },

    on: {
      beforeInit() {
        document.querySelectorAll(`.${params.card}`).forEach((el) => {
          el.classList.add("swiper-slide");
        });
      },

      beforeDestroy() {
        this.slides.forEach((el) => {
          el.classList.remove("swiper-slide");
          el.removeAttribute("role");
          el.removeAttribute("aria-label");
        });

        this.pagination.el.remove();
        navigation.remove();
      }
    }
  });
}

function destroySlider(params) {
  params.cardsSlider.destroy();
  params.cardsContainer.classList.remove("swiper-container");
  params.cardsWrap.classList.remove("swiper-wrapper");
  params.cardsWrap.removeAttribute("aria-live");
  params.cardsWrap.removeAttribute("id");
}

function checkWindowWidth(params) {
  const currentWidth = getWindowWidth();
  params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
  params.cardsContainer = document.querySelector(
    `.${params.cardsContainerName}`
  );
  params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

  if (
    currentWidth > MOBILE_WIDTH &&
    (!params.cardsSlider || params.cardsSlider.destroyed)
  ) {
    activateSlider(params);
  } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
    destroySlider(params);
  }
}

checkWindowWidth(sliderParamsNotMobile);

window.addEventListener("resize", function () {
  checkWindowWidth(sliderParamsNotMobile);
});
})();
});

//DEVELOPMENTS//

(() => {
  const MOBILE_WIDTH = 610;
  const DESKTOP_WIDTH = 970;
  const btn = document.querySelector(".developments__btn");

  const sliderMobileParams = {
    paginationClassName: "events-pagination",
    cardsContainerName: "developments__slider",
    cardsWrapName: "developments__list",
    card: "developments__item",
    hiddenClass: "is-hidden"
  };

  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateMobileSlider(params) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 1,
      spaceBetween: 15,
      centerMode: true,
      pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
        }
      }
    });
  }

  function destroyMobileSlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function setHiddenCards(params, windowWidth) {
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;

    if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }

    if (windowWidth >=DESKTOP_WIDTH) {
      quantity = 3;
    }

    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) {
    const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

    e.target.style = "display: none";

    cards.forEach((card) => {
      card.classList.remove(sliderMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    btn.style = "";
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateMobileSlider(params);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
      destroyMobileSlider(params);
    }

    setHiddenCards(params, currentWidth);
  }

  checkWindowWidthMobile(sliderMobileParams);
  btn.addEventListener("click", showCards);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(sliderMobileParams);
  });
})();

//PROJECTS//

const project__swiper = new Swiper('.projects__swiper', {
  // Optional parameters
  loop: true,


  // If we need pagination
  pagination: {
    el: '.projects__swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.projects__navigation-next',
    prevEl: '.projects__navigation-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    hide: true,
  },
  breakpoints: {
 
    641: {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 34,
    },
    971: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1281: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 50,
    },

  },
});

tippy('.js-tooltip', {
  theme: 'violet',
  trigger: 'click',
});

//CONTACTS

setMenuListener();

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);

new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
    mail: {
      required: true,
      email: true
    },
  },

  messages: {
    tel: {
      required: "Поле обязательно для заполнения",
    },
    name: {
      required: "Поле обязательно для заполнения",
      minLength: "Минимальное количество символов 2",
      maxLength: "Максимальное количество символов 10",
    },
  },
});

ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.76060876534289, 37.63762148710262],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14,
    controls: ['zoomControl', 'geolocationControl'],
  },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "270px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "195px", right: "20px" }
    },
  );

  // Создание геообъекта с типом точка (метка).
  //  var myGeoObject = new ymaps.GeoObject({
  //      geometry: {
  //          type: "Point", // тип геометрии - точка
  //          coordinates: [48.872185073737896, 2.354223999999991], // координаты точки
  //      }
  //  });

  var myPlacemark = new ymaps.Placemark([55.7582199819277, 37.60074310661473], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-mark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]

  });

  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');

  // Размещение геообъекта на карте.
  //  myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myPlacemark);
}