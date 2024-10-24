document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });
  
    const target = document.querySelector('.welcome');
    const target2 = document.querySelector('.ola');
    const target3 = document.querySelector('.animatichon');
    const target4 = document.querySelector('.animatichon.a');
    const target5 = document.querySelector('.animatichon.b');
    observer.observe(target);
    observer.observe(target2);
    observer.observe(target3);
    observer.observe(target4);
    observer.observe(target5);
  });
  