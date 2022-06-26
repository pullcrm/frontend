var G=Object.defineProperty,U=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var g=(t,e,r)=>e in t?G(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u=(t,e)=>{for(var r in e||(e={}))$.call(e,r)&&g(t,r,e[r]);if(T)for(var r of T(e))b.call(e,r)&&g(t,r,e[r]);return t},h=(t,e)=>U(t,v(e));var k=(t,e)=>{var r={};for(var s in t)$.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&T)for(var s of T(t))e.indexOf(s)<0&&b.call(t,s)&&(r[s]=t[s]);return r};var i=(t,e,r)=>(g(t,typeof e!="symbol"?e+"":e,r),r);import{u as S}from"./base.bf638541.js";import{bq as R}from"./index.90ead00b.js";import{g as L}from"./_commonjsHelpers.2cf1d77b.js";const O=t=>({auth:{login(e){return t("login",e)},registration(e){return t("users",e)},restore(e){return t("users/restore",e)},logout(){return t("logout",{},"POST")},refreshToken(e){return t("token",e,"PUT")}},companies:{byId(e){return t(`companies/${e}`,null,"GET")},create(e){return t("companies",e)},update(e,r){return t(`companies/${e}`,r,"PUT")}},profile:{get(){return t("users/profile",null,"GET")},confirm(e){return t("users/finish",e,"PUT")}},specialist:{get(e){return t(`specialists/${e}`,null,"GET")},create(e){return t("specialists",e)},update(s){var n=s,{id:e}=n,r=k(n,["id"]);return t(`specialists/${e}`,r,"PUT")},all(e){return t("specialists",e,"GET")},bulk(e){return t("specialists/bulk",e,"PUT")},procedures(e){return t(`specialists/${e}/procedures`,null,"GET")},setProcedures(e,r){return t(`specialists/${e}/procedures`,r,"PUT")},sendFinishLink(e){return t(`specialists/${e}/sendFinishLink`,null,"GET")},remove(e){return t(`specialists/${e}`,{},"DELETE")}},users:{create(e){return t("users",e)},confirmation(e){return t("users/confirmation",e)}},categories:{all(){return t("categories",null,"GET")},create(e){return t("categories",e)},update(e,r){return t(`categories/${e}`,r,"PUT")},remove(e){return t(`categories/${e}`,{},"DELETE")}},procedures:{create(e){return t("procedures",e)},remove(e){return t(`procedures/${e}`,{},"DELETE")},update(e,r){return t(`procedures/${e}`,r,"PUT")},bulk(e){return t("procedures/bulk",e,"PUT")},all(e){return t("procedures",e,"GET")}},appointments:{all(e){return t("appointments",e,"GET")},queue(){return t("appointments/queue",null,"GET")},create(e){return t("appointments",e)},update(e,r){return t(`appointments/${e}`,r,"PUT")},updateStatus(e,r){return t(`appointments/${e}/status`,r,"PUT")},remove(e){return t(`appointments/${e}`,{},"DELETE")},availableTime(e){return t("appointments/available-time",e)}},files:{all(e,r){return t(`files/${e}`,r,"GET")},remove(e){return t(`files/${e}`,{},"DELETE")}},cities:{all(){return t("cities",null,"GET")}},companyTypes:{all(){return t("companies/my/types",null,"GET")}},timeOff:{all(e){return t("timeoff",e,"GET")},create(e){return t("timeoff",e)},update(e,r){return t(`timeoff/${e}`,r,"PUT")},delete(e){return t(`timeoff/${e}`,{},"DELETE")}},public:{specialistsByCompanyId(e){return t("public/specialists",e,"GET")},proceduresByCompanyId(e){return t("public/procedures",e,"GET")},hoursSlots(e){return t("public/appointments/available-time",e)},appointmentCreate(e){return t("public/appointments",e)},companyById(e){return t(`public/companies/${e}`,null,"GET")},specialistById(e){return t(`public/specialists/${e}`,null,"GET")},categories(e){return t("public/categories",e,"GET")},companyTypes(){return t("public/companies/types",null,"GET")}},timetable:{get(e){return t(`public/timework/${e}`,null,"GET")},update(e){return t("timework",e,"PUT")}},analytics:{simple(e){return t("companies/my/stats",e,"GET")},calendar(e){return t("analytics/calendar",e,"GET")},finance(e){return t("analytics/finance",e,"GET")}},sms:{settingCreate(e){return t("sms/settings",e)},settingUpdate(e){return t("sms/settings",e,"PUT")},history(e){return t("balance/history",h(u({},e),{description:"SEND_SMS"}),"GET")}},balance:{get(){return t("balance",null,"GET")},history(e){return t("balance/history",h(u({},e),{description:"DEPOSIT"}),"GET")}},settings:{widget(){return t("public/widget",null,"GET")},widgetUpdate(e){return t("widget",e,"PUT")}}});function B(t,e){return e=e||{},new Promise(function(r,s){var n=new XMLHttpRequest,a=[],l=[],o={},c=function(){return{ok:(n.status/100|0)==2,statusText:n.statusText,status:n.status,url:n.responseURL,text:function(){return Promise.resolve(n.responseText)},json:function(){return Promise.resolve(n.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([n.response]))},clone:c,headers:{keys:function(){return a},entries:function(){return l},get:function(f){return o[f.toLowerCase()]},has:function(f){return f.toLowerCase()in o}}}};for(var m in n.open(e.method||"get",t,!0),n.onload=function(){n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(f,p,E){a.push(p=p.toLowerCase()),l.push([p,E]),o[p]=o[p]?o[p]+","+E:E}),r(c())},n.onerror=s,n.withCredentials=e.credentials=="include",e.headers)n.setRequestHeader(m,e.headers[m]);n.send(e.body||null)})}var H=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),C=L(H),y=self.fetch||(self.fetch=C.default||C);self.atob.bind(self);var j=self.btoa.bind(self);class x extends Error{constructor({method:r,params:s,error:n,token:a}){super();i(this,"code");i(this,"token");i(this,"method");i(this,"params");i(this,"fieldName");i(this,"sentryCategory");i(this,"sentryFingerprint");this.name="RpcError",this.code=400,this.token=a?a.slice(0,6):null,this.params=s,this.method=r,this.message=n.message,this.fieldName=n.fieldName,this.sentryCategory="rpcClient",this.sentryFingerprint=[r,n.message]}}class w extends Error{constructor({method:r,params:s,status:n}){super();i(this,"method");i(this,"params");i(this,"status");i(this,"sentryCategory");i(this,"sentryFingerprint");this.name="HttpError",this.method=r,this.params=s,this.status=n,this.message=`Method "${r}" returned status ${n}.`,this.sentryCategory="rpcClient",this.sentryFingerprint=[r,n]}}class A extends Error{constructor({status:r}){super();i(this,"status");i(this,"sentryCategory");this.name="HttpUploadError",this.status=r,this.sentryCategory="rpcClient"}}class N{constructor(e){i(this,"endpoint");i(this,"endpointUpload");i(this,"endpointBalanceCheckout");i(this,"auth");i(this,"token");i(this,"defaultHeaders");i(this,"onRefreshToken");i(this,"call",async(e,r={},s="POST")=>{const n=h(u({},this.headers),{"Content-Type":"application/json"}),a=s!=="GET"?JSON.stringify(r):null,l=s==="GET"?this.getQueryParams(r):"",o=await y(`${this.endpoint}${e}${l}`,{method:s,body:a,headers:n});if(e!=="token"&&o.status===401)return await this.onRefreshToken(),this.call(e,r,s);if(!o.ok)throw new w({method:e,params:r,status:o.status});const c=await o.json();if(c.error){const m=c.error;throw new x({method:e,params:r,error:m,token:this.token})}return c});i(this,"upload",async e=>{const r=await y(this.endpointUpload,{method:"POST",body:e,headers:this.headers});if(!r.ok)throw new A({status:r.status});return await r.json()});i(this,"balanceCheckout",async e=>{const r=h(u({},this.headers),{"Content-Type":"application/json"}),s=await y(this.endpointBalanceCheckout,{method:"POST",body:JSON.stringify(e),headers:r});if(!s.ok)throw new w({method:"balance/checkout",params:e,status:s.status});return await s.text()});const{auth:r,headers:s,endpoint:n,endpointUpload:a,endpointBalanceCheckout:l,onRefreshToken:o}=e;this.endpoint=n,this.endpointUpload=a,this.endpointBalanceCheckout=l,this.auth=r,this.defaultHeaders=s,this.onRefreshToken=o}setToken(e){this.token=e}get headers(){return u(u(u({},this.auth&&{Authorization:`Basic ${j(`${this.auth}`)}`}),this.defaultHeaders),this.token&&{Authorization2:`Bearer ${this.token}`})}getQueryParams(e){return e?`?${Object.keys(e).filter(r=>e[r]).map(r=>Array.isArray(e[r])?e[r].map(s=>`${r}[]=${s}`).join("&"):`${r}=${e[r]}`).join("&")}`:""}}const _="clients",D="guest",q={auth:`${_}:${D}`,headers:{"accept-encoding":"gzip"}},P=new N(u({endpoint:"https://dev.pullcrm.com/api/",endpointUpload:"https://dev.pullcrm.com/api/files/images/",endpointBalanceCheckout:`${{}.RPC_BALANCE_CHECKOUT}/`,onRefreshToken:async()=>{await S().onRefreshToken()}},q)),d=O(P.call);var J=R(t=>{const{app:e,store:r}=t;e.config.globalProperties.$api=d,e.provide("api",d),r.use(()=>({$api:d})),r.use(()=>({$apiClient:P}))});export{d as api,J as default};
