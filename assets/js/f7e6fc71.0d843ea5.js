"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[312],{9375:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>d,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>g});var i=n(5893),s=n(1151),r=n(9411),o=n(4629),a=n(9765),c=(n(3774),n(670));const l={title:"API",description:"API reference documentation for the generate license file library API"},d=void 0,p={id:"library/api",title:"API",description:"API reference documentation for the generate license file library API",source:"@site/versioned_docs/version-2.0.0/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/docs/2.0.0/library/api",draft:!1,unlisted:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/website/versioned_docs/version-2.0.0/library/api.mdx",tags:[],version:"2.0.0",frontMatter:{title:"API",description:"API reference documentation for the generate license file library API"},sidebar:"docs",previous:{title:"Library",permalink:"/docs/2.0.0/library/"},next:{title:"Migrate from V1 to V2",permalink:"/docs/2.0.0/v1-to-v2"}},h={},g=[{value:"Methods",id:"methods",level:2},{value:"generateLicenseFile <MethodTags></MethodTags>",id:"generatelicensefile-",level:3},{value:"getLicenseFileText <MethodTags></MethodTags>",id:"getlicensefiletext-",level:3},{value:"getProjectLicenses <MethodTags></MethodTags>",id:"getprojectlicenses-",level:3},{value:"Models",id:"models",level:2},{value:"ILicense",id:"ilicense",level:3}];function m(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{}),"\n",(0,i.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsxs)(t.h3,{id:"generatelicensefile-",children:["generateLicenseFile ",(0,i.jsx)(c.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"generateLicenseFile",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the project found at the given path and creates a license file at the given output location"},{params:[{name:"pathsToPackageJsons",type:"string[]",description:"Paths to the package.jsons for the projects"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the projects found at the given paths and creates a license file at the given output location"}]}}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsxs)(t.h3,{id:"getlicensefiletext-",children:["getLicenseFileText ",(0,i.jsx)(c.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"getLicenseFileText",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the project found at the given path and returns a string containing the licenses for all the dependencies"},{params:[{name:"pathsToPackageJsons",type:"string",description:"Paths to the package.jsons for the projects"},{name:"lineEnding",type:'"crlf" | "lf"',description:"Will use the system default if omitted",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects"}]}}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsxs)(t.h3,{id:"getprojectlicenses-",children:["getProjectLicenses ",(0,i.jsx)(c.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"getProjectLicenses",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"}],returnType:{type:"Promise<ILicense[]>",description:"Array of ILicense objects, each containing the license content and respective dependencies"},description:"Scans the project found at the given path and returns an array of objects each containing the details of an identified license and the dependencies it pertains to."}]}}),"\n",(0,i.jsx)(t.h2,{id:"models",children:"Models"}),"\n",(0,i.jsx)(t.h3,{id:"ilicense",children:"ILicense"}),"\n",(0,i.jsx)(a.Z,{properties:[{name:"content",type:"string",description:"Body of the license."},{name:"dependencies",type:"string[]",description:"List of node packages that this license applies to."}],description:(0,i.jsxs)(i.Fragment,{children:["Contains the content of a given license and the list of dependencies it pertains to. It is returned from"," ",(0,i.jsx)(t.a,{href:"#getProjectLicenses",children:(0,i.jsx)(t.code,{children:"getProjectLicenses"})})]})})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},9411:(e,t,n)=>{n.d(t,{R:()=>l,Z:()=>d});var i=n(3786),s=n(8583),r=n(5495),o=(n(7294),n(888)),a=n(5893);const c=(0,r.O4)("showTypeScript",!0),l=()=>(0,s.Dv)(c),d=()=>{const[e,t]=(0,s.KO)(c);return(0,a.jsx)("form",{children:(0,a.jsxs)(p,{htmlFor:"show-typescript",children:[(0,a.jsx)(h,{children:"Language:"}),(0,a.jsx)(o.Z,{id:"show-typescript",icons:{checked:(0,a.jsx)(g,{color:"white",children:"TS"}),unchecked:(0,a.jsx)(g,{color:"black",children:"JS"})},checked:e,onChange:e=>t(e.target.checked)})]})})},p=i.Z.label`
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
`,h=i.Z.span`
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
`},4629:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(3786),s=n(7294),r=n(3774),o=n(5893);const a=e=>{let{methodData:t}=e;const{name:n,signatures:i}=t,[a,h]=(0,s.useState)(0),g=i[a];return(0,o.jsxs)(o.Fragment,{children:[i.length>1&&(0,o.jsxs)(c,{children:[(0,o.jsxs)(l,{children:[(0,o.jsx)("button",{onClick:()=>h(d(i.length)),children:(0,o.jsx)("img",{src:"/img/chevron-down-outline.svg"})}),(0,o.jsx)("button",{onClick:()=>h(p(i.length)),children:(0,o.jsx)("img",{src:"/img/chevron-up-outline.svg"})})]}),(0,o.jsxs)("span",{children:["Overload ",a+1," of ",i.length]})]}),(0,o.jsx)(r.Z,{methodName:n,signature:g})]})},c=i.Z.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`,l=i.Z.span`
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
`,d=e=>t=>(t+e-1)%e,p=e=>t=>(t+1)%e},9765:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(9411),s=(n(7294),n(5893));const r=e=>{let{properties:t,description:n}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:n}),(0,s.jsx)("h4",{children:"Properties"}),(0,s.jsx)("ul",{children:t.map(((e,t)=>(0,s.jsxs)("li",{children:[" ",(0,s.jsx)(o,{...e})]},t)))})]})},o=e=>{let{name:t,type:n,description:r}=e;const o=(0,i.R)();return(0,s.jsxs)("p",{children:[(0,s.jsxs)("code",{children:[t,o&&": "+n]}),r&&` - ${r}`]})}},3774:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(3786),s=n(9411),r=(n(7294),n(5893));const o=e=>{let{methodName:t,signature:n}=e;const i=(0,s.R)(),{params:o,returnType:c,description:l}=n,d=i?`: ${c.type}`:"",p=`${t}(${o.map((e=>i?`${e.name}${e.isOptional?"?:":":"} ${e.type}`:e.name)).join(", ")})${d}`;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:(0,r.jsx)("code",{children:p})}),(0,r.jsx)("p",{children:l}),(0,r.jsx)("h4",{children:"Parameters"}),(0,r.jsx)("ul",{children:o.map((e=>(0,r.jsx)("li",{children:(0,r.jsxs)("p",{children:[(0,r.jsxs)("code",{children:[e.name,i&&": "+e.type]}),e.description&&` - ${e.description}`]})},e.name)))}),(0,r.jsx)("h4",{children:"Returns"}),(0,r.jsxs)(a,{children:[(0,r.jsx)("code",{children:c.type}),c.description&&` - ${c.description}`]})]})},a=i.Z.p`
  list-style-type: none;
  padding-left: var(--ifm-list-left-padding);
`},670:(e,t,n)=>{n.d(t,{Z:()=>r});const i=n(3786).Z.span`
  background-color: ${e=>{let{full:t}=e;return t?"var(--ifm-color-primary)":"transparent"}};
  border-radius: 0.5em;
  font-size: small;
  padding: 0.2em 0.4em;
  font-style: italic;
  margin: 0 0.5em;
  color: white;
  font-weight: 600;
`;n(7294);var s=n(5893);const r=e=>{let{isAsync:t}=e;return(0,s.jsx)("span",{children:t&&(0,s.jsx)(i,{full:!0,children:"Async"})})}}}]);