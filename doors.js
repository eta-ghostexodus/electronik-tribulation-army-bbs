'use strict';

window.ETADoors = (() => {
  let cleanup = () => {};
  let report = () => {};
  function stop() { cleanup(); cleanup = () => {}; }
  function button(label, cls='action') { return `<button class="${cls}">${label}</button>`; }
  function launch(name, host, scoreReporter) {
    stop(); host.innerHTML=''; report=scoreReporter || (()=>{});
    ({ snake, codebreaker, packet, blackjack, trader, cipher }[name] || codebreaker)(host);
  }
  function score(game,value) { report(game,Math.max(0,Math.floor(value))); }

  function snake(host) {
    host.innerHTML=`<div class="game-panel"><h2>NEON SNAKE</h2><p class="game-sub">Arrow keys or WASD. Collect packets. Do not collide with the trail.</p><div class="game-hud"><span>SCORE <strong id="snakeScore">0</strong></span><span>STATUS <strong id="snakeStatus">READY</strong></span></div><canvas class="game-canvas" id="snakeCanvas" width="560" height="420"></canvas><div class="game-controls">${button('START RUN','action primary')}</div></div>`;
    const canvas=host.querySelector('#snakeCanvas'),ctx=canvas.getContext('2d'),start=host.querySelector('button');
    const cell=20, cols=canvas.width/cell, rows=canvas.height/cell; let snakeBody,dir,food,timer,running=false,points=0;
    const placeFood=()=>({x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)});
    function reset(){snakeBody=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};food=placeFood();points=0;host.querySelector('#snakeScore').textContent=0;}
    function draw(){ctx.fillStyle='#010403';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='rgba(57,255,136,.08)';for(let x=0;x<canvas.width;x+=cell){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}for(let y=0;y<canvas.height;y+=cell){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}ctx.fillStyle='#00e5ff';ctx.shadowColor='#00e5ff';ctx.shadowBlur=12;ctx.fillRect(food.x*cell+3,food.y*cell+3,cell-6,cell-6);ctx.fillStyle='#39ff88';ctx.shadowColor='#39ff88';snakeBody.forEach((p,i)=>ctx.fillRect(p.x*cell+2,p.y*cell+2,cell-4,cell-4));ctx.shadowBlur=0;}
    function end(){running=false;clearInterval(timer);host.querySelector('#snakeStatus').textContent='TERMINATED';score('neon-snake',points);start.textContent='RUN AGAIN';}
    function tick(){const h={x:snakeBody[0].x+dir.x,y:snakeBody[0].y+dir.y};if(h.x<0||h.y<0||h.x>=cols||h.y>=rows||snakeBody.some(p=>p.x===h.x&&p.y===h.y))return end();snakeBody.unshift(h);if(h.x===food.x&&h.y===food.y){points+=100;food=placeFood();host.querySelector('#snakeScore').textContent=points;}else snakeBody.pop();draw();}
    function keys(e){const map={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};if(!map[e.key])return;const [x,y]=map[e.key];if(dir.x+x===0&&dir.y+y===0)return;dir={x,y};e.preventDefault();}
    start.onclick=()=>{clearInterval(timer);reset();running=true;host.querySelector('#snakeStatus').textContent='RUNNING';start.textContent='RESTART';draw();timer=setInterval(tick,95);};
    reset();draw();addEventListener('keydown',keys);cleanup=()=>{clearInterval(timer);removeEventListener('keydown',keys);};
  }

  function codebreaker(host) {
    let secret='',attempts=0,trace=10,done=false;
    host.innerHTML=`<div class="game-panel"><h2>CODEBREAKER</h2><p class="game-sub">Guess the four unique digits. A HIT is correct place; a NEAR is correct digit, wrong place.</p><div class="game-hud"><span>TRACE <strong id="trace">10</strong></span><span>SCORE <strong id="cbScore">0</strong></span></div><div class="game-controls"><input class="game-input" id="guess" inputmode="numeric" maxlength="4" placeholder="0427">${button('BREACH','action primary')}${button('NEW CODE')}</div><div class="log-box" id="cbLog"></div></div>`;
    const input=host.querySelector('#guess'),buttons=host.querySelectorAll('button'),log=host.querySelector('#cbLog');
    function reset(){const digits='0123456789'.split('').sort(()=>Math.random()-.5);secret=digits.slice(0,4).join('');attempts=0;trace=10;done=false;log.innerHTML='&gt; TARGET GENERATED. TRACE WINDOW: 10 ATTEMPTS.<br>';host.querySelector('#trace').textContent=trace;host.querySelector('#cbScore').textContent=0;input.value='';input.focus();}
    function guess(){if(done)return;const g=input.value.trim();if(!/^\d{4}$/.test(g)||new Set(g).size!==4){log.innerHTML+='&gt; ERROR: ENTER FOUR UNIQUE DIGITS.<br>';return;}attempts++;trace--;let hit=0,near=0;[...g].forEach((d,i)=>{if(secret[i]===d)hit++;else if(secret.includes(d))near++;});log.innerHTML+=`&gt; ${g} :: HIT=${hit} NEAR=${near}<br>`;log.scrollTop=log.scrollHeight;host.querySelector('#trace').textContent=trace;if(hit===4){done=true;const pts=1000+trace*250;host.querySelector('#cbScore').textContent=pts;log.innerHTML+=`&gt; ACCESS GRANTED. CODE ${secret}. SCORE ${pts}.<br>`;score('codebreaker',pts);}else if(trace<=0){done=true;log.innerHTML+=`&gt; TRACE COMPLETE. ACCESS CODE WAS ${secret}.<br>`;}input.value='';input.focus();}
    buttons[0].onclick=guess;buttons[1].onclick=reset;input.addEventListener('keydown',e=>{if(e.key==='Enter')guess();});reset();cleanup=()=>{};
  }

  function packet(host) {
    host.innerHTML=`<div class="game-panel"><h2>PACKET RUNNER</h2><p class="game-sub">Move with ← → or A/D. Dodge red firewall blocks.</p><div class="game-hud"><span>DISTANCE <strong id="distance">0</strong></span><span>STATUS <strong id="packetStatus">READY</strong></span></div><canvas class="game-canvas" id="packetCanvas" width="560" height="420"></canvas><div class="game-controls">${button('SEND PACKET','action primary')}</div></div>`;
    const c=host.querySelector('canvas'),x=c.getContext('2d'),btn=host.querySelector('button');let player,obstacles,timer,spawn,distance,running,keys={};
    function reset(){player={x:260,y:360,w:38,h:38};obstacles=[];distance=0;spawn=0;running=true;host.querySelector('#packetStatus').textContent='IN TRANSIT';}
    function draw(){x.fillStyle='#010403';x.fillRect(0,0,c.width,c.height);x.strokeStyle='rgba(0,229,255,.12)';for(let i=0;i<5;i++){x.strokeRect(i*112,0,112,c.height)}x.fillStyle='#00e5ff';x.shadowColor='#00e5ff';x.shadowBlur=14;x.fillRect(player.x,player.y,player.w,player.h);x.fillStyle='#ff3b81';x.shadowColor='#ff3b81';obstacles.forEach(o=>x.fillRect(o.x,o.y,o.w,o.h));x.shadowBlur=0;}
    function end(){running=false;cancelAnimationFrame(timer);host.querySelector('#packetStatus').textContent='DROPPED';score('packet-runner',distance);btn.textContent='RETRY';}
    function loop(){if(!running)return;if(keys.ArrowLeft||keys.a)player.x-=5;if(keys.ArrowRight||keys.d)player.x+=5;player.x=Math.max(0,Math.min(c.width-player.w,player.x));spawn--;if(spawn<=0){const lane=Math.floor(Math.random()*5);obstacles.push({x:lane*112+18,y:-40,w:76,h:34,v:3+Math.min(6,distance/1500)});spawn=Math.max(18,55-Math.floor(distance/250));}obstacles.forEach(o=>o.y+=o.v);obstacles=obstacles.filter(o=>o.y<c.height+50);for(const o of obstacles){if(player.x<o.x+o.w&&player.x+player.w>o.x&&player.y<o.y+o.h&&player.y+player.h>o.y)return end();}distance+=2;host.querySelector('#distance').textContent=distance;draw();timer=requestAnimationFrame(loop);}
    const down=e=>{keys[e.key]=true;if(['ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault();},up=e=>keys[e.key]=false;addEventListener('keydown',down);addEventListener('keyup',up);btn.onclick=()=>{cancelAnimationFrame(timer);reset();btn.textContent='RESTART';loop();};draw();cleanup=()=>{running=false;cancelAnimationFrame(timer);removeEventListener('keydown',down);removeEventListener('keyup',up);};
  }

  function blackjack(host) {
    let deck=[],player=[],dealer=[],over=false,wins=0;
    host.innerHTML=`<div class="game-panel"><h2>VOID JACK</h2><p class="game-sub">Get closer to 21 than the house node. Dealer stands on 17.</p><div class="game-hud"><span>ROUND SCORE <strong id="bjScore">0</strong></span><span>WINS <strong id="bjWins">0</strong></span></div><h3>HOUSE NODE</h3><div class="card-row" id="dealerCards"></div><h3>OPERATOR</h3><div class="card-row" id="playerCards"></div><div id="bjMessage" class="game-sub"></div><div class="game-controls">${button('HIT','action primary')}${button('STAND')}${button('NEW ROUND')}</div></div>`;
    const suits=['♠','♥','♦','♣'],ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    function makeDeck(){return suits.flatMap(s=>ranks.map(r=>({s,r}))).sort(()=>Math.random()-.5);}
    function value(hand){let n=hand.reduce((t,c)=>t+(c.r==='A'?11:['J','Q','K'].includes(c.r)?10:Number(c.r)),0),aces=hand.filter(c=>c.r==='A').length;while(n>21&&aces--)n-=10;return n;}
    function render(reveal=false){host.querySelector('#playerCards').innerHTML=player.map(c=>`<div class="playing-card">${c.r}${c.s}</div>`).join('');host.querySelector('#dealerCards').innerHTML=dealer.map((c,i)=>`<div class="playing-card">${i===1&&!reveal?'?':c.r+c.s}</div>`).join('');}
    function finish(msg,pts){over=true;render(true);host.querySelector('#bjMessage').textContent=msg;host.querySelector('#bjScore').textContent=pts;if(pts>0){wins++;host.querySelector('#bjWins').textContent=wins;score('void-jack',pts);}}
    function newRound(){deck=makeDeck();player=[deck.pop(),deck.pop()];dealer=[deck.pop(),deck.pop()];over=false;host.querySelector('#bjMessage').textContent='Choose HIT or STAND.';host.querySelector('#bjScore').textContent=0;render();if(value(player)===21)stand();}
    function hit(){if(over)return;player.push(deck.pop());render();if(value(player)>21)finish(`BUST at ${value(player)}. House wins.`,0);}
    function stand(){if(over)return;while(value(dealer)<17)dealer.push(deck.pop());const p=value(player),d=value(dealer);if(d>21||p>d)finish(`WIN: ${p} beats ${d}.`,500+p*10);else if(p===d)finish(`PUSH: ${p} equals ${d}.`,100);else finish(`LOSS: ${d} beats ${p}.`,0);}
    const b=host.querySelectorAll('button');b[0].onclick=hit;b[1].onclick=stand;b[2].onclick=newRound;newRound();cleanup=()=>{};
  }

  function trader(host) {
    const goods=['DATA','CHIPS','FUEL','MEDS'];let cycle,cash,cargo,prices,done;
    host.innerHTML=`<div class="game-panel"><h2>SECTOR TRADER</h2><p class="game-sub">Ten jumps. Buy and sell cargo. Finish with maximum credits.</p><div class="game-hud"><span>CYCLE <strong id="cycle">1/10</strong></span><span>CREDITS <strong id="cash">1000</strong></span><span>CARGO <strong id="cargo">0/20</strong></span></div><table class="trade-table"><thead><tr><th>COMMODITY</th><th>PRICE</th><th>HELD</th><th>ACTION</th></tr></thead><tbody id="market"></tbody></table><div class="game-controls">${button('JUMP TO NEXT SECTOR','action primary')}${button('NEW RUN')}</div><div id="tradeMsg" class="game-sub"></div></div>`;
    function market(){prices=Object.fromEntries(goods.map(g=>[g,Math.floor(20+Math.random()*180)]));render();}
    function held(){return Object.values(cargo).reduce((a,b)=>a+b,0);}
    function render(){host.querySelector('#cycle').textContent=`${cycle}/10`;host.querySelector('#cash').textContent=cash;host.querySelector('#cargo').textContent=`${held()}/20`;host.querySelector('#market').innerHTML=goods.map(g=>`<tr><td>${g}</td><td>${prices[g]} cr</td><td>${cargo[g]}</td><td><button data-buy="${g}">BUY</button> <button data-sell="${g}">SELL</button></td></tr>`).join('');host.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buy(b.dataset.buy));host.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>sell(b.dataset.sell));}
    function buy(g){if(done)return;if(held()>=20)return msg('Cargo bay full.');if(cash<prices[g])return msg('Insufficient credits.');cash-=prices[g];cargo[g]++;render();}
    function sell(g){if(done)return;if(!cargo[g])return msg('No stock held.');cash+=prices[g];cargo[g]--;render();}
    function msg(t){host.querySelector('#tradeMsg').textContent=t;}
    function jump(){if(done)return;if(cycle>=10){goods.forEach(g=>{cash+=cargo[g]*prices[g];cargo[g]=0;});done=true;render();msg(`RUN COMPLETE. FINAL VALUE: ${cash} credits.`);score('sector-trader',cash);return;}cycle++;market();msg('New sector prices received.');}
    function reset(){cycle=1;cash=1000;cargo=Object.fromEntries(goods.map(g=>[g,0]));done=false;market();msg('Market uplink established.');}
    const buttons=host.querySelectorAll('.game-controls button');buttons[0].onclick=jump;buttons[1].onclick=reset;reset();cleanup=()=>{};
  }

  function cipher(host) {
    const words=['TRIBULATION','ELECTRONIK','TERMINAL','MAINFRAME','PROTOCOL','CIPHER','PHANTOM','FIREWALL','UPLINK','SIGNAL','ARCHIVE','OPERATOR','NETWORK','PACKET','SPECTRE'];let word,timer,time,points,playing=false;
    host.innerHTML=`<div class="game-panel"><h2>CIPHER STRIKE</h2><p class="game-sub">Unscramble each signal word before the 60-second clock expires.</p><div class="game-hud"><span>TIME <strong id="cipherTime">60</strong></span><span>SCORE <strong id="cipherScore">0</strong></span></div><div class="cipher-word" id="scramble">PRESS START</div><div class="game-controls"><input id="cipherInput" class="game-input" placeholder="decoded word" autocomplete="off">${button('SUBMIT','action primary')}${button('START RUN')}</div><div id="cipherMsg" class="game-sub"></div></div>`;
    const input=host.querySelector('#cipherInput'),buttons=host.querySelectorAll('button');
    function scramble(w){let a=w.split('');do{a.sort(()=>Math.random()-.5)}while(a.join('')===w);return a.join('');}
    function next(){word=words[Math.floor(Math.random()*words.length)];host.querySelector('#scramble').textContent=scramble(word);input.value='';input.focus();}
    function start(){clearInterval(timer);time=60;points=0;playing=true;host.querySelector('#cipherScore').textContent=0;host.querySelector('#cipherTime').textContent=time;host.querySelector('#cipherMsg').textContent='Decode as many as possible.';next();timer=setInterval(()=>{time--;host.querySelector('#cipherTime').textContent=time;if(time<=0){clearInterval(timer);playing=false;host.querySelector('#scramble').textContent='TIME EXPIRED';host.querySelector('#cipherMsg').textContent=`FINAL SCORE: ${points}`;score('cipher-strike',points);}},1000);}
    function submit(){if(!playing)return;if(input.value.trim().toUpperCase()===word){points+=100+time;host.querySelector('#cipherScore').textContent=points;host.querySelector('#cipherMsg').textContent='DECODE ACCEPTED.';next();}else{time=Math.max(0,time-3);host.querySelector('#cipherMsg').textContent='BAD DECODE. -3 SECONDS.';input.select();}}
    buttons[0].onclick=submit;buttons[1].onclick=start;input.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});cleanup=()=>clearInterval(timer);
  }

  return { launch, stop };
})();
