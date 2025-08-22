document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');

  if (burger && menu){
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('is-open'))
    );
  }

  // плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', e=>{
      const id = link.getAttribute('href');
      if (id && id.length>1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
      }
    });
  });
});



(function(){
  const modal = document.getElementById('contactChooser');
  if(!modal) return;

  const sheet = modal.querySelector('.contact-chooser__sheet');
  // Кнопка "Записаться на пробное..." + все кнопки "Записаться" в карточках услуг
  const triggers = document.querySelectorAll('#trialBtn, .service-card__btn');
  if(!triggers.length || !sheet) return;

  let lastFocus;

  function openModal(e){
    e.preventDefault();
    lastFocus = document.activeElement;
    modal.hidden = false;
    sheet.focus();
    document.addEventListener('keydown', onKey);
  }

  function closeModal(){
    modal.hidden = true;
    document.removeEventListener('keydown', onKey);
    if (lastFocus) lastFocus.focus();
  }

  function onKey(e){
    if(e.key === 'Escape') closeModal();
  }

  // навешиваем на все кнопки
  triggers.forEach(btn => btn.addEventListener('click', openModal));

  // закрытие по крестику/элементам с data-close и по фону, если ему задан data-close
  modal.addEventListener('click', (e)=>{
    if (e.target.hasAttribute('data-close') || e.target.closest('[data-close]')) return closeModal();
    if (e.target.classList.contains('contact-chooser__backdrop')) return closeModal();
  });
})();