"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[312],{3872:(e,t,n)=>{n.d(t,{R:()=>g,Z:()=>h});var i,r,a,o=n(541),s=n(8650),l=n(3419),c=n(8715),p=n(2784),d=n(7293);const m=(0,c.O4)("showTypeScript",!0),g=()=>(0,l.Dv)(m),h=()=>{const[e,t]=(0,l.KO)(m);return p.createElement("form",null,p.createElement(u,{htmlFor:"show-typescript"},p.createElement(f,null,"Language:"),p.createElement(d.Z,{id:"show-typescript",icons:{checked:p.createElement(y,{color:"white"},"TS"),unchecked:p.createElement(y,{color:"black"},"JS")},checked:e,onChange:e=>t(e.target.checked)})))},u=s.Z.label(i||(i=(0,o.Z)(["\n  display: flex;\n  align-items: center;\n\n  .react-toggle-track {\n    background-color: #fcd93c !important;\n  }\n\n  .react-toggle-thumb {\n    border-color: #fcd93c;\n  }\n\n  .react-toggle--checked .react-toggle-track {\n    background-color: #337bc2 !important;\n  }\n\n  .react-toggle--checked .react-toggle-thumb {\n    border-color: #337bc2;\n  }\n\n  .react-toggle-track-check,\n  .react-toggle-track-x {\n    margin: 0;\n    height: 100%;\n    display: grid;\n    align-content: center;\n  }\n\n  .react-toggle--focus .react-toggle-thumb {\n    box-shadow: 0px 0px 2px 3px #c7ab2f;\n  }\n\n  .react-toggle--checked.react-toggle--focus .react-toggle-thumb {\n    box-shadow: 0px 0px 2px 3px #214e7a;\n  }\n\n  .react-toggle-thumb {\n    background-color: var(--ifm-hero-background-color);\n  }\n"]))),f=s.Z.span(r||(r=(0,o.Z)(["\n  margin-right: 0.5em;\n  font-weight: bold;\n  font-size: 1.3em;\n"]))),y=s.Z.span(a||(a=(0,o.Z)(["\n  color: ",';\n  display: inline-block;\n  font-weight: 600;\n  font-family: "Arial";\n  font-size: 14px;\n  padding-top: 2px;\n'])),(e=>{let{color:t}=e;return t}))},4356:(e,t,n)=>{n.d(t,{Z:()=>c});var i,r,a=n(541),o=n(8650),s=n(2784),l=n(2803);const c=e=>{let{methodData:t}=e;const{name:n,signatures:i}=t,[r,a]=(0,s.useState)(0),o=i[r];return s.createElement(s.Fragment,null,i.length>1&&s.createElement(p,null,s.createElement(d,null,s.createElement("button",{onClick:()=>a(m(i.length))},s.createElement("img",{src:"/img/chevron-down-outline.svg"})),s.createElement("button",{onClick:()=>a(g(i.length))},s.createElement("img",{src:"/img/chevron-up-outline.svg"}))),s.createElement("span",null,"Overload ",r+1," of ",i.length)),s.createElement(l.Z,{methodName:n,signature:o}))},p=o.Z.div(i||(i=(0,a.Z)(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 1em;\n"]))),d=o.Z.span(r||(r=(0,a.Z)(["\n  display: flex;\n  align-items: center;\n  margin-right: 0.5em;\n\n  button {\n    border-color: grey;\n    margin: 0;\n    padding: 0;\n    height: auto;\n    width: 40px;\n\n    img {\n      height: 18px;\n      margin: 0 auto;\n      margin-top: 4px;\n    }\n  }\n\n  button:first-of-type {\n    border-radius: 0.4em 0 0 0.4em;\n    border-width: 1px 0 1px 1px;\n  }\n\n  button:last-of-type {\n    border-radius: 0 0.4em 0.4em 0;\n    border-width: 1px;\n  }\n"]))),m=e=>t=>(t+e-1)%e,g=e=>t=>(t+1)%e},6026:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(3872),r=n(2784);const a=e=>{let{properties:t,description:n}=e;return r.createElement(r.Fragment,null,r.createElement("p",null,n),r.createElement("h4",null,"Properties"),r.createElement("ul",null,t.map(((e,t)=>r.createElement("li",{key:t}," ",r.createElement(o,e))))))},o=e=>{let{name:t,type:n,description:a}=e;const o=(0,i.R)();return r.createElement("p",null,r.createElement("code",null,t,o&&": "+n),a&&" - "+a)}},2803:(e,t,n)=>{n.d(t,{Z:()=>l});var i,r=n(541),a=n(8650),o=n(3872),s=n(2784);const l=e=>{let{methodName:t,signature:n}=e;const i=(0,o.R)(),{params:r,returnType:a,description:l}=n,p=i?": "+a.type:"",d=t+"("+r.map((e=>i?e.name+(e.isOptional?"?:":":")+" "+e.type:e.name)).join(", ")+")"+p;return s.createElement(s.Fragment,null,s.createElement("p",null,s.createElement("code",null,d)),s.createElement("p",null,l),s.createElement("h4",null,"Parameters"),s.createElement("ul",null,r.map((e=>s.createElement("li",{key:e.name},s.createElement("p",null,s.createElement("code",null,e.name,i&&": "+e.type),e.description&&" - "+e.description))))),s.createElement("h4",null,"Returns"),s.createElement(c,null,s.createElement("code",null,a.type),a.description&&" - "+a.description))},c=a.Z.p(i||(i=(0,r.Z)(["\n  list-style-type: none;\n  padding-left: var(--ifm-list-left-padding);\n"])))},6889:(e,t,n)=>{n.d(t,{Z:()=>s});var i,r=n(541);const a=n(8650).Z.span(i||(i=(0,r.Z)(["\n  background-color: ",";\n  border-radius: 0.5em;\n  font-size: small;\n  padding: 0.2em 0.4em;\n  font-style: italic;\n  margin: 0 0.5em;\n  color: white;\n  font-weight: 600;\n"])),(e=>{let{full:t}=e;return t?"var(--ifm-color-primary)":"transparent"}));var o=n(2784);const s=e=>{let{isAsync:t}=e;return o.createElement("span",null,t&&o.createElement(a,{full:!0},"Async"))}},8869:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>d,default:()=>f,frontMatter:()=>p,metadata:()=>m,toc:()=>h});var i=n(7896),r=n(2784),a=n(876),o=n(3872),s=n(4356),l=n(6026),c=(n(2803),n(6889));const p={title:"API",description:"API reference documentation for the generate license file library API"},d=void 0,m={unversionedId:"library/api",id:"version-2.0.0/library/api",title:"API",description:"API reference documentation for the generate license file library API",source:"@site/versioned_docs/version-2.0.0/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/docs/library/api",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/versioned_docs/version-2.0.0/library/api.mdx",tags:[],version:"2.0.0",frontMatter:{title:"API",description:"API reference documentation for the generate license file library API"},sidebar:"docs",previous:{title:"Library",permalink:"/docs/library/"},next:{title:"Migrate from v1 to v2",permalink:"/docs/v1-to-v2"}},g={},h=[{value:"Methods",id:"methods",level:2},{value:"generateLicenseFile <MethodTags isAsync />",id:"generatelicensefile-",level:3},{value:"getLicenseFileText <MethodTags isAsync />",id:"getlicensefiletext-",level:3},{value:"getProjectLicenses <MethodTags isAsync />",id:"getprojectlicenses-",level:3},{value:"Models",id:"models",level:2},{value:"ILicense",id:"ilicense",level:3}],u={toc:h};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(o.Z,{mdxType:"TypeScriptToggle"}),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"generatelicensefile-"},"generateLicenseFile ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"generateLicenseFile",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the project found at the given path and creates a license file at the given output location"},{params:[{name:"pathsToPackageJsons",type:"string[]",description:"Paths to the package.jsons for the projects"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the projects found at the given paths and creates a license file at the given output location"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getlicensefiletext-"},"getLicenseFileText ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"getLicenseFileText",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the project found at the given path and returns a string containing the licenses for all the dependencies"},{params:[{name:"pathsToPackageJsons",type:"string",description:"Paths to the package.jsons for the projects"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getprojectlicenses-"},"getProjectLicenses ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(s.Z,{methodData:{name:"getProjectLicenses",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"}],returnType:{type:"Promise<ILicense[]>",description:"Array of ILicense objects, each containing the license content and respective dependencies"},description:"Scans the project found at the given path and returns an array of objects each containing the details of an identified license and the dependencies it pertains to."}]},mdxType:"LibraryMethod"}),(0,a.kt)("h2",{id:"models"},"Models"),(0,a.kt)("h3",{id:"ilicense"},"ILicense"),(0,a.kt)(l.Z,{properties:[{name:"content",type:"string",description:"Body of the license."},{name:"dependencies",type:"string[]",description:"List of node packages that this license applies to."}],description:(0,a.kt)(r.Fragment,null,"Contains the content of a given license and the list of dependencies it pertains to. It is returned from"," ",(0,a.kt)("a",{href:"#getProjectLicenses"},(0,a.kt)("code",null,"getProjectLicenses"))),mdxType:"LibraryModel"}))}f.isMDXComponent=!0}}]);