import{S as r,i as s,s as e,e as o,c as a,a as t,d as n,f as l,O as u,t as f,g as c,b as h,E as i,k as p,n as d}from"../../chunks/vendor-dbc75a0c.js";import{b as m}from"../../chunks/paths-45dac81d.js";function g(r){let s,e;return{c(){s=o("a"),e=f("log in"),this.h()},l(r){s=a(r,"A",{href:!0});var o=t(s);e=c(o,"log in"),o.forEach(n),this.h()},h(){h(s,"href",m+"/profile/login")},m(r,o){l(r,s,o),i(s,e)},p:u,d(r){r&&n(s)}}}function v(r){let s,e,u,g,v,E;return{c(){s=o("a"),e=f("log out"),u=p(),g=o("a"),v=f("profile"),this.h()},l(r){s=a(r,"A",{href:!0});var o=t(s);e=c(o,"log out"),o.forEach(n),u=d(r),g=a(r,"A",{href:!0});var l=t(g);v=c(l,"profile"),l.forEach(n),this.h()},h(){h(s,"href",m+"/profile/logout"),h(g,"href",E=m+"/profile/@"+r[0])},m(r,o){l(r,s,o),i(s,e),l(r,u,o),l(r,g,o),i(g,v)},p(r,s){1&s&&E!==(E=m+"/profile/@"+r[0])&&h(g,"href",E)},d(r){r&&n(s),r&&n(u),r&&n(g)}}}function E(r){let s;function e(r,s){return r[0]?v:g}let f=e(r),c=f(r);return{c(){s=o("p"),c.c()},l(r){s=a(r,"P",{});var e=t(s);c.l(e),e.forEach(n)},m(r,e){l(r,s,e),c.m(s,null)},p(r,[o]){f===(f=e(r))&&c?c.p(r,o):(c.d(1),c=f(r),c&&(c.c(),c.m(s,null)))},i:u,o:u,d(r){r&&n(s),c.d()}}}const b=({session:{user:r}})=>(console.log({user:r}),{props:{user:r}});function k(r,s,e){let{user:o}=s;return r.$$set=r=>{"user"in r&&e(0,o=r.user)},[o]}class A extends r{constructor(r){super(),s(this,r,k,E,e,{user:0})}}export{A as default,b as load};