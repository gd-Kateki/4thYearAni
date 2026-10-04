(() => {
'use strict';
const c = window.ANNIVERSARY;
const $ = (selector) => document.querySelector(selector);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
Object.entries(c.colors).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value));
if (c.partnerName) {
  $('.welcome h1').textContent = `For ${c.partnerName}.`;
  $('.welcome h1').classList.add('personalized');
  $('.envelope > span').textContent = `For ${c.partnerName}`;
  document.title = `For ${c.partnerName} · Four years of us`;
}
if (c.introNote) $('.intro-note').textContent = c.introNote;
if (c.journeyNote) $('#journey .section-heading p').textContent = c.journeyNote;

if (c.anniversaryDate) $('#dedication').textContent = c.anniversaryDate;
const art = (container, src, alt, index, label, eager = false) => {
  container.replaceChildren(); container.classList.remove('abstract','tone-0','tone-1','tone-2','tone-3');
  const placeholder = () => {
    container.replaceChildren(); container.classList.add('abstract', `tone-${index % 4}`);
    const inner = document.createElement('div'); inner.className = 'placeholder-inner';
    const number = document.createElement('span'); number.className = 'placeholder-number'; number.textContent = ['I','II','III','IV','V','VI','VII','VIII','IX','X'][index % 10]; number.setAttribute('aria-hidden','true');
    const text = document.createElement('span'); text.className = 'placeholder-label'; text.textContent = label;
    inner.append(number,text); container.append(inner);
  };
  if (!src) return placeholder();
  const img = document.createElement('img'); img.src = src; img.alt = alt; img.loading = eager ? 'eager' : 'lazy'; img.decoding = 'async'; img.width = 800; img.height = 1000; img.addEventListener('error', placeholder, {once:true}); container.append(img);
};
const tabs = $('#year-tabs');
function selectYear(index, focus = false) {
  const year = c.timeline[index];
  [...tabs.children].forEach((tab,i) => {tab.setAttribute('aria-selected', String(i===index)); tab.tabIndex = i===index ? 0 : -1;});
  $('#year-panel').setAttribute('aria-labelledby', `year-tab-${index}`);
  $('#year-kicker').textContent = `${year.year} / FOUR YEARS OF US`;
  $('#year-title').textContent = year.title; $('#year-message').textContent = year.message;
  art($('#year-art'),year.photo,year.alt,index,c.yearPlaceholder?.replace('{year}',String(index+1)) || `[Add our Year ${index+1} photo here]`,true);
  $('#year-panel').classList.remove('panel-in'); requestAnimationFrame(() => $('#year-panel').classList.add('panel-in'));
  if (focus) tabs.children[index].focus();
}
c.timeline.forEach((year,i) => {
  const tab = document.createElement('button'); tab.className = 'year-tab'; tab.id = `year-tab-${i}`; tab.setAttribute('role','tab');tab.setAttribute('aria-controls','year-panel');
  const n = document.createElement('span'); n.textContent = `CHAPTER 0${i+1}`;
  const title = document.createElement('strong'); title.textContent = year.year;
  tab.append(n,title);tab.addEventListener('click',()=>selectYear(i));
  tab.addEventListener('keydown',event=>{let next;if(['ArrowDown','ArrowRight'].includes(event.key))next=(i+1)%c.timeline.length;if(['ArrowUp','ArrowLeft'].includes(event.key))next=(i-1+c.timeline.length)%c.timeline.length;if(event.key==='Home')next=0;if(event.key==='End')next=c.timeline.length-1;if(next!==undefined){event.preventDefault();selectYear(next,true);}});tabs.append(tab);
});selectYear(0);
const mobile = matchMedia('(max-width:650px)');
function orientTabs(){tabs.setAttribute('aria-orientation',mobile.matches?'horizontal':'vertical');}orientTabs();mobile.addEventListener('change',orientTabs);
c.littleThings.forEach((item,i)=>{
  const button=document.createElement('button');button.className='little-card reveal';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`little-reveal-${i}`);
  [['card-number',String(i+1).padStart(2,'0')],['card-title',item.title],['card-reveal',item.text]].forEach(([className,text])=>{const span=document.createElement('span');span.className=className;span.textContent=text;if(className==='card-reveal')span.id=`little-reveal-${i}`;button.append(span);});
  button.addEventListener('click',()=>button.setAttribute('aria-expanded',String(button.getAttribute('aria-expanded')!=='true')));$('#little-cards').append(button);
});

