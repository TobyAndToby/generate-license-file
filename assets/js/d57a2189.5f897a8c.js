"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[672],{876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(2784);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(n),g=i,f=d["".concat(c,".").concat(g)]||d[g]||p[g]||a;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9251:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7896),i=(n(2784),n(876));const a={sidebar_position:1,title:"Getting Started"},o=void 0,l={unversionedId:"intro/getting-started",id:"version-1.3.0/intro/getting-started",title:"Getting Started",description:"A couple of quick 5 minute guides for generating your license files via the CLI, or programmatic API.",source:"@site/versioned_docs/version-1.3.0/intro/getting-started.md",sourceDirName:"intro",slug:"/intro/getting-started",permalink:"/docs/intro/getting-started",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/versioned_docs/version-1.3.0/intro/getting-started.md",tags:[],version:"1.3.0",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Getting Started"},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/intro/"},next:{title:"CLI",permalink:"/docs/cli"}},c={},s=[{value:"Installation",id:"installation",level:2},{value:"CLI Quick Guide",id:"cli-quick-guide",level:2},{value:"Library Quick Guide",id:"library-quick-guide",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A couple of quick 5 minute guides for generating your license files via the CLI, or programmatic API."),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"Install generate license file via npm:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"npm install --save-dev generate-license-file\n")),(0,i.kt)("h2",{id:"cli-quick-guide"},"CLI Quick Guide"),(0,i.kt)("p",null,"Generate a third party licenses file for the project in the current working directory, outputting to a file called ",(0,i.kt)("inlineCode",{parentName:"p"},"third-party-licenses.txt"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npx generate-license-file --input ./package.json --output ./third-party-licenses.txt\n")),(0,i.kt)("p",null,"For more advanced usages of the CLI, including the different options and arguments supported, please see the ",(0,i.kt)("a",{parentName:"p",href:"../cli"},"CLI docs"),"."),(0,i.kt)("h2",{id:"library-quick-guide"},"Library Quick Guide"),(0,i.kt)("p",null,"Our library APIs allow you to programatically interact with generate license file's functionality. Examples include  generating and writing the license file to disk, or fetching the license data as an array for other usages. Want to know what the license objects contain? Head over to our ",(0,i.kt)("a",{parentName:"p",href:"../library/api"},"API spec"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const glf = require("generate-license-file");\n\n// Generate and write the license file to disk.\nglf.generateLicenseFile("./package.json", "./third-party-licenses.txt")\n   .then(() => { })\n   .catch((error) => { });\n\n// Get an array of licenses for the current project\'s production dependencies.\nglf.getProjectLicenses("./package.json")\n   .then((licenses) => { })\n   .catch((error) => { });\n')))}p.isMDXComponent=!0}}]);