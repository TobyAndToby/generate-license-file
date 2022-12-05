"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[212],{9411:(e,t,n)=>{n.d(t,{R:()=>c,Z:()=>p});var i=n(3786),r=n(24),a=n(9079),o=n(7294),l=n(888);const s=(0,a.O4)("showTypeScript",!0),c=()=>(0,r.Dv)(s),p=()=>{const[e,t]=(0,r.KO)(s);return o.createElement("form",null,o.createElement(d,{htmlFor:"show-typescript"},o.createElement(m,null,"Language:"),o.createElement(l.Z,{id:"show-typescript",icons:{checked:o.createElement(g,{color:"white"},"TS"),unchecked:o.createElement(g,{color:"black"},"JS")},checked:e,onChange:e=>t(e.target.checked)})))},d=i.Z.label`
  display: flex;
  align-items: center;

  .react-toggle-track {
    background-color: #fcd93c !important;
  }

  .react-toggle-thumb {
    border-color: #fcd93c;
  }

  .react-toggle--checked .react-toggle-track {
    background-color: #337bc2 !important;
  }

  .react-toggle--checked .react-toggle-thumb {
    border-color: #337bc2;
  }

  .react-toggle-track-check,
  .react-toggle-track-x {
    margin: 0;
    height: 100%;
    display: grid;
    align-content: center;
  }

  .react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #c7ab2f;
  }

  .react-toggle--checked.react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #214e7a;
  }

  .react-toggle-thumb {
    background-color: var(--ifm-hero-background-color);
  }
`,m=i.Z.span`
  margin-right: 0.5em;
  font-weight: bold;
  font-size: 1.3em;
`,g=i.Z.span`
  color: ${e=>{let{color:t}=e;return t}};
  display: inline-block;
  font-weight: 600;
  font-family: "Arial";
  font-size: 14px;
  padding-top: 2px;