c.letter.split(/\n\s*\n/).forEach(paragraph=>{const p=document.createElement('p');p.textContent=paragraph;$('#letter-text').append(p);});
$('#open-letter').addEventListener('click',()=>{
  const paper=$('#letter-paper'); if(!paper.hidden){paper.focus({preventScroll:true});paper.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});return;}
  $('#envelope').classList.add('opening');$('#open-letter').setAttribute('aria-expanded','true');$('#open-letter').textContent='Read it again';
  setTimeout(()=>{paper.hidden=false;paper.focus({preventScroll:true});paper.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});},reduced.matches?0:700);
});
c.future.forEach(text=>{const button=document.createElement('button');button.className='future-card reveal';button.textContent=text;button.addEventListener('click',()=>{button.classList.add('glowing');setTimeout(()=>button.classList.remove('glowing'),1100);});$('#future-cards').append(button);});
$('#final-heading').append(document.createTextNode(c.final.line1),document.createElement('br'));const finalEm=document.createElement('em');finalEm.textContent=c.final.line2;$('#final-heading').append(finalEm);$('#final-message').textContent=c.final.message;$('#final-love').textContent=c.final.love;
let observer;
function revealSetup(){
  observer?.disconnect();document.body.classList.toggle('motion-enabled',!reduced.matches);
  if(reduced.matches)return;
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}reduced.addEventListener('change',revealSetup);
function openGift(){if(document.body.classList.contains('opened'))return;document.body.classList.add('opened');$('#experience').inert=false;$('#welcome').classList.add('leaving');$('#main').focus({preventScroll:true});window.scrollTo(0,0);revealSetup();setTimeout(()=>{$('#welcome').hidden=true;$('#welcome').style.display='none';},reduced.matches?0:1100);}
$('#open-gift').addEventListener('click',openGift);$('.skip').addEventListener('click',openGift);
const navLinks=[...document.querySelectorAll('.floating-nav a')];
const sections=[...document.querySelectorAll('main section')];let ticking=false;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{let active='intro';sections.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.45)active=section.id;});const mapped={little:'journey',choose:'letter',final:'future'}[active]||active;navLinks.forEach(a=>{const selected=a.hash===`#${mapped}`;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});if(!reduced.matches&&innerWidth>1000&&scrollY<innerHeight)$('.intro').style.setProperty('--parallax',`${Math.min(scrollY*.12,80)}px`);ticking=false;});}window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(matchMedia('(pointer:fine)').matches){$('.intro').addEventListener('pointermove',event=>{if(reduced.matches)return;$('.intro').style.setProperty('--cursor-x',`${event.clientX}px`);$('.intro').style.setProperty('--cursor-y',`${event.clientY}px`);},{passive:true});}
[$('.welcome'),$('.finale')].forEach(container=>{for(let i=0;i<13;i++){const dot=document.createElement('span');dot.className='particle';dot.setAttribute('aria-hidden','true');dot.style.cssText=`left:${7+(i*29)%88}%;top:${12+(i*17)%75}%;--duration:${7+i%5}s;--delay:-${i%7}s`;container.append(dot);}});
let audio;let statusTimeout;
function musicStatus(text){$('#music-status').textContent=text;$('#music-status').hidden=false;clearTimeout(statusTimeout);statusTimeout=setTimeout(()=>$('#music-status').hidden=true,5500);}
function syncMusic(){const playing=audio&&!audio.paused;$('#music-toggle').setAttribute('aria-pressed',String(Boolean(playing)));$('#music-toggle').setAttribute('aria-label',playing?'Pause background music':'Play background music');$('#music-label').textContent=playing?'Music on':'Music off';}
$('#music-toggle').addEventListener('click',async()=>{
  if(!c.music.src){musicStatus('A quiet moment, for now. Our song can be added here.');return;}
  if(!audio){audio=new Audio(c.music.src);audio.loop=true;audio.preload='none';audio.volume=Math.max(0,Math.min(1,c.music.volume??.4));['play','pause','ended'].forEach(event=>audio.addEventListener(event,syncMusic));audio.addEventListener('error',()=>{syncMusic();musicStatus('The music couldn’t be loaded. The rest of our story is still here.');});}
  if(audio.paused){try{await audio.play();}catch{musicStatus('The music couldn’t be played. You can try again.');}}else audio.pause();syncMusic();
});
})();
