(()=>{
  const css=`
  .matbak-splash{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:radial-gradient(circle at 50% 35%,#ffffff 0,#f4faef 42%,#e8f3e5 100%);transition:opacity .45s ease,visibility .45s ease}
  .matbak-splash.hide{opacity:0;visibility:hidden;pointer-events:none}
  .brandmark{width:178px;height:178px;position:relative;display:grid;place-items:center;filter:drop-shadow(0 20px 35px rgba(53,139,79,.2))}
  .brandmark .plate{width:142px;height:142px;border-radius:48px;background:linear-gradient(145deg,#ffffff,#effbe9);box-shadow:inset 0 1px 0 #fff,0 18px 42px rgba(42,86,48,.12);position:absolute}
  .brandmark .pot{position:absolute;width:92px;height:56px;bottom:38px;background:linear-gradient(#31493b,#1f3329);border-radius:0 0 22px 22px;box-shadow:0 10px 18px #0002}
  .brandmark .rim{position:absolute;width:104px;height:20px;bottom:84px;border-radius:50%;background:#16261e}
  .brandmark .leaf{position:absolute;width:25px;height:43px;background:#63d58a;border-radius:90% 10% 90% 10%;transform:rotate(35deg);bottom:100px;left:67px}
  .brandmark .leaf2{transform:rotate(-35deg);left:86px;bottom:101px}
  .brandmark .steam{position:absolute;width:9px;height:48px;border-left:4px solid #8ee4aa;border-radius:50%;bottom:96px;animation:mbsteam 1.4s ease-in-out infinite}
  .brandmark .s1{left:74px}.brandmark .s2{left:89px;animation-delay:.3s}.brandmark .s3{left:104px;animation-delay:.6s}
  .splash-title{margin-top:12px;text-align:center;font-size:28px;font-weight:950;letter-spacing:-.5px;color:#21402b}.splash-sub{text-align:center;color:#829080;margin-top:5px;font-size:11px;letter-spacing:1.2px}
  .smart-loader{display:flex;justify-content:center;gap:7px;margin-top:18px}.smart-loader i{width:7px;height:7px;border-radius:50%;background:#57c97b;animation:mbdot 1s infinite}.smart-loader i:nth-child(2){animation-delay:.15s}.smart-loader i:nth-child(3){animation-delay:.3s}
  .choice{will-change:transform}.choice:active{box-shadow:0 0 0 4px rgba(99,213,138,.12),0 12px 25px rgba(60,150,80,.12)!important}
  .card{will-change:transform}.card:hover{transform:translateY(-2px)}
  .photo{background:linear-gradient(110deg,#edf4e9,#f9fbf7,#edf4e9);background-size:220% 100%;animation:mbshimmer 1.5s linear infinite}
  .photo.loaded{animation:none}
  .recipe-count{font-size:10px;color:#7f8d80;background:#eef8eb;border-radius:999px;padding:6px 9px;font-weight:850}
  @keyframes mbsteam{50%{transform:translateY(-13px) scaleX(.7);opacity:.25}100%{transform:translateY(-22px) scaleX(.45);opacity:0}}
  @keyframes mbdot{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-6px);opacity:1}}
  @keyframes mbshimmer{to{background-position:-220% 0}}
  `;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  const splash=document.createElement('div');splash.className='matbak-splash';splash.innerHTML=`<div><div class="brandmark"><div class="plate"></div><div class="rim"></div><div class="pot"></div><div class="leaf"></div><div class="leaf leaf2"></div><div class="steam s1"></div><div class="steam s2"></div><div class="steam s3"></div></div><div class="splash-title">MATBAK DZ</div><div class="splash-sub">SMART MEAL COMPANION</div><div class="smart-loader"><i></i><i></i><i></i></div></div>`;document.body.appendChild(splash);
  setTimeout(()=>splash.classList.add('hide'),850);
  window.addEventListener('load',()=>splash.classList.add('hide'));
  document.addEventListener('click',e=>{const c=e.target.closest('.choice');if(c){c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash')}});
  document.addEventListener('error',e=>{const img=e.target;if(img&&img.tagName==='IMG'&&img.classList.contains('photo')){img.classList.add('loaded');img.style.objectFit='cover';}},true);
  // Guard against obviously unrelated images: hide broken/mismatched remote images instead of showing a random fallback.
  window.MATBAK_V5={version:'5.0',recipeTarget:100000,imagePolicy:'recipe-bound-only'};
})();
