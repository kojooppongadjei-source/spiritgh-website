/* Starcom Group cross-promotion on spiritgh.com:
   - Latest headlines from our sister station, Sunny 88.7 FM (Accra)
   - CCC&B: the shared church & business directory (listings from Ashanti first)
   - One-tap Sunny 88.7 FM player in the Listen section */
(function(){
  var UTM='utm_source=spiritgh&utm_medium=sister&utm_campaign=starcom';
  var UTM_CCB='utm_source=spiritgh&utm_medium=sister&utm_campaign=ccb';
  var SUNNY='https://sunnygh.com';
  function link(u,utm){ var p=u.split('#'); return p[0]+(p[0].indexOf('?')>-1?'&':'?')+(utm||UTM)+(p[1]?'#'+p[1]:''); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  var PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  /* ── Sunny 88.7 FM headlines ── */
  var news=document.getElementById('sister-news');
  if(news){
    var isArticle=news.hasAttribute('data-article');
    fetch(SUNNY+'/content/news/index.json').then(function(r){ if(!r.ok) throw 0; return r.json(); }).then(function(items){
      items=(items||[]).slice(0,isArticle?3:6);
      if(!items.length) return;
      var cards=items.map(function(n){
        var img=n.image?'<img src="'+esc(n.image.indexOf('http')===0?n.image:SUNNY+n.image)+'" alt="" loading="lazy">':'';
        return '<a class="sis-card" href="'+esc(link(SUNNY+n.url))+'">'+img+'<span class="sis-card-body">'+
          (n.category?'<span class="sis-tag">'+esc(n.category)+'</span>':'')+
          '<span class="sis-title">'+esc(n.title)+'</span>'+
          (n.dateFormatted?'<span class="sis-date">'+esc(n.dateFormatted)+'</span>':'')+'</span></a>';
      }).join('');
      (news.querySelector('.sis-slot')||news).innerHTML='<div class="sis"><div class="sis-head">'+
        '<img class="sis-logo" src="'+SUNNY+'/assets/sunny-fm-logo.png" alt="Sunny 88.7 FM">'+
        '<div class="sis-titles"><h2>From our sister station in Accra</h2><p>Sunny 88.7 FM, part of the Starcom Group</p></div>'+
        '<a class="sis-btn" href="'+esc(link(SUNNY+'/listen-live/'))+'">'+PLAY+'Listen to Sunny 88.7</a>'+
        '</div><div class="sis-row">'+cards+'</div></div>';
      news.hidden=false;
    }).catch(function(){});
  }

  /* ── CCC&B directory ── */
  var ccb=document.getElementById('ccb');
  if(ccb){
    var SB='https://rtfaoqxxdrdeulpvrder.supabase.co/rest/v1/businesses';
    var KEY='sb_publishable_VgKANGgHBIqNZNR5Igx_oA_6VLTiLxH';
    var COLS='slug,name,category,region,town,logo_url,featured';
    var DIR=SUNNY+'/directory/';
    function q(extra){
      return fetch(SB+'?select='+COLS+'&status=eq.approved'+extra+'&order=featured.desc,name.asc&limit=6',{headers:{apikey:KEY,Authorization:'Bearer '+KEY}})
        .then(function(r){ if(!r.ok) throw 0; return r.json(); });
    }
    function tint(s){ var h=0; for(var i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))%360; return 'hsl('+h+',45%,38%)'; }
    function initials(s){ return (s||'?').split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase(); }
    function card(b){
      var mark=b.logo_url?'<span class="ccb-mark"><img src="'+esc(b.logo_url)+'" alt="" loading="lazy"></span>'
        :'<span class="ccb-mark" style="background:'+tint(b.name)+'">'+esc(initials(b.name))+'</span>';
      return '<a class="ccb-card" href="'+esc(link(DIR+'?b='+encodeURIComponent(b.slug),UTM_CCB))+'">'+mark+
        '<span class="ccb-info"><span class="ccb-name" style="display:block">'+esc(b.name)+'</span>'+
        '<span class="ccb-meta" style="display:block">'+esc([b.category,[b.town,b.region].filter(Boolean).join(', ')].filter(Boolean).join(' · '))+'</span></span></a>';
    }
    var grid=document.getElementById('ccb-grid');
    q('&region=eq.Ashanti').then(function(rows){
      if(rows.length>=3) return {rows:rows,local:true};
      return q('').then(function(all){
        var seen={}; rows.concat(all).forEach(function(r){ seen[r.slug]=seen[r.slug]||r; });
        return {rows:Object.keys(seen).map(function(k){return seen[k];}).slice(0,6),local:false};
      });
    }).then(function(res){
      if(!res.rows.length) throw 0;
      grid.innerHTML=res.rows.map(card).join('');
      if(!res.local){ var s=document.getElementById('ccb-sub'); if(s) s.textContent='Find churches and Christian businesses across Ghana, then call or WhatsApp them straight from the listing. Be one of the first from Ashanti to list yours, free.'; }
    }).catch(function(){
      grid.innerHTML='<div class="ccb-empty"><strong>Be among the first Kumasi listings.</strong> Add your church or business free and listeners of Spirit 88.3 FM and Sunny 88.7 FM can find you.</div>';
    });
  }

  /* ── One-tap Sunny 88.7 FM player (Listen section) ── */
  var btn=document.getElementById('sis-play-btn');
  if(btn){
    var URLS=['https://stream.sunnygh.com/sunnyradio','https://sunny-radio-server.cloud-ip.cc/radio/sunnyradio'];
    var label=document.getElementById('sis-play-label'), status=document.getElementById('sis-play-status');
    var spiritBtn=document.getElementById('spiritPlayBtn'), spiritAudio=document.getElementById('spiritAudio');
    var a=null, on=false;
    function ui(playing,msg){
      on=playing;
      btn.innerHTML=(playing?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':PLAY)+'<span id="sis-play-label">'+(playing?'Stop Sunny':'Listen to Sunny')+'</span>';
      btn.setAttribute('aria-label',playing?'Stop Sunny 88.7 FM':'Play Sunny 88.7 FM live');
      status.textContent=msg||'Our sister station in Accra';
    }
    function stop(){ if(a){ try{a.pause();}catch(e){} a.src=''; a=null; } ui(false); }
    function start(i){
      a=new Audio(URLS[i]+'?t='+Date.now());
      a.onplaying=function(){ status.textContent='Live now from Accra on 88.7 FM'; if(window.gtag) gtag('event','sister_listen',{station:'sunny887',from:'spiritgh'}); };
      a.onerror=function(){ if(i+1<URLS.length){ start(i+1); } else { stop(); status.textContent='Sunny 88.7 FM is not reachable right now. Try again shortly.'; } };
      a.play().catch(function(){});
    }
    btn.addEventListener('click',function(){
      if(on){ stop(); return; }
      if(spiritAudio && !spiritAudio.paused && spiritBtn) spiritBtn.click();
      ui(true,'Connecting to Sunny 88.7 FM…');
      start(0);
    });
    if(spiritBtn) spiritBtn.addEventListener('click',function(){ if(on) stop(); },true);
  }
})();
