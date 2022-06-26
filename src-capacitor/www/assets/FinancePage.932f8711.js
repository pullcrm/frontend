import{u as k}from"./quasar.esm.prod.7cf60e50.js";import{u as A}from"./toasts.113f48d8.js";import{u as h}from"./analytics.16c9d535.js";import{u as N}from"./specialists.56f430f2.js";import{f as g}from"./money.dd3f296a.js";import{_ as y}from"./InfoPanel.49feab07.js";import{a4 as z,Q as r,aG as o,ay as T,W as V,X as M,a2 as e,b1 as t,a1 as n,D as i,x as a,A as b,U as $,V as I,k as w,f as j}from"./index.53588f62.js";import{_ as G}from"./DatePicker.06e76f12.js";import"./dayjs.228bf609.js";import{f as x}from"./date-time.d466b3fd.js";import{d as Y}from"./isTomorrow.a3ceb101.js";import"./base.686dbe64.js";import"./roles.61f7d6b9.js";import"./_commonjsHelpers.2cf1d77b.js";const H={class:"analytics-finance-page-numbers"},Q={class:"ui-grid"},R=n(" \u041F\u0440\u043E\u0434\u0430\u0436\u0456 "),W=n(" \u0414\u043E\u0445\u0456\u0434 "),X=n(" \u0421\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0447\u0435\u043A "),q=z({name:"Numbers",setup(S){const p=h(),d=r(()=>p.financeStats),c=r(()=>d.value.total),_=r(()=>d.value.income);return r(()=>d.value.average),(f,l)=>{const s=o("UiText"),m=o("UiTitle");return T(),V("div",H,[M("div",Q,[e(y,{class:b(["ui-grid-item","ui-grid-item_12","ui-grid-item_tablet_6","ui-grid-item_laptop_4"]),theme:"blue",icon:"solid/shopping-cart-fill"},{default:t(()=>[e(s,{size:"m",responsive:""},{default:t(()=>[R]),_:1}),e(m,{size:"s",responsive:""},{default:t(()=>[n(i(a(c)),1)]),_:1})]),_:1}),e(y,{class:b(["ui-grid-item","ui-grid-item_12","ui-grid-item_tablet_6","ui-grid-item_laptop_4"]),theme:"green",icon:"solid/wallet-fill"},{default:t(()=>[e(s,{size:"m",responsive:""},{default:t(()=>[W]),_:1}),e(m,{size:"s",responsive:""},{default:t(()=>[n(i(a(g)(a(_))),1)]),_:1})]),_:1}),e(y,{class:b(["ui-grid-item","ui-grid-item_12","ui-grid-item_tablet_6","ui-grid-item_laptop_4"]),theme:"yellow",icon:"solid/receipt-fill"},{default:t(()=>[e(s,{size:"m",responsive:""},{default:t(()=>[X]),_:1}),e(m,{size:"s",responsive:""},{default:t(()=>[n(i(a(g)(a(_)/a(c))),1)]),_:1})]),_:1})])])}}});const J=z({name:"Table",setup(S){const p=h(),d=r(()=>p.financeStats),c=r(()=>d.value.procedures);return(_,f)=>{const l=o("UiText"),s=o("UiTableColumn"),m=o("UiTable"),D=o("UiPanel");return a(c).length>0?(T(),$(D,{key:0,class:"analytics-finance-page-table",size:"s"},{default:t(()=>[e(m,{data:a(c),numbered:""},{default:t(({row:u})=>[e(s,{name:"\u041D\u0430\u0437\u0432\u0430",align:"left"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(u.name),1)]),_:2},1024)]),_:2},1024),e(s,{name:"\u0426\u0456\u043D\u0430",align:"center"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(a(g)(u.avgPrice)),1)]),_:2},1024)]),_:2},1024),e(s,{name:"\u041F\u0440\u043E\u0434\u0430\u0436\u0456",align:"center"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(u.total),1)]),_:2},1024)]),_:2},1024),e(s,{name:"\u041E\u043D\u043B\u0430\u0439\u043D",align:"center"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(u.online),1)]),_:2},1024)]),_:2},1024),e(s,{name:"\u041E\u0444\u043B\u0430\u0439\u043D",align:"center"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(u.offline),1)]),_:2},1024)]),_:2},1024),e(s,{name:"\u0414\u043E\u0445\u0456\u0434",align:"center"},{default:t(()=>[e(l,{size:"m",responsive:""},{default:t(()=>[n(i(a(g)(u.income)),1)]),_:2},1024)]),_:2},1024)]),_:1},8,["data"])]),_:1})):I("",!0)}}});const K={class:"analytics-finance-page"},L={class:"analytics-finance-page__header"},me=z({name:"FinancePage",setup(S){k({title:"\u0410\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430 \u0444\u0456\u043D\u0430\u043D\u0441\u0456\u0432 - pullcrm"}),A();const p=h(),d=N(),c=w(null),_=r(()=>p.dates),f=r(()=>_.value[0]),l=r(()=>_.value[1]),s=r(()=>d.specialists);async function m(){var u;await p.fetchFinanceStats({startDate:Y(f.value).format("YYYY-MM-DD"),endDate:Y(l.value).format("YYYY-MM-DD"),specialistId:(u=c.value)==null?void 0:u.id})}function D(u){return u>new Date(new Date().setHours(0,0,0,0))}return(u,v)=>{const E=o("UiIcon"),F=o("UiText"),B=o("UiPopover"),C=o("UiSelect"),P=o("UiField");return T(),V("div",K,[M("div",L,[e(B,{size:"m",placement:"bottom_start"},{body:t(()=>[e(G,{modelValue:a(_),"onUpdate:modelValue":v[0]||(v[0]=U=>j(_)?_.value=U:null),range:"","disabled-date":D,onInput:m},null,8,["modelValue"])]),default:t(()=>[e(F,{size:"m","right-icon":"outlined/caret-down"},{prepend:t(()=>[e(E,{size:"s",name:"outlined/calendar"})]),default:t(()=>[n(" "+i(a(x)(a(f),"D"))+" - "+i(a(x)(a(l),"D MMMM YYYY")),1)]),_:1})]),_:1}),e(P,null,{default:t(()=>[e(C,{modelValue:c.value,"onUpdate:modelValue":[v[1]||(v[1]=U=>c.value=U),m],options:a(s),clearable:"","label-key":"fullName",placeholder:"\u0412\u0441\u0456 \u0441\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A\u0438"},null,8,["modelValue","options"])]),_:1})]),e(q,{class:"analytics-finance-page__numbers"}),e(J,{class:"analytics-finance-page__table"})])}}});export{me as default};
