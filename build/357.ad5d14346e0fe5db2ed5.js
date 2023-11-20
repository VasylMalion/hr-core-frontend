"use strict";(self.webpackChunkproject_course=self.webpackChunkproject_course||[]).push([[357],{355:(e,s,t)=>{t.d(s,{Z:()=>i});var r=t(5893);const i=(0,t(7294).memo)((function(e){var s=e.className,t=e.onClick;return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:s,onClick:t,width:"20px",height:"20px",viewBox:"0 0 24 24",fill:"none",children:(0,r.jsx)("path",{d:"M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z",fill:"#fff"})})}))},842:(e,s,t)=>{t.d(s,{Z:()=>a});var r=t(5893),i=t(7294),n=t(1072),o=t(5529);const c=(0,i.memo)((function(e){var s=e.className,t=e.onClick;return(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg","data-icon":"no-result",className:s,onClick:t,width:"800px",height:"800px",viewBox:"0 0 24 24",children:[(0,r.jsx)("path",{d:"M15 18.5L20 13.5M20 18.5L15 13.5",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,r.jsx)("path",{d:"M11 14L3 14",strokeWidth:"1.5",strokeLinecap:"round"}),(0,r.jsx)("path",{d:"M11 18H3",strokeWidth:"1.5",strokeLinecap:"round"}),(0,r.jsx)("path",{d:"M3 6L13.5 6M20 6L17.75 6",strokeWidth:"1.5",strokeLinecap:"round"}),(0,r.jsx)("path",{d:"M20 10L9.5 10M3 10H5.25",strokeWidth:"1.5",strokeLinecap:"round"})]})})),l=JSON.parse('{"sorry":"Sorry!","noResult":"No result was found"}'),a=(0,i.memo)((function(e){var s=e.className,t=(0,n.$G)(o.h.emptyList).t;return(0,r.jsxs)("div",{className:"".concat(s," flex flex-col justify-center items-center my-10 mx-4 dark:text-white"),"data-testid":"empty-list",children:[(0,r.jsx)(c,{className:"w-40 h-40 md:w-52 md:h-52 stroke-black dark:stroke-white"}),(0,r.jsxs)("div",{className:"text-center mb-8",children:[(0,r.jsx)("div",{className:"text-3xl mb-2",children:t("sorry")}),(0,r.jsx)("div",{children:t("noResult")})]})]})}));(0,o.r)(o.h.emptyList,l,l)},6357:(e,s,t)=>{t.r(s),t.d(s,{default:()=>N});var r=t(5893),i=t(7294),n=t(1072),o=t(9250),c=t(2599),l=t(5529),a=t(842),d=t(7524),h=t(7940),u=t(5038),m=t(355),x=t(8271),p=t(8379),j=t(641),f=t(2925),v=t(9761);const b=JSON.parse('{"title":"Employees","addEmployee":"Add Employee","employee":"Employee","location":"Address","position":"Position","birthdate":"Birth Date","mobileNumber":"Mobile Number","search":"Search"}'),k=JSON.parse('{"title":"Співробітники","addEmployee":"Додати Співробітника","employee":"Кандидат","location":"Адреса","position":"Позиція","birthdate":"Дата народження","mobileNumber":"Номер телефону","search":"Пошук"}'),N=function(){var e=(0,n.$G)(l.h.employees).t,s=(0,o.s0)(),t=(0,i.useState)(1),b=t[0],k=t[1],N=(0,i.useState)(""),C=N[0],w=N[1],y=(0,x.N)({value:C}),g=(0,j.C)((function(e){return e.auth.userInfo})),L=(0,h.vz)(),E=L[0],M=L[1],S=M.isFetching,Z=M.isSuccess,A=M.isError,D=M.data;(0,i.useEffect)((function(){k(1)}),[C]),(0,i.useEffect)((function(){E({limit:p.LZ,page:b,filter:y})}),[b,y]);var H=D&&D.users.map((function(e){return(0,r.jsxs)(v.SC,{onClick:function(){return t=e.id,r=(0,c.Gn)(d.s2.EMPLOYEE_DETAILS,{id:t}),void s(r);var t,r},children:[(0,r.jsx)(v.pj,{children:"".concat(e.name," ").concat(e.surname)}),(0,r.jsx)(v.pj,{children:e.address}),(0,r.jsx)(v.pj,{children:e.position}),(0,r.jsx)(v.pj,{children:(0,u.p6)(e.birthDate)}),(0,r.jsx)(v.pj,{children:e.mobileNumber})]},e.id)}));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4",children:[(0,r.jsx)(v.ZT,{appearance:"title",children:e("title")}),(null==g?void 0:g.role)===f.dC.ADMIN&&(0,r.jsx)("div",{children:(0,r.jsx)(v.zx,{icon:(0,r.jsx)(m.Z,{}),onClick:function(){return s(d.s2.EMPLOYEE_ADDING)},children:e("addEmployee")})})]}),(0,r.jsx)(v.II,{label:e("search"),placeholder:e("search"),value:C,onChange:w,className:"mb-8 md:mb-6"}),(0,r.jsx)(v.Fg,{isLoading:S,isSuccess:Z,isError:A,children:(null==D?void 0:D.users.length)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(v.iA,{children:[(0,r.jsx)(v.ss,{children:(0,r.jsxs)(v.SC,{children:[(0,r.jsx)(v.bi,{children:e("employee")}),(0,r.jsx)(v.bi,{children:e("location")}),(0,r.jsx)(v.bi,{children:e("position")}),(0,r.jsx)(v.bi,{children:e("birthdate")}),(0,r.jsx)(v.bi,{children:e("mobileNumber")})]})}),(0,r.jsx)(v.RM,{children:H})]}),(0,r.jsx)("div",{className:"my-8",children:(0,r.jsx)(v.tl,{pagesCount:null==D?void 0:D.count,currentPage:b,onChange:k})})]}):(0,r.jsx)(a.Z,{})})]})};(0,l.r)(l.h.employees,b,k)},8271:(e,s,t)=>{t.d(s,{N:()=>i});var r=t(7294),i=function(e){var s=e.value,t=(0,r.useState)(""),i=t[0],n=t[1];return(0,r.useEffect)((function(){var e=setTimeout((function(){n(s)}),300);return function(){return clearTimeout(e)}}),[s]),i}}}]);