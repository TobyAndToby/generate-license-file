"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[237],{7162:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var o=n(3786),r=n(7676),i=n(7294),l=n(7462),a=n(4996),c=(n(8417),n(8679),n(8137));n(7278);function s(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,c.O)(t)}var p=n(3746);const u=e=>{let{label:t,labelColour:n,contentToCopy:o}=e;const[r,l]=(0,i.useState)(!1);return r?i.createElement(g,null,i.createElement(m,null)):i.createElement(d,{colour:n,onClick:()=>{navigator.clipboard.writeText(o),l(!0),setTimeout((()=>{l(!1)}),1500)}},t)},d=o.Z.button`
  background: none;
  border: none;
  outline: none;
  height: auto;
  width: auto;
  color: ${e=>{let{colour:t}=e;return t}};
  cursor: pointer;
`,g=o.Z.div`
  width: 100%;
`,m=o.Z.div`
  margin: 0 auto;
  background-image: url("/img/checkmark-circle-outline.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 18px;
  width: 18px;
`,h=[{fileName:"demo.ts",tabIcon:"/img/ts-logo-256.png",language:"javascript",content:'import { getProjectLicenses, ILicense } from "generate-license-file";\n\n// Get an array of licenses for the current project\'s production dependencies.\nconst licenses: ILicense[] = await getProjectLicenses("./package.json");\n    '},{fileName:"demo.js",tabIcon:"/img/js-logo-256.png",language:"javascript",content:'const generateLicenseFile = require("generate-license-file");\n\n// Get an array of licenses for the current project\'s production dependencies.\ngenerateLicenseFile\n  .getProjectLicenses("./package.json")\n  .then(licenses => {\n    // Do stuff with licenses...\n  })\n  .catch(error => {\n    // Do stuff with error...\n  });'}],f=()=>{const[e,t]=(0,i.useState)(h[0].fileName);return i.createElement(y,{className:"monaco"},i.createElement(b,null,i.createElement(v,{type:"close"}),i.createElement(v,{type:"minimize"}),i.createElement(v,{type:"zoom"})),i.createElement(k,null,i.createElement(E,null),i.createElement(w,null,i.createElement(Z,null,h.map((n=>{let{fileName:o,tabIcon:r}=n;return i.createElement(C,{isActive:e===o,iconUrl:(0,a.Z)(r),onClick:()=>t(o),key:o},o)}))),i.createElement(T,null,h.map((t=>{let{fileName:n,language:o,content:r}=t;return i.createElement(L,{isActive:e===n,key:n},i.createElement(p.ZP,(0,l.Z)({},p.lG,{code:r,language:o,theme:void 0}),(e=>{let{className:t,style:n,tokens:o,getLineProps:r,getTokenProps:l}=e;return i.createElement("pre",{className:t,style:n},o.map(((e,t)=>i.createElement("div",r({line:e,key:t}),e.map(((e,t)=>i.createElement("span",l({token:e,key:t}))))))))})),i.createElement(z,null,i.createElement("div",null,i.createElement(u,{labelColour:"white",label:"Copy",contentToCopy:r}))))}))))))},y=o.Z.div`
  width: auto;
  height: auto;
  max-width: 715px;
  min-height: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 7px 3px 10px 0px #0000003b;
  overflow: hidden;
`,b=o.Z.div`
  width: 100%;
  box-sizing: border-box;
  height: 25px;
  background-color: #282828;
  margin: 0 auto;
  text-align: left;
  padding-left: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`,x={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},v=o.Z.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: relative;
  margin: 0 4px;
  background-color: ${e=>{let{type:t}=e;return x[t]}};
  display: inline-block;
`,k=o.Z.div`
  width: 100%;
  color: #fff;
  background-color: #1e1e1e;
  margin: 0 auto;
  height: 100%;
  min-height: 130px;
  text-align: left;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-family: "Fira Mono", monospace;
  position: relative;
  display: flex;
  flex: 1;
`,E=o.Z.div`
  background: #333333;
  width: 48px;
`,w=o.Z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,Z=o.Z.div`
  width: 100%;
  height: 35px;
  position: relative;
  background-color: #252526;
  display: flex;
`,j=s`
  background: #1e1e1e;
`,C=o.Z.div`
  width: auto;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    background: url(${e=>{let{iconUrl:t}=e;return t}});
    background-size: 16px;
    background-repeat: no-repeat;
    height: 25px;
    top: 5px;
    width: 28px;
    position: relative;
  }

  ${e=>{let{isActive:t}=e;return t&&j}}
`,T=o.Z.div`
  background-color: #1e1e1e;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #ffffff5c;
`,L=o.Z.div`
  display: ${e=>{let{isActive:t}=e;return t?"block":"none"}};
`,z=o.Z.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`,N=e=>{let{children:t}=e;return i.createElement(P,null,t)},P=o.Z.div`
  width: 100%;
`,D=s`
  background: #0070f3;
  color: white;
`,S=o.Z.div`
  min-width: 100px;
  padding: 10px 20px;

  ${e=>{let{isActive:t}=e;return t&&D}}
`,O=e=>{let{children:t}=e;const[n,o]=(0,i.useState)(t[0].props.label);return i.createElement(i.Fragment,null,i.createElement(I,null,i.Children.map(t,(e=>{const{label:t}=e.props;return i.createElement(S,{key:t,isActive:n===t,onClick:()=>o(t)},t)}))),i.createElement(_,null,i.Children.map(t,(e=>{if(e.props.label===n)return e.props.children}))))},I=o.Z.div`
  display: flex;
  margin-bottom: 36px;

  div {
    border: 1px solid black;
    border-radius: 0;
    transition: all 0.2s;

    &:hover {
      background: #0070f3;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    }

    &:first-of-type {
      border-radius: 0.5em 0 0 0.5em;
      border-right: none;
    }

    &:last-of-type {
      border-radius: 0 0.5em 0.5em 0;
    }
  }
`,_=o.Z.div`
  width: 100%;
`,A=()=>i.createElement(F,null,i.createElement($,null,i.createElement(R,{type:"close"}),i.createElement(R,{type:"minimize"}),i.createElement(R,{type:"zoom"})),i.createElement(H,null,i.createElement(M,null,"$ "),"npx generate-license-file \\",i.createElement("br",null),i.createElement(U,null," --input ")," ./package.json \\",i.createElement("br",null),i.createElement(U,null," --output ")," THIRD-PARTY-LICENSES.txt",i.createElement(Y,null,i.createElement(u,{labelColour:"white",label:"Copy",contentToCopy:"npx generate-license-file \\\n--input ./package.json \\\n--output THIRD-PARTY-LICENSES.txt"}),i.createElement(u,{labelColour:"white",label:"Copy as one line",contentToCopy:"npx generate-license-file --input ./package.json --output THIRD-PARTY-LICENSES.txt"})))),F=o.Z.div`
  position: relative;
  width: 100%;
  max-width: 715px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 7px 3px 10px 0px #0000003b;
`,$=o.Z.div`
  width: auto;
  box-sizing: border-box;
  height: 25px;
  background-color: #282828;
  margin: 0 auto;
  text-align: left;
  padding-left: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`,G={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},R=o.Z.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: relative;
  margin: 0 4px;
  background-color: ${e=>{let{type:t}=e;return G[t]}};
  display: inline-block;
`,H=o.Z.div`
  color: #fff;
  background-color: #151515;
  width: auto;
  margin: 0 auto;
  padding: 20px;
  min-height: 170px;
  text-align: left;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-family: "Fira Mono", monospace;
  white-space: pre;
  overflow-x: auto;
`,U=o.Z.span`
  opacity: 0.7;

  &::before {
    content: "";
    display: inline-block;
    margin-left: 20%;
  }
`,M=o.Z.span`
  user-select: none;
`,Y=o.Z.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  button:not(:last-child) {
    padding-right: 16px;
  }
`;function q(){return i.createElement(r.Z,{title:"Generate License File | Docs",description:"Documentation for the generate-license-file npm package."},i.createElement("header",null,i.createElement(B,null,i.createElement(Q,null,i.createElement(W,null),i.createElement(J,null,"Generate License File"),i.createElement(K,null,"Generate a text file containing all of the licences for your production, third-party dependencies.")),i.createElement(V,null,i.createElement(O,null,i.createElement(N,{label:"CLI"},i.createElement(A,null)),i.createElement(N,{label:"Library"},i.createElement(f,null)))))))}const B=o.Z.div`
  padding: 80px 70px 100px 70px;
  min-height: 100vh;
`,W=o.Z.div`
  background-image: url("/img/glf-icon-3.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
`,J=o.Z.h1`
  font-size: 3rem;
  color: var(--ifm-heading-color);
  font-family: var(--ifm-heading-font-family);
  font-weight: var(--ifm-heading-font-weight);
  line-height: var(--ifm-heading-line-height);
  margin: var(--ifm-heading-margin-top) 0 30px 0;
`,K=o.Z.p`
  font-size: 1.5rem;
  max-width: 650px;
  margin-bottom: 64px;
`,Q=o.Z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`,V=o.Z.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`},3746:(e,t,n)=>{n.d(t,{ZP:()=>m,lG:()=>l});var o=n(7410);const r={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var i=n(7294),l={Prism:o.Z,theme:r};function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},c.apply(this,arguments)}var s=/\r\n|\r|\n/,p=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},u=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},d=function(e,t){var n=e.plain,o=Object.create(null),r=e.styles.reduce((function(e,n){var o=n.languages,r=n.style;return o&&!o.includes(t)||n.types.forEach((function(t){var n=c({},e[t],r);e[t]=n})),e}),o);return r.root=n,r.plain=c({},n,{backgroundColor:null}),r};function g(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}const m=function(e){function t(){for(var t=this,n=[],o=arguments.length;o--;)n[o]=arguments[o];e.apply(this,n),a(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?d(e.theme,e.language):void 0;return t.themeDict=n})),a(this,"getLineProps",(function(e){var n=e.key,o=e.className,r=e.style,i=c({},g(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(i.style=l.plain),void 0!==r&&(i.style=void 0!==i.style?c({},i.style,r):r),void 0!==n&&(i.key=n),o&&(i.className+=" "+o),i})),a(this,"getStyleForToken",(function(e){var n=e.types,o=e.empty,r=n.length,i=t.getThemeDict(t.props);if(void 0!==i){if(1===r&&"plain"===n[0])return o?{display:"inline-block"}:void 0;if(1===r&&!o)return i[n[0]];var l=o?{display:"inline-block"}:{},a=n.map((function(e){return i[e]}));return Object.assign.apply(Object,[l].concat(a))}})),a(this,"getTokenProps",(function(e){var n=e.key,o=e.className,r=e.style,i=e.token,l=c({},g(e,["key","className","style","token"]),{className:"token "+i.types.join(" "),children:i.content,style:t.getStyleForToken(i),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?c({},l.style,r):r),void 0!==n&&(l.key=n),o&&(l.className+=" "+o),l})),a(this,"tokenize",(function(e,t,n,o){var r={code:t,grammar:n,language:o,tokens:[]};e.hooks.run("before-tokenize",r);var i=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),i}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,o=e.code,r=e.children,i=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],o=[0],r=[e.length],i=0,l=0,a=[],c=[a];l>-1;){for(;(i=o[l]++)<r[l];){var d=void 0,g=t[l],m=n[l][i];if("string"==typeof m?(g=l>0?g:["plain"],d=m):(g=u(g,m.type),m.alias&&(g=u(g,m.alias)),d=m.content),"string"==typeof d){var h=d.split(s),f=h.length;a.push({types:g,content:h[0]});for(var y=1;y<f;y++)p(a),c.push(a=[]),a.push({types:g,content:h[y]})}else l++,t.push(g),n.push(d),o.push(0),r.push(d.length)}l--,t.pop(),n.pop(),o.pop(),r.pop()}return p(a),c}(void 0!==l?this.tokenize(t,o,l,n):[o]),className:"prism-code language-"+n,style:void 0!==i?i.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(i.Component)}}]);