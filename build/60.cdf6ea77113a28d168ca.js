"use strict";(self.webpackChunkproject_course=self.webpackChunkproject_course||[]).push([[60],{7259:(e,n,t)=>{t.d(n,{r:()=>a});var i,r=t(7294);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},s.apply(this,arguments)}var a=function(e){return r.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",width:20,height:20,fill:"none",viewBox:"0 0 24 24"},e),i||(i=r.createElement("path",{fill:"#fff",d:"M13 3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2h-8V3Z"})))};t.p},9210:(e,n,t)=>{t.d(n,{Z:()=>h});var i,r=t(5893),s=t(7294),a=t(1072),c=t(5529);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},l.apply(this,arguments)}var d=function(e){return s.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",width:800,height:800,viewBox:"0 0 24 24"},e),i||(i=s.createElement("path",{d:"m15 18.5 5-5m0 5-5-5M11 14H3M11 18H3M3 6h10.5M20 6h-2.25M20 10H9.5M3 10h2.25"})))};t.p;const o=JSON.parse('{"sorry":"Sorry!","noResult":"No result was found"}'),h=(0,s.memo)((function(e){var n=e.className,t=(0,a.$G)(c.h.emptyList).t;return(0,r.jsxs)("div",{className:"".concat(n," flex flex-col justify-center items-center my-10 mx-4"),children:[(0,r.jsx)(d,{className:"w-40 h-40 md:w-52 md:h-52 stroke-black dark:stroke-white"}),(0,r.jsxs)("div",{className:"text-center mb-8",children:[(0,r.jsx)("div",{className:"text-3xl mb-2",children:t("sorry")}),(0,r.jsx)("div",{children:t("noResult")})]})]})}));(0,c.r)(c.h.emptyList,o,o)},9060:(e,n,t)=>{t.r(n),t.d(n,{default:()=>b});var i=t(5893),r=t(7294),s=t(1072),a=t(9250),c=t(2599),l=t(5529),d=t(9210),o=t(7524),h=t(5038),u=t(5521),m=t(7259),j=t(8271),x=t(8379),f=t(1270);const p=JSON.parse('{"title":"Candidates","addCandidate":"Add Candidate","search":"Search","onlyMine":"Show only my candidates","candidate":"Candidate","location":"Location","position":"Position","birthdate":"Birth Date","mobileNumber":"Mobile Number"}'),v=JSON.parse('{"title":"Кандидати","addCandidate":"Додати кандидата","search":"Пошук","onlyMine":"Показати тільки власних кандидатів","candidate":"Кандидат","location":"Локація","position":"Позиція","birthdate":"Дата народження","mobileNumber":"Номер телефону"}'),b=function(){var e=(0,s.$G)(l.h.candidates).t,n=(0,a.s0)(),t=(0,r.useState)(1),p=t[0],v=t[1],b=(0,r.useState)(!1),g=b[0],w=b[1],N=(0,r.useState)(""),y=N[0],C=N[1],S=(0,j.N)({value:y}),M=(0,u.vz)(),E=M[0],k=M[1],O=k.isFetching,D=k.isSuccess,A=k.isError,I=k.data;(0,r.useEffect)((function(){v(1)}),[y,g]),(0,r.useEffect)((function(){E({limit:x.LZ,page:p,onlyMine:g,filter:S})}),[p,g,S]);var L=I&&I.candidates.map((function(e){return(0,i.jsxs)(f.SC,{onClick:function(){return t=e.id,i=(0,c.Gn)(o.s2.CANDIDATE_DETAILS,{id:t}),void n(i);var t,i},children:[(0,i.jsx)(f.pj,{children:"".concat(e.name," ").concat(e.surname)}),(0,i.jsx)(f.pj,{children:e.location}),(0,i.jsx)(f.pj,{children:e.position}),(0,i.jsx)(f.pj,{children:(0,h.p6)(e.birthDate)}),(0,i.jsx)(f.pj,{children:e.mobileNumber})]},e.id)})),T="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4";return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:T,children:[(0,i.jsx)(f.ZT,{appearance:"title",children:e("title")}),(0,i.jsx)("div",{children:(0,i.jsx)(f.zx,{icon:(0,i.jsx)(m.r,{}),onClick:function(){return n(o.s2.CANDIDATE_ADDING)},children:e("addCandidate")})})]}),(0,i.jsxs)("div",{className:T,children:[(0,i.jsx)(f.II,{label:e("search"),placeholder:e("search"),className:"mb-4 md:mb-0",value:y,onChange:C}),(0,i.jsx)(f.XZ,{checked:g,onChange:w,caption:e("onlyMine")})]}),(0,i.jsx)(f.Fg,{isLoading:O,isSuccess:D,isError:A,children:(null==I?void 0:I.candidates.length)?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(f.iA,{children:[(0,i.jsx)(f.ss,{children:(0,i.jsxs)(f.SC,{children:[(0,i.jsx)(f.bi,{children:e("candidate")}),(0,i.jsx)(f.bi,{children:e("location")}),(0,i.jsx)(f.bi,{children:e("position")}),(0,i.jsx)(f.bi,{children:e("birthdate")}),(0,i.jsx)(f.bi,{children:e("mobileNumber")})]})}),(0,i.jsx)(f.RM,{children:L})]}),(0,i.jsx)("div",{className:"m-8",children:(0,i.jsx)(f.tl,{pagesCount:null==I?void 0:I.count,currentPage:p,onChange:v})})]}):(0,i.jsx)(d.Z,{})})]})};(0,l.r)(l.h.candidates,p,v)},8271:(e,n,t)=>{t.d(n,{N:()=>r});var i=t(7294),r=function(e){var n=e.value,t=(0,i.useState)(""),r=t[0],s=t[1];return(0,i.useEffect)((function(){var e=setTimeout((function(){s(n)}),300);return function(){return clearTimeout(e)}}),[n]),r}}}]);