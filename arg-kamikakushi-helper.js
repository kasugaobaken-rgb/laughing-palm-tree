(function(){
  const EVIDENCE_KEY='mogami_arg_evidence';
  const VISITED_KEY='mogami_arg_visited_sites';
  const MASTER={
    kamikakushi_site_found:{id:'kamikakushi_site_found',title:'神隠し専門サイトを確認',source:'神隠し専門サイト',description:'神隠しの分類や関連伝承を扱うサイトを確認した。'},
    kamikakushi_types:{id:'kamikakushi_types',title:'神隠しには複数の型がある',source:'神隠し専門サイト',description:'人だけでなく、痕跡や記憶ごと消える型があるという記述。'},
    tengu_return:{id:'tengu_return',title:'天狗に攫われる：帰還する神隠し',source:'神隠し専門サイト',description:'攫われた者が戻る神隠しの型。'},
    trace_disappear:{id:'trace_disappear',title:'痕跡・記憶ごと消える型',source:'神隠し専門サイト',description:'そもそもそんな人はいなかったことになる型。'}
  };
  function toast(msg){
    const el=document.getElementById('argToast');
    if(!el){ alert(msg); return; }
    el.textContent=msg; el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'),2200);
  }
  window.recordVisitedSite=function(siteId){
    try{
      const list=JSON.parse(localStorage.getItem(VISITED_KEY)||'[]');
      if(!list.includes(siteId)) list.push(siteId);
      localStorage.setItem(VISITED_KEY,JSON.stringify(list));
      if(siteId==='kamikakushi') saveRawEvidence(MASTER.kamikakushi_site_found,false);
    }catch(e){}
  };
  function saveRawEvidence(ev,notify=true){
    if(!ev||!ev.id)return;
    const list=JSON.parse(localStorage.getItem(EVIDENCE_KEY)||'[]');
    const i=list.findIndex(x=>x.id===ev.id);
    if(i>=0) list[i]=Object.assign({},list[i],ev); else list.push(ev);
    localStorage.setItem(EVIDENCE_KEY,JSON.stringify(list));
    if(notify) toast('調査メモに保存しました：'+ev.title);
  }
  window.saveMogamiEvidence=function(ev){saveRawEvidence(typeof ev==='string'?MASTER[ev]:ev)};
  window.saveKamikakushiEvidence=function(id){saveRawEvidence(MASTER[id])};
})();
