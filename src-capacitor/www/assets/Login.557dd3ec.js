var P=Object.defineProperty;var b=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var y=(a,e,u)=>e in a?P(a,e,{enumerable:!0,configurable:!0,writable:!0,value:u}):a[e]=u,c=(a,e)=>{for(var u in e||(e={}))$.call(e,u)&&y(a,u,e[u]);if(b)for(var u of b(e))q.call(e,u)&&y(a,u,e[u]);return a};import{a4 as A,bw as R,bD as T,k as z,r as M,as as L,aG as i,ay as E,U,b1 as s,X as B,a2 as n,x as r,a1 as m,D as G,V as X,bp as j}from"./index.90ead00b.js";import{u as H}from"./quasar.esm.prod.c88b943c.js";import{u as J,a as K,b as O}from"./base.bf638541.js";import{V as D,a as Q,u as W}from"./index.a16d5f6b.js";import{_ as Y}from"./Layout.450cccb5.js";import{g as Z}from"./format-phone.df9e2fd4.js";import"./logo.0179c6cf.js";const uu=["onSubmit"],eu=m(" \u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u0434\u043E\u0441\u0442\u0443\u043F "),ou={class:"auth-page-login__actions"},tu=m(" \u0423\u0432\u0456\u0439\u0442\u0438 "),au=m(" \u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F "),mu=A({setup(a){H({title:"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F - pullcrm"});const e=R(),u=T(),_=J(),F=K(),h=O(),l=z(null),o=M({phone:"",password:""}),S={phone:c(c({},D("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443")),Q("\u041D\u0435 \u0432\u0456\u0440\u043D\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043D\u043E\u043C\u0435\u0440\u0443")),password:c({},D("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C"))},f=W(S,o);L(()=>{const{phone:d}=e.query;d&&(o.phone=String(d))});const k=async()=>{if(!!await f.$validate())try{if(await _.login({phone:Z(o.phone),password:o.password}),await F.fetchProfile(),h.hasPositions){const t=h.positions[0];await _.refreshTokenByPosition(t),u.push({name:"dashboard"});return}await u.push({name:"companyCreate"})}catch(t){if(t.fieldName){l.value=t;return}throw t}};return(d,t)=>{const w=i("UiInput"),v=i("UiField"),x=i("UiText"),I=i("UiAlert"),V=i("UiButton"),N=i("UiFormValidator");return E(),U(Y,{title:"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F","sub-title":"\u0423\u0432\u0456\u0439\u0434\u0456\u0442\u044C \u0443 \u0441\u0438\u0441\u0442\u0435\u043C\u0443, \u0449\u043E\u0431 \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043E \u0441\u0432\u043E\u0454\u0457 \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457",class:"auth-page-login"},{default:s(()=>[B("form",{onSubmit:j(k,["prevent"])},[n(N,{validate:r(f)},{default:s(({resetFieldError:g,getFieldError:C})=>[n(v,{label:"\u0422\u0435\u043B\u0435\u0444\u043E\u043D",error:C("phone")},{default:s(()=>[n(w,{modelValue:r(o).phone,"onUpdate:modelValue":t[0]||(t[0]=p=>r(o).phone=p),mask:"+38 (###) #### ###",type:"phone",name:"phone",inputmode:"tel","left-icon":"outlined/phone",placeholder:"066",autocomplete:"on",onInput:p=>(l.value=null,g("phone"))},null,8,["modelValue","onInput"])]),_:2},1032,["error"]),n(v,{label:"\u041F\u0430\u0440\u043E\u043B\u044C",error:C("password")},{default:s(()=>[n(w,{modelValue:r(o).password,"onUpdate:modelValue":t[1]||(t[1]=p=>r(o).password=p),type:"password",name:"password","left-icon":"outlined/key",placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",autocomplete:"on",onInput:p=>(l.value=null,g("password"))},null,8,["modelValue","onInput"])]),_:2},1032,["error"]),n(x,{tag:"RouterLink",to:{name:"restore",query:{phone:r(o).phone}},size:"s",class:"auth-page-login__reset"},{default:s(()=>[eu]),_:1},8,["to"]),l.value?(E(),U(I,{key:0,theme:"error","left-icon":"solid/warning-circle-fill",class:"auth-page-login__error"},{default:s(()=>[m(G(l.value.message),1)]),_:1})):X("",!0),B("div",ou,[n(V,{type:"submit",size:"l",theme:"blue"},{default:s(()=>[tu]),_:1}),n(V,{to:{name:"registration",query:{phone:r(o).phone}},type:"submit",size:"l",theme:"info-outlined"},{default:s(()=>[au]),_:1},8,["to"])])]),_:1},8,["validate"])],40,uu)]),_:1})}}});export{mu as default};