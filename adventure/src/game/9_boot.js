// ================= boot (runs last, after every module's constants exist) =================
seasonBoot();
if(OGMODE){enterPlace(0);cat.x=420;zoe.x=330;camX=120;banner=null;AUD.setTheme('none')}else AUD.setTheme('title');
requestAnimationFrame(frame);
if(DEBUG)window.__D={get state(){return state},get overlay(){return overlay},get cat(){return cat},get zoe(){return zoe},get stars(){return stars},get task(){return task},get giver(){return giver},get place(){return pl.k},get save(){return SAVE},get camX(){return camX},
  enterPlace,goMap,openScreen,startMini,backToGame,goBack,tp(x,y){cat.x=x;cat.y=y||0;cat.vy=0;cat.ground=null},perf:perfStats,get qual(){return QUAL},audio:AUD,set TS(v){TS=v},
  get MG(){return MG},get CF(){return CF},get PH(){return PH},get kits(){return kits},get spot(){return spot},get kitPick(){return kitPick},SEASON,SPOKEN,SPEAK,
  get ui(){return UI.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2,w:b.w,h:b.h}))},get hud(){return HUDB.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2,w:b.w,h:b.h}))},toClient:(x,y)=>({x:x*SC,y:y*SC}),get SC(){return SC},get jumpBtn(){return jumpBtn()},get arrows(){return arrowBtns()},get pawBtn(){return pawBtn()},get W(){return W},get H(){return H},GY,ctrlTop};
