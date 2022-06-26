import{a4 as S,k as I,Q as m,ay as D,W as A,X as w,aF as T,x as t,aG as E,I as L,aE as N,A as q,a2 as e,b1 as p,a1 as x,D as M,bD as P,bp as B}from"./index.90ead00b.js";import{u as R}from"./quasar.esm.prod.c88b943c.js";import{g as Y,u as V}from"./toasts.5fba8d07.js";import{b as j}from"./base.bf638541.js";import{A as k,u as O}from"./specialist.1814df6d.js";import{u as W}from"./specialists.07b97c72.js";import{api as U}from"./api.9988d825.js";import{f as G}from"./date-time.d466b3fd.js";import"./roles.61f7d6b9.js";import"./_commonjsHelpers.2cf1d77b.js";import"./isTomorrow.a3ceb101.js";function H(l){return new Promise(a=>{const o=new FileReader;o.addEventListener("load",n=>{const s=n.target.result;s&&a({name:l.name,url:String(s)}),a(null)}),o.readAsDataURL(l)})}const Q={class:"file-upload"},X=["for"],J=["id","name"],K=S({props:{image:{type:String,default:null}},emits:["input"],setup(l,{emit:a}){const o=l,n=Y(),s=I(""),_=m(()=>s.value||o.image);async function b({target:u}){if(!u.files)return;const f=await H(u.files[0]);!f||(s.value=f.url,a("input",u.files[0]))}return(u,f)=>(D(),A("div",Q,[w("label",{class:"file-upload__inner",for:`file-upload-${t(n)}`},[T(u.$slots,"default",{url:t(_)}),w("input",{id:`file-upload-${t(n)}`,type:"file",name:`file-upload-${t(n)}`,accept:"image/jpeg,image/png,image/jpg",onChange:b},null,40,J)],8,X)]))}});const Z={class:"specialist-about-page-avatars"},uu=["onClick"],eu={class:"specialist-about-page-avatars__image"},tu=S({props:{avatars:{type:Array,default:()=>[]},specialist:{type:Object,required:!0}},emits:["refresh"],setup(l,{emit:a}){const o=l,n=V(),s=W(),_=m(()=>o.specialist.user),b=m(()=>[...o.avatars].reverse()),u=m(()=>_.value.avatarId);async function f(v){try{if(!v)return;if(o.avatars.length>5){n.show({type:"error",title:"\u041F\u0435\u0440\u0435\u0432\u0438\u0449\u0435\u043D\u043E \u043B\u0456\u043C\u0456\u0442 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0430\u0432\u0430\u0442\u0430\u0440\u043E\u043A"});return}const r=new FormData;r.append("files",v),r.append("group",k),r.append("userId",_.value.id);const[c]=await s.onUploadAvatar(r);c!=null&&c.id&&(await C(c.id),window.location.reload())}catch(r){if(r.status===413){n.show({type:"error",title:"\u0424\u0430\u0439\u043B \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0439, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432 \u0456\u043D\u0448\u043E\u043C\u0443 \u0440\u043E\u0437\u043C\u0456\u0440\u0456"});return}throw r}}async function C(v){await U.specialist.update({id:o.specialist.id,avatarId:v}),n.show({title:"\u0412\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u043E\u0432\u0438\u0439 \u0430\u0432\u0430\u0442\u0430\u0440"}),a("refresh")}return(v,r)=>{const c=E("UiAvatar");return D(),A("div",Z,[(D(!0),A(L,null,N(t(b),F=>(D(),A("div",{key:F.id,class:q(["specialist-about-page-avatars__image",{_active:t(u)===F.id}]),onClick:d=>C(F.id)},[e(c,{size:"l",image:F.path},null,8,["image"])],10,uu))),128)),w("div",eu,[e(K,{onInput:f},{default:p(()=>[e(c,{size:"l",icon:"outlined/plus"})]),_:1})])])}}});const au={class:"specialist-info-page-created-at"},su={class:"specialist-info-page-created-at__text"},iu=x(" \u0414\u043E\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457 "),ou=S({props:{createdAt:{type:String,required:!0}},setup(l){return(a,o)=>{const n=E("UiIcon"),s=E("UiText");return D(),A("div",au,[e(n,{size:"l",name:"solid/user-circle-plus-fill"}),w("div",su,[e(s,{size:"m",responsive:""},{default:p(()=>[iu]),_:1}),e(s,{size:"l",responsive:""},{default:p(()=>[x(M(t(G)(l.createdAt,"D MMMM, YYYY")),1)]),_:1})])])}}});function nu(l){const a=document.createElement("textarea");a.value=l,a.style.position="absolute",a.style.left="-99999px",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a)}const lu={class:"specialist-info-page"},ru=["onSubmit"],cu=x(" \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0435 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443 \u0437\u0430\u043F\u0438\u0441\u0443 "),pu=x(" \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 "),Au=S({setup(l){R({title:"\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0430 - pullcrm"});const a=P(),o=V(),n=j(),s=O(),_=I(!1),b=m(()=>s.avatars),u=m(()=>s.specialist),f=m(()=>n.companyId),C=m(()=>u.value.id),v=m(()=>u.value.user);async function r(){try{_.value=!0;const{id:d,user:i,status:g,description:y,specialization:$}=u.value;await U.specialist.update({id:d,email:i.email||void 0,status:g,fullName:i.fullName,description:y,specialization:$}),o.show({title:"\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E!"}),c()}catch(d){o.show({title:`\u041F\u043E\u043C\u0438\u043B\u043A\u0430: ${d.data.message}`,type:"error"})}finally{_.value=!1}}async function c(){const[d,i]=await Promise.all([U.files.all(v.value.id,{group:k}),U.specialist.get(C.value)]);s.avatars=d,s.specialist=i}async function F(){const{href:d}=a.resolve({name:"fullWidgetSpecialistPage",query:{companyId:f.value,specialistId:C.value}}),{BASE_HOST:i}=process.env;nu(`https://${i}${d}`),await o.show({title:"\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u0441\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E"})}return(d,i)=>{const g=E("UiInput"),y=E("UiField"),$=E("UiLink"),z=E("UiButton");return D(),A("div",lu,[e(tu,{class:"specialist-info-page__avatars",avatars:t(b),specialist:t(u),onRefresh:c},null,8,["avatars","specialist"]),w("form",{onSubmit:B(r,["prevent"])},[e(y,{label:"\u0406\u043C'\u044F \u0442\u0430 \u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435",required:""},{default:p(()=>[e(g,{modelValue:t(u).user.fullName,"onUpdate:modelValue":i[0]||(i[0]=h=>t(u).user.fullName=h),name:"name",placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0406\u043C'\u044F \u0442\u0430 \u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435",required:""},null,8,["modelValue"])]),_:1}),e(y,{label:"\u0422\u0435\u043B\u0435\u0444\u043E\u043D",required:""},{default:p(()=>[e(g,{name:"phone",mask:"+38 (###) #### ###",type:"phone",disabled:"",inputmode:"tel","left-icon":"outlined/phone","model-value":t(u).user.phone},null,8,["model-value"])]),_:1}),e(y,{label:"\u041F\u043E\u0448\u0442\u0430"},{default:p(()=>[e(g,{modelValue:t(u).user.email,"onUpdate:modelValue":i[1]||(i[1]=h=>t(u).user.email=h),name:"email",type:"email",placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043F\u043E\u0447\u0442\u0443"},null,8,["modelValue"])]),_:1}),e(y,{label:"\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u044F"},{default:p(()=>[e(g,{modelValue:t(u).specialization,"onUpdate:modelValue":i[2]||(i[2]=h=>t(u).specialization=h),name:"specialization",placeholder:"\u041F\u0440\u043E\u0444\u0456\u043B\u044C \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0430"},null,8,["modelValue"])]),_:1}),e(y,{label:"\u041E\u043F\u0438\u0441"},{default:p(()=>[e(g,{modelValue:t(u).description,"onUpdate:modelValue":i[3]||(i[3]=h=>t(u).description=h),name:"description",placeholder:"\u0414\u043E\u0431\u0430\u0432\u0442\u0435 \u043E\u043F\u0438\u0441",tag:"textarea"},null,8,["modelValue"])]),_:1}),e(ou,{class:"specialist-info-page__created-at","created-at":t(u).createdAt},null,8,["created-at"]),e($,{tag:"UiText",size:"l",theme:"action","left-icon":"outlined/link",class:"specialist-info-page__widget",onClick:B(F,["prevent"])},{default:p(()=>[cu]),_:1},8,["onClick"]),e(z,{class:"specialist-info-page__button",size:"l",type:"submit",theme:"blue",loading:_.value},{default:p(()=>[pu]),_:1},8,["loading"])],40,ru)])}}});export{Au as default};