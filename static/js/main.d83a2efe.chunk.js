(this.webpackJsonpnexpisode=this.webpackJsonpnexpisode||[]).push([[0],{19:function(t,e,n){},21:function(t,e,n){},23:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(10),c=n.n(a),o=(n(19),n(8)),i=n(1),s=n(4),u=function(t){return t.toLocaleString("en-US",{timeZone:"PST"})},h=function(t){var e=t/1e3;return{amount:e,unit:e>1?"seconds":"second"}},j=function(t){var e=h(t).amount/60;return{amount:e,unit:e>1?"mins":"min"}},d=function(t){var e=j(t).amount/60;return{amount:e,unit:e>1?"hours ":"hour"}},p={bachelor:"70869?year=25",kardashians:"80725?year=20",bachelorette:"71187?year=19",st:"305288?year=4",southpark:"75897?year=25",sp:"75897?year=25"},l=function(t){var e=t.match(/\d+/g);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])},b=function(t,e){return l(t)-l(e)},f=n(5),O=n.n(f),v=n(6),x="https://api4.thetvdb.com";function m(){return(m=Object(v.a)(O.a.mark((function t(e,n){var r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("".concat(x,"/v4/series/").concat(n),{method:"GET",headers:{Authorization:"Bearer ".concat(e)}});case 3:return r=t.sent,t.abrupt("return",r.json());case 7:throw t.prev=7,t.t0=t.catch(0),console.log("failure fetching episode: ".concat(n)),new Error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}var g=function(t,e){return m.apply(this,arguments)},S="https://api4.thetvdb.com",w={apikey:"0d51e828-60db-448d-8ec4-2bceb87316d7",pin:"WORUCUTI"},y={"Content-Type":"application/json",accept:"application/json"};function k(){return(k=Object(v.a)(O.a.mark((function t(){var e;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("".concat(S,"/v4/login"),{method:"POST",headers:y,body:JSON.stringify(w)});case 3:return e=t.sent,t.abrupt("return",e.json());case 7:throw t.prev=7,t.t0=t.catch(0),console.log("JWT token error"),new Error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}var D=function(){return k.apply(this,arguments)},T=(n(21),n(2)),I=[h,j,d,function(t){var e=d(t).amount/24;return{amount:e,unit:e>1?"days ":"day"}}],C=function(){var t=Object(i.g)().id,e=Object(r.useState)(null),n=Object(s.a)(e,2),a=n[0],c=n[1],o=Object(r.useState)("\xaf\\_(\u30c4)_/\xaf"),h=Object(s.a)(o,2),j=h[0],d=h[1],l=Object(r.useState)(0),f=Object(s.a)(l,2),O=f[0],v=f[1],x=Object(r.useState)({iso:(new Date).toISOString(),pst:u(new Date)}),m=Object(s.a)(x,2),S=m[0],w=m[1],y=Object(r.useState)({iso:(new Date).toISOString(),pst:u(new Date)}),k=Object(s.a)(y,2),C=k[0],E=k[1];return Object(r.useEffect)((function(){t&&(t.match(/\d/)?c(t):c(p[t])),a&&D().then((function(t){g(t.data.token,a).then((function(t){var e;if(null===(e=t.data)||void 0===e?void 0:e.nextAired){var n=new Date("".concat(t.data.nextAired).concat("T20:00:00")).toISOString();w({iso:n,pst:u(new Date(n))})}}))}))}),[t,a]),Object(r.useEffect)((function(){var t=b(S.iso,C.iso);if(t>0){var e=I[O](t);d("".concat(e.amount.toLocaleString("en-US",{maximumFractionDigits:0})," ").concat(e.unit))}var n=setInterval((function(){return E({iso:(new Date).toISOString(),pst:u(new Date)})}),1e3);return function(){return clearInterval(n)}}),[S,O,C]),Object(T.jsxs)("div",{className:"episode",children:[Object(T.jsxs)("div",{children:["Next Air Date:"," ",S.pst>C.pst?S.pst:"\xaf\\_(\u30c4)_/\xaf"]}),Object(T.jsx)("br",{}),Object(T.jsxs)("button",{onClick:function(){var t=(O+1)%I.length;v(t)},children:[j,Object(T.jsx)("br",{}),"remaining..."]})]})},E=(n(23),function(){return Object(T.jsxs)("div",{className:"wrapper",children:[Object(T.jsx)("div",{children:"When is the next episode?"}),Object(T.jsxs)("div",{className:"shows",children:[Object(T.jsx)("a",{href:"/bachelor",children:" Bachelor"}),Object(T.jsx)("a",{href:"/bachelorette",children:" Bachelorette"}),Object(T.jsx)("a",{href:"/sp",children:" South Park"}),Object(T.jsx)("a",{href:"/st",children:" Stranger Things"}),Object(T.jsx)("a",{href:"/kardashians",children:" Keeping up with the Kardashians"})]})]})}),B=function(){return Object(T.jsx)(o.a,{children:Object(T.jsxs)(i.c,{children:[Object(T.jsx)(i.a,{exact:!0,path:"/",element:Object(T.jsx)(E,{})}),Object(T.jsx)(i.a,{path:":id",element:Object(T.jsx)(C,{})})]})})},F=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),r(t),a(t),c(t),o(t)}))},N=document.getElementById("root");c.a.createRoot(N).render(Object(T.jsx)(B,{})),F()}},[[24,1,2]]]);
//# sourceMappingURL=main.d83a2efe.chunk.js.map