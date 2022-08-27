"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[212],{3872:(e,t,n)=>{n.d(t,{R:()=>g,Z:()=>h});var r,i,a,o=n(541),s=n(8650),l=n(3419),c=n(8715),p=n(2784),d=n(7293);const m=(0,c.O4)("showTypeScript",!0),g=()=>(0,l.Dv)(m),h=()=>{const[e,t]=(0,l.KO)(m);return p.createElement("form",null,p.createElement(u,{htmlFor:"show-typescript"},p.createElement(f,null,"Language:"),p.createElement(d.Z,{id:"show-typescript",icons:{checked:p.createElement(y,{color:"white"},"TS"),unchecked:p.createElement(y,{color:"black"},"JS")},checked:e,onChange:e=>t(e.target.checked)})))},u=s.Z.label(r||(r=(0,o.Z)(["\n  display: flex;\n  align-items: center;\n\n  .react-toggle-track {\n    background-color: #fcd93c !important;\n  }\n\n  .react-toggle-thumb {\n    border-color: #fcd93c;\n  }\n\n  .react-toggle--checked .react-toggle-track {\n    background-color: #337bc2 !important;\n  }\n\n  .react-toggle--checked .react-toggle-thumb {\n    border-color: #337bc2;\n  }\n\n  .react-toggle-track-check,\n  .react-toggle-track-x {\n    margin: 0;\n    height: 100%;\n    display: grid;\n    align-content: center;\n  }\n\n  .react-toggle--focus .react-toggle-thumb {\n    box-shadow: 0px 0px 2px 3px #c7ab2f;\n  }\n\n  .react-toggle--checked.react-toggle--focus .react-toggle-thumb {\n    box-shadow: 0px 0px 2px 3px #214e7a;\n  }\n\n  .react-toggle-thumb {\n    background-color: var(--ifm-hero-background-color);\n  }\n"]))),f=s.Z.span(i||(i=(0,o.Z)(["\n  margin-right: 0.5em;\n  font-weight: bold;\n  font-size: 1.3em;\n"]))),y=s.Z.span(a||(a=(0,o.Z)(["\n  color: ",";\n  display: inline-block;\n  font-weight: 600;\n"])),(e=>{let{color:t}=e;return t}))},4356:(e,t,n)=>{n.d(t,{Z:()=>c});var r,i,a=n(541),o=n(8650),s=n(2784),l=n(2803);const c=e=>{let{methodData:t}=e;const{name:n,signatures:r}=t,[i,a]=(0,s.useState)(0),o=r[i];return s.createElement(s.Fragment,null,r.length>1&&s.createElement(p,null,s.createElement(d,null,s.createElement("button",{onClick:()=>a(m(r.length))},"\u25c0"),s.createElement("button",{onClick:()=>a(g(r.length))},"\u25b6")),s.createElement("span",null,"Overload ",i+1," of ",r.length)),s.createElement(l.Z,{methodName:n,signature:o}))},p=o.Z.div(r||(r=(0,a.Z)(["\n  margin-bottom: 1em;\n"]))),d=o.Z.span(i||(i=(0,a.Z)(["\n  margin-right: 0.5em;\n\n  button {\n    border-color: grey;\n    height: 1.6em;\n  }\n\n  button:first-of-type {\n    border-radius: 0.4em 0 0 0.4em;\n    border-width: 1px 0 1px 1px;\n  }\n\n  button:last-of-type {\n    border-radius: 0 0.4em 0.4em 0;\n    border-width: 1px;\n  }\n"]))),m=e=>t=>(t+e-1)%e,g=e=>t=>(t+1)%e},6026:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(3872),i=n(2784);const a=e=>{let{properties:t,description:n}=e;return i.createElement(i.Fragment,null,i.createElement("p",null,n),i.createElement("h4",null,"Properties"),i.createElement("ul",null,t.map((e=>i.createElement("li",null," ",i.createElement(o,e))))))},o=e=>{let{name:t,type:n,description:a}=e;const o=(0,r.R)();return i.createElement("p",null,i.createElement("code",null,t,o&&": "+n),a&&" - "+a)}},2803:(e,t,n)=>{n.d(t,{Z:()=>l});var r,i=n(541),a=n(8650),o=n(3872),s=n(2784);const l=e=>{let{methodName:t,signature:n}=e;const r=(0,o.R)(),{params:i,returnType:a,description:l}=n,p=r?": "+a.type:"",d=t+"("+i.map((e=>r?e.name+(e.isOptional?"?:":":")+" "+e.type:e.name)).join(", ")+")"+p;return s.createElement(s.Fragment,null,s.createElement("p",null,s.createElement("code",null,d)),s.createElement("p",null,l),s.createElement("h4",null,"Parameters"),s.createElement("ul",null,i.map((e=>s.createElement("li",{key:e.name},s.createElement("p",null,s.createElement("code",null,e.name,r&&": "+e.type),e.description&&" - "+e.description))))),s.createElement("h4",null,"Returns"),s.createElement(c,null,s.createElement("code",null,a.type),a.description&&" - "+a.description))},c=a.Z.p(r||(r=(0,i.Z)(["\n  list-style-type: none;\n  padding-left: var(--ifm-list-left-padding);\n"])))},6889:(e,t,n)=>{n.d(t,{Z:()=>s});var r,i=n(541);const a=n(8650).Z.span(r||(r=(0,i.Z)(["\n  background-color: ",";\n  border-radius: 0.5em;\n  font-size: small;\n  padding: 0.2em 0.4em;\n  font-style: italic;\n  margin: 0 0.5em;\n  color: white;\n  font-weight: 600;\n"])),(e=>{let{full:t}=e;return t?"var(--ifm-color-primary)":"transparent"}));var o=n(2784);const s=e=>{let{isAsync:t}=e;return o.createElement("span",null,t&&o.createElement(a,{full:!0},"Async"))}},498:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>d,default:()=>f,frontMatter:()=>p,metadata:()=>m,toc:()=>h});var r=n(7896),i=n(2784),a=n(876),o=n(3872),s=n(4356),l=n(6026),c=(n(2803),n(6889));const p={title:"API"},d=void 0,m={unversionedId:"library/api",id:"library/api",title:"API",description:"Methods",source:"@site/docs/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/docs/next/library/api",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/docs/library/api.mdx",tags:[],version:"current",frontMatter:{title:"API"},sidebar:"docs",previous:{title:"Library",permalink:"/docs/next/library/"},next:{title:"Migrate from v1 to v2",permalink:"/docs/next/v1-to-v2"}},g={},h=[{value:"Methods",id:"methods",level:2},{value:"generateLicenseFile <MethodTags isAsync />",id:"generatelicensefile-",level:3},{value:"getLicenseFileText <MethodTags isAsync />",id:"getlicensefiletext-",level:3},{value:"getProjectLicenses <MethodTags isAsync />",id:"getprojectlicenses-",level:3},{value:"Models",id:"models",level:2},{value:"ILicense",id:"ilicense",level:3}],u={toc:h};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(o.Z,{mdxType:"TypeScriptToggle"}),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"generatelicensefile-"},"generateLicenseFile ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"generateLicenseFile",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the project found at the given path and creates a license file at the given output location"},{params:[{name:"pathsToPackageJsons",type:"string[]",description:"Paths to the package.jsons for the projects"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the projects found at the given paths and creates a license file at the given output location"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getlicensefiletext-"},"getLicenseFileText ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"getLicenseFileText",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the project found at the given path and returns a string containing the licenses for all the dependencies"},{params:[{name:"pathsToPackageJsons",type:"string",description:"Paths to the package.jsons for the projects"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getprojectlicenses-"},"getProjectLicenses ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"getProjectLicenses",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"}],returnType:{type:"Promise<ILicense[]>",description:"Array of ILicense objects, each containing the license content and respective dependencies"},description:"Scans the project found at the given path and returns an array of objects each containing the details of an identified license and the dependencies it pertains to."}]},mdxType:"LibraryMethod"}),(0,a.kt)("h2",{id:"models"},"Models"),(0,a.kt)("h3",{id:"ilicense"},"ILicense"),(0,a.kt)(l.Z,{properties:[{name:"content",type:"string",description:"Body of the license."},{name:"dependencies",type:"string[]",description:"List of node packages that this license applies to."}],description:(0,a.kt)(i.Fragment,null,"Contains the content of a given license and the list of dependencies it pertains to. It is returned from"," ",(0,a.kt)("a",{href:"#getProjectLicenses"},(0,a.kt)("code",null,"getProjectLicenses"))),mdxType:"LibraryModel"}))}f.isMDXComponent=!0}}]);