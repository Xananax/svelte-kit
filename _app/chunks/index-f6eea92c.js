import{S as e,i as t,s as a,j as o,k as n,e as s,t as r,m as i,n as h,c,a as l,g as u,d,b as f,o as m,f as p,E as g,O as y,x as w,u as v,v as b}from"./vendor-dbc75a0c.js";import"./RefLink-d711c5fa.js";import{Y as k}from"./Chapters.svelte_svelte&type=style&lang-8b0810f2.js";function E(e){let t,a,E,T,G,I,P,j,S,L,O,$,A,N,R,_,x,M,W,H,Y,B,C,Z,z,q,D,F,J,K,Q,U,V,X,ee,te,ae,oe,ne,se,re,ie,he,ce,le,ue,de,fe,me,pe,ge,ye,we,ve,be,ke,Ee,Te,Ge,Ie,Pe,je,Se,Le,Oe,$e,Ae,Ne,Re,_e,xe,Me,We,He;return t=new k({props:{videoId:"lGZ4RaC4O2w"}}),{c(){o(t.$$.fragment),a=n(),E=s("p"),T=r("There are four concepts you really need to understand to get started with Godot."),G=n(),I=s("p"),P=r("Moving forward, you will learn more tools and features, but these four are at the core of every game you will make with the engine."),j=n(),S=s("p"),L=r("In short, these are:"),O=n(),$=s("ol"),A=s("li"),N=s("strong"),R=r("Nodes"),_=r(", which are like the base Lego blocks you use to build your game. They are a base object type defined in the engine."),x=n(),M=s("li"),W=s("strong"),H=r("Scenes"),Y=r(" are templates made of multiple nodes, which you can save and create reproductions of in your game."),B=n(),C=s("li"),Z=r("A Godot game is a tree of scene instances, which is called the "),z=s("strong"),q=r("scene tree"),D=r("."),F=n(),J=s("li"),K=r("To make multiple nodes communicate within or across scenes, Godot provides a built-in tool named "),Q=s("strong"),U=r("signals"),V=r(", its version of the popular Observer programming pattern."),X=n(),ee=s("p"),te=r("We will look at each of these core features in detail later in the course."),ae=n(),oe=s("h2"),ne=s("a"),se=r("The difference between nodes and scenes"),re=n(),ie=s("p"),he=r("In the video, I explain that when you create a scene instance, Godot "),ce=s("em"),le=r("presents"),ue=r(" it as a node."),de=n(),fe=s("p"),me=r("But they are not the same thing."),pe=n(),ge=s("p"),ye=r("The presentation is similar because, as you will learn working with Godot, it can be useful for a developer to think of a scene instance as if it was just one entity, like nodes."),we=n(),ve=s("p"),be=r("The point of Godot’s design is to help you think of your game in terms of your characters, weapons, houses, doors, and so on, rather than in programming terms."),ke=n(),Ee=s("p"),Te=r("Scenes and the way the editor presents them helps you structure your game in an intuitive way."),Ge=n(),Ie=s("p"),Pe=r("A key takeaway here is that a node is like a Lego block, a small object that doesn’t do much in itself, but that’s really useful when combining multiple into a scene."),je=n(),Se=s("p"),Le=r("To make a concrete game entity like a character, you need multiple nodes. You save them into a scene, a template you can instantiate. In programming, to instantiate means “creating reproductions of.”"),Oe=n(),$e=s("p"),Ae=r("And then, you get to reason about your game in terms of those scenes."),Ne=n(),Re=s("p"),_e=r("How do you use scenes and when? We’ll answers those later in the series when you get to use them hands-on."),xe=n(),Me=s("p"),We=r("It’s not something you’ll learn just with lessons but rather through practice, as you need to build an intuition for it."),this.h()},l(e){i(t.$$.fragment,e),a=h(e),E=c(e,"P",{});var o=l(E);T=u(o,"There are four concepts you really need to understand to get started with Godot."),o.forEach(d),G=h(e),I=c(e,"P",{});var n=l(I);P=u(n,"Moving forward, you will learn more tools and features, but these four are at the core of every game you will make with the engine."),n.forEach(d),j=h(e),S=c(e,"P",{});var s=l(S);L=u(s,"In short, these are:"),s.forEach(d),O=h(e),$=c(e,"OL",{});var r=l($);A=c(r,"LI",{});var f=l(A);N=c(f,"STRONG",{});var m=l(N);R=u(m,"Nodes"),m.forEach(d),_=u(f,", which are like the base Lego blocks you use to build your game. They are a base object type defined in the engine."),f.forEach(d),x=h(r),M=c(r,"LI",{});var p=l(M);W=c(p,"STRONG",{});var g=l(W);H=u(g,"Scenes"),g.forEach(d),Y=u(p," are templates made of multiple nodes, which you can save and create reproductions of in your game."),p.forEach(d),B=h(r),C=c(r,"LI",{});var y=l(C);Z=u(y,"A Godot game is a tree of scene instances, which is called the "),z=c(y,"STRONG",{});var w=l(z);q=u(w,"scene tree"),w.forEach(d),D=u(y,"."),y.forEach(d),F=h(r),J=c(r,"LI",{});var v=l(J);K=u(v,"To make multiple nodes communicate within or across scenes, Godot provides a built-in tool named "),Q=c(v,"STRONG",{});var b=l(Q);U=u(b,"signals"),b.forEach(d),V=u(v,", its version of the popular Observer programming pattern."),v.forEach(d),r.forEach(d),X=h(e),ee=c(e,"P",{});var k=l(ee);te=u(k,"We will look at each of these core features in detail later in the course."),k.forEach(d),ae=h(e),oe=c(e,"H2",{id:!0});var He=l(oe);ne=c(He,"A",{href:!0});var Ye=l(ne);se=u(Ye,"The difference between nodes and scenes"),Ye.forEach(d),He.forEach(d),re=h(e),ie=c(e,"P",{});var Be=l(ie);he=u(Be,"In the video, I explain that when you create a scene instance, Godot "),ce=c(Be,"EM",{});var Ce=l(ce);le=u(Ce,"presents"),Ce.forEach(d),ue=u(Be," it as a node."),Be.forEach(d),de=h(e),fe=c(e,"P",{});var Ze=l(fe);me=u(Ze,"But they are not the same thing."),Ze.forEach(d),pe=h(e),ge=c(e,"P",{});var ze=l(ge);ye=u(ze,"The presentation is similar because, as you will learn working with Godot, it can be useful for a developer to think of a scene instance as if it was just one entity, like nodes."),ze.forEach(d),we=h(e),ve=c(e,"P",{});var qe=l(ve);be=u(qe,"The point of Godot’s design is to help you think of your game in terms of your characters, weapons, houses, doors, and so on, rather than in programming terms."),qe.forEach(d),ke=h(e),Ee=c(e,"P",{});var De=l(Ee);Te=u(De,"Scenes and the way the editor presents them helps you structure your game in an intuitive way."),De.forEach(d),Ge=h(e),Ie=c(e,"P",{});var Fe=l(Ie);Pe=u(Fe,"A key takeaway here is that a node is like a Lego block, a small object that doesn’t do much in itself, but that’s really useful when combining multiple into a scene."),Fe.forEach(d),je=h(e),Se=c(e,"P",{});var Je=l(Se);Le=u(Je,"To make a concrete game entity like a character, you need multiple nodes. You save them into a scene, a template you can instantiate. In programming, to instantiate means “creating reproductions of.”"),Je.forEach(d),Oe=h(e),$e=c(e,"P",{});var Ke=l($e);Ae=u(Ke,"And then, you get to reason about your game in terms of those scenes."),Ke.forEach(d),Ne=h(e),Re=c(e,"P",{});var Qe=l(Re);_e=u(Qe,"How do you use scenes and when? We’ll answers those later in the series when you get to use them hands-on."),Qe.forEach(d),xe=h(e),Me=c(e,"P",{});var Ue=l(Me);We=u(Ue,"It’s not something you’ll learn just with lessons but rather through practice, as you need to build an intuition for it."),Ue.forEach(d),this.h()},h(){f(ne,"href","#the-difference-between-nodes-and-scenes"),f(oe,"id","the-difference-between-nodes-and-scenes")},m(e,o){m(t,e,o),p(e,a,o),p(e,E,o),g(E,T),p(e,G,o),p(e,I,o),g(I,P),p(e,j,o),p(e,S,o),g(S,L),p(e,O,o),p(e,$,o),g($,A),g(A,N),g(N,R),g(A,_),g($,x),g($,M),g(M,W),g(W,H),g(M,Y),g($,B),g($,C),g(C,Z),g(C,z),g(z,q),g(C,D),g($,F),g($,J),g(J,K),g(J,Q),g(Q,U),g(J,V),p(e,X,o),p(e,ee,o),g(ee,te),p(e,ae,o),p(e,oe,o),g(oe,ne),g(ne,se),p(e,re,o),p(e,ie,o),g(ie,he),g(ie,ce),g(ce,le),g(ie,ue),p(e,de,o),p(e,fe,o),g(fe,me),p(e,pe,o),p(e,ge,o),g(ge,ye),p(e,we,o),p(e,ve,o),g(ve,be),p(e,ke,o),p(e,Ee,o),g(Ee,Te),p(e,Ge,o),p(e,Ie,o),g(Ie,Pe),p(e,je,o),p(e,Se,o),g(Se,Le),p(e,Oe,o),p(e,$e,o),g($e,Ae),p(e,Ne,o),p(e,Re,o),g(Re,_e),p(e,xe,o),p(e,Me,o),g(Me,We),He=!0},p:y,i(e){He||(w(t.$$.fragment,e),He=!0)},o(e){v(t.$$.fragment,e),He=!1},d(e){b(t,e),e&&d(a),e&&d(E),e&&d(G),e&&d(I),e&&d(j),e&&d(S),e&&d(O),e&&d($),e&&d(X),e&&d(ee),e&&d(ae),e&&d(oe),e&&d(re),e&&d(ie),e&&d(de),e&&d(fe),e&&d(pe),e&&d(ge),e&&d(we),e&&d(ve),e&&d(ke),e&&d(Ee),e&&d(Ge),e&&d(Ie),e&&d(je),e&&d(Se),e&&d(Oe),e&&d($e),e&&d(Ne),e&&d(Re),e&&d(xe),e&&d(Me)}}}const T={author:"nathan",date:"2021-02-10T18:29:49.000Z",title:"The 4 essential building blocks",description:"",weight:1,type:"video"};class G extends e{constructor(e){super(),t(this,e,null,E,a,{})}}var I=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:G,metadata:T});export{I as _,G as a,T as m};