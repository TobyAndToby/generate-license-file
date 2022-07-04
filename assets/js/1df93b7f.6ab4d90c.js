"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[237],{159:function(n,e,t){t.r(e),t.d(e,{default:function(){return yn}});var i,r,o,l,a,c,p,u,d,s,m,f,g,x,b,h,v,E,Z,y,k,w,C,j,L,z,I,N,T=t(1880),S=t(7782),A=t(5257),F=t(7294),P=t(7462),D=t(4996),R=t(917),G=t(3746),H=function(n){var e=n.label,t=n.labelColour,i=n.contentToCopy;return F.createElement(U,{colour:t,onClick:function(){return navigator.clipboard.writeText(i)}},e)},U=S.Z.button(i||(i=(0,T.Z)(["\n  background: none;\n  border: none;\n  outline: none;\n  height: auto;\n  width: auto;\n  color: ",";\n  cursor: pointer;\n"])),(function(n){return n.colour})),M=[{fileName:"library-demo.js",tabIcon:"/img/js-logo-256.png",language:"javascript",content:'const generateLicenseFile = require("generate-license-file");\n\n// Get an array of licenses for the current project\'s production dependencies.\ngenerateLicenseFile\n  .getProjectLicenses("./package.json")\n  .then(licenses => {\n    // Do stuff with licenses...\n  })\n  .catch(error => {\n    // Do stuff with error...\n  });'},{fileName:"library-demo.ts",tabIcon:"/img/ts-logo-256.png",language:"javascript",content:'import { getProjectLicenses, ILicense } from "generate-license-file";\n\n// Get an array of licenses for the current project\'s production dependencies.\nconst licenses: ILicense[] = await getProjectLicenses("./package.json");\n    '}],O=function(){var n=(0,F.useState)(M[0].fileName),e=n[0],t=n[1];return F.createElement(Y,null,F.createElement(q,null,F.createElement($,{type:"close"}),F.createElement($,{type:"minimize"}),F.createElement($,{type:"zoom"})),F.createElement(J,null,F.createElement(K,null),F.createElement(Q,null,F.createElement(V,null,M.map((function(n){var i=n.fileName,r=n.tabIcon;return F.createElement(X,{isActive:e===i,iconUrl:(0,D.Z)(r),onClick:function(){return t(i)}},i)}))),F.createElement(_,null,M.map((function(n){var t=n.fileName,i=n.language,r=n.content;return F.createElement(nn,{isActive:e===t},F.createElement(G.ZP,(0,P.Z)({},G.lG,{code:r,language:i,theme:void 0}),(function(n){var e=n.className,t=n.style,i=n.tokens,r=n.getLineProps,o=n.getTokenProps;return F.createElement("pre",{className:e,style:t},i.map((function(n,e){return F.createElement("div",r({line:n,key:e}),n.map((function(n,e){return F.createElement("span",o({token:n,key:e}))})))})))})),F.createElement(en,null,F.createElement("div",null,F.createElement(H,{labelColour:"white",label:"Copy",contentToCopy:r}))))}))))))},Y=S.Z.div(r||(r=(0,T.Z)(["\n  width: auto;\n  height: auto;\n  min-height: 350px;\n  display: flex;\n  flex-direction: column;\n  border-radius: 5px;\n  box-shadow: 7px 3px 10px 0px #0000003b;\n  overflow: hidden;\n"]))),q=S.Z.div(o||(o=(0,T.Z)(["\n  width: 100%;\n  box-sizing: border-box;\n  height: 25px;\n  background-color: #282828;\n  margin: 0 auto;\n  text-align: left;\n  padding-left: 5px;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n"]))),B={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},$=S.Z.div(l||(l=(0,T.Z)(["\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  position: relative;\n  margin: 0 4px;\n  background-color: ",";\n  display: inline-block;\n"])),(function(n){var e=n.type;return B[e]})),J=S.Z.div(a||(a=(0,T.Z)(['\n  width: 100%;\n  color: #fff;\n  background-color: #1e1e1e;\n  margin: 0 auto;\n  height: 100%;\n  min-height: 130px;\n  text-align: left;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  font-family: "Fira Mono", monospace;\n  position: relative;\n  display: flex;\n  flex: 1;\n']))),K=S.Z.div(c||(c=(0,T.Z)(["\n  background: #333333;\n  width: 48px;\n"]))),Q=S.Z.div(p||(p=(0,T.Z)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n"]))),V=S.Z.div(u||(u=(0,T.Z)(["\n  width: 100%;\n  height: 35px;\n  position: relative;\n  background-color: #252526;\n  display: flex;\n"]))),W=(0,R.iv)(d||(d=(0,T.Z)(["\n  background: #1e1e1e;\n"]))),X=S.Z.div(s||(s=(0,T.Z)(['\n  width: auto;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 5px 10px;\n  background-color: #2d2d2d;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,\n    "Open Sans", "Helvetica Neue", sans-serif;\n  font-size: 13px;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &::before {\n    content: "";\n    background: url(',");\n    background-size: 16px;\n    background-repeat: no-repeat;\n    height: 25px;\n    top: 5px;\n    width: 28px;\n    position: relative;\n  }\n\n  ","\n"])),(function(n){return n.iconUrl}),(function(n){return n.isActive&&W})),_=S.Z.div(m||(m=(0,T.Z)(["\n  background-color: #1e1e1e;\n  margin-left: 20px;\n  padding-left: 10px;\n  border-left: 1px solid #ffffff5c;\n"]))),nn=S.Z.div(f||(f=(0,T.Z)(["\n  display: ",";\n"])),(function(n){return n.isActive?"block":"none"})),en=S.Z.div(g||(g=(0,T.Z)(["\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n"]))),tn=function(n){var e=n.children;return F.createElement(F.Fragment,null,e)},rn=(0,R.iv)(x||(x=(0,T.Z)(["\n  background: #0070f3;\n  color: white;\n"]))),on=S.Z.div(b||(b=(0,T.Z)(["\n  min-width: 100px;\n  padding: 10px 20px;\n\n  ","\n"])),(function(n){return n.isActive&&rn})),ln=function(n){var e=n.children,t=(0,F.useState)(e[0].props.label),i=t[0],r=t[1];return F.createElement(F.Fragment,null,F.createElement(an,null,F.Children.map(e,(function(n){var e=n.props.label;return F.createElement(on,{key:e,isActive:i===e,onClick:function(){return r(e)}},e)}))),F.createElement("div",{className:"tab-content"},F.Children.map(e,(function(n){if(n.props.label===i)return n.props.children}))))},an=S.Z.div(h||(h=(0,T.Z)(["\n  display: flex;\n  margin-bottom: 36px;\n\n  div {\n    border: 1px solid black;\n    border-radius: 0;\n    transition: all 0.2s;\n\n    &:hover {\n      background: #0070f3;\n      color: white;\n      cursor: pointer;\n      box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);\n    }\n\n    &:first-of-type {\n      border-radius: 0.5em 0 0 0.5em;\n      border-right: none;\n    }\n\n    &:last-of-type {\n      border-radius: 0 0.5em 0.5em 0;\n    }\n  }\n"]))),cn=function(){return F.createElement(pn,null,F.createElement(un,null,F.createElement(sn,{type:"close"}),F.createElement(sn,{type:"minimize"}),F.createElement(sn,{type:"zoom"})),F.createElement(mn,null,F.createElement(gn,null,"$ "),"npx generate-license-file \\",F.createElement("br",null),F.createElement(fn,null," --input ")," ./package.json \\",F.createElement("br",null),F.createElement(fn,null," --output ")," THIRD-PARTY-LICENSES.txt",F.createElement(xn,null,F.createElement(H,{labelColour:"white",label:"Copy",contentToCopy:"npx generate-license-file \\\n--input ./package.json \\\n--output THIRD-PARTY-LICENSES.txt"}),F.createElement(H,{labelColour:"white",label:"Copy as One Line",contentToCopy:"npx generate-license-file --input ./package.json --output THIRD-PARTY-LICENSES.txt"}))))},pn=S.Z.div(v||(v=(0,T.Z)(["\n  position: relative;\n  width: 715px;\n  max-width: 950px;\n  margin: 0 auto;\n  border-radius: 5px;\n  box-shadow: 7px 3px 10px 0px #0000003b;\n"]))),un=S.Z.div(E||(E=(0,T.Z)(["\n  width: auto;\n  box-sizing: border-box;\n  height: 25px;\n  background-color: #282828;\n  margin: 0 auto;\n  text-align: left;\n  padding-left: 5px;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n"]))),dn={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},sn=S.Z.div(Z||(Z=(0,T.Z)(["\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  position: relative;\n  margin: 0 4px;\n  background-color: ",";\n  display: inline-block;\n"])),(function(n){var e=n.type;return dn[e]})),mn=S.Z.div(y||(y=(0,T.Z)(['\n  color: #fff;\n  background-color: #151515;\n  width: auto;\n  margin: 0 auto;\n  padding: 20px;\n  min-height: 170px;\n  text-align: left;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  font-family: "Fira Mono", monospace;\n  white-space: pre;\n']))),fn=S.Z.span(k||(k=(0,T.Z)(['\n  opacity: 0.7;\n\n  &::before {\n    content: "";\n    display: inline-block;\n    margin-left: 20%;\n  }\n']))),gn=S.Z.span(w||(w=(0,T.Z)(["\n  user-select: none;\n"]))),xn=S.Z.div(C||(C=(0,T.Z)(["\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 10px;\n  display: flex;\n  justify-content: space-between;\n\n  button:not(:last-child) {\n    padding-right: 16px;\n  }\n"]))),bn=S.Z.div(j||(j=(0,T.Z)(["\n  padding: 100px 70px 100px 70px;\n  min-height: 100vh;\n"]))),hn=S.Z.div(L||(L=(0,T.Z)(["\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  max-width: 900px;\n  width: 100%;\n  margin: 0 auto;\n"]))),vn=S.Z.h1(z||(z=(0,T.Z)(["\n  font-size: 3rem;\n  color: var(--ifm-heading-color);\n  font-family: var(--ifm-heading-font-family);\n  font-weight: var(--ifm-heading-font-weight);\n  line-height: var(--ifm-heading-line-height);\n  margin: var(--ifm-heading-margin-top) 0 30px 0;\n"]))),En=S.Z.p(I||(I=(0,T.Z)(["\n  font-size: 1.5rem;\n  max-width: 700px;\n  margin-bottom: 64px;\n"]))),Zn=S.Z.div(N||(N=(0,T.Z)(["\n  text-align: center;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));function yn(){return F.createElement(A.Z,{title:"Generate License File | Docs",description:"Docs website for the generate-license-file npm package."},F.createElement("header",null,F.createElement(bn,null,F.createElement(hn,null,F.createElement(vn,null,"Generate License File"),F.createElement(En,null,"Generate a text file containing all of the licences for your ",F.createElement("br",null)," production, third-party dependencies.")),F.createElement(Zn,null,F.createElement(ln,null,F.createElement(tn,{label:"Library"},F.createElement(O,null)),F.createElement(tn,{label:"CLI"},F.createElement(cn,null)))))))}}}]);