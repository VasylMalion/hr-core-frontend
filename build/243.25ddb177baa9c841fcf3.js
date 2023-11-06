"use strict";(self.webpackChunkproject_course=self.webpackChunkproject_course||[]).push([[243],{7259:(e,t,s)=>{s.d(t,{r:()=>c});var n,a=s(7294);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},r.apply(this,arguments)}var c=function(e){return a.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",width:20,height:20,fill:"none",viewBox:"0 0 24 24"},e),n||(n=a.createElement("path",{fill:"#fff",d:"M13 3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2h-8V3Z"})))};s.p},6869:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"0181513d645b26470e6bf775d4d8ad27.png"},2589:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"4528e6f2751f53694618619dfa4f122c.png"},9210:(e,t,s)=>{s.d(t,{Z:()=>h});var n,a=s(5893),r=s(7294),c=s(1072),i=s(5529);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},l.apply(this,arguments)}var o=function(e){return r.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",width:800,height:800,viewBox:"0 0 24 24"},e),n||(n=r.createElement("path",{d:"m15 18.5 5-5m0 5-5-5M11 14H3M11 18H3M3 6h10.5M20 6h-2.25M20 10H9.5M3 10h2.25"})))};s.p;const d=JSON.parse('{"sorry":"Sorry!","noResult":"No result was found"}'),h=(0,r.memo)((function(e){var t=e.className,s=(0,c.$G)(i.h.emptyList).t;return(0,a.jsxs)("div",{className:"".concat(t," flex flex-col justify-center items-center my-10 mx-4"),children:[(0,a.jsx)(o,{className:"w-40 h-40 md:w-52 md:h-52 stroke-black dark:stroke-white"}),(0,a.jsxs)("div",{className:"text-center mb-8",children:[(0,a.jsx)("div",{className:"text-3xl mb-2",children:s("sorry")}),(0,a.jsx)("div",{children:s("noResult")})]})]})}));(0,i.r)(i.h.emptyList,d,d)},9243:(e,t,s)=>{s.r(t),s.d(t,{default:()=>C});var n=s(5893),a=s(7294),r=s(1072),c=s(9250),i=s(5529),l=s(9156),o=s(1270),d=s(7259),h=s(7524),u=s(9210),m=s(8271),f=s(2599),v=s(2925),x=s(5038),p=s(2589),j=s(6869),g=s(8379);const w=function(e){var t=e.id,s=e.position,a=e.location,l=e.description,o=e.createdAt,d=e.status,u=e.assignedTo,m=(0,r.$G)(i.h.vacancies).t,w=(0,c.s0)(),N=localStorage.getItem(g.a1)===v.Q2.DARK;return(0,n.jsxs)("div",{onClick:function(){return w((0,f.Gn)(h.s2.VACANCY_DETAILS,{id:t}))},className:"\r\n          dark:bg-dark-100 min-h-[16rem] w-64 bg-white p-6 rounded-md \r\n          flex flex-col justify-between cursor-pointer\r\n        ",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"font-[ceraProBold]",children:s}),(0,n.jsx)("div",{className:"font-[ceraProLight] pt-1",children:a})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"overflow-hidden",children:(0,n.jsx)("div",{className:"font-[ceraProLight] text-gray-500 text-sm pt-3 h-24\r\n          text-ellipsis overflow-hidden whitespace-pre-wrap",children:l})}),(0,n.jsxs)("div",{className:"grid gap-2 pt-4",children:[(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("div",{className:"text-gray-500",children:(0,x.p6)(o)}),(0,n.jsx)("div",{className:d===v.C$.ACTIVE?"text-green":"text-red",children:m("tabs.".concat(d))})]}),(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)("img",{src:N?j.Z:p.Z,className:"w-8 h-8"}),(0,n.jsx)("span",{children:"".concat(u.name," ").concat(u.surname)})]})]})]})]})},N=JSON.parse('{"title":"Vacancies","addNewVacancy":"Add New Vacancy","search":"Search","onlyMine":"Show only my vacancies","tabs":{"ALL":"All","ACTIVE":"Active","INACTIVE":"Inactive"}}'),b=JSON.parse('{"title":"Вакансії","addNewVacancy":"Додати вакансію","search":"Пошук","onlyMine":"Показати тільки власні вакансії","tabs":{"ALL":"Всі","ACTIVE":"Активні","INACTIVE":"Неактивні"}}');var y,A=function(){return A=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++)for(var a in t=arguments[s])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},A.apply(this,arguments)};!function(e){e.ALL="ALL",e.ACTIVE="ACTIVE",e.INACTIVE="INACTIVE"}(y||(y={}));const C=function(){var e=(0,r.$G)(i.h.vacancies).t,t=(0,c.s0)(),s=(0,a.useState)(1),f=s[0],v=s[1],x=(0,a.useState)(y.ALL),p=x[0],j=x[1],g=(0,a.useState)(!1),N=g[0],b=g[1],C=(0,a.useState)(""),I=C[0],E=C[1],L=(0,m.N)({value:I}),V=(0,l.fY)(),T=V[0],S=V[1],O=S.data,k=S.isFetching,M=S.isSuccess,Z=S.isError,P=null==O?void 0:O.vacancies.map((function(e){return(0,n.jsx)(w,A({},e))}));(0,a.useEffect)((function(){v(1)}),[p,I,N]),(0,a.useEffect)((function(){T({status:p!==y.ALL?p:void 0,limit:8,page:f,onlyMine:N,filter:L})}),[p,f,N,L]);var G=[{title:e("tabs.ALL"),type:y.ALL},{title:e("tabs.ACTIVE"),type:y.ACTIVE},{title:e("tabs.INACTIVE"),type:y.INACTIVE}];return(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4",children:[(0,n.jsx)(o.ZT,{appearance:"title",children:e("title")}),(0,n.jsx)("div",{children:(0,n.jsx)(o.zx,{icon:(0,n.jsx)(d.r,{}),onClick:function(){return t(h.s2.VACANCY_ADDING)},children:e("addNewVacancy")})})]}),(0,n.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-6",children:[(0,n.jsx)(o.II,{label:e("search"),placeholder:e("search"),value:I,onChange:E,className:"mb-4 md:mb-0"}),(0,n.jsx)(o.XZ,{checked:N,onChange:b,caption:e("onlyMine")})]}),(0,n.jsx)(o.LU,{options:G,value:p,onChange:j}),(0,n.jsx)(o.Fg,{isLoading:k,isSuccess:M,isError:Z,children:(null==O?void 0:O.vacancies.length)?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"flex flex-wrap gap-8 mt-8",children:P}),(0,n.jsx)("div",{className:"my-8",children:(0,n.jsx)(o.tl,{pagesCount:null==O?void 0:O.count,currentPage:f,onChange:v})})]}):(0,n.jsx)(u.Z,{})})]})};(0,i.r)(i.h.vacancies,N,b)},8271:(e,t,s)=>{s.d(t,{N:()=>a});var n=s(7294),a=function(e){var t=e.value,s=(0,n.useState)(""),a=s[0],r=s[1];return(0,n.useEffect)((function(){var e=setTimeout((function(){r(t)}),300);return function(){return clearTimeout(e)}}),[t]),a}}}]);