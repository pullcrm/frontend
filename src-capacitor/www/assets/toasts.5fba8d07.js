var r=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var n=(t,s)=>{var o={};for(var i in t)c.call(t,i)&&s.indexOf(i)<0&&(o[i]=t[i]);if(t!=null&&r)for(var i of r(t))s.indexOf(i)<0&&f.call(t,i)&&(o[i]=t[i]);return o};import{bt as u}from"./index.90ead00b.js";let l=0;function d(){return l+=1,l}function h(t){return t==="error"?"solid/x-circle-fill":t==="warning"?"solid/warning-fill":t==="info"?"solid/info-fill":"solid/check-circle-fill"}const w=u("toasts",{state:()=>({toasts:[]}),getters:{has(){return t=>{const s=this.byId(t);return Boolean(s)}},byId:t=>s=>t.toasts.find(o=>o.id===s)},actions:{show(i){var e=i,{type:t="success",timeout:s=5e3}=e,o=n(e,["type","timeout"]);if(["success","warning","info","error"].includes(t)){const a={id:d(),type:t,props:{title:o.title,theme:t,timeout:s,leftIcon:h(t)}};this.toasts=[...this.toasts.splice(0,2),a]}},close(t){this.toasts=this.toasts.filter(s=>s.id!==t)}}});export{d as g,w as u};
