var me=Object.defineProperty;var Y=Object.getOwnPropertySymbols;var ve=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable;var G=(e,n,t)=>n in e?me(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,K=(e,n)=>{for(var t in n||(n={}))ve.call(n,t)&&G(e,t,n[t]);if(Y)for(var t of Y(n))_e.call(n,t)&&G(e,t,n[t]);return e};import{u as ne,b as H,a as ie}from"./base.bf638541.js";import{by as V,aY as ae,as as R,ao as N,bz as se,a9 as q,bA as U,k as x,bB as re,al as J,ac as y,Q as d,r as A,aA as he,aw as pe,bC as ge,a4 as $,aG as T,ay as p,U as z,b1 as C,a2 as u,X as w,D as le,aI as be,bD as W,W as P,bp as ye,x as b,V as M,a1 as I}from"./index.90ead00b.js";import{c as Z,g as we}from"./dom.f10ff276.js";import{h as Se}from"./render.5e4deb99.js";import{u as xe}from"./popup.f1a4d1c1.js";import{A as ue}from"./roles.61f7d6b9.js";import{_ as ze}from"./logo.0179c6cf.js";import{u as Ee}from"./sms.892ef9cc.js";import{f as Ce}from"./money.dd3f296a.js";import{S as Te}from"./Loader.9c247aee.js";const $e=[null,document,document.body,document.scrollingElement,document.documentElement];function ke(e,n){let t=we(n);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return $e.includes(t)?window:t}function Le(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function De(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let B;function F(){if(B!==void 0)return B;const e=document.createElement("p"),n=document.createElement("div");Z(e,{width:"100%",height:"200px"}),Z(n,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),n.appendChild(e),document.body.appendChild(n);const t=e.offsetWidth;n.style.overflow="scroll";let o=e.offsetWidth;return t===o&&(o=n.clientWidth),n.remove(),B=t-o,B}const{passive:ee}=U,Ae=["both","horizontal","vertical"];var Be=V({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Ae.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,s,l;ae(()=>e.scrollTarget,()=>{r(),f()});function c(){o!==null&&o();const v=Math.max(0,Le(s)),E=De(s),_={top:v-t.position.top,left:E-t.position.left};if(e.axis==="vertical"&&_.top===0||e.axis==="horizontal"&&_.left===0)return;const L=Math.abs(_.top)>=Math.abs(_.left)?_.top<0?"up":"down":_.left<0?"left":"right";t.position={top:v,left:E},t.directionChanged=t.direction!==L,t.delta=_,t.directionChanged===!0&&(t.direction=L,t.inflectionPoint=t.position),n("scroll",K({},t))}function f(){s=ke(l,e.scrollTarget),s.addEventListener("scroll",a,ee),a(!0)}function r(){s!==void 0&&(s.removeEventListener("scroll",a,ee),s=void 0)}function a(v){if(v===!0||e.debounce===0||e.debounce==="0")c();else if(o===null){const[E,_]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];o=()=>{_(E),o=null}}}const g=q();return R(()=>{l=g.proxy.$el.parentNode,f()}),N(()=>{o!==null&&o(),r()}),Object.assign(g.proxy,{trigger:a,getPosition:()=>t}),se}});function Re(){const e=x(!re.value);return e.value===!1&&R(()=>{e.value=!0}),e}const ce=typeof ResizeObserver!="undefined",te=ce===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var oe=V({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let t=null,o,s={width:-1,height:-1};function l(r){r===!0||e.debounce===0||e.debounce==="0"?c():t===null&&(t=setTimeout(c,e.debounce))}function c(){if(clearTimeout(t),t=null,o){const{offsetWidth:r,offsetHeight:a}=o;(r!==s.width||a!==s.height)&&(s={width:r,height:a},n("resize",s))}}const f=q();if(Object.assign(f.proxy,{trigger:l}),ce===!0){let r;return R(()=>{J(()=>{o=f.proxy.$el.parentNode,o&&(r=new ResizeObserver(l),r.observe(o),c())})}),N(()=>{clearTimeout(t),r!==void 0&&(r.disconnect!==void 0?r.disconnect():o&&r.unobserve(o))}),se}else{let g=function(){clearTimeout(t),a!==void 0&&(a.removeEventListener!==void 0&&a.removeEventListener("resize",l,U.passive),a=void 0)},v=function(){g(),o&&o.contentDocument&&(a=o.contentDocument.defaultView,a.addEventListener("resize",l,U.passive),c())};const r=Re();let a;return R(()=>{J(()=>{o=f.proxy.$el,o&&v()})}),N(g),()=>{if(r.value===!0)return y("object",{style:te.style,tabindex:-1,type:"text/html",data:te.url,"aria-hidden":"true",onLoad:v})}}}}),Pe=V({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:n,emit:t}){const{proxy:{$q:o}}=q(),s=x(null),l=x(o.screen.height),c=x(e.container===!0?0:o.screen.width),f=x({position:0,direction:"down",inflectionPoint:0}),r=x(0),a=x(re.value===!0?0:F()),g=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),v=d(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),E=d(()=>a.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${a.value}px`}:null),_=d(()=>a.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${a.value}px`,width:`calc(100% + ${a.value}px)`}:null);function L(i){if(e.container===!0||document.qScrollPrevented!==!0){const m={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};f.value=m,e.onScroll!==void 0&&t("scroll",m)}}function de(i){const{height:m,width:S}=i;let k=!1;l.value!==m&&(k=!0,l.value=m,e.onScrollHeight!==void 0&&t("scroll-height",m),Q()),c.value!==S&&(k=!0,c.value=S),k===!0&&e.onResize!==void 0&&t("resize",i)}function fe({height:i}){r.value!==i&&(r.value=i,Q())}function Q(){if(e.container===!0){const i=l.value>r.value?F():0;a.value!==i&&(a.value=i)}}let D;const j={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:s,height:l,containerHeight:r,scrollbarWidth:a,totalWidth:d(()=>c.value+a.value),rows:d(()=>{const i=e.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:A({size:0,offset:0,space:!1}),right:A({size:300,offset:0,space:!1}),footer:A({size:0,offset:0,space:!1}),left:A({size:300,offset:0,space:!1}),scroll:f,animate(){D!==void 0?clearTimeout(D):document.body.classList.add("q-body--layout-animate"),D=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),D=void 0},155)},update(i,m,S){j[i][m]=S}};if(he(ge,j),F()>0){let S=function(){i=null,m.classList.remove("hide-scrollbar")},k=function(){if(i===null){if(m.scrollHeight>o.screen.height)return;m.classList.add("hide-scrollbar")}else clearTimeout(i);i=setTimeout(S,300)},O=function(X){i!==null&&X==="remove"&&(clearTimeout(i),S()),window[`${X}EventListener`]("resize",k)},i=null;const m=document.body;ae(()=>e.container!==!0?"add":"remove",O),e.container!==!0&&O("add"),pe(()=>{O("remove")})}return()=>{const i=Se(n.default,[y(Be,{onScroll:L}),y(oe,{onResize:de})]),m=y("div",{class:g.value,style:v.value,ref:e.container===!0?void 0:s},i);return e.container===!0?y("div",{class:"q-layout-container overflow-hidden",ref:s},[y(oe,{onResize:fe}),y("div",{class:"absolute-full",style:E.value},[y("div",{class:"scroll",style:_.value},[m])])]):m}}});const Oe={class:"navbar-item__name"},h=$({props:{tag:{type:String,default:"div"},to:{type:[Object,String],default:null},icon:{type:String,required:!0},name:{type:String,required:!0}},setup(e){return(n,t)=>{const o=T("UiIcon");return p(),z(be(e.to?"RouterLink":e.tag),{class:"navbar-item",to:e.to},{default:C(()=>[u(o,{name:e.icon,size:"s"},null,8,["name"]),w("span",Oe,le(e.name),1)]),_:1},8,["to"])}}});const Fe={class:"navbar-mobile"},Ne=$({setup(e){W(),ne();const n=xe(),t=H(),o=d(()=>t.role.name===ue);async function s(){await n.show({name:"appointment",props:{type:"new"}})}return(l,c)=>(p(),P("div",Fe,[u(h,{to:{name:"dashboard"},icon:"solid/house-fill",name:"\u0413\u043E\u043B\u043E\u0432\u043D\u0430"}),u(h,{to:{name:"schedule"},icon:"solid/calendar-fill",name:"\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440"}),u(h,{tag:"a",href:"#",icon:"solid/plus-circle-fill",name:"\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438",onClick:ye(s,["prevent"])},null,8,["onClick"]),b(o)?(p(),z(h,{key:0,to:{name:"analytics"},icon:"solid/chart-bar-fill",name:"\u0410\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430"})):(p(),z(h,{key:1,to:{name:"specialists"},icon:"solid/users-fill",name:"\u0421\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A\u0438"}))]))}});const Ue={class:"navbar-desktop"},He=w("img",{class:"navbar-desktop__logo",src:ze},null,-1),Ve=w("div",{class:"navbar-desktop__space"},null,-1),qe=$({setup(e){W(),ne();const n=ie(),t=H(),o=d(()=>t.role.name===ue),s=d(()=>n.profile);return d(()=>{var l;return(l=s.value.avatar)==null?void 0:l.path}),(l,c)=>(p(),P("div",Ue,[He,u(h,{to:{name:"dashboard"},icon:"solid/house-fill",name:"\u0413\u043E\u043B\u043E\u0432\u043D\u0430"}),u(h,{to:{name:"schedule"},icon:"solid/calendar-fill",name:"\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440"}),u(h,{to:{name:"specialists"},icon:"solid/users-fill",name:"\u0421\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A\u0438"}),u(h,{to:{name:"procedures"},icon:"solid/list",name:"\u041F\u043E\u0441\u043B\u0443\u0433\u0438"}),b(o)?(p(),z(h,{key:0,to:{name:"analytics"},icon:"solid/chart-bar-fill",name:"\u0410\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430"})):M("",!0),u(h,{to:{name:"settings"},icon:"solid/gear-fill",name:"\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F"}),Ve]))}});const We={class:"navbar"},Me=$({setup(e){return(n,t)=>(p(),P("div",We,[u(qe,{class:"navbar__desktop"}),u(Ne,{class:"navbar__mobile"})]))}});const Ie={class:"header"},Qe={class:"header__inner"},je={class:"header__left"},Xe=I(" \u0412\u0430\u0448 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442 "),Ye=I(" \u041F\u043E\u0432\u0456\u0434\u043E\u043C\u0438\u0442\u0438 \u043F\u0440\u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 "),Ge={class:"header__right"},Ke=$({setup(e){const n=Ee(),t=H();W();const o=d(()=>t.company),s=d(()=>{var f;return(f=o.value.logo)==null?void 0:f.path}),l=d(()=>n.balance);d(()=>t.companyId);const c=d(()=>{const{BASE_HOST:f}=process.env;return`https://${f}`});return(f,r)=>{const a=T("UiText"),g=T("UiAvatar"),v=T("UiContainer");return p(),P("div",Ie,[u(v,null,{default:C(()=>[w("div",Qe,[w("div",je,[u(a,{tag:"a",size:"l",href:b(c),target:"_blank","right-icon":"solid/link-fill",responsive:""},{default:C(()=>[Xe]),_:1},8,["href"]),u(a,{tag:"a",href:"mailto:admin@pullcrm.com",size:"l","right-icon":"outlined/megaphone",responsive:"",class:"header__mail"},{default:C(()=>[Ye]),_:1})]),w("div",Ge,[b(l)!==null?(p(),z(a,{key:0,tag:"RouterLink",to:{name:"smsSettings"},size:"l",strong:"",responsive:"","right-icon":"outlined/wallet",class:"header__balance"},{default:C(()=>[I(le(b(Ce)(b(l))),1)]),_:1})):M("",!0),u(g,{class:"header__avatar",size:"s",image:b(s),name:b(o).name},null,8,["image","name"])])])]),_:1})])}}});const Je={class:"dashboard-layout__container"},Ze=w("div",{class:"dashboard-layout__footer"},null,-1),dt=$({setup(e){const n=ie(),t=d(()=>n.loading);return(o,s)=>{const l=T("router-view"),c=T("PortalTarget");return p(),z(Pe,{class:"dashboard-layout"},{default:C(()=>[u(Me,{class:"dashboard-layout__navbar"}),w("div",Je,[u(Ke,{class:"dashboard-layout__header"}),u(l),Ze]),u(c,{name:"sidebar"}),b(t)?(p(),z(Te,{key:0})):M("",!0)]),_:1})}}});export{dt as default};
