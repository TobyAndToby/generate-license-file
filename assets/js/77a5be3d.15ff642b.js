"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[212],{120:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>d,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>g});var i=n(5893),s=n(1151),r=n(9411),o=n(4629),c=n(9765),a=n(670);const l={title:"API",description:"API reference documentation for the generate license file library API"},d=void 0,p={id:"library/api",title:"API",description:"API reference documentation for the generate license file library API",source:"@site/docs/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/docs/next/library/api",draft:!1,unlisted:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/website/docs/library/api.mdx",tags:[],version:"current",frontMatter:{title:"API",description:"API reference documentation for the generate license file library API"},sidebar:"docs",previous:{title:"Library",permalink:"/docs/next/library/"},next:{title:"Webpack Plugin",permalink:"/docs/next/webpack-plugin"}},h={},g=[{value:"Methods",id:"methods",level:2},{value:"generateLicenseFile <MethodTags></MethodTags>",id:"generatelicensefile-",level:3},{value:"getLicenseFileText <MethodTags></MethodTags>",id:"getlicensefiletext-",level:3},{value:"getProjectLicenses <MethodTags></MethodTags>",id:"getprojectlicenses-",level:3},{value:"Models",id:"models",level:2},{value:"ILicense",id:"ilicense",level:3},{value:"GenerateLicenseFileOptions",id:"generatelicensefileoptions",level:3},{value:"GetLicenseFileTextOptions",id:"getlicensefiletextoptions",level:3},{value:"GetProjectLicensesOptions",id:"getprojectlicensesoptions",level:3}];function f(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{}),"\n",(0,i.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsxs)(t.h3,{id:"generatelicensefile-",children:["generateLicenseFile ",(0,i.jsx)(a.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"generateLicenseFile",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"options",type:"GenerateLicenseFileOptions",description:"Additional options for the license file generation",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the project found at the given path and creates a license file at the given output location"},{params:[{name:"pathsToPackageJsons",type:"string[]",description:"Paths to the package.jsons for the projects"},{name:"outputPath",type:"string",description:"A file path for the resulting license file"},{name:"options",type:"GenerateLicenseFileOptions",description:"Additional options for the license file generation",isOptional:!0}],returnType:{type:"Promise<void>",description:""},description:"Scans the projects found at the given paths and creates a license file at the given output location"}]}}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsxs)(t.h3,{id:"getlicensefiletext-",children:["getLicenseFileText ",(0,i.jsx)(a.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"getLicenseFileText",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"options",type:"GetLicenseFileTextOptions",description:"Additional options for the license text generation",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the project found at the given path and returns a string containing the licenses for all the dependencies"},{params:[{name:"pathsToPackageJsons",type:"string",description:"Paths to the package.jsons for the projects"},{name:"options",type:"GetLicenseFileTextOptions",description:"Additional options for the license text generation",isOptional:!0}],returnType:{type:"Promise<string>",description:"A promise that resolves to the license file text"},description:"Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects"}]}}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsxs)(t.h3,{id:"getprojectlicenses-",children:["getProjectLicenses ",(0,i.jsx)(a.Z,{isAsync:!0})]}),"\n",(0,i.jsx)(o.Z,{methodData:{name:"getProjectLicenses",signatures:[{params:[{name:"pathToPackageJson",type:"string",description:"A path to the package.json for the project"},{name:"options",type:"GetProjectLicensesOptions",description:"Additional options for the license discovery",isOptional:!0}],returnType:{type:"Promise<ILicense[]>",description:"Array of ILicense objects, each containing the license content and respective dependencies"},description:"Scans the project found at the given path and returns an array of objects each containing the details of an identified license and the dependencies it pertains to."}]}}),"\n",(0,i.jsx)(t.h2,{id:"models",children:"Models"}),"\n",(0,i.jsx)(t.h3,{id:"ilicense",children:"ILicense"}),"\n",(0,i.jsx)(c.Z,{properties:[{name:"content",type:"string",description:"Body of the license."},{name:"dependencies",type:"string[]",description:"List of node packages that this license applies to."}],description:(0,i.jsxs)(i.Fragment,{children:["Contains the content of a given license and the list of dependencies it pertains to. It is returned from"," ",(0,i.jsx)(t.a,{href:"#getprojectlicenses-",children:(0,i.jsx)(t.code,{children:"getProjectLicenses"})}),"","."]})}),"\n",(0,i.jsx)(t.h3,{id:"generatelicensefileoptions",children:"GenerateLicenseFileOptions"}),"\n",(0,i.jsx)(c.Z,{properties:[{name:"lineEnding",type:'"lf" | "crlf"',description:'Specify the line ending to use in the generated license file: either "lf" or "crlf". Leave undefined to use the system default'},{name:"replace",type:"Record<string, string>",description:"A map of packages-to-file-paths containing content that should be used instead of the package's license content"},{name:"exclude",type:"string[]",description:"Packages to exclude from the generated license file"},{name:"append",type:"string[]",description:"File paths to read in and append to the bottom of the generated license file"}],description:(0,i.jsxs)(i.Fragment,{children:["Additional options for the license file generation. Can be optionally passed into"," ",(0,i.jsx)(t.a,{href:"#generatelicensefile-",children:(0,i.jsx)(t.code,{children:"generateLicenseFile"})}),"","."]})}),"\n",(0,i.jsx)(t.h3,{id:"getlicensefiletextoptions",children:"GetLicenseFileTextOptions"}),"\n",(0,i.jsx)(c.Z,{properties:[{name:"lineEnding",type:'"lf" | "crlf"',description:'Specify the line ending to use in the generated license file: either   "lf" or "crlf". Leave undefined to use the system default'},{name:"replace",type:"Record<string, string>",description:"A map of packages-to-file-paths containing content that should be used instead of the package's license content"},{name:"exclude",type:"string[]",description:"Packages to exclude from the generated license file"},{name:"append",type:"string[]",description:"File paths to read in and append to the bottom of the generated license file"}],description:(0,i.jsxs)(i.Fragment,{children:["Additional options for the license text generation. Can be optionally passed into"," ",(0,i.jsx)(t.a,{href:"#getlicensefiletext-",children:(0,i.jsx)(t.code,{children:"getLicenseFileText"})}),"","."]})}),"\n",(0,i.jsx)(t.h3,{id:"getprojectlicensesoptions",children:"GetProjectLicensesOptions"}),"\n",(0,i.jsx)(c.Z,{properties:[{name:"replace",type:"Record<string, string>",description:"A map of packages-to-file-paths containing content that should be used instead of the package's license content"},{name:"exclude",type:"string[]",description:"Packages to exclude from the generated license file"}],description:(0,i.jsxs)(i.Fragment,{children:["Additional options for the license discovery. Can be optionally passed into"," ",(0,i.jsx)(t.a,{href:"#getprojectlicenses-",children:(0,i.jsx)(t.code,{children:"getProjectLicenses"})}),"","."]})})]})}function m(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}},9411:(e,t,n)=>{n.d(t,{R:()=>l,Z:()=>d});var i=n(3786),s=n(8583),r=n(5495),o=(n(7294),n(888)),c=n(5893);const a=(0,r.O4)("showTypeScript",!0),l=()=>(0,s.Dv)(a),d=()=>{const[e,t]=(0,s.KO)(a);return(0,c.jsx)("form",{children:(0,c.jsxs)(p,{htmlFor:"show-typescript",children:[(0,c.jsx)(h,{children:"Language:"}),(0,c.jsx)(o.Z,{id:"show-typescript",icons:{checked:(0,c.jsx)(g,{color:"white",children:"TS"}),unchecked:(0,c.jsx)(g,{color:"black",children:"JS"})},checked:e,onChange:e=>t(e.target.checked)})]})})},p=i.Z.label`
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
`},4629:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(3786),s=n(7294),r=n(3774),o=n(5893);const c=e=>{let{methodData:t}=e;const{name:n,signatures:i}=t,[c,h]=(0,s.useState)(0),g=i[c];return(0,o.jsxs)(o.Fragment,{children:[i.length>1&&(0,o.jsxs)(a,{children:[(0,o.jsxs)(l,{children:[(0,o.jsx)("button",{onClick:()=>h(d(i.length)),children:(0,o.jsx)("img",{src:"/img/chevron-down-outline.svg"})}),(0,o.jsx)("button",{onClick:()=>h(p(i.length)),children:(0,o.jsx)("img",{src:"/img/chevron-up-outline.svg"})})]}),(0,o.jsxs)("span",{children:["Overload ",c+1," of ",i.length]})]}),(0,o.jsx)(r.Z,{methodName:n,signature:g})]})},a=i.Z.div`
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
`,d=e=>t=>(t+e-1)%e,p=e=>t=>(t+1)%e},9765:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(9411),s=(n(7294),n(5893));const r=e=>{let{properties:t,description:n}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:n}),(0,s.jsx)("h4",{children:"Properties"}),(0,s.jsx)("ul",{children:t.map(((e,t)=>(0,s.jsxs)("li",{children:[" ",(0,s.jsx)(o,{...e})]},t)))})]})},o=e=>{let{name:t,type:n,description:r}=e;const o=(0,i.R)();return(0,s.jsxs)("p",{children:[(0,s.jsxs)("code",{children:[t,o&&": "+n]}),r&&` - ${r}`]})}},3774:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(3786),s=n(9411),r=(n(7294),n(5893));const o=e=>{let{methodName:t,signature:n}=e;const i=(0,s.R)(),{params:o,returnType:a,description:l}=n,d=i?`: ${a.type}`:"",p=`${t}(${o.map((e=>i?`${e.name}${e.isOptional?"?:":":"} ${e.type}`:e.name)).join(", ")})${d}`;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:(0,r.jsx)("code",{children:p})}),(0,r.jsx)("p",{children:l}),(0,r.jsx)("h4",{children:"Parameters"}),(0,r.jsx)("ul",{children:o.map((e=>(0,r.jsx)("li",{children:(0,r.jsxs)("p",{children:[(0,r.jsxs)("code",{children:[e.name,i&&e.isOptional&&"?",i&&": ",i&&e.type]}),e.description&&` - ${e.description}`]})},e.name)))}),(0,r.jsx)("h4",{children:"Returns"}),(0,r.jsxs)(c,{children:[(0,r.jsx)("code",{children:a.type}),a.description&&` - ${a.description}`]})]})},c=i.Z.p`
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