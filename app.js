var slate=document.getElementById('slate'), stage=document.getElementById('stage');
  document.getElementById('roll').addEventListener('click',function(){
    slate.classList.add('gone'); stage.hidden=false;
    setTimeout(function(){slate.style.display='none';},820); window.scrollTo(0,0);
  });

  var vs=document.getElementById('vs');
  var drawer=document.getElementById('drawer');
  var doss={teton:document.getElementById('d-teton'),peko:document.getElementById('d-peko')};
  var hT=document.getElementById('h-teton'), hP=document.getElementById('h-peko');

  function setState(which,scroll){
    if(which==='vs'){
      vs.style.display=''; drawer.classList.remove('open');
      doss.teton.classList.remove('show'); doss.peko.classList.remove('show');
      hT.setAttribute('aria-expanded','false'); hP.setAttribute('aria-expanded','false');
      return;
    }
    vs.style.display='none';
    doss.teton.classList.toggle('show',which==='teton');
    doss.peko.classList.toggle('show',which==='peko');
    drawer.classList.add('open');
    hT.setAttribute('aria-expanded',which==='teton'?'true':'false');
    hP.setAttribute('aria-expanded',which==='peko'?'true':'false');
    if(scroll){ doss[which].querySelector('.dhead').scrollIntoView({behavior:'smooth',block:'start'}); }
  }

  // hover (escritorio): quita el VS y fija la info del candidato; se queda para poder leer
  hT.addEventListener('mouseenter',function(){setState('teton',false);});
  hP.addEventListener('mouseenter',function(){setState('peko',false);});
  // click / toque (móvil y escritorio): igual, con scroll a la ficha
  hT.addEventListener('click',function(){setState('teton',true);});
  hP.addEventListener('click',function(){setState('peko',true);});

  // volver al cara a cara
  document.querySelectorAll('[data-close]').forEach(function(b){
    b.addEventListener('click',function(){
      setState('vs',false);
      document.querySelector('.split').scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  document.querySelectorAll('[data-sign]').forEach(function(b){
    b.addEventListener('click',function(){
      var p=b.parentNode;
      p.innerHTML='<div class="stamp">'+b.dataset.sign+' · Fichado</div>';
    });
  });
