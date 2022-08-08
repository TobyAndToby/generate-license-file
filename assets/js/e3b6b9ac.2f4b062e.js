"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[131],{876:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>d});var r=t(2784);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),o=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},m=function(e){var n=o(e.components);return r.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=o(t),d=i,g=u["".concat(c,".").concat(d)]||u[d]||p[d]||a;return t?r.createElement(g,l(l({ref:n},m),{},{components:t})):r.createElement(g,l({ref:n},m))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,l=new Array(a);l[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var o=2;o<a;o++)l[o]=t[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9618:(e,n,t)=>{t.d(n,{Z:()=>T});var r=t(2784);const i={Module:null,Interface:null,Property:null,Function:null,"Call signature":null,"Type alias":null},a=e=>"string"==typeof e&&void 0!==i[e],l=e=>{for(const n of e.children)if(a(n.kindString)&&"Module"===n.kindString&&"main"===n.name)return n;throw new Error("Could not find Main module")},s=e=>e.children.filter((e=>a(e.kindString)&&"Function"===e.kindString)),c=e=>e.map((e=>{var n,t,r,i,a,l;return{parameters:o(e.parameters),returnType:m(e.type),shortText:null!=(n=null==(t=e.comment)?void 0:t.shortText)?n:null,text:null!=(r=null==(i=e.comment)?void 0:i.text)?r:null,returns:null!=(a=null==(l=e.comment)?void 0:l.returns)?a:null}})),o=e=>e.map((e=>{var n,t,r,i;return{name:e.name,shortText:null!=(n=null==(t=e.comment)?void 0:t.shortText)?n:null,text:null!=(r=null==(i=e.comment)?void 0:i.text)?r:null,type:m(e.type),isOptional:!!e.flags.isOptional}})),m=e=>{var n,t;if("array"===e.type)return p(e);if("union"===e.type)return{name:e.types.map(m).map((e=>e.name)).join(" | "),genericArguments:null,isArray:!1};if("literal"===e.type)return{name:'"'+e.value+'"',genericArguments:null,isArray:!1};return{name:e.name,genericArguments:null!=(n=null==(t=e.typeArguments)?void 0:t.map(m))?n:null,isArray:!1}},p=e=>({name:"array",genericArguments:[m(e.elementType)],isArray:!0});var u,d=t(541),g=t(8650),y=t(7937);const f=e=>{let{methodName:n,signature:t}=e;const i=(0,y.R)(),{shortText:a,parameters:l,returns:s,returnType:c}=t;let o=n+"("+l.map((e=>i?e.name+": "+h(e.type):e.name)).join(", ")+")";return i&&(o+=": "+h(c)),r.createElement("div",null,r.createElement("code",null,o),r.createElement("p",null,a),r.createElement("h4",null,"Parameters"),r.createElement("ul",null,l.map((e=>r.createElement("li",{key:e.name},r.createElement("p",null,r.createElement("code",null,e.name,i&&": "+h(e.type)),!!e.shortText&&e.shortText.length>0&&" - "+e.shortText))))),r.createElement("h4",null,"Returns"),r.createElement(k,null,r.createElement("code",null,h(c)),!!s&&s.length>0&&" - "+s),r.createElement("hr",null))},h=e=>{let n=e.isArray?"":e.name;if(e.genericArguments&&e.genericArguments.length>0){e.isArray||(n+="<");n+=e.genericArguments.map(h).join(", "),e.isArray||(n+=">")}return e.isArray&&(n+="[]"),n},k=g.Z.p(u||(u=(0,d.Z)(["\n  list-style-type: none;\n  padding-left: var(--ifm-list-left-padding);\n"])));var v,P,S;const b=e=>{let{method:n}=e;const{name:t,signatures:i}=n,a="Promise"===i[0].returnType.name&&!i[0].returnType.isArray;return r.createElement("div",null,r.createElement(x,{id:t},r.createElement(N,null,r.createElement("h3",null,t,a&&r.createElement(E,null,"Async"),r.createElement("a",{href:"#"+t,title:"Direct link to "+t})))),i.map(((e,n)=>r.createElement(f,{key:n,methodName:t,signature:e}))))},x=g.Z.h3(v||(v=(0,d.Z)(['\n  ::before {\n    display: block;\n    content: " ";\n    margin-top: -70px;\n    height: 70px;\n    visibility: hidden;\n  }\n']))),N=g.Z.div(P||(P=(0,d.Z)(['\n  a {\n    opacity: 0;\n    transition: opacity 0.1s ease-in-out;\n\n    ::before {\n      content: "#";\n    }\n  }\n\n  &:hover {\n    a {\n      opacity: 1;\n    }\n  }\n']))),E=g.Z.span(S||(S=(0,d.Z)(["\n  background-color: var(--ifm-color-primary);\n  border-radius: 0.5em;\n  font-size: small;\n  padding: 0.2em 0.4em;\n  font-style: italic;\n  margin: 0 0.5em;\n  color: white;\n  font-weight: 600;\n"]))),T=e=>{let{librarySchema:n}=e;return r.createElement(r.Fragment,null,r.createElement("h2",null,"Methods"),(e=>{const n=l(e);return s(n).map((e=>({name:e.name,signatures:c(e.signatures)})))})(n).map((e=>r.createElement(b,{key:e.name,method:e}))))}},7265:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>c,metadata:()=>m,toc:()=>u});var r=t(7896),i=(t(2784),t(876));const a=JSON.parse('{"id":0,"name":"Generate License File","kind":1,"flags":{},"children":[{"id":2,"name":"cli/cli-arguments","kind":2,"kindString":"Module","flags":{},"children":[{"id":3,"name":"UserInputs","kind":256,"kindString":"Interface","flags":{},"children":[{"id":4,"name":"input","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":7,"character":2}],"type":{"type":"intrinsic","name":"string"}},{"id":5,"name":"output","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":8,"character":2}],"type":{"type":"intrinsic","name":"string"}},{"id":6,"name":"overwriteOutput","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":9,"character":2}],"type":{"type":"intrinsic","name":"boolean"}},{"id":7,"name":"eol","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":10,"character":2}],"type":{"type":"intrinsic","name":"string"}},{"id":8,"name":"noSpinner","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":11,"character":2}],"type":{"type":"intrinsic","name":"boolean"}}],"groups":[{"title":"Properties","kind":1024,"children":[4,5,6,7,8]}],"sources":[{"fileName":"cli/cli-arguments.ts","line":6,"character":17}]},{"id":9,"name":"CliOptions","kind":256,"kindString":"Interface","flags":{},"children":[{"id":10,"name":"input","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":15,"character":2}],"type":{"type":"intrinsic","name":"string"}},{"id":11,"name":"output","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":16,"character":2}],"type":{"type":"intrinsic","name":"string"}},{"id":12,"name":"eol","kind":1024,"kindString":"Property","flags":{"isOptional":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":17,"character":2}],"type":{"type":"reference","id":28,"name":"LineEnding"}},{"id":13,"name":"noSpinner","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":18,"character":2}],"type":{"type":"intrinsic","name":"boolean"}}],"groups":[{"title":"Properties","kind":1024,"children":[10,11,12,13]}],"sources":[{"fileName":"cli/cli-arguments.ts","line":14,"character":17}]},{"id":14,"name":"ArgumentsWithAliases","kind":256,"kindString":"Interface","flags":{},"children":[{"id":15,"name":"--input","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":22,"character":2}],"type":{"type":"reference","qualifiedName":"StringConstructor","package":"typescript","name":"StringConstructor"}},{"id":16,"name":"--output","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":23,"character":2}],"type":{"type":"reference","qualifiedName":"StringConstructor","package":"typescript","name":"StringConstructor"}},{"id":17,"name":"--overwrite","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":24,"character":2}],"type":{"type":"reference","qualifiedName":"BooleanConstructor","package":"typescript","name":"BooleanConstructor"}},{"id":18,"name":"--eol","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":25,"character":2}],"type":{"type":"reference","qualifiedName":"StringConstructor","package":"typescript","name":"StringConstructor"}},{"id":19,"name":"--no-spinner","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":26,"character":2}],"type":{"type":"reference","qualifiedName":"BooleanConstructor","package":"typescript","name":"BooleanConstructor"}},{"id":20,"name":"-i","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":27,"character":2}],"type":{"type":"literal","value":"--input"}},{"id":21,"name":"-o","kind":1024,"kindString":"Property","flags":{},"sources":[{"fileName":"cli/cli-arguments.ts","line":28,"character":2}],"type":{"type":"literal","value":"--output"}}],"groups":[{"title":"Properties","kind":1024,"children":[15,16,17,18,19,20,21]}],"sources":[{"fileName":"cli/cli-arguments.ts","line":21,"character":17}],"extendedTypes":[{"type":"reference","qualifiedName":"arg.Spec","package":"arg","name":"Spec"}]},{"id":22,"name":"argumentsWithAliases","kind":32,"kindString":"Variable","flags":{"isConst":true},"sources":[{"fileName":"cli/cli-arguments.ts","line":31,"character":13}],"type":{"type":"reference","id":14,"name":"ArgumentsWithAliases"},"defaultValue":"..."}],"groups":[{"title":"Interfaces","kind":256,"children":[3,9,14]},{"title":"Variables","kind":32,"children":[22]}],"sources":[{"fileName":"cli/cli-arguments.ts","line":3,"character":0}]},{"id":1,"name":"main","kind":2,"kindString":"Module","flags":{},"children":[{"id":28,"name":"LineEnding","kind":4194304,"kindString":"Type alias","flags":{},"comment":{"shortText":"Used to specify which line endings to use in the generated file","text":"`windows` = \\"\\\\r\\\\n\\"\\n\\n`posix` = \\"\\\\n\\"\\n"},"sources":[{"fileName":"generateLicenseFile.ts","line":13,"character":12}],"type":{"type":"union","types":[{"type":"literal","value":"windows"},{"type":"literal","value":"posix"}]}},{"id":23,"name":"generateLicenseFile","kind":64,"kindString":"Function","flags":{},"sources":[{"fileName":"generateLicenseFile.ts","line":25,"character":22}],"signatures":[{"id":24,"name":"generateLicenseFile","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Scans the project found at the given path and creates a license file at the given output location","tags":[{"tag":"optional","text":"@param lineEnding \\"windows\\" or \\"posix\\". Will use the system default if omitted\\n"}]},"parameters":[{"id":25,"name":"pathToPackageJson","kind":32768,"kindString":"Parameter","flags":{},"comment":{"shortText":"A path to the package.json for the project"},"type":{"type":"intrinsic","name":"string"}},{"id":26,"name":"outputPath","kind":32768,"kindString":"Parameter","flags":{},"comment":{"shortText":"A file path for the resulting license file"},"type":{"type":"intrinsic","name":"string"}},{"id":27,"name":"lineEnding","kind":32768,"kindString":"Parameter","flags":{"isOptional":true},"type":{"type":"reference","id":28,"name":"LineEnding"}}],"type":{"type":"reference","typeArguments":[{"type":"intrinsic","name":"void"}],"qualifiedName":"Promise","package":"typescript","name":"Promise"}}]},{"id":29,"name":"getLicenseFileText","kind":64,"kindString":"Function","flags":{},"sources":[{"fileName":"getLicenseFileText.ts","line":16,"character":22}],"signatures":[{"id":30,"name":"getLicenseFileText","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Scans the project found at the given path and returns a string containing the licenses for all the dependencies","returns":"A promise that resolves to the license file text\\n","tags":[{"tag":"optional","text":"@param lineEnding \\"windows\\" or \\"posix\\". Will use the system default if omitted"}]},"parameters":[{"id":31,"name":"pathToPackageJson","kind":32768,"kindString":"Parameter","flags":{},"comment":{"shortText":"A path to the package.json for the project"},"type":{"type":"intrinsic","name":"string"}},{"id":32,"name":"lineEnding","kind":32768,"kindString":"Parameter","flags":{"isOptional":true},"type":{"type":"reference","id":28,"name":"LineEnding"}}],"type":{"type":"reference","typeArguments":[{"type":"intrinsic","name":"string"}],"qualifiedName":"Promise","package":"typescript","name":"Promise"}}]},{"id":33,"name":"getProjectLicenses","kind":64,"kindString":"Function","flags":{},"sources":[{"fileName":"getProjectLicenses.ts","line":8,"character":22}],"signatures":[{"id":34,"name":"getProjectLicenses","kind":4096,"kindString":"Call signature","flags":{},"comment":{"returns":"Array of `ILicense`s each containing the license content and respective dependencies\\n"},"parameters":[{"id":35,"name":"pathToPackageJson","kind":32768,"kindString":"Parameter","flags":{},"comment":{"shortText":"A path to the package.json for the project"},"type":{"type":"intrinsic","name":"string"}}],"type":{"type":"reference","typeArguments":[{"type":"array","elementType":{"type":"reference","name":"ILicense"}}],"qualifiedName":"Promise","package":"typescript","name":"Promise"}}]}],"groups":[{"title":"Type aliases","kind":4194304,"children":[28]},{"title":"Functions","kind":64,"children":[23,29,33]}],"sources":[{"fileName":"main.ts","line":2,"character":0}]}],"groups":[{"title":"Modules","kind":2,"children":[2,1]}]}');var l=t.t(a,2),s=t(9618);const c={title:"API"},o=void 0,m={unversionedId:"library/api",id:"version-1.3.0/library/api",title:"API",description:"\x3c!--",source:"@site/versioned_docs/version-1.3.0/library/api.mdx",sourceDirName:"library",slug:"/library/api",permalink:"/generate-license-file/docs/library/api",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/versioned_docs/version-1.3.0/library/api.mdx",tags:[],version:"1.3.0",frontMatter:{title:"API"},sidebar:"docs",previous:{title:"Library",permalink:"/generate-license-file/docs/library/"}},p={},u=[],d={toc:u};function g(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)(s.Z,{librarySchema:l,mdxType:"ApiPage"}))}g.isMDXComponent=!0}}]);