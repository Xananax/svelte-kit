import{_ as t}from"./preload-helper-5811d509.js";import{S as e,i as n,s,K as o,l as r,f as i,Y as a,d as c,e as l,c as u,a as d,b as g,L as p,M as f,N as m,x as h,u as _,Z as v,_ as x,t as $,g as b,P as w}from"./vendor-43212789.js";import{b as E}from"./paths-45dac81d.js";function k(t){let e;return{c(){e=$(t[1])},l(n){e=b(n,t[1])},m(t,n){i(t,e,n)},p:w,d(t){t&&c(e)}}}function j(t){let e,n=t[2]+"";return{c(){e=$(n)},l(t){e=b(t,n)},m(t,n){i(t,e,n)},p:w,d(t){t&&c(e)}}}function y(t){let e;return{c(){e=$(t[1])},l(n){e=b(n,t[1])},m(t,n){i(t,e,n)},p:w,d(t){t&&c(e)}}}function P(t){let e,n;const s=t[5].default,v=o(s,t,t[4],null),$=v||function(t){let e,n={ctx:t,current:null,token:null,hasCatch:!0,pending:y,then:j,catch:k,value:2,error:9};return x(t[2],n),{c(){e=r(),n.block.c()},l(t){e=r(),n.block.l(t)},m(t,s){i(t,e,s),n.block.m(t,n.anchor=s),n.mount=()=>e.parentNode,n.anchor=e},p(e,s){a(n,t=e,s)},d(t){t&&c(e),n.block.d(t),n.token=null,n=null}}}(t);return{c(){e=l("a"),$&&$.c(),this.h()},l(t){e=u(t,"A",{"sveltekit:prefetch":!0,href:!0});var n=d(e);$&&$.l(n),n.forEach(c),this.h()},h(){g(e,"sveltekit:prefetch",""),g(e,"href",t[0])},m(t,s){i(t,e,s),$&&$.m(e,null),n=!0},p(t,[o]){v&&v.p&&(!n||16&o)&&p(v,s,t,t[4],n?m(s,t[4],o,null):f(t[4]),null),(!n||1&o)&&g(e,"href",t[0])},i(t){n||(h($,t),n=!0)},o(t){_($,t),n=!1},d(t){t&&c(e),$&&$.d(t)}}}var A=function(t,e,n,s){return new(n||(n=Promise))((function(o,r){function i(t){try{c(s.next(t))}catch(e){r(e)}}function a(t){try{c(s.throw(t))}catch(e){r(e)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((s=s.apply(t,e||[])).next())}))};const L=t=>t.replace(/^\.\.\/\.\.\/routes\/courses/,""),O=t=>t.replace(/(\/index)?\.(md|svx|svelte\.md)$/,"").replace(/^\/|\/$/g,""),R=t=>null==t?void 0:t.replace(/-|_/g," ");Promise.all(Object.entries({"../../routes/courses/getting-started-with-godot-2021/index.md":()=>t((()=>import("../pages/courses/getting-started-with-godot-2021/index.md-4b7925cc.js")),["pages/courses/getting-started-with-godot-2021/index.md-4b7925cc.js","chunks/vendor-43212789.js","chunks/index-9426f4ee.js","chunks/Chapters.svelte_svelte&type=style&lang-72f6ea09.js","assets/Chapters.svelte_svelte&type=style&lang-bfa6d7e2.css","chunks/preload-helper-5811d509.js","chunks/paths-45dac81d.js"]),"../../routes/courses/learn-to-code/index.md":()=>t((()=>import("../pages/courses/learn-to-code/index.md-c15997c0.js")),["pages/courses/learn-to-code/index.md-c15997c0.js","chunks/vendor-43212789.js","chunks/index-384b14d3.js","assets/index-a2ae4be6.css","chunks/preload-helper-5811d509.js","chunks/paths-45dac81d.js"]),"../../routes/courses/getting-started-with-godot-2021/010-getting-started/index.md":()=>t((()=>import("../pages/courses/getting-started-with-godot-2021/010-getting-started/index.md-0a22aa8c.js")),["pages/courses/getting-started-with-godot-2021/010-getting-started/index.md-0a22aa8c.js","chunks/vendor-43212789.js","chunks/Chapters.svelte_svelte&type=style&lang-72f6ea09.js","assets/Chapters.svelte_svelte&type=style&lang-bfa6d7e2.css","chunks/index-b15f1d0a.js","chunks/preload-helper-5811d509.js","chunks/paths-45dac81d.js"]),"../../routes/courses/getting-started-with-godot-2021/020-essential-building-blocks/index.md":()=>t((()=>import("../pages/courses/getting-started-with-godot-2021/020-essential-building-blocks/index.md-6394911f.js")),["pages/courses/getting-started-with-godot-2021/020-essential-building-blocks/index.md-6394911f.js","chunks/vendor-43212789.js","chunks/Chapters.svelte_svelte&type=style&lang-72f6ea09.js","assets/Chapters.svelte_svelte&type=style&lang-bfa6d7e2.css","chunks/index-4b501879.js","chunks/preload-helper-5811d509.js","chunks/paths-45dac81d.js"]),"../../routes/courses/learn-to-code/01-game-engine-basics/index.md":()=>t((()=>import("../pages/courses/learn-to-code/01-game-engine-basics/index.md-fed1506d.js")),["pages/courses/learn-to-code/01-game-engine-basics/index.md-fed1506d.js","chunks/vendor-43212789.js","chunks/Chapters.svelte_svelte&type=style&lang-72f6ea09.js","assets/Chapters.svelte_svelte&type=style&lang-bfa6d7e2.css","chunks/index-4b66bed2.js","chunks/preload-helper-5811d509.js","chunks/paths-45dac81d.js"])}).map((([t,e])=>A(void 0,void 0,void 0,(function*(){const{metadata:n}=yield e();if(!n){const e=O(L(t));return{title:R(e),slug:e}}const{title:s,slug:o}=n;return{title:s,slug:null!=o?o:O(L(t))}}))))).then((t=>t.reduce(((t,e)=>(e&&(t[e.slug]=e),t)),{})));function D(t,e,n){let s,{$$slots:o={},$$scope:r}=e;const i=v(o);var a=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))((function(o,r){function i(t){try{c(s.next(t))}catch(e){r(e)}}function a(t){try{c(s.throw(t))}catch(e){r(e)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((s=s.apply(t,e||[])).next())}))};let{slug:c}=e;const l=R(c);let u=a(void 0,void 0,void 0,(function*(){var t;return null!==(t=i.default)&&void 0!==t?t:yield((t,e)=>A(void 0,void 0,void 0,(function*(){var n;return null!==(n={}[t])&&void 0!==n?n:e})))(c,l)}));return t.$$set=t=>{"slug"in t&&n(3,c=t.slug),"$$scope"in t&&n(4,r=t.$$scope)},t.$$.update=()=>{8&t.$$.dirty&&n(0,s=`${E}/courses/${c||""}`)},[s,l,u,c,r,o]}class I extends e{constructor(t){super(),n(this,t,D,P,s,{slug:3})}}export{I as R};
