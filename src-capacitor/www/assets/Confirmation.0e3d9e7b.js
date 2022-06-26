var U=Object.defineProperty;var F=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var h=(o,e,u)=>e in o?U(o,e,{enumerable:!0,configurable:!0,writable:!0,value:u}):o[e]=u,n=(o,e)=>{for(var u in e||(e={}))k.call(e,u)&&h(o,u,e[u]);if(F)for(var u of F(e))g.call(e,u)&&h(o,u,e[u]);return o};import{a4 as x,bx as I,bD as A,r as $,k as N,Q as T,aG as p,ay as M,U as R,b1 as i,X as L,a2 as s,x as q,bp as z,a1 as G}from"./index.53588f62.js";import{u as Q}from"./quasar.esm.prod.7cf60e50.js";import{u as X,a as j,b as H}from"./base.686dbe64.js";import{u as J}from"./toasts.113f48d8.js";import{c as K,V as B,d as O,u as W}from"./index.e6dcdd48.js";import{_ as Y}from"./Layout.ed4dcc8e.js";import{api as Z}from"./api.50e126cb.js";import"./logo.0179c6cf.js";import"./_commonjsHelpers.2cf1d77b.js";const u4=["onSubmit"],e4=G(" \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 "),m4=x({name:"Confirmation",setup(o){Q({title:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0457 - pullcrm"});const e=I(),u=A(),m=X(),V=j(),c=J(),f=H(),a=$({password:"",repeatPassword:""}),d=N(!1),v=T(()=>String(e.params.slug)),b={password:n(n({},K("\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432: 4",4)),B("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C")),repeatPassword:n(n({},B("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C")),O("\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0441\u043F\u0456\u0432\u043F\u0430\u0434\u0430\u044E\u0442\u044C",a.password))},_=W(b,a);async function D(){if(!!await _.$validate())try{d.value=!0;const t=await Z.profile.confirm({token:v.value,password:a.password});if(await m.saveTokens(t),await V.fetchProfile(),f.hasPositions){const l=f.positions[0];await m.refreshTokenByPosition(l),u.push({name:"dashboard"});return}await u.push({name:"companyCreate"})}catch(t){if(t.fieldName==="code"){c.show({title:t.message,type:"error"});return}if(t.status===404){c.show({title:"\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u0438\u0439",type:"error"});return}throw t}finally{d.value=!1}}return(y,t)=>{const l=p("UiInput"),w=p("UiField"),S=p("UiButton"),P=p("UiFormValidator");return M(),R(Y,{title:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0457","sub-title":"\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0443",class:"auth-confirmation"},{default:i(()=>[L("form",{onSubmit:z(D,["prevent"])},[s(P,{validate:q(_)},{default:i(({resetFieldError:C,getFieldError:E})=>[s(w,{label:"\u041F\u0430\u0440\u043E\u043B\u044C",error:E("password")},{default:i(()=>[s(l,{modelValue:a.password,"onUpdate:modelValue":t[0]||(t[0]=r=>a.password=r),"left-icon":"outlined/key",name:"password",type:"password",placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",onInput:r=>C("password")},null,8,["modelValue","onInput"])]),_:2},1032,["error"]),s(w,{label:"\u041F\u043E\u0432\u0442\u043E\u0440\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",error:E("repeatPassword")},{default:i(()=>[s(l,{modelValue:a.repeatPassword,"onUpdate:modelValue":t[1]||(t[1]=r=>a.repeatPassword=r),"left-icon":"outlined/key",name:"repeatPassword",type:"password",placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",onInput:r=>C("repeatPassword")},null,8,["modelValue","onInput"])]),_:2},1032,["error"]),s(S,{class:"auth-confirmation__button",type:"submit",size:"l",theme:"blue",loading:d.value},{default:i(()=>[e4]),_:1},8,["loading"])]),_:1},8,["validate"])],40,u4)]),_:1})}}});export{m4 as default};
