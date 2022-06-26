var v=Object.defineProperty,R=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var l=(e,t,s)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,c=(e,t)=>{for(var s in t||(t={}))T.call(t,s)&&l(e,s,t[s]);if(a)for(var s of a(t))f.call(t,s)&&l(e,s,t[s]);return e},u=(e,t)=>R(e,A(t));var m=(e,t)=>{var s={};for(var o in e)T.call(e,o)&&t.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&a)for(var o of a(e))t.indexOf(o)<0&&f.call(e,o)&&(s[o]=e[o]);return s};import{bu as p}from"./index.53588f62.js";function h(e){this.message=e}h.prototype=new Error,h.prototype.name="InvalidCharacterError";var S=typeof window!="undefined"&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new h("'atob' failed: The string to be decoded is not correctly encoded.");for(var s,o,r=0,n=0,i="";o=t.charAt(n++);~o&&(s=r%4?64*s+o:o,r++%4)?i+=String.fromCharCode(255&s>>(-2*r&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return i};function M(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(s){return decodeURIComponent(S(s).replace(/(.)/g,function(o,r){var n=r.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}(t)}catch{return S(t)}}function d(e){this.message=e}function y(e,t){if(typeof e!="string")throw new d("Invalid token specified");var s=(t=t||{}).header===!0?0:1;try{return JSON.parse(M(e.split(".")[s]))}catch(o){throw new d("Invalid token specified: "+o.message)}}d.prototype=new Error,d.prototype.name="InvalidTokenError";const K=30,E=30,F="ACCESS_TOKEN_PULL_CRM",H="REFRESH_TOKEN_PULL_CRM",z=Number("15"),x="WIDGET",B="ADMIN_PANEL",G="\u041D\u0430\u0433\u0430\u0434\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u043E \u0437\u0430\u043F\u0438\u0441! %date% \u0443 %time% \u0443 \u0432\u0430\u0441 %procedures%",W="\u041D\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441! %date% \u0443 %time% %procedures%. \u0421\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A %specialist%",J="\u0411\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457",g="ACCESS_TOKEN_PULL_CRM",k="REFRESH_TOKEN_PULL_CRM",O=p("auth",{state:()=>({accessToken:null,refreshToken:null}),getters:{hasToken:e=>Boolean(e.accessToken),companyId:e=>{const{companyId:t}=y(e.accessToken);return t}},actions:{async login(e){const t=await this.$api.auth.login(e);await this.saveTokens(t)},async saveTokens({accessToken:e,refreshToken:t}){this.accessToken=e,this.refreshToken=t,this.$cookies.set(g,e,{path:"/",expires:E}),this.$cookies.set(k,t,{path:"/",expires:E}),this.$apiClient.setToken(e)},async authorize(){this.accessToken&&this.$apiClient.setToken(this.accessToken)},async refreshTokenByPosition(e){const t=L();try{const s=this.refreshToken,{role:o,company:r}=e,n=await this.$api.auth.refreshToken({role:o.name,userId:t.profile.id,companyId:r.id,refreshToken:s});await this.saveTokens(n)}catch(s){throw(s.status===403||s.status===401)&&(await this.reset(),location.reload()),s}},async onRefreshToken(){try{const{role:e,companyId:t,userId:s}=y(this.accessToken),o=await this.$api.auth.refreshToken({role:e,userId:s,companyId:t,refreshToken:this.refreshToken});this.saveTokens(o)}catch(e){throw(e.status===403||e.status===401)&&(await this.reset(),location.reload()),e}},reset(){this.$cookies.remove(g),this.$cookies.remove(k),this.accessToken=null,this.refreshToken=null},async logout(){this.reset()}}});function N(e){return u(c({},e),{phone:e.phone||"",viber:e.viber||"",address:e.address||"",telegram:e.telegram||"",facebook:e.facebook||"",instagram:e.instagram||"",description:e.description||""})}function Y(e){const{name:t,city:s,type:o,phone:r,logoId:n,address:i,description:w,viber:I,telegram:C,facebook:_,instagram:b}=e;return{name:t,cityId:s.id,typeId:o.id,phone:r,logoId:n||void 0,address:i,description:w,viber:I,telegram:C,facebook:_,instagram:b}}function Z(e){const{hasRemindSMS:t,hasCreationSMS:s,remindSMSMinutes:o,remindSMSTemplate:r,creationSMSTemplate:n}=e;return{hasRemindSMS:t,hasCreationSMS:s,remindSMSMinutes:o,remindSMSTemplate:r||void 0,creationSMSTemplate:n||void 0}}function j(e){return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].reduce((t,s)=>u(c({},t),{[s]:D(e[s])}),{})}function D(e){const[t,s,o]=e.split(";");return{opened:t==="true",from:s,to:o}}const P=p("position",{state:()=>({positions:[],current:null}),getters:{hasPositions:e=>e.positions.length>0,positionsDict:e=>e.positions.reduce((t,s)=>u(c({},t),{[s.companyId]:s}),{}),role:e=>e.current.role,currentId:e=>e.current.id,company:e=>N(e.current.company),companyId:e=>e.current.company.id,widgetSettings(){return this.company.widget_setting}},actions:{async fetch(){const e=O(),t=this.positionsDict[e.companyId];t||(await e.reset(),window.location.reload()),this.current=t}}}),L=p("base",{state:()=>({loading:!1,profile:null,isSiteLoaded:!1,companyTypes:[],cities:[]}),getters:{},actions:{async fetchProfile(){const e=P(),o=await this.$api.profile.get(),{specialists:t}=o,s=m(o,["specialists"]);this.profile=s,e.positions=t},async fetchCompanyTypes(){const e=await this.$api.companyTypes.all();this.companyTypes=e},async fetchCities(){const e=await this.$api.cities.all();this.cities=e}}});export{F as A,H as R,x as S,z as T,J as U,L as a,P as b,E as c,K as d,G as e,W as f,Z as g,Y as h,B as i,j as n,y as o,O as u};
