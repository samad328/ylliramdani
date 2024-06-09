import Lenis from '@studio-freight/lenis';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// PAGES
const loading = document.querySelector('.loading');
const about = document.getElementById('about');
const scattered = document.querySelector('.scattered');
const works = document.getElementById('works');
const projectsTop = document.querySelector('.projects-top');
// const projectsMiddle = document.querySelector('.projects-middle');
const projectsBottom = document.querySelector('.projects-bottom');
const contact = document.getElementById('contact');
// ELEMENTS
const loadingWrapper = document.querySelector('.loading-wrapper');
const mouse = document.querySelector('.mouse');
const navbar = document.querySelector('.nav');
const countdown = document.querySelector('.countdown');
const date = document.querySelectorAll('.date');
const dateString = document.querySelectorAll('.date-string');
const desktop = window.innerWidth >= 650;

// Current date
const currentYear = new Date().getFullYear();
date.forEach(date => {
  date.textContent = '©' + currentYear;
});

const currentYearToString = String(currentYear).slice(-2);
dateString.forEach(date => {
  date.textContent = currentYearToString;
});

// Cubic bezier
const bezier = 'cubic-bezier(0.76, 0.0, 0.24, 1.0)';

// Reusable keyframes
const pageFrames = [
  {
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transform: 'translateY(100%)',
  },
  {
    clipPath: 'polygon(0 0, 100% 0, 100% 105%, 0 105%)',
    transform: 'translateY(0)',
  },
];

// Animation options for pages
const pageOptions = {
  duration: 1500,
  fill: 'forwards',
  easing: bezier,
};

// Animation options for elements
const elementOptions = {
  duration: 800,
  fill: 'forwards',
  easing: bezier,
};

// Intersection observer options
const observerOptions = {
  rootMargin: '0px',
  threshold: 0.3,
};

// Redirecting to homepage
if (window.location.pathname !== '/' || window.location.hash !== '') {
  window.location.href = '/';
}

// Smooth scrolling with lenis library
const lenis = new Lenis();

const raf = time => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

const scrollControl = section => {
  if (desktop) {
    lenis.scrollTo(section, {
      lock: true,
      force: true,
    });
  }
};

// Mouse movement
const animateMouse = e => {
  const x = e.clientX - mouse.offsetWidth / 2;
  const y = e.clientY - mouse.offsetHeight / 2;

  const options = {
    duration: 800,
    fill: 'forwards',
  };

  const keyframes = {
    transform: `translate(${x}px, ${y}px)`,
  };

  mouse.animate(keyframes, options);
};

window.addEventListener('mousemove', animateMouse);

// Navbar animations
let lastScrollTop = 0;

const navbarAnimation = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  const scrollUpFrames = { transform: 'translateY(0)', opacity: 1 };
  const scrollDownFrames = {
    transform: 'translateY(-100%)',
    opacity: 0,
  };

  const options = {
    duration: 500,
    easing: 'ease-in-out',
    fill: 'forwards',
  };

  if (scrollY > lastScrollTop) {
    navbar.animate(scrollDownFrames, options);
  } else if (scrollY < lastScrollTop) {
    navbar.animate(scrollUpFrames, options);
  }

  lastScrollTop = scrollY <= 0 ? 0 : scrollY;
};

window.addEventListener('scroll', navbarAnimation, false);

//
// ABOUT SECTION
//

const sequences = document.querySelectorAll('.sequence');
const sequenceImages = document.querySelectorAll('.sequence-images');
const textSm = document.querySelectorAll('.text-sm');
const single = document.querySelector('.single');
const aboutMobile = document.querySelector('.about-mobile');
const singleHeader = document.querySelector('.header-text__single');

// MOBILE VERSION IS SEPERATELY BECAUSE THE ANIMATE LOOKED BAD WHEN TEXT GOT SMALLER
const aboutInitialMobile = () => {
  sequences.forEach(sequence => (sequence.style.opacity = 0));
  sequenceImages.forEach(image => (image.style.opacity = 0));
  single.style.opacity = 0;
  aboutMobile.style.opacity = 0;
  singleHeader.style.opacity = 0;
};

