"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[237],{7162:(e,i,t)=>{t.r(i),t.d(i,{default:()=>q});var n=t(3786),o=t(6040),r=t(7294),a=t(4996),l=(t(8417),t(8679),t(8137));t(7278);function s(){for(var e=arguments.length,i=new Array(e),t=0;t<e;t++)i[t]=arguments[t];return(0,l.O)(i)}var d=t(2573),c=t(5893);const p=e=>{let{label:i,labelColour:t,contentToCopy:n}=e;const[o,a]=(0,r.useState)(!1);return o?(0,c.jsx)(h,{children:(0,c.jsx)(g,{})}):(0,c.jsx)(x,{colour:t,onClick:()=>{navigator.clipboard.writeText(n),a(!0),setTimeout((()=>{a(!1)}),1500)},children:i})},x=n.Z.button`
  background: none;
  border: none;
  outline: none;
  height: auto;
  width: auto;
  color: ${e=>{let{colour:i}=e;return i}};
  cursor: pointer;
`,h=n.Z.div`
  width: 100%;
`,g=n.Z.div`
  margin: 0 auto;
  background-image: url("/img/checkmark-circle-outline.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 18px;
  width: 18px;
`,u=[{fileName:"demo.ts",tabIcon:"/img/ts-logo-256.png",language:"javascript",content:'import { getProjectLicenses, ILicense } from "generate-license-file";\n\n// Get an array of licenses for the current project\'s production dependencies.\nconst licenses: ILicense[] = await getProjectLicenses("./package.json");\n    '},{fileName:"demo.js",tabIcon:"/img/js-logo-256.png",language:"javascript",content:'const generateLicenseFile = require("generate-license-file");\n\n// Get an array of licenses for the current project\'s production dependencies.\ngenerateLicenseFile\n  .getProjectLicenses("./package.json")\n  .then(licenses => {\n    // Do stuff with licenses...\n  })\n  .catch(error => {\n    // Do stuff with error...\n  });'}],f=()=>{const[e,i]=(0,r.useState)(u[0].fileName);return(0,c.jsxs)(m,{className:"monaco",children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(v,{type:"close"}),(0,c.jsx)(v,{type:"minimize"}),(0,c.jsx)(v,{type:"zoom"})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(k,{}),(0,c.jsxs)(w,{children:[(0,c.jsx)(Z,{children:u.map((t=>{let{fileName:n,tabIcon:o}=t;return(0,c.jsx)(z,{isActive:e===n,iconUrl:(0,a.Z)(o),onClick:()=>i(n),children:n},n)}))}),(0,c.jsx)(L,{children:u.map((i=>{let{fileName:t,language:n,content:o}=i;return(0,c.jsxs)(I,{isActive:e===t,children:[(0,c.jsx)(d.y$,{code:o,language:n,theme:void 0,children:e=>{let{className:i,style:t,tokens:n,getLineProps:o,getTokenProps:r}=e;return(0,c.jsx)("pre",{className:i,style:t,children:n.map(((e,i)=>(0,c.jsx)("div",{...o({line:e,key:i}),children:e.map(((e,i)=>(0,c.jsx)("span",{...r({token:e,key:i})})))})))})}}),(0,c.jsx)(T,{children:(0,c.jsx)("div",{children:(0,c.jsx)(p,{labelColour:"white",label:"Copy",contentToCopy:o})})})]},t)}))})]})]})]})},m=n.Z.div`
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
`,b=n.Z.div`
  width: 100%;
  box-sizing: border-box;
  height: 25px;
  background-color: #282828;
  margin: 0 auto;
  text-align: left;
  padding-left: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`,j={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},v=n.Z.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: relative;
  margin: 0 4px;
  background-color: ${e=>{let{type:i}=e;return j[i]}};
  display: inline-block;
`,y=n.Z.div`
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
`,k=n.Z.div`
  background: #333333;
  width: 48px;
`,w=n.Z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,Z=n.Z.div`
  width: 100%;
  height: 35px;
  position: relative;
  background-color: #252526;
  display: flex;
`,C=s`
  background: #1e1e1e;
`,z=n.Z.div`
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
    background: url(${e=>{let{iconUrl:i}=e;return i}});
    background-size: 16px;
    background-repeat: no-repeat;
    height: 25px;
    top: 5px;
    width: 28px;
    position: relative;
  }

  ${e=>{let{isActive:i}=e;return i&&C}}
`,L=n.Z.div`
  background-color: #1e1e1e;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #ffffff5c;
`,I=n.Z.div`
  display: ${e=>{let{isActive:i}=e;return i?"block":"none"}};
`,T=n.Z.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`,N=e=>{let{children:i}=e;return(0,c.jsx)(S,{children:i})},S=n.Z.div`
  width: 100%;
`,A=s`
  background: #0070f3;
  color: white;
`,$=n.Z.div`
  min-width: 100px;
  padding: 10px 20px;

  ${e=>{let{isActive:i}=e;return i&&A}}
`,F=e=>{let{children:i}=e;const[t,n]=(0,r.useState)(i[0].props.label);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(P,{children:r.Children.map(i,(e=>{const{label:i}=e.props;return(0,c.jsx)($,{isActive:t===i,onClick:()=>n(i),children:i},i)}))}),(0,c.jsx)(_,{children:r.Children.map(i,(e=>{if(e.props.label===t)return e.props.children}))})]})},P=n.Z.div`
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
`,_=n.Z.div`
  width: 100%;
`,D=()=>(0,c.jsxs)(R,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(H,{type:"close"}),(0,c.jsx)(H,{type:"minimize"}),(0,c.jsx)(H,{type:"zoom"})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(O,{children:"$ "}),"npx generate-license-file \\",(0,c.jsx)("br",{}),(0,c.jsx)(M,{children:" --input "})," ./package.json \\",(0,c.jsx)("br",{}),(0,c.jsx)(M,{children:" --output "})," THIRD-PARTY-LICENSES.txt",(0,c.jsxs)(Y,{children:[(0,c.jsx)(p,{labelColour:"white",label:"Copy",contentToCopy:"npx generate-license-file \\\n--input ./package.json \\\n--output THIRD-PARTY-LICENSES.txt"}),(0,c.jsx)(p,{labelColour:"white",label:"Copy as one line",contentToCopy:"npx generate-license-file --input ./package.json --output THIRD-PARTY-LICENSES.txt"})]})]})]}),R=n.Z.div`
  position: relative;
  width: 100%;
  max-width: 715px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 7px 3px 10px 0px #0000003b;
`,E=n.Z.div`
  width: auto;
  box-sizing: border-box;
  height: 25px;
  background-color: #282828;
  margin: 0 auto;
  text-align: left;
  padding-left: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`,G={close:"#ff3b47",minimize:"#ffc100",zoom:"#00d742"},H=n.Z.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: relative;
  margin: 0 4px;
  background-color: ${e=>{let{type:i}=e;return G[i]}};
  display: inline-block;
`,U=n.Z.div`
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
`,M=n.Z.span`
  opacity: 0.7;

  &::before {
    content: "";
    display: inline-block;
    margin-left: 20%;
  }
`,O=n.Z.span`
  user-select: none;
`,Y=n.Z.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  button:not(:last-child) {
    padding-right: 16px;
  }
`;function q(){return(0,c.jsx)(o.Z,{title:"Generate License File | Docs",description:"Documentation for the generate-license-file npm package.",children:(0,c.jsx)("header",{children:(0,c.jsxs)(B,{children:[(0,c.jsxs)(V,{children:[(0,c.jsx)(J,{}),(0,c.jsx)(K,{children:"Generate License File"}),(0,c.jsx)(Q,{children:"Generate a text file containing all of the licences for your production, third-party dependencies."})]}),(0,c.jsx)(W,{children:(0,c.jsxs)(F,{children:[(0,c.jsx)(N,{label:"CLI",children:(0,c.jsx)(D,{})}),(0,c.jsx)(N,{label:"Library",children:(0,c.jsx)(f,{})})]})})]})})})}const B=n.Z.div`
  padding: 80px 70px 100px 70px;
  min-height: 100vh;
`,J=n.Z.div`
  background-image: url("/img/glf-icon-3.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
`,K=n.Z.h1`
  font-size: 3rem;
  color: var(--ifm-heading-color);
  font-family: var(--ifm-heading-font-family);
  font-weight: var(--ifm-heading-font-weight);
  line-height: var(--ifm-heading-line-height);
  margin: var(--ifm-heading-margin-top) 0 30px 0;
`,Q=n.Z.p`
  font-size: 1.5rem;
  max-width: 650px;
  margin-bottom: 64px;
`,V=n.Z.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`,W=n.Z.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`}}]);