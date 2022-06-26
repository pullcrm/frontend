import{u as T}from"./quasar.esm.prod.7cf60e50.js";import{u as A}from"./popup.f1b7e5e0.js";import{b as D}from"./base.686dbe64.js";import{u as V}from"./specialist.8713490f.js";import{u as $,g as w}from"./procedures.f7d5b6cf.js";import{_ as G}from"./ProcedurePreview.6281caad.js";import{a4 as g,aG as p,ay as e,W as t,a2 as I,b1 as f,a1 as E,D as L,I as y,aE as v,U as s,Q as u,x as a,V as m}from"./index.53588f62.js";import{S as N}from"./roles.61f7d6b9.js";import"./money.dd3f296a.js";import"./time.8571a5e6.js";import"./dayjs.228bf609.js";import"./isTomorrow.a3ceb101.js";import"./_commonjsHelpers.2cf1d77b.js";const z={class:"specialist-procedures-page-procedures-group"},M=g({name:"ProceduresGroup",props:{group:null},setup(o){return(i,n)=>{const c=p("UiText");return e(),t("div",z,[I(c,{size:"m",strong:"",responsive:"",class:"specialist-procedures-page-procedures-group__name"},{default:f(()=>[E(L(o.group.categoryTitle),1)]),_:1}),(e(!0),t(y,null,v(o.group.procedures,r=>(e(),s(G,{key:`procedure-${r.id}`,procedure:r,class:"specialist-procedures-page-procedures-group__procedure-preview"},null,8,["procedure"]))),128))])}}});const Q={class:"specialist-procedures-page"},W=E(" \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0441\u043B\u0443\u0433 "),te=g({name:"ProceduresPage",setup(o){T({title:"\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0441\u043B\u0443\u0433 \u0444\u0430\u0445\u0456\u0432\u0446\u044F - pullcrm"});const i=A(),n=D(),c=V(),r=$(),l=u(()=>c.specialist),h=u(()=>n.role.name!==N),P=u(()=>l.value.procedures),S=u(()=>r.categories),x=u(()=>w(P.value,S.value)),_=u(()=>x.value.filter(({procedures:d})=>d.length>0)),B=u(()=>_.value.length===0);function F(){i.show({name:"specialist-procedures",props:{specialist:l.value}})}return(d,j)=>{const C=p("UiPlaceholder"),k=p("UiButton");return e(),t("div",Q,[a(B)?(e(),s(C,{key:0,title:"\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0441\u043B\u0443\u0433 \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u0439",text:"\u0414\u043E\u0434\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0443\u0433\u0443, \u0449\u043E\u0431 \u0444\u0430\u0445\u0456\u0432\u0435\u0446\u044C \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0432 \u0440\u043E\u0431\u043E\u0442\u0443",class:"specialist-procedures-page__placeholder"})):m("",!0),(e(!0),t(y,null,v(a(_),(U,b)=>(e(),s(M,{key:b,group:U,class:"specialist-procedures-page__procedures-group"},null,8,["group"]))),128)),a(h)?(e(),s(k,{key:1,size:"m",theme:"blue","right-icon":"outlined/pencil-simple",class:"specialist-procedures-page__button",onClick:F},{default:f(()=>[W]),_:1})):m("",!0)])}}});export{te as default};