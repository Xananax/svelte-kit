import{D as s,S as e,i as t,s as a,e as n,t as r,c,a as l,g as i,d as o,b as f,E as h,f as g,F as u,h as p,j as $,m as v,o as d,G as m,x as b,u as j,v as E,H as k,I as q,J as w,K as y,L as x,M as A,N as O}from"../chunks/vendor-43212789.js";import{h as D,t as P}from"../chunks/env-51397555.js";import{D as _}from"../chunks/Debug-998333ea.js";import{b as K}from"../chunks/paths-45dac81d.js";import{L}from"../chunks/Logo-af6d659e.js";const M={subscribe:e=>(()=>{const e=s("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)};function N(s,e,t){const a=s.slice();return a[5]=e[t].href,a[6]=e[t].title,a[7]=e[t].active,a}function S(s,e){let t,a,$,v=e[6]+"";return{key:s,first:null,c(){t=n("a"),a=r(v),this.h()},l(s){t=c(s,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var e=l(t);a=i(e,v),e.forEach(o),this.h()},h(){f(t,"sveltekit:prefetch",""),f(t,"href",$=e[5]),f(t,"class","svelte-legb9q"),h(t,"active",e[7]),this.first=t},m(s,e){g(s,t,e),u(t,a)},p(s,n){e=s,1&n&&v!==(v=e[6]+"")&&p(a,v),1&n&&$!==($=e[5])&&f(t,"href",$),1&n&&h(t,"active",e[7])},d(s){s&&o(t)}}}function F(s){let e,t,a,r,i,h=[],p=new Map;a=new L({});let k=s[0];const w=s=>s[5];for(let n=0;n<k.length;n+=1){let e=N(s,k,n),t=w(e);p.set(t,h[n]=S(t,e))}return{c(){e=n("header"),t=n("a"),$(a.$$.fragment),r=n("nav");for(let s=0;s<h.length;s+=1)h[s].c();this.h()},l(s){e=c(s,"HEADER",{class:!0});var n=l(e);t=c(n,"A",{href:!0,class:!0});var i=l(t);v(a.$$.fragment,i),i.forEach(o),r=c(n,"NAV",{class:!0});var f=l(r);for(let e=0;e<h.length;e+=1)h[e].l(f);f.forEach(o),n.forEach(o),this.h()},h(){f(t,"href",D),f(t,"class","svelte-legb9q"),f(r,"class","svelte-legb9q"),f(e,"class","svelte-legb9q")},m(s,n){g(s,e,n),u(e,t),d(a,t,null),u(e,r);for(let e=0;e<h.length;e+=1)h[e].m(r,null);i=!0},p(s,[e]){1&e&&(k=s[0],h=m(h,e,w,1,s,k,p,r,q,S,null,N))},i(s){i||(b(a.$$.fragment,s),i=!0)},o(s){j(a.$$.fragment,s),i=!1},d(s){s&&o(e),E(a);for(let e=0;e<h.length;e+=1)h[e].d()}}}function H(s,e,t){let a,n,r;k(s,M,(s=>t(3,r=s)));let{pages:c=[]}=e;return s.$$set=s=>{"pages"in s&&t(1,c=s.pages)},s.$$.update=()=>{var e;8&s.$$.dirty&&t(2,a=r.path.replace(/^\/|\/$/g,"").split("/")),6&s.$$.dirty&&t(0,n=c.map((e=a,s=>{const t="pages"===s.pathParts[0]?s.slug===e[1]:s.pathParts[0]===e[0];return Object.assign(Object.assign({},s),{active:t})})))},[n,c,a,r]}class I extends e{constructor(s){super(),t(this,s,H,F,a,{pages:1})}}function R(s){let e,t,a,h,p,m,k,q,w,K;e=new I({props:{pages:s[0]}}),t=new _({props:{pages:s[0]}});const L=s[2].default,M=y(L,s,s[1],null);return{c(){$(e.$$.fragment),$(t.$$.fragment),a=n("main"),M&&M.c(),h=n("footer"),p=n("p"),m=r("visit "),k=n("a"),q=r(P),w=r(" to learn SvelteKit"),this.h()},l(s){v(e.$$.fragment,s),v(t.$$.fragment,s),a=c(s,"MAIN",{class:!0});var n=l(a);M&&M.l(n),n.forEach(o),h=c(s,"FOOTER",{class:!0});var r=l(h);p=c(r,"P",{});var f=l(p);m=i(f,"visit "),k=c(f,"A",{href:!0,class:!0});var g=l(k);q=i(g,P),g.forEach(o),w=i(f," to learn SvelteKit"),f.forEach(o),r.forEach(o),this.h()},h(){f(a,"class","svelte-dvqa9l"),f(k,"href",D),f(k,"class","svelte-dvqa9l"),f(h,"class","svelte-dvqa9l")},m(s,n){d(e,s,n),d(t,s,n),g(s,a,n),M&&M.m(a,null),g(s,h,n),u(h,p),u(p,m),u(p,k),u(k,q),u(p,w),K=!0},p(s,[a]){const n={};1&a&&(n.pages=s[0]),e.$set(n);const r={};1&a&&(r.pages=s[0]),t.$set(r),M&&M.p&&(!K||2&a)&&x(M,L,s,s[1],K?O(L,s[1],a,null):A(s[1]),null)},i(s){K||(b(e.$$.fragment,s),b(t.$$.fragment,s),b(M,s),K=!0)},o(s){j(e.$$.fragment,s),j(t.$$.fragment,s),j(M,s),K=!1},d(s){E(e,s),E(t,s),s&&o(a),M&&M.d(s),s&&o(h)}}}var G=function(s,e,t,a){return new(t||(t=Promise))((function(n,r){function c(s){try{i(a.next(s))}catch(e){r(e)}}function l(s){try{i(a.throw(s))}catch(e){r(e)}}function i(s){var e;s.done?n(s.value):(e=s.value,e instanceof t?e:new t((function(s){s(e)}))).then(c,l)}i((a=a.apply(s,e||[])).next())}))};const J=s=>Object.assign(Object.assign({},s),{date:w(s.date),href:`${K}${s.href}`}),T=({fetch:s})=>G(void 0,void 0,void 0,(function*(){return{props:{pages:(yield s(`${K}/pages.json`).then((s=>s.json()))).map(J)}}}));function V(s,e,t){let{$$slots:a={},$$scope:n}=e,{pages:r}=e;return s.$$set=s=>{"pages"in s&&t(0,r=s.pages),"$$scope"in s&&t(1,n=s.$$scope)},[r,n,a]}class z extends e{constructor(s){super(),t(this,s,V,R,a,{pages:0})}}export{z as default,T as load};
