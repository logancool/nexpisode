(this.webpackJsonpnexpisode=this.webpackJsonpnexpisode||[]).push([[0],{24:function(t,e,n){},26:function(t,e,n){},28:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n.n(r),a=n(17),i=n.n(a),o=(n(24),n(9)),s=n.n(o),u=n(12),p=n(15),h=(n(26),n(5)),f=function(){var t=Object(r.useState)("\xaf\\_(\u30c4)_/\xaf"),e=Object(p.a)(t,2),n=e[0],c=e[1],a=Object(r.useState)((new Date).toLocaleString("en-US",{timeZone:"PST"})),i=Object(p.a)(a,2),o=i[0],f=i[1];function d(t){var e=t.match(/\d+/g);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])}return Object(r.useEffect)((function(){var t={apikey:"0d51e828-60db-448d-8ec4-2bceb87316d7",pin:"string"},e={"Content-Type":"application/json",accept:"application/json"};function n(){return(n=Object(u.a)(s.a.mark((function n(){var r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,fetch("/v4/login",{method:"POST",headers:e,body:JSON.stringify(t)});case 3:return r=n.sent,n.abrupt("return",r.json());case 7:throw n.prev=7,n.t0=n.catch(0),new Error(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))).apply(this,arguments)}function r(){return(r=Object(u.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/v4/series/70869?year=25",{method:"GET",headers:{Authorization:"Bearer ".concat(e)}});case 3:return n=t.sent,t.abrupt("return",n.json());case 7:throw t.prev=7,t.t0=t.catch(0),new Error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}(function(){return n.apply(this,arguments)})().then((function(t){(function(t){return r.apply(this,arguments)})(t.data.token).then((function(t){var e=new Date("".concat(t.data.lastAired).concat("T20:00:00")).toISOString(),n=((d(e)-d(o))/6e4).toFixed(2);e>o&&c("".concat(n," mins"))}))}));var a=setInterval((function(){return f((new Date).toISOString())}),100);return function(){return clearInterval(a)}}),[c,o,n]),Object(h.jsxs)("div",{style:{margin:"2rem",fontSize:"3rem",textAlign:"center"},children:[n,Object(h.jsx)("br",{}),"remaining..."]})},d=n(18),j=n(1);n(28);var l=function(){return Object(h.jsx)(d.a,{children:Object(h.jsx)(j.c,{children:Object(h.jsx)(j.a,{exact:!0,path:"/bachelor",children:Object(h.jsx)(f,{})})})})},b=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,a=e.getLCP,i=e.getTTFB;n(t),r(t),c(t),a(t),i(t)}))};i.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(l,{})}),document.getElementById("root")),b()}},[[34,1,2]]]);
//# sourceMappingURL=main.0a447ff3.chunk.js.map