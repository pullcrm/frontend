import{a4 as r,aG as _,ay as t,W as i,X as p,a2 as d,b1 as n,a1 as o,D as c,U as u,V as l,aF as g}from"./index.53588f62.js";const m={class:"settings-page-section"},v={class:"settings-page-section__text"},y={key:0,class:"settings-page-section__append"},x=r({name:"Section",props:{title:{type:String,required:!0},subTitle:{type:String,default:void 0}},setup(e){return(s,f)=>{const a=_("UiText");return t(),i("div",m,[p("div",v,[d(a,{size:"l",responsive:"",class:"settings-page-section__title"},{default:n(()=>[o(c(e.title),1)]),_:1}),e.subTitle?(t(),u(a,{key:0,size:"m",responsive:"",class:"settings-page-section__sub-title"},{default:n(()=>[o(c(e.subTitle),1)]),_:1})):l("",!0)]),s.$slots.append?(t(),i("div",y,[g(s.$slots,"append")])):l("",!0)])}}});export{x as _};