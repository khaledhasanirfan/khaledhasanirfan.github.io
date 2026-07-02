(function(){
'use strict';
var doc=document,root=doc.documentElement;

/* theme */
var tgl=doc.getElementById('themeToggle');
function netColors(){
  var cs=getComputedStyle(root);
  return [cs.getPropertyValue('--net-a').trim(),cs.getPropertyValue('--net-b').trim()];
}
if(tgl){
  tgl.checked=root.dataset.theme==='light';
  tgl.addEventListener('change',function(){
    root.dataset.theme=tgl.checked?'light':'dark';
    try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}
    NET=netColors();
  });
}

/* nav */
var nav=doc.querySelector('.nav'),burger=doc.querySelector('.burger'),links=doc.querySelector('.links');
addEventListener('scroll',function(){nav&&nav.classList.toggle('on',scrollY>20)},{passive:true});
if(burger&&links){
  burger.addEventListener('click',function(){
    var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o);
  });
  links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
}

/* reveal */
var items=doc.querySelectorAll('.rv');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1,rootMargin:'0px 0px -6%'});
  items.forEach(function(el){io.observe(el)});
}else{items.forEach(function(el){el.classList.add('in')})}

/* dialogs */
doc.querySelectorAll('[data-dialog]').forEach(function(card){
  card.addEventListener('click',function(){
    var d=doc.getElementById(card.getAttribute('data-dialog'));
    if(d&&d.showModal){d.showModal();doc.body.style.overflow='hidden'}
  });
});
doc.querySelectorAll('dialog.dlg').forEach(function(d){
  d.addEventListener('click',function(e){if(e.target===d)d.close()});
  d.addEventListener('close',function(){doc.body.style.overflow=''});
  var x=d.querySelector('.x');
  if(x)x.addEventListener('click',function(e){e.stopPropagation();d.close()});
});

/* neural background */
var NET=netColors();
var cvs=doc.getElementById('bg');
if(cvs){
  var cx=cvs.getContext('2d'),W,H,cols,nodes,edges,sigs,last=0;
  function build(){
    W=cvs.width=innerWidth;H=cvs.height=innerHeight;
    var L=W<600?4:5;nodes=[];edges=[];cols=[];sigs=[];
    var mX=W*.07,uW=W-mX*2,mY=H*.12,uH=H-mY*2;
    for(var i=0;i<L;i++){
      var x=mX+(L>1?uW*(i/(L-1)):uW/2),n=4+Math.floor(Math.random()*3),layer=[];
      for(var j=0;j<n;j++)layer.push({x:x,bY:mY+uH*((j+.5)/n),y:0,amp:12+Math.random()*22,ph:Math.random()*6.28,sp:.0005+Math.random()*.0009,r:1.3+Math.random()*1.6,c:Math.random()>.45?0:1});
      cols.push(layer);nodes=nodes.concat(layer);
    }
    for(var a=0;a<cols.length-1;a++)for(var p=0;p<cols[a].length;p++)for(var q=0;q<cols[a+1].length;q++)edges.push([cols[a][p],cols[a+1][q]]);
  }
  function spawn(){sigs.push({path:cols.map(function(l){return l[Math.floor(Math.random()*l.length)]}),seg:0,p:0,sp:.012+Math.random()*.012,c:Math.random()>.5?0:1})}
  function draw(ts){
    var t=ts||0;cx.clearRect(0,0,W,H);
    nodes.forEach(function(n){n.y=n.bY+Math.sin(t*n.sp+n.ph)*n.amp});
    cx.lineWidth=1;
    edges.forEach(function(e){cx.strokeStyle='rgba('+NET[e[0].c]+',0.08)';cx.beginPath();cx.moveTo(e[0].x,e[0].y);cx.lineTo(e[1].x,e[1].y);cx.stroke()});
    nodes.forEach(function(n){cx.beginPath();cx.fillStyle='rgba('+NET[n.c]+',0.55)';cx.arc(n.x,n.y,n.r,0,6.2832);cx.fill()});
    for(var i=sigs.length-1;i>=0;i--){
      var s=sigs[i],a=s.path[s.seg],b=s.path[s.seg+1];
      if(!b){sigs.splice(i,1);continue}
      s.p+=s.sp;
      var x=a.x+(b.x-a.x)*s.p,y=a.y+(b.y-a.y)*s.p;
      cx.strokeStyle='rgba('+NET[s.c]+',0.42)';cx.lineWidth=1.4;
      cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(x,y);cx.stroke();
      cx.beginPath();cx.fillStyle='rgba('+NET[s.c]+',0.95)';cx.arc(x,y,2.4,0,6.2832);cx.fill();
      if(s.p>=1){s.seg++;s.p=0}
    }
    if(t-last>900&&sigs.length<5){last=t;spawn()}
    requestAnimationFrame(draw);
  }
  build();spawn();
  addEventListener('resize',build,{passive:true});
  requestAnimationFrame(draw);
}

/* contact form */
var form=doc.getElementById('cform'),fs=doc.getElementById('fstat');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var action=form.getAttribute('action');
    if(!action||action.indexOf('YOUR_FORM_ID')>-1){
      fs.className='fstat ok';fs.textContent='Form not connected yet — email khaled@cse.mist.ac.bd directly.';
      return;
    }
    var btn=form.querySelector('button');btn.disabled=true;btn.textContent='Sending…';
    fetch(action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:form.name.value,email:form.email.value,message:form.message.value})})
      .then(function(r){return r.json().then(function(d){return{ok:r.ok,d:d}})})
      .then(function(r){
        fs.className='fstat '+(r.ok?'ok':'err');
        fs.textContent=r.ok?'Thanks — your message reached Khaled.':(r.d.error||'Something went wrong.');
        if(r.ok)form.reset();
      })
      .catch(function(){fs.className='fstat err';fs.textContent='Network error — email khaled@cse.mist.ac.bd instead.'})
      .finally(function(){btn.disabled=false;btn.textContent='Send message'});
  });
}
})();