const aboutEnterMobile = () => {
  setTimeout(() => {
    single.style.opacity = 1;
    single.animate(pageFrames, elementOptions);
  }, 100);

  const sequenceArray = Array.from(sequences).slice(0, 3);
  const lastElement = sequences[sequences.length - 1];

  const asd = [
    {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      transform: 'translateY(0)',
    },
    {
      clipPath: 'polygon(0 105%, 100% 105%, 100% 0, 0 0)',
      transform: 'translateY(0)',
    },
  ];

  sequenceArray.forEach((sequence, i) => {
    setTimeout(() => {
      sequence.style.opacity = 1;
      sequence.animate(pageFrames, elementOptions);

      lastElement.style.opacity = 1;
      lastElement.animate(asd, {
        duration: 1000,
        fill: 'forwards',
        easing: bezier,
      });
    }, i * 100);
  });
};

const aboutExitMobile = () => {
  const keyframes = [
    { transform: 'translateY(100%)' },
    { transform: 'translateY(0) scale(1.3)' },
    { transform: 'translateY(0) scale(1)' },
  ];

  const options = {
    duration: 1000,
    easing: 'ease-out',
    fill: 'forwards',
  };

  sequenceImages.forEach((image, i) => {
    setTimeout(() => {
      image.style.opacity = 1;
      image.animate(keyframes, options);
    }, i * 50);
  });

  aboutMobile.style.opacity = 1;
};

const aboutMobileAnimation = () => {
  aboutInitialMobile();
  setTimeout(aboutEnterMobile, 50);
  setTimeout(aboutExitMobile, 600);
};

const aboutInitial = () => {
  sequences.forEach(sequence => (sequence.style.opacity = 0));
  sequenceImages.forEach(image => (image.style.opacity = 0));
  textSm.forEach(text => (text.style.opacity = 0));
  single.style.opacity = 0;
};

const aboutEnter = () => {
  setTimeout(() => {
    single.style.opacity = 1;
    single.animate(pageFrames, elementOptions);
  }, 100);

  sequences.forEach((sequence, i) => {
    setTimeout(() => {
      sequence.style.opacity = 1;
      sequence.animate(pageFrames, elementOptions);
    }, i * 100);
  });
};

const aboutExit = () => {
  const keyframes = [
    { transform: 'translateY(100%)' },
    { transform: 'translateY(0) scale(1.3)' },
    { transform: 'translateY(0) scale(1)' },
  ];

  const options = {
    duration: 1000,
    easing: 'ease-out',
    fill: 'forwards',
  };

  sequenceImages.forEach((image, i) => {
    setTimeout(() => {
      image.style.opacity = 1;
      image.animate(keyframes, options);
    }, i * 50);
  });

  textSm.forEach(text => {
    text.animate({ opacity: 1 }, options);
  });
};

const aboutAnimation = () => {
  aboutInitial();
  setTimeout(aboutEnter, 50);
  setTimeout(aboutExit, 600);
};

// Animate when 'Loading is 50% through'
let animateAbout = false;

const aboutCallback = entries => {
  const [entry] = entries;

  if (entry.isIntersecting && !animateAbout && desktop) {
    animateAbout = true;
    aboutAnimation();
  }
};

const aboutObserver = new IntersectionObserver(aboutCallback, {
  rootMargin: '0px',
  threshold: 0.5,
});

aboutObserver.observe(about);

//
// LOADING SECTION
//

// Display none to grid
const toggleSectionStyling = () => {
  loading.remove();

  works.style.display = 'grid';
  scattered.style.display = 'grid';
  contact.style.display = 'grid';
  projectsTop.style.display = 'grid';
  // projectsMiddle.style.display = 'grid';
  projectsBottom.style.display = 'grid';

  navbar.style.visibility = 'initial';
  navbar.style.opacity = 1;
  navbar.style.transition = 'opacity 600ms ease-in-out';
};

const countdownDuration = 2150;
const updateInterval = 500;
let elapsedTime = 0;

// Loading countdown into About
const updateCountdown = () => {
  const percentage = (elapsedTime / countdownDuration) * 100;
  countdown.textContent = `${Math.min(100, Math.round(percentage))}%`;

  if (elapsedTime >= countdownDuration) {
    about.animate({ transform: 'translateY(0)' }, pageOptions);
    setTimeout(toggleSectionStyling, 1400);
  } else {
    elapsedTime += updateInterval;
    setTimeout(updateCountdown, updateInterval);
  }
};

