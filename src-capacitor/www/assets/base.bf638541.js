var N=Object.defineProperty,R=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var m=(e,t,r)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,c=(e,t)=>{for(var r in t||(t={}))w.call(t,r)&&m(e,r,t[r]);if(a)for(var r of a(t))E.call(t,r)&&m(e,r,t[r]);return e},u=(e,t)=>R(e,A(t));var S=(e,t)=>{var r={};for(var o in e)w.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&a)for(var o of a(e))t.indexOf(o)<0&&E.call(e,o)&&(r[o]=e[o]);return r};import{bt as T}from"./index.90ead00b.js";function f(e){this.message=e}f.prototype=new Error,f.prototype.name="InvalidCharacterError";var g=typeof window!="undefined"&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new f("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,o,s=0,n=0,i="";o=t.charAt(n++);~o&&(r=s%4?64*r+o:o,s++%4)?i+=String.fromCharCode(255&r>>(-2*s&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return i};function L(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(r){return decodeURIComponent(g(r).replace(/(.)/g,function(o,s){var n=s.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}(t)}catch{return g(t)}}function d(e){this.message=e}function k(e,t){if(typeof e!="string")throw new d("Invalid token specified");var r=(t=t||{}).header===!0?0:1;try{return JSON.parse(L(e.split(".")[r]))}catch(o){throw new d("Invalid token specified: "+o.message)}}d.prototype=new Error,d.prototype.name="InvalidTokenError";const j=30,v=30,W="ACCESS_TOKEN_PULL_CRM",J="REFRESH_TOKEN_PULL_CRM",Y=Number("15"),Z="WIDGET",q="ADMIN_PANEL",Q="\u0411\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var P=U,D=Object.prototype.toString,p=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function U(e,t,r){var o=r||{},s=o.encode||H;if(typeof s!="function")throw new TypeError("option encode is invalid");if(!p.test(e))throw new TypeError("argument name is invalid");var n=s(t);if(n&&!p.test(n))throw new TypeError("argument val is invalid");var i=e+"="+n;if(o.maxAge!=null){var h=o.maxAge-0;if(isNaN(h)||!isFinite(h))throw new TypeError("option maxAge is invalid");i+="; Max-Age="+Math.floor(h)}if(o.domain){if(!p.test(o.domain))throw new TypeError("option domain is invalid");i+="; Domain="+o.domain}if(o.path){if(!p.test(o.path))throw new TypeError("option path is invalid");i+="; Path="+o.path}if(o.expires){var l=o.expires;if(!$(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");i+="; Expires="+l.toUTCString()}if(o.httpOnly&&(i+="; HttpOnly"),o.secure&&(i+="; Secure"),o.priority){var I=typeof o.priority=="string"?o.priority.toLowerCase():o.priority;switch(I){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(o.sameSite){var O=typeof o.sameSite=="string"?o.sameSite.toLowerCase():o.sameSite;switch(O){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;case"none":i+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return i}function H(e){return encodeURIComponent(e)}function $(e){return D.call(e)==="[object Date]"||e instanceof Date}function y(e,t,r={}){const{days:o,path:s="/",domain:n}=r;return P(e,t,{path:s,domain:n,maxAge:o?60*60*24*o:void 0})}function C(e,t={}){const{domain:r}=t;return y(e,"",{domain:r,days:0})}const _="ACCESS_TOKEN_PULL_CRM",b="REFRESH_TOKEN_PULL_CRM",x=T("auth",{state:()=>({accessToken:null,refreshToken:null}),getters:{hasToken:e=>Boolean(e.accessToken),companyId:e=>{const{companyId:t}=k(e.accessToken);return t}},actions:{async login(e){const t=await this.$api.auth.login(e);await this.saveTokens(t)},async saveTokens({accessToken:e,refreshToken:t}){document.cookie=y(_,e,{days:v}),document.cookie=y(b,t,{days:v}),this.$apiClient.setToken(e),this.accessToken=e,this.refreshToken=t},async authorize(){this.accessToken&&this.$apiClient.setToken(this.accessToken)},async refreshTokenByPosition(e){const t=F();try{const r=this.refreshToken,{role:o,company:s}=e,n=await this.$api.auth.refreshToken({role:o.name,userId:t.profile.id,companyId:s.id,refreshToken:r});await this.saveTokens(n)}catch(r){throw(r.status===403||r.status===401)&&(await this.reset(),location.reload()),r}},async onRefreshToken(){try{const{role:e,companyId:t,userId:r}=k(this.accessToken),o=await this.$api.auth.refreshToken({role:e,userId:r,companyId:t,refreshToken:this.refreshToken});this.saveTokens(o)}catch(e){throw(e.status===403||e.status===401)&&(await this.reset(),location.reload()),e}},reset(){document.cookie=C(_),document.cookie=C(b),this.accessToken=null,this.refreshToken=null},async logout(){this.reset()}}});function K(e){return u(c({},e),{phone:e.phone||"",viber:e.viber||"",address:e.address||"",telegram:e.telegram||"",facebook:e.facebook||"",instagram:e.instagram||"",description:e.description||""})}function V(e){return["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].reduce((t,r)=>u(c({},t),{[r]:M(e[r])}),{})}function M(e){const[t,r,o]=e.split(";");return{opened:t==="true",from:r,to:o}}const z=T("position",{state:()=>({positions:[],current:null}),getters:{hasPositions:e=>e.positions.length>0,positionsDict:e=>e.positions.reduce((t,r)=>u(c({},t),{[r.companyId]:r}),{}),role:e=>e.current.role,currentId:e=>e.current.id,company:e=>K(e.current.company),companyId:e=>e.current.company.id,widgetSettings(){return this.company.widget_setting}},actions:{async fetch(){const e=x(),t=this.positionsDict[e.companyId];t||(await e.reset(),window.location.reload()),this.current=t}}}),F=T("base",{state:()=>({loading:!1,profile:null,isSiteLoaded:!1,companyTypes:[],cities:[]}),getters:{},actions:{async fetchProfile(){const e=z(),o=await this.$api.profile.get(),{specialists:t}=o,r=S(o,["specialists"]);this.profile=r,e.positions=t},async fetchCompanyTypes(){const e=await this.$api.companyTypes.all();this.companyTypes=e},async fetchCities(){const e=await this.$api.cities.all();this.cities=e}}});export{W as A,J as R,Z as S,Y as T,Q as U,F as a,z as b,v as c,j as d,q as e,V as n,k as o,x as u};
