import{I as s,N as a,S as e,i as c,s as r,e as o,t,c as n,a as l,g as i,d,b as p,f as h,E as v,h as u,O as f,B as E,P as S}from"./vendor-dbc75a0c.js";s.extend(a);function m(s){let a,e,c,r,E,S;return{c(){a=o("details"),e=o("summary"),c=t("received JSON"),r=o("pre"),E=o("code"),S=t(s[1]),this.h()},l(o){a=n(o,"DETAILS",{class:!0});var t=l(a);e=n(t,"SUMMARY",{class:!0});var p=l(e);c=i(p,"received JSON"),p.forEach(d),r=n(t,"PRE",{});var h=l(r);E=n(h,"CODE",{class:!0});var v=l(E);S=i(v,s[1]),v.forEach(d),h.forEach(d),t.forEach(d),this.h()},h(){p(e,"class","svelte-d5vc6o"),p(E,"class","language-json"),a.open=s[0],p(a,"class","svelte-d5vc6o")},m(s,o){h(s,a,o),v(a,e),v(e,c),v(a,r),v(r,E),v(E,S)},p(s,[e]){2&e&&u(S,s[1]),1&e&&(a.open=s[0])},i:f,o:f,d(s){s&&d(a)}}}function O(s,a,e){let c,{open:r=!1}=a;return s.$$set=s=>{e(2,a=E(E({},a),S(s))),"open"in s&&e(0,r=s.open)},s.$$.update=()=>{e(1,c=JSON.stringify(a,null,2))},a=S(a),[r,c]}class g extends e{constructor(s){super(),c(this,s,O,m,r,{open:0})}}export{g as D};
