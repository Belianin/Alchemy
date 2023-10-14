(()=>{"use strict";const e={forest:"Лес",negative:"Негатив",work:"Работа",money:"Деньги",water:"Влага",wind:"Ветер",tester:"Тестировщик",pivko:"Пив&ко",anton:"Антоша",ants:"Муравьи",cigarettes:"Сигареты",dm:"Дядя Миша",dm_dead:"Мертвый Дядя Миша",dm_dead_eight:"Восемь мертвых Дядей Миш",dm_dead_four:"Четвыре мертвых Дяди Мишей",dm_dead_six:"Шесть мертвых Дядей Миш",dm_dead_two:"Два метрвых Дяди Миши",dm_dressed:"Одетый Дядя Миша",dm_wet:"Влажный Дядя Миша",persimmon:"Хурма",persimmon_with_ants:"Хурма с муравьями",portal:"Портвл в Ад",wolf:"Волк",wolf_two:"Два волка",wolf_four:"Четыре волка",blob:"Blob",lobster:"Лобствер",blobster:"Блобстер",frog:"Жаба",il_blob:"Илюха Блобстер",wolfpack_1:"Дядя Миша и три волка",wolfpack_2:"Антоша, Дядя миша и два волка",wolfpack_3:"Блобстер, Антоша, Дядя миша и волк",wolfpack_4:"Стая",victory:"Победа",online_prince:"Онлайн-принц",anton_anteater:"Антоша Муравьед",calculator:"Калькулятор",beer:"Пиво",beer_alkofree:"Безалкогольное пиво",minus:"Минус",1230:"12:30",food:"Еда",plain:"Поле",island:"Остров",gay_island:"Гей-Остров",kal:"Кал",hat:"Шапка",ad:"АД",calculator_prince:"Принц-калькулятор"},t={negative:4,calculator:5},s={};for(let i in e)if(t[i]){const e=[];for(let s=0;s<t[i];s++){const t=new Image;t.src=`./images/${i}_${s}.png`,e.push(t)}s[i]=e}else{const e=new Image;e.src=`./images/${i}.png`,s[i]=e}const i=document.getElementById("canvas");i.width=800,i.height=800;const o=64,r=new class{constructor(){this.field=[],this.recipies=[],this.selectedItem=null,this.leftRecipiesCountMap={},i.addEventListener("mousedown",this.handleOnClick.bind(this)),i.addEventListener("mousemove",this.handleMove.bind(this)),i.addEventListener("mouseleave",this.handleMouseLeave.bind(this)),i.addEventListener("mouseup",this.handleMouseLeave.bind(this)),this.ctx=i.getContext("2d"),this.tick=0,setInterval(this.draw.bind(this),40)}load(e,t){console.log("Loaded"),console.log(t),this.field=t,this.recipies=e,this.leftRecipiesCountMap={};for(let t of e)this.leftRecipiesCountMap[t.first]=this.leftRecipiesCountMap[t.first]?this.leftRecipiesCountMap[t.first]+1:1,this.leftRecipiesCountMap[t.second]=this.leftRecipiesCountMap[t.second]?this.leftRecipiesCountMap[t.second]+1:1}draw(){this.tick=(this.tick+1)%100,this.ctx.fillStyle="white",this.ctx.fillRect(0,0,800,800),this.ctx.fillStyle="black";for(let t of this.field){const i=s[t.id],r=Array.isArray(i)?i[Math.floor(.2*this.tick)%i.length]:i;this.ctx.drawImage(r,t.x,t.y),this.ctx.fillText(e[t.id],t.x,t.y+o+12),this.ctx.fillText((this.leftRecipiesCountMap[t.id]||0).toString(),t.x,t.y+o+24)}}handleMove(e){if(!this.selectedItem)return;const t=this.getMousePosition(e);this.selectedItem.x=t.x-32,this.selectedItem.y=t.y-32}handleMouseLeave(t){if(this.selectedItem){e:for(let t of this.field)if(t!==this.selectedItem&&!(t.x+o<=this.selectedItem.x||this.selectedItem.x+o<t.x||t.y+o<this.selectedItem.y||this.selectedItem.y+o<t.y)){console.log(`Found intersection with ${t.id}`);for(let s of this.recipies)if(s.first===this.selectedItem.id&&s.second===t.id||s.second===this.selectedItem.id&&s.first===t.id){if(!s.found){s.found=!0,this.leftRecipiesCountMap[s.first]--,this.leftRecipiesCountMap[s.second]--;const t=document.createElement("p");t.innerText=`${e[s.first]} + ${e[s.second]} = ${e[s.result]}`,document.getElementById("recipies").appendChild(t)}this.field=this.field.filter((e=>e.isEternal||e!==t&&e!==this.selectedItem)),t.isEternal?this.field.push({x:t.x,y:t.y-o-16,id:s.result}):this.field.push({x:this.selectedItem.x,y:this.selectedItem.y,id:s.result});break e}}this.selectedItem.isEternal&&(this.selectedItem.x=this.selectedItem.startX,this.selectedItem.y=this.selectedItem.startY),this.selectedItem=null}}handleOnClick(e){const t=this.getMousePosition(e);console.log(t);for(let e of this.field)if(e.x<=t.x&&e.x+o>=t.x&&e.y<=t.y&&e.y+o>=t.y){this.selectedItem=e;break}}getMousePosition(e){const t=i.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}};r.load([{first:"negative",second:"work",result:"money"},{first:"wind",second:"money",result:"tester"},{first:"money",second:"water",result:"pivko"},{first:"dm",second:"water",result:"dm_wet"},{first:"dm_wet",second:"wind",result:"dm_dead"},{first:"tester",second:"work",result:"persimmon"},{first:"tester",second:"forest",result:"ants"},{first:"persimmon",second:"ants",result:"persimmon_with_ants"},{first:"work",second:"water",result:"forest"},{first:"cigarettes",second:"tester",result:"anton"},{first:"negative",second:"hat",result:"dm"},{first:"ants",second:"persimmon",result:"persimmon_with_ants"},{first:"money",second:"pivko",result:"cigarettes"},{first:"dm_dead_six",second:"dm_dead_four",result:"portal"},{first:"dm_dead_eight",second:"dm_dead_two",result:"portal"},{first:"dm_dead",second:"dm_dead",result:"dm_dead_two"},{first:"dm_dead_two",second:"dm_dead_two",result:"dm_dead_four"},{first:"dm_dead_two",second:"dm_dead_four",result:"dm_dead_six"},{first:"dm_dead_six",second:"dm_dead_two",result:"dm_dead_eight"},{first:"dm_dead_four",second:"dm_dead_four",result:"dm_dead_eight"},{first:"forest",second:"negative",result:"wolf"},{first:"wolf",second:"wolf",result:"wolf_two"},{first:"wolf_two",second:"wolf_two",result:"wolf_four"},{first:"wolf_four",second:"dm",result:"wolfpack_1"},{first:"wolfpack_1",second:"anton_anteater",result:"wolfpack_2"},{first:"wolfpack_2",second:"il_blob",result:"wolfpack_3"},{first:"wolfpack_3",second:"ad",result:"wolfpack_4"},{first:"wolfpack_4",second:"portal",result:"victory"},{first:"anton",second:"persimmon_with_ants",result:"anton_anteater"},{first:"negative",second:"money",result:"online_prince"},{first:"money",second:"work",result:"blob"},{first:"blob",second:"lobster",result:"blobster"},{first:"forest",second:"water",result:"frog"},{first:"frog",second:"water",result:"lobster"},{first:"blobster",second:"frog",result:"il_blob"},{first:"blob",second:"money",result:"calculator"},{first:"calculator",second:"money",result:"minus"},{first:"pivko",second:"water",result:"beer"},{first:"beer",second:"minus",result:"beer_alkofree"},{first:"work",second:"minus",result:"1230"},{first:"work",second:"1230",result:"food"},{first:"forest",second:"wind",result:"plain"},{first:"plain",second:"water",result:"island"},{first:"island",second:"beer_alkofree",result:"gay_island"},{first:"gay_island",second:"food",result:"kal"},{first:"calculator",second:"online_prince",result:"calculator_prince"},{first:"calculator_prince",second:"portal",result:"ad"},{first:"negative",second:"wind",result:"hat"}],[{x:200,y:400,id:"water",isEternal:!0,startX:200,startY:400},{x:300,y:400,id:"wind",isEternal:!0,startX:300,startY:400},{x:400,y:400,id:"negative",isEternal:!0,startX:400,startY:400},{x:500,y:400,id:"work",isEternal:!0,startX:500,startY:400}]),function(e){const t=document.getElementById("save-button"),s=document.getElementById("load-button"),i="alchemy-save";s.disabled=!window.localStorage.getItem(i),t.onclick=function(){const t={fields:e.field,recipies:e.recipies};window.localStorage.setItem(i,JSON.stringify(t)),s.disabled=!1},s.onclick=function(){const t=JSON.parse(window.localStorage.getItem(i)),s=t.fields,o=t.recipies;e.load(o,s)}}(r)})();