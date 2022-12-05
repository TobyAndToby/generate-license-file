"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[658],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(n),f=i,m=c["".concat(s,".").concat(f)]||c[f]||d[f]||r;return n?a.createElement(m,l(l({ref:t},u),{},{components:n})):a.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=f;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),i=n(6010);const r="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,i.Z)(r,l),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7462),i=n(7294),r=n(6010),l=n(2389),o=n(7392),s=n(7094),p=n(2466);const u="tabList__CuJ",c="tabItem_LNqP";function d(e){const{lazy:t,block:n,defaultValue:l,values:d,groupId:f,className:m}=e,g=i.Children.map(e.children,(e=>{if((0,i.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=d??g.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),h=(0,o.l)(v,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===l?l:l??g.find((e=>e.props.default))?.props.value??g[0].props.value;if(null!==k&&!v.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:b}=(0,s.U)(),[w,C]=(0,i.useState)(k),T=[],{blockElementScrollPositionUntilNextRender:x}=(0,p.o5)();if(null!=f){const e=y[f];null!=e&&e!==w&&v.some((t=>t.value===e))&&C(e)}const I=e=>{const t=e.currentTarget,n=T.indexOf(t),a=v[n].value;a!==w&&(x(t),C(a),null!=f&&b(f,String(a)))},N=e=>{let t=null;switch(e.key){case"Enter":I(e);break;case"ArrowRight":{const n=T.indexOf(e.currentTarget)+1;t=T[n]??T[0];break}case"ArrowLeft":{const n=T.indexOf(e.currentTarget)-1;t=T[n]??T[T.length-1];break}}t?.focus()};return i.createElement("div",{className:(0,r.Z)("tabs-container",u)},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":n},m)},v.map((e=>{let{value:t,label:n,attributes:l}=e;return i.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:N,onClick:I},l,{className:(0,r.Z)("tabs__item",c,l?.className,{"tabs__item--active":w===t})}),n??t)}))),t?(0,i.cloneElement)(g.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):i.createElement("div",{className:"margin-top--md"},g.map(((e,t)=>(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function f(e){const t=(0,l.Z)();return i.createElement(d,(0,a.Z)({key:String(t)},e))}},4223:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>d,default:()=>h,frontMatter:()=>c,metadata:()=>f,toc:()=>g});var a=n(7462),i=(n(7294),n(3905)),r=n(5488),l=n(5162);const o={toc:[]};function s(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// diff-red\nawait generateLicenseFile(myInput, myOutput, "windows");\n// diff-red\nawait generateLicenseFile(myInput, myOutput, "posix");\n// diff-red\n\n// diff-red\nawait getLicenseFileText(myInput, "windows");\n// diff-red\nawait getLicenseFileText(myInput, "posix");\n\n// diff-green\nawait generateLicenseFile(myInput, myOutput, "crlf");\n// diff-green\nawait generateLicenseFile(myInput, myOutput, "lf");\n// diff-green\n\n// diff-green\nawait getLicenseFileText(myInput, "crlf");\n// diff-green\nawait getLicenseFileText(myInput, "lf");\n')))}s.isMDXComponent=!0;const p={toc:[]};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// diff-red\nawait generateLicenseFile("./", myOutput);\n// diff-red\n\n// diff-red\nawait getLicenseFileText("./");\n// diff-red\n\n// diff-red\nawait getProjectLicenses("./");\n\n// diff-green\nawait generateLicenseFile("./package.json", myOutput);\n// diff-green\n\n// diff-green\nawait getLicenseFileText("./package.json");\n// diff-green\n\n// diff-green\nawait getProjectLicenses("./package.json");\n')))}u.isMDXComponent=!0;const c={title:"Migrate from v1 to v2"},d=void 0,f={unversionedId:"v1-to-v2",id:"v1-to-v2",title:"Migrate from v1 to v2",description:"Breaking Changes",source:"@site/docs/v1-to-v2.mdx",sourceDirName:".",slug:"/v1-to-v2",permalink:"/docs/next/v1-to-v2",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/docs/v1-to-v2.mdx",tags:[],version:"current",frontMatter:{title:"Migrate from v1 to v2"},sidebar:"docs",previous:{title:"API",permalink:"/docs/next/library/api"}},m={},g=[{value:"Breaking Changes",id:"breaking-changes",level:2},{value:"Output file format",id:"output-file-format",level:3},{value:"Line Endings",id:"line-endings",level:4},{value:"Capitalisation of npm",id:"capitalisation-of-npm",level:4},{value:"Credit",id:"credit",level:4},{value:"End-of-line flag (EOL)",id:"end-of-line-flag-eol",level:3},{value:"Input",id:"input",level:3},{value:"New features to consider",id:"new-features-to-consider",level:2},{value:"CI Mode",id:"ci-mode",level:3}],v={toc:g};function h(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"breaking-changes"},"Breaking Changes"),(0,i.kt)("h3",{id:"output-file-format"},"Output file format"),(0,i.kt)("p",null,"Between the major versions we've made a few small formatting changes to the outputted file content."),(0,i.kt)("admonition",{title:"Actions Required",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"None!")),(0,i.kt)("h4",{id:"line-endings"},"Line Endings"),(0,i.kt)("p",null,"In v1, generate-license-file preserved the line endings ",(0,i.kt)("em",{parentName:"p"},"within")," license text. The ",(0,i.kt)("inlineCode",{parentName:"p"},"--eol")," property only applied to the text added around the licenses."),(0,i.kt)("p",null,"In v2, the ",(0,i.kt)("inlineCode",{parentName:"p"},"--eol")," property applies to all text in the output to create a consistent file."),(0,i.kt)("h4",{id:"capitalisation-of-npm"},"Capitalisation of npm"),(0,i.kt)("p",null,'In v1, the output text wrote "npm" in capital letters.'),(0,i.kt)("p",null,"In v2, the output now ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/npm/npm/releases/tag/v5.0.0#:~:text=npm%20will%20now%20scold%20you%20if%20you%20capitalize%20its%20name.%20seriously%20it%20will%20fight%20you."},"correctly")," writes npm in lowercase."),(0,i.kt)("h4",{id:"credit"},"Credit"),(0,i.kt)("p",null,"In v1, credit to generate-license-file was only put at the bottom of the file."),(0,i.kt)("p",null,"In v2, credit is now also added at the top of the file."),(0,i.kt)("h3",{id:"end-of-line-flag-eol"},"End-of-line flag (EOL)"),(0,i.kt)("p",null,"In v1, the ",(0,i.kt)("inlineCode",{parentName:"p"},"eol")," arguement took in either ",(0,i.kt)("inlineCode",{parentName:"p"},"windows")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"posix")," to set the line ending values in the output to either ",(0,i.kt)("inlineCode",{parentName:"p"},"\\r\\n")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n")," respectively."),(0,i.kt)("p",null,"In v2, the ",(0,i.kt)("inlineCode",{parentName:"p"},"eol")," arguement now takes either ",(0,i.kt)("inlineCode",{parentName:"p"},"crlf")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"lf")," for either ",(0,i.kt)("inlineCode",{parentName:"p"},"\\r\\n")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n")," respectively."),(0,i.kt)("admonition",{title:"Actions Required",type:"info"},(0,i.kt)(r.Z,{groupId:"apis",mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,i.kt)("p",null,"Change ",(0,i.kt)("code",null,"--eol windows")," to ",(0,i.kt)("code",null,"--eol crlf"),"."),(0,i.kt)("p",null,"Change ",(0,i.kt)("code",null,"--eol posix")," to ",(0,i.kt)("code",null,"--eol lf"),".")),(0,i.kt)(l.Z,{value:"programmatic",label:"Programmatic use",mdxType:"TabItem"},(0,i.kt)(s,{mdxType:"EolDiff"})))),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"In v1, the ",(0,i.kt)("inlineCode",{parentName:"p"},"input")," parameter was a path to the directory containing the ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," file."),(0,i.kt)("p",null,"In v2, the ",(0,i.kt)("inlineCode",{parentName:"p"},"input")," parameter needs to be a path to the ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," file itself."),(0,i.kt)("admonition",{title:"Actions Required",type:"info"},(0,i.kt)(r.Z,{groupId:"apis",mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,i.kt)("p",null,"Change ",(0,i.kt)("code",null,"--input ./")," to ",(0,i.kt)("code",null,"--input ./package.json"),"."),(0,i.kt)("p",null,"Change ",(0,i.kt)("code",null,"-i ./")," to ",(0,i.kt)("code",null,"-i ./package.json"),".")),(0,i.kt)(l.Z,{value:"programmatic",label:"Programmatic use",mdxType:"TabItem"},(0,i.kt)(u,{mdxType:"InputDiff"})))),(0,i.kt)("h2",{id:"new-features-to-consider"},"New features to consider"),(0,i.kt)("h3",{id:"ci-mode"},"CI Mode"),(0,i.kt)("p",null,"If you're running the generate-license-file CLI as a part of your CI/CD pipelines/processes then you'll probably want to include our new ",(0,i.kt)("inlineCode",{parentName:"p"},"--ci")," flag."),(0,i.kt)("p",null,"This flag ensures that the CLI fails with a non-zero exitcode whenever it would normally prompt the user for an input.\nThis can stop your processes from needlessly hanging until they hit your configured timeout,\nsaving you time as well as debug effort due to the messages it will log before it exits."))}h.isMDXComponent=!0}}]);