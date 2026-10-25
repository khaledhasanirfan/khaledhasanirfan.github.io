'use strict';
// All content is pre-rendered. JavaScript only adds optional interactions.
const menus = [...document.querySelectorAll('.more-menu, .mobile-navigation')];
menus.forEach(menu => {
 menu.addEventListener('toggle', () => { if (menu.open) menus.filter(m=>m!==menu).forEach(m=>m.open=false); });
 menu.addEventListener('click', e => { if(e.target.closest('a')) menu.open=false; });
});
document.addEventListener('click', e => menus.forEach(menu => {if(!menu.contains(e.target))menu.open=false;}));
document.addEventListener('keydown', e => {if(e.key==='Escape')menus.forEach(menu=>{if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});});
const controls=document.querySelector('[data-filter-controls]');
if(controls){
 controls.hidden=false;
 const items=[...document.querySelectorAll('[data-filter-item]')],buttons=[...controls.querySelectorAll('[data-filter]')],input=controls.querySelector('[data-search-input]'),status=document.querySelector('[data-filter-status]'),empty=document.querySelector('[data-empty-results]');
 let category='all';
 const apply=()=>{
  const query=input.value.trim().toLocaleLowerCase();let count=0;
  items.forEach(item=>{item.hidden=!((category==='all'||item.dataset.type===category)&&item.dataset.search.includes(query));if(!item.hidden)count++;});
  document.querySelectorAll('[data-filter-group]').forEach(group=>group.hidden=![...group.querySelectorAll('[data-filter-item]')].some(i=>!i.hidden));
  if(empty)empty.hidden=count!==0;
  status.textContent=count+' '+(count===1?'result':'results')+' shown';
 };
 buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});apply();}));
 input.addEventListener('input',apply);apply();
}
const photos=[...document.querySelectorAll('[data-lightbox]')];
if(photos.length&&typeof HTMLDialogElement!=='undefined'){
 const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Image viewer');
 dialog.innerHTML='<div class="lightbox-top"><span class="lightbox-counter"></span><div class="lightbox-actions"><button type="button" data-prev aria-label="Previous image">←</button><button type="button" data-next aria-label="Next image">→</button><button type="button" data-close aria-label="Close image viewer">×</button></div></div><img alt=""><p class="lightbox-caption"></p>';
 document.body.append(dialog);let current=0,trigger;
 const update=()=>{const p=photos[current],im=dialog.querySelector('img');im.src=p.href;im.alt=p.querySelector('img').alt;dialog.querySelector('.lightbox-caption').textContent=p.dataset.caption||im.alt;dialog.querySelector('.lightbox-counter').textContent=(current+1)+' / '+photos.length;dialog.querySelector('[data-prev]').hidden=dialog.querySelector('[data-next]').hidden=photos.length<2;};
 photos.forEach((p,i)=>p.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();current=i;trigger=p;update();dialog.showModal();dialog.querySelector('[data-close]').focus();}));
 const move=n=>{current=(current+n+photos.length)%photos.length;update();};
 dialog.querySelector('[data-prev]').addEventListener('click',()=>move(-1));dialog.querySelector('[data-next]').addEventListener('click',()=>move(1));dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>trigger?.focus());
}
