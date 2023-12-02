"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[614],{7308:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>r});var t=i(5893),s=i(1151);const l={title:"Webpack Plugin"},a=void 0,o={id:"webpack-plugin",title:"Webpack Plugin",description:"If you use Webpack as your module bundler, you can use the [generate license",source:"@site/versioned_docs/version-3.0.0/webpack-plugin.mdx",sourceDirName:".",slug:"/webpack-plugin",permalink:"/docs/webpack-plugin",draft:!1,unlisted:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/website/versioned_docs/version-3.0.0/webpack-plugin.mdx",tags:[],version:"3.0.0",frontMatter:{title:"Webpack Plugin"},sidebar:"docs",previous:{title:"API",permalink:"/docs/library/api"},next:{title:"Migrate from V2 to V3",permalink:"/docs/v2-to-v3"}},c={},r=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}];function u(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["If you use Webpack as your module bundler, you can use the ",(0,t.jsx)(n.a,{href:"https://www.npmjs.com/package/generate-license-file-webpack-plugin",children:"generate license\nfile webpack plugin"}),". This\nplugin uses generate license file as part of your webpack build pipeline to automatically\ngenerate your third party licenses file as an asset of the project."]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"npm install --save-dev generate-license-file-webpack-plugin\n"})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.p,{children:"To use the default configuration, construct the plugin in your webpack plugins array:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// webpack.config.js\nconst { LicenseFilePlugin } = require("generate-license-file-webpack-plugin");\n\nmodule.exports = {\n  plugins: [new LicenseFilePlugin()],\n};\n'})}),"\n",(0,t.jsx)(n.p,{children:"The plugin can be configured using the following options. Below shows the default values:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// webpack.config.js\nconst { LicenseFilePlugin } = require("generate-license-file-webpack-plugin");\n\nmodule.exports = {\n  plugins: [\n    new LicenseFilePlugin({\n      outputFileName: "third-party-licenses.txt",\n      outputFolder: "./", // Relative to your build output directory.\n      pathToPackageJson: "./package.json",\n      isDev: false, // When true, uses placeholder content to reduce compilation time.\n      lineEnding: undefined, // Can be \'crlf\' or \'lf\'. If omitted, the system default will be used.\n      append: [],\n      replace: {},\n      exclude: [],\n    }),\n  ],\n};\n'})}),"\n",(0,t.jsxs)(n.p,{children:["See the docs for the ",(0,t.jsx)(n.a,{href:"cli/config-file",children:"CLI config file"})," for information on how to use the ",(0,t.jsx)(n.code,{children:"append"}),", ",(0,t.jsx)(n.code,{children:"replace"}),", and ",(0,t.jsx)(n.code,{children:"exclude"})," options."]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>a});var t=i(7294);const s={},l=t.createContext(s);function a(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);