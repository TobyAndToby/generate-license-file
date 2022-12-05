"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[585],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||l;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[u]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9482:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(3786),a=n(7294);const l=e=>{const t=(e?.aliases?.length??0)>0,n=1===e.aliases?.length?"Alias":"Aliases",r=(e.aliases??[]).map(((e,t)=>a.createElement(a.Fragment,null,0!==t&&a.createElement(a.Fragment,null,", "),a.createElement("code",null,e))));return a.createElement(i,null,a.createElement(o,null,a.createElement(p,null,a.createElement("b",null,"Type:")," ",a.createElement("code",null,e.type)),a.createElement(p,null,a.createElement("b",null,"Is required:")," ",a.createElement("code",null,e.isRequired?"true":"false")),t&&a.createElement(p,null,a.createElement("b",null,n,":")," ",r)))},i=r.Z.table`
  border: 0;
`,o=r.Z.tr`
  border: 0;
`,p=r.Z.td`
  border: 0;
`},2711:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var r=n(7462),a=(n(7294),n(3905)),l=n(9482);const i={title:"CLI",description:"Overview and example usages of the generate license file CLI"},o=void 0,p={unversionedId:"cli",id:"version-1.3.0/cli",title:"CLI",description:"Overview and example usages of the generate license file CLI",source:"@site/versioned_docs/version-1.3.0/cli.md",sourceDirName:".",slug:"/cli",permalink:"/docs/1.3.0/cli",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/versioned_docs/version-1.3.0/cli.md",tags:[],version:"1.3.0",frontMatter:{title:"CLI",description:"Overview and example usages of the generate license file CLI"},sidebar:"docs",previous:{title:"Getting Started",permalink:"/docs/1.3.0/intro/getting-started"},next:{title:"Library",permalink:"/docs/1.3.0/library/"}},s={},c=[{value:"--input",id:"--input",level:2},{value:"--output",id:"--output",level:2},{value:"--overwrite",id:"--overwrite",level:2},{value:"--eol",id:"--eol",level:2},{value:"--no-spinner",id:"--no-spinner",level:2}],u={toc:c};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"generate-license-file")," CLI will resolve all of the licenses of your third-party dependencies and write them to a file on the disk."),(0,a.kt)("h2",{id:"--input"},"--input"),(0,a.kt)(l.Z,{type:"string",isRequired:!0,aliases:["-i"],mdxType:"ArgumentInfo"}),(0,a.kt)("p",null,"The input parameter is required and needs be a path to the ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")," of the project. It can be a relative or absolute path."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --input ./myProject/package.json\n\nnpx generate-license-file --input C:/myProject/package.json\n")),(0,a.kt)("p",null,"If the path contains a space, then wrap it in double-quotes."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx generate-license-file --input "./my project/package.json"\n')),(0,a.kt)("p",null,"You can also use the ",(0,a.kt)("inlineCode",{parentName:"p"},"-i")," alias."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file -i ./myProject/package.json\n")),(0,a.kt)("h2",{id:"--output"},"--output"),(0,a.kt)(l.Z,{type:"string",isRequired:!0,aliases:["-o"],mdxType:"ArgumentInfo"}),(0,a.kt)("p",null,"The output parameter is required and needs be a path to desired output file. It can be a relative or absolute path."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --output ./third-party-licenses.txt\n\nnpx generate-license-file --output C:/third-party-licenses.txt\n")),(0,a.kt)("p",null,"If the path contains a space, then wrap it in double-quotes."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx generate-license-file --output "./my project/third-party-licenses.txt"\n')),(0,a.kt)("p",null,"You can also use the ",(0,a.kt)("inlineCode",{parentName:"p"},"-o")," alias."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file -o ./myProject/third-party-licenses.txt\n")),(0,a.kt)("h2",{id:"--overwrite"},"--overwrite"),(0,a.kt)(l.Z,{type:"boolean",mdxType:"ArgumentInfo"}),(0,a.kt)("p",null,"If a file already exists at the provided output path, then the CLI won't overwrite it by default."),(0,a.kt)("p",null,"If you'd like the CLI to overwrite existing files then provide the ",(0,a.kt)("inlineCode",{parentName:"p"},"--overwrite")," flag"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --overwrite\n")),(0,a.kt)("h2",{id:"--eol"},"--eol"),(0,a.kt)(l.Z,{type:"string",mdxType:"ArgumentInfo"}),(0,a.kt)("p",null,"By default the CLI writes files to disk using the default line endings of the current machine."),(0,a.kt)("p",null,"If you want the output file to use a specific line ending then you can provide either ",(0,a.kt)("inlineCode",{parentName:"p"},"lf")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"crlf")," with the ",(0,a.kt)("inlineCode",{parentName:"p"},"--eol")," flag."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --eol lf\n\nnpx generate-license-file --eol crlf\n")),(0,a.kt)("h2",{id:"--no-spinner"},"--no-spinner"),(0,a.kt)(l.Z,{type:"boolean",mdxType:"ArgumentInfo"}),(0,a.kt)("p",null,"The CLI shows a spinner in the terminal while it's doing it's work."),(0,a.kt)("p",null,"If the spinner doesn't play nicely with your local or CI/CD environments then you can pass the ",(0,a.kt)("inlineCode",{parentName:"p"},"--no-spinner")," flag to make it only log standard text messages."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --no-spinner\n")))}d.isMDXComponent=!0}}]);