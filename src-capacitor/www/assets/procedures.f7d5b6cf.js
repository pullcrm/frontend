var l=Object.defineProperty,g=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var u=(e,r,t)=>r in e?l(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,i=(e,r)=>{for(var t in r||(r={}))f.call(r,t)&&u(e,t,r[t]);if(c)for(var t of c(r))m.call(r,t)&&u(e,t,r[t]);return e},a=(e,r)=>g(e,h(r));import{bu as y}from"./index.53588f62.js";import{U as I}from"./base.686dbe64.js";function d(e){const{name:r,price:t,duration:s,category:o,description:n,specialistIds:p}=e;return a(i({name:r,price:Number(t),duration:s,categoryId:null},o&&{categoryId:o.id}),{description:n,specialistIds:p||[]})}function P(e,r){const t=r.map(o=>({category:o,procedures:T(e,o.id),categoryTitle:o.name}),{}),s=e.filter(({category:o})=>!o);return s.length>0&&t.push({category:null,procedures:s,categoryTitle:I}),t}function T(e,r){return e.filter(({category:t})=>t?t.id===r:!1)}const C=y("procedures",{state:()=>({procedures:[],categories:[],grouped:[]}),getters:{total:e=>e.grouped.reduce((r,{procedures:t})=>r+t.length,0)},actions:{async fetch(){const[e,r]=await Promise.all([this.$api.procedures.all({limit:50,sort:"order",order:"asc"}),this.$api.categories.all()]);this.procedures=e||[],this.categories=r||[],this.grouped=P(e,r)},async updateProcedure(e){return await this.$api.procedures.update(e.id,d(e))},async createProcedure(e){await this.$api.procedures.create(d(e)),await this.fetch()},updateGroupByIndex({procedures:e,index:r}){const t=a(i({},this.grouped[r]),{procedures:e});this.grouped.splice(r,1,t)}}});export{P as g,C as u};