document.addEventListener('DOMContentLoaded', updateCountdown);

//
// SCATTERED SECTION
//

const scatteredImages = document.querySelectorAll('.scattered-images img');

// 3d hover effect for images
scatteredImages.forEach(image => {
  const updateTilt = e => {
    const { clientX, clientY } = e;
    const perspectiveValue = 1000;

    const tiltX =
      (clientY - image.getBoundingClientRect().top - image.offsetHeight / 2) /
      5;
    const tiltY =
      (clientX - image.getBoundingClientRect().left - image.offsetWidth / 2) /
      5;

    const keyframes = {
      transform: `perspective(${perspectiveValue}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    };

    const options = {
      duration: 300,
      fill: 'forwards',
      easing: 'ease-in',
    };

    image.animate(keyframes, options);
  };

  const resetTransform = () => {
    const keyframes = {
      transform: 'none',
    };

    const options = {
      duration: 500,
      fill: 'forwards',
      easing: 'ease-out',
    };

    image.animate(keyframes, options);
  };

  image.addEventListener('mouseenter', () => {
    image.addEventListener('mousemove', updateTilt);
  });

  image.addEventListener('mouseleave', () => {
    image.removeEventListener('mousemove', updateTilt);
    setTimeout(resetTransform, 200);
  });
});

const scatteredCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    scrollControl(scattered);
  }
};

const scatteredObserver = new IntersectionObserver(
  scatteredCallback,
  observerOptions
);

scatteredObserver.observe(scattered);

//
// WORKS SECTION
//

const worksElements = document.querySelectorAll('.works-letters');

const animateWorksElements = () => {
  let index = 0;

  const animateNextElement = () => {
    if (index < worksElements.length) {
      const element = worksElements[index];
      element.style.opacity = 1;
      element.animate(pageFrames, elementOptions);
      index++;
      requestAnimationFrame(animateNextElement);
    }
  };
  worksElements.forEach(element => {
    element.style.opacity = 0;
  });

  requestAnimationFrame(animateNextElement);
};

let worksAnimate = false;

const worksCallback = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    scrollControl(works);
  }

  if (entry.isIntersecting && !worksAnimate && desktop) {
    worksAnimate = true;
    animateWorksElements();
  }
};

const worksObserver = new IntersectionObserver(worksCallback, observerOptions);

worksObserver.observe(works);

//
// PROJECTS
//

const projectImages = document.querySelectorAll('.project-images');
const projectsText = document.querySelectorAll('.projects-text');
const picturesAnimate = document.querySelectorAll('.pictures-animate');
const pictures = document.querySelectorAll('.pictures');
let initialSource = 1;
let timeoutId;

pictures.forEach((picture, i) => {
  const images = picture.querySelectorAll('img');
  const sources = picture.querySelectorAll('source');
  const srcset = sources[0].getAttribute('srcset');

  // Desktop
  const nextSource = () => {
    initialSource++;

    if (initialSource >= 9) {
      initialSource = 1;
    }

    sources.forEach(source =>
      source.setAttribute(
        'srcset',
        `images/works/00${i + 1}/large/${initialSource}.avif`
      )
    );

    timeoutId = setTimeout(nextSource, 500);
  };

  const startDesktopInterval = () => {
    clearTimeout(timeoutId);

    nextSource();
  };

  const stopDesktopInterval = () => {
    clearTimeout(timeoutId);

    sources.forEach(source => {
      source.setAttribute('srcset', srcset);
    });
  };

  // Mobile
  const nextImage = () => {
    initialSource++;

    if (initialSource >= 9) {
      initialSource = 1;
    }

    images.forEach(image =>
      image.setAttribute(
        'src',
        `images/works/00${i + 1}/small/${initialSource}.avif`
      )
    );
  };

  if (desktop) {
    picture.addEventListener('mouseover', startDesktopInterval);
    picture.addEventListener('mouseleave', stopDesktopInterval);
  } else {
    picture.addEventListener('touchstart', nextImage);
  }
});






//
// CONTACT
//

const contactHeader = document.querySelectorAll('.contact-header');
const contactMobile = document.querySelectorAll('.contact-mobile');
const contactSocials = document.querySelector('.contact-socials');
const contactImage = document.querySelector('.contact-image');

const contactInitial = () => {
  contactHeader.forEach(header => (header.style.opacity = 0));
  contactMobile.forEach(contact => (contact.style.opacity = 0));
  contactSocials.style.opacity = 0;
  contactImage.style.opacity = 0;
};

const contactExit = () => {
  const keyframes = [
    { transform: 'translateY(100%)' },
    { transform: 'translateY(0) scale(1.3)' },
    { transform: 'translateY(0) scale(1)' },
  ];

  const options = {
    duration: 1000,
    easing: 'ease-out',
    fill: 'forwards',
  };

  contactImage.style.opacity = 1;
  contactImage.animate(keyframes, options);
};

const contactSmallText = () => {
  const keyframes = [{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }];

  contactSocials.animate(keyframes, {
    fill: 'forwards',
    duration: 1600,
  });
};

const contactImageAnimate = () => {
  const contactImageContainer = document.querySelector('.contact-image-bg');
  contactImageContainer.style.opacity = 1;
  contactImageContainer.animate(pageFrames, elementOptions);
};

const contactHeaderAnimate = () => {
  // Need bigger clip path because of underline
  const keyframes = [
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      transform: 'translateY(120px)',
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0 120%)',
      transform: 'translateY(0)',
    },
  ];

  contactMobile?.forEach((header, i) => {
    header.style.opacity = 0;

    setTimeout(() => {
      header.style.opacity = 1;
      header.animate(keyframes, elementOptions);
    }, i * 100);
  });

  contactHeader?.forEach((header, i) => {
    header.style.opacity = 0;

    setTimeout(() => {
      header.style.opacity = 1;
      header.animate(keyframes, elementOptions);
    }, i * 100);
  });
};

// Contact animation
const contactAnimation = () => {
  contactImage.style.opacity = 0;
  contactInitial();

  contactSmallText();
  contactImageAnimate();
  contactHeaderAnimate();

  setTimeout(contactExit, 600);
};

let animateContact = false;

const contactCallback = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    scrollControl(contact);
    mouse.style.background = 'var(--white)';
  } else {
    mouse.style.background = 'var(--orange)';
  }

  if (entry.isIntersecting && !animateContact && desktop) {
    animateContact = true;
    contactAnimation();
  }
};

const contactObserver = new IntersectionObserver(
  contactCallback,
  observerOptions
);

contactObserver.observe(contact);

// Burger menu
const burger = document.querySelector('.burger');
const openMenu = document.querySelector('.open');
const closeMenu = document.querySelector('.close');
const navUlElements = document.querySelector('.nav .ul');
closeMenu.style.display = 'none';

const burgerActive = () => {
  navbar.classList.add('active');
  openMenu.style.display = 'none';
  closeMenu.style.display = 'block';
};

const burgerInactive = () => {
  navbar.classList.remove('active');
  closeMenu.style.display = 'none';
  openMenu.style.display = 'block';
};

burger.addEventListener('click', () => {
  navUlElements.classList.toggle('active');
  burgerActive();

  if (navUlElements.classList.contains('active')) {
    burgerActive();
  } else {
    burgerInactive();
  }
});

// Navbar transitions
const navbarElements = document.querySelectorAll('span a');

navbarElements.forEach(el => {
  el.addEventListener('click', e => {
    const id = e.target.getAttribute('href');
    const element = document.querySelector(id);

    if (element) {
      burgerInactive();
      navUlElements.classList.remove('active');

      scrollTo({
        top: 0,
      });
    }

    if (element.classList.contains('about') && desktop) {
      aboutAnimation();
    } else {
      aboutMobileAnimation();
    }

    if (element.classList.contains('works')) {
      animateWorksElements();
    }

    if (element.classList.contains('contact')) {
      contactAnimation();
    }
  });
});

// Contact redirects
const redirectToMail = () => {
  window.location.href = 'mailto:hello@ylliramadani.com';
};

document.querySelectorAll('.white').forEach(white => {
  white.addEventListener('click', redirectToMail);
});

document
  .querySelector('.contact-link')
  .addEventListener('click', redirectToMail);