`},4629:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(3786),r=n(7294),a=n(3774);const o=e=>{let{methodData:t}=e;const{name:n,signatures:i}=t,[o,d]=(0,r.useState)(0),m=i[o];return r.createElement(r.Fragment,null,i.length>1&&r.createElement(l,null,r.createElement(s,null,r.createElement("button",{onClick:()=>d(c(i.length))},r.createElement("img",{src:"/img/chevron-down-outline.svg"})),r.createElement("button",{onClick:()=>d(p(i.length))},r.createElement("img",{src:"/img/chevron-up-outline.svg"}))),r.createElement("span",null,"Overload ",o+1," of ",i.length)),r.createElement(a.Z,{methodName:n,signature:m}))},l=i.Z.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`,s=i.Z.span`
  display: flex;
  align-items: center;
  margin-right: 0.5em;

  button {
    border-color: grey;
    margin: 0;
    padding: 0;
    height: auto;
    width: 40px;

    img {
      height: 18px;
      margin: 0 auto;
      margin-top: 4px;
    }
  }

  button:first-of-type {
    border-radius: 0.4em 0 0 0.4em;
    border-width: 1px 0 1px 1px;
  }

  button:last-of-type {
    border-radius: 0 0.4em 0.4em 0;
    border-width: 1px;
  }
`,c=e=>t=>(t+e-1)%e,p=e=>t=>(t+1)%e},9765:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(9411),r=n(7294);const a=e=>{let{properties:t,description:n}=e;return r.createElement(r.Fragment,null,r.createElement("p",null,n),r.createElement("h4",null,"Properties"),r.createElement("ul",null,t.map(((e,t)=>r.createElement("li",{key:t}," ",r.createElement(o,e))))))},o=e=>{let{name:t,type:n,description:a}=e;const o=(0,i.R)();return r.createElement("p",null,r.createElement("code",null,t,o&&": "+n),a&&` - ${a}`)}},3774:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(3786),r=n(9411),a=n(7294);const o=e=>{let{methodName:t,signature:n}=e;const i=(0,r.R)(),{params:o,returnType:s,description:c}=n,p=i?`: ${s.type}`:"",d=`${t}(${o.map((e=>i?`${e.name}${e.isOptional?"?:":":"} ${e.type}`:e.name)).join(", ")})${p}`;return a.createElement(a.Fragment,null,a.createElement("p",null,a.createElement("code",null,d)),a.createElement("p",null,c),a.createElement("h4",null,"Parameters"),a.createElement("ul",null,o.map((e=>a.createElement("li",{key:e.name},a.createElement("p",null,a.createElement("code",null,e.name,i&&": "+e.type),e.description&&` - ${e.description}`))))),a.createElement("h4",null,"Returns"),a.createElement(l,null,a.createElement("code",null,s.type),s.description&&` - ${s.description}`))},l=i.Z.p`
  list-style-type: none;
  padding-left: var(--ifm-list-left-padding);
`},670:(e,t,n)=>{n.d(t,{Z:()=>a});const i=n(3786).Z.span`
  background-color: ${e=>{let{full:t}=e;return t?"var(--ifm-color-primary)":"transparent"}};
  border-radius: 0.5em;
  font-size: small;
  padding: 0.2em 0.4em;
  font-style: italic;
  margin: 0 0.5em;
  color: white;
  font-weight: 600;
`;var r=n(7294);const a=e=>{let{isAsync:t}=e;return r.createElement("span",null,t&&r.createElement(i,{full:!0},"Async"))}},7877:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>d,default:()=>f,frontMatter:()=>p,metadata:()=>m,toc:()=>h});var i=n(7462),r=n(7294),a=n(3905),o=n(9411),l=n(4629),s=n(9765),c=(n(3774),n(670));const p={title:"API",description:"API reference documentation for the generate license file library API"},d=void 0,m={unversionedId:"library/api",id:"library/api",title:"API",description:"API reference documentation for the generate license file library API",source:"@site/docs/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/docs/next/library/api",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/docs/library/api.mdx",tags:[],version:"current",frontMatter:{title:"API",description:"API reference documentation for the generate license file library API"},sidebar:"docs",previous:{title:"Library",permalink:"/docs/next/library/"},next:{title:"Migrate from v1 to v2",permalink:"/docs/next/v1-to-v2"}},g={},h=[{value:"Methods",id:"methods",level:2},{value:"generateLicenseFile <MethodTags isAsync />",id:"generatelicensefile-",level:3},{value:"getLicenseFileText <MethodTags isAsync />",id:"getlicensefiletext-",level:3},{value:"getProjectLicenses <MethodTags isAsync />",id:"getprojectlicenses-",level:3},{value:"Models",id:"models",level:2},{value:"ILicense",id:"ilicense",level:3}],u={toc:h};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(o.Z,{mdxType:"TypeScriptToggle"}),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"generatelicensefile-"},"generateLicenseFile ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(l.Z,{methodData:{name:"generateLicenseFile",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the project found at the given path and creates a license file at the given output location"},{params:[{name:"pathsToPackageJsons",type:"string[]",description:"Paths to the package.jsons for the projects"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the projects found at the given paths and creates a license file at the given output location"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getlicensefiletext-"},"getLicenseFileText ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(l.Z,{methodData:{name:"getLicenseFileText",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the project found at the given path and returns a string containing the licenses for all the dependencies"},{params:[{name:"pathsToPackageJsons",type:"string",description:"Paths to the package.jsons for the projects"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects"}]},mdxType:"LibraryMethod"}),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"getprojectlicenses-"},"getProjectLicenses ",(0,a.kt)(c.Z,{isAsync:!0,mdxType:"MethodTags"})),(0,a.kt)(l.Z,{methodData:{name:"getProjectLicenses",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"}],returnType:{type:"Promise<ILicense[]>",description:"Array of ILicense objects, each containing the license content and respective dependencies"},description:"Scans the project found at the given path and returns an array of objects each containing the details of an identified license and the dependencies it pertains to."}]},mdxType:"LibraryMethod"}),(0,a.kt)("h2",{id:"models"},"Models"),(0,a.kt)("h3",{id:"ilicense"},"ILicense"),(0,a.kt)(s.Z,{properties:[{name:"content",type:"string",description:"Body of the license."},{name:"dependencies",type:"string[]",description:"List of node packages that this license applies to."}],description:(0,a.kt)(r.Fragment,null,"Contains the content of a given license and the list of dependencies it pertains to. It is returned from"," ",(0,a.kt)("a",{href:"#getProjectLicenses"},(0,a.kt)("code",null,"getProjectLicenses"))),mdxType:"LibraryModel"}))}f.isMDXComponent=!0}}]);