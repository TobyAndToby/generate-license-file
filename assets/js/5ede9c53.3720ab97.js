"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[986],{876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var l=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},a=Object.keys(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=l.createContext({}),p=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return l.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},d=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||a;return n?l.createElement(f,i(i({ref:t},u),{},{components:n})):l.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<a;p++)i[p]=n[p];return l.createElement.apply(null,i)}return l.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2509:(e,t,n)=>{n.d(t,{Z:()=>p});var l,r,a,i=n(541),o=n(8650),s=n(2784);const p=e=>{var t,n,l,r;const a=(null!=(t=null==e||null==(n=e.aliases)?void 0:n.length)?t:0)>0,i=1===(null==(l=e.aliases)?void 0:l.length)?"Alias":"Aliases",o=(null!=(r=e.aliases)?r:[]).map(((e,t)=>s.createElement(s.Fragment,null,0!==t&&s.createElement(s.Fragment,null,", "),s.createElement("code",null,e))));return s.createElement(u,null,s.createElement(c,null,s.createElement(d,null,s.createElement("b",null,"Type:")," ",s.createElement("code",null,e.type)),s.createElement(d,null,s.createElement("b",null,"Is required:")," ",s.createElement("code",null,e.isRequired?"true":"false")),a&&s.createElement(d,null,s.createElement("b",null,i,":")," ",o)))},u=o.Z.table(l||(l=(0,i.Z)(["\n  border: 0;\n"]))),c=o.Z.tr(r||(r=(0,i.Z)(["\n  border: 0;\n"]))),d=o.Z.td(a||(a=(0,i.Z)(["\n  border: 0;\n"])))},4402:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var l=n(7896),r=(n(2784),n(876)),a=n(2509);const i={title:"CLI",description:"Overview and example usages of the generate license file CLI"},o=void 0,s={unversionedId:"cli/index",id:"version-2.0.0/cli/index",title:"CLI",description:"Overview and example usages of the generate license file CLI",source:"@site/versioned_docs/version-2.0.0/cli/index.mdx",sourceDirName:"cli",slug:"/cli/",permalink:"/docs/cli/",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/versioned_docs/version-2.0.0/cli/index.mdx",tags:[],version:"2.0.0",frontMatter:{title:"CLI",description:"Overview and example usages of the generate license file CLI"},sidebar:"docs",previous:{title:"Getting Started",permalink:"/docs/intro/getting-started"},next:{title:"Library",permalink:"/docs/library/"}},p={},u=[{value:"--input",id:"--input",level:2},{value:"--output",id:"--output",level:2},{value:"--overwrite",id:"--overwrite",level:2},{value:"--eol",id:"--eol",level:2},{value:"--ci",id:"--ci",level:2},{value:"--no-spinner",id:"--no-spinner",level:2},{value:"--version",id:"--version",level:2}],c={toc:u};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,l.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"generate-license-file")," CLI will resolve all of the licenses of your third-party dependencies and write them to a file on the disk."),(0,r.kt)("h2",{id:"--input"},"--input"),(0,r.kt)(a.Z,{type:"string",isRequired:!0,aliases:["-i"],mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"The input parameter is required and needs be a path to the ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json")," of the project. It can be a relative or absolute path."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --input ./myProject/package.json\n\nnpx generate-license-file --input C:/myProject/package.json\n")),(0,r.kt)("p",null,"If the path contains a space, then wrap it in double-quotes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'npx generate-license-file --input "./my project/package.json"\n')),(0,r.kt)("p",null,"You can also use the ",(0,r.kt)("inlineCode",{parentName:"p"},"-i")," alias."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file -i ./myProject/package.json\n")),(0,r.kt)("h2",{id:"--output"},"--output"),(0,r.kt)(a.Z,{type:"string",isRequired:!0,aliases:["-o"],mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"The output parameter is required and needs be a path to desired output file. It can be a relative or absolute path."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --output ./third-party-licenses.txt\n\nnpx generate-license-file --output C:/third-party-licenses.txt\n")),(0,r.kt)("p",null,"If the path contains a space, then wrap it in double-quotes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'npx generate-license-file --output "./my project/third-party-licenses.txt"\n')),(0,r.kt)("p",null,"You can also use the ",(0,r.kt)("inlineCode",{parentName:"p"},"-o")," alias."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file -o ./myProject/third-party-licenses.txt\n")),(0,r.kt)("h2",{id:"--overwrite"},"--overwrite"),(0,r.kt)(a.Z,{type:"boolean",mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"If a file already exists at the provided output path, then the CLI won't overwrite it by default."),(0,r.kt)("p",null,"If you'd like the CLI to overwrite existing files then provide the ",(0,r.kt)("inlineCode",{parentName:"p"},"--overwrite")," flag"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --overwrite\n")),(0,r.kt)("h2",{id:"--eol"},"--eol"),(0,r.kt)(a.Z,{type:"string",mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"By default the CLI writes files to disk using the default line endings of the current machine."),(0,r.kt)("p",null,"If you want the output file to use a specific line ending then you can provide either ",(0,r.kt)("inlineCode",{parentName:"p"},"lf")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"crlf")," with the ",(0,r.kt)("inlineCode",{parentName:"p"},"--eol")," flag."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --eol lf\n\nnpx generate-license-file --eol crlf\n")),(0,r.kt)("h2",{id:"--ci"},"--ci"),(0,r.kt)(a.Z,{type:"boolean",mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"When using the the CLI locally, it will prompt you for inputs if you forget to supply one that's required."),(0,r.kt)("p",null,"To stop the CLI from trying to show the prompts in a CI/CD environment (and instead error/fail-fast), you can provide the ",(0,r.kt)("inlineCode",{parentName:"p"},"--ci")," flag."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --ci\n")),(0,r.kt)("h2",{id:"--no-spinner"},"--no-spinner"),(0,r.kt)(a.Z,{type:"boolean",mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"The CLI shows a spinner in the terminal while it's doing it's work."),(0,r.kt)("p",null,"If the spinner doesn't play nicely with your local or CI/CD environments then you can pass the ",(0,r.kt)("inlineCode",{parentName:"p"},"--no-spinner")," flag to make it only log standard text messages."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --no-spinner\n")),(0,r.kt)("h2",{id:"--version"},"--version"),(0,r.kt)(a.Z,{type:"boolean",aliases:["-v"],mdxType:"ArgumentInfo"}),(0,r.kt)("p",null,"Pass the ",(0,r.kt)("inlineCode",{parentName:"p"},"--version")," flag to the CLI to make it log out which version you have installed."),(0,r.kt)("p",null,"When this flag is given, the CLI will not do anything else, and no files will be generated."),(0,r.kt)("p",null,"You can also pass in the alias ",(0,r.kt)("inlineCode",{parentName:"p"},"-v"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --version\n\nnpx generate-license-file -v\n")))}d.isMDXComponent=!0}}]);