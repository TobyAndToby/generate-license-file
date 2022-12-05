"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[313],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),h=o,f=u["".concat(s,".").concat(h)]||u[h]||d[h]||i;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8136:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:0,title:"Introduction",description:"Introduction to generate license file"},a=void 0,l={unversionedId:"intro/index",id:"version-2.0.0/intro/index",title:"Introduction",description:"Introduction to generate license file",source:"@site/versioned_docs/version-2.0.0/intro/index.md",sourceDirName:"intro",slug:"/intro/",permalink:"/docs/intro/",draft:!1,editUrl:"https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website/versioned_docs/version-2.0.0/intro/index.md",tags:[],version:"2.0.0",sidebarPosition:0,frontMatter:{sidebar_position:0,title:"Introduction",description:"Introduction to generate license file"},sidebar:"docs",next:{title:"Getting Started",permalink:"/docs/intro/getting-started"}},s={},c=[{value:"What is Generate License File?",id:"what-is-generate-license-file",level:2},{value:"Why should I generate my license file?",id:"why-should-i-generate-my-license-file",level:2},{value:"How can I use it?",id:"how-can-i-use-it",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"what-is-generate-license-file"},"What is Generate License File?"),(0,o.kt)("p",null,"Generate license file provides tooling to generate a single ",(0,o.kt)("inlineCode",{parentName:"p"},".txt")," file containing all of the licenses for your production third party dependencies. With both a CLI and a programmatic API, you have complete control over how and when the third party license file is generated."),(0,o.kt)("p",null,"Generate license file does this by recursively locating the license for each dependency found in the package.json ",(0,o.kt)("inlineCode",{parentName:"p"},"dependencies")," array - starting with a package.json that you provide the path to (most commonly the project root, ",(0,o.kt)("inlineCode",{parentName:"p"},"./package.json"),")."),(0,o.kt)("h2",{id:"why-should-i-generate-my-license-file"},"Why should I generate my license file?"),(0,o.kt)("p",null,"Third party libraries likely play an integral part of the projects you develop. Most of these libraries will have licenses that govern how that code can be distributed, and how the original authors are attributed to. Under most licenses of the third party software that you use, it is mandatory to distribute their license as part of your software:"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"MIT")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software...")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"ISC")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies...")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"BSD-3 Clause")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Redistributions in binary form must reproduce the above copyright notice, this list of conditions...")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"LGPLv3")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"For a Combined Work that displays copyright notices during execution, include the copyright notice for the Library...")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Apache 2.0")),(0,o.kt)("blockquote",null,(0,o.kt)("ol",{parentName:"blockquote",start:4},(0,o.kt)("li",{parentName:"ol"},"Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:")),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"You must give any other recipients of the Work or Derivative Works a copy of this License; and..."))),(0,o.kt)("p",null,"These are only a fraction of the different types of licenses your third party dependencies may be using. Generate license file automates the process of ensuring you are adhering to your dependencies' licenses."),(0,o.kt)("h2",{id:"how-can-i-use-it"},"How can I use it?"),(0,o.kt)("p",null,"Head on over to our ",(0,o.kt)("a",{parentName:"p",href:"intro/getting-started"},"Getting Started")," page to see how you can use generate license file in your projects!"))}u.isMDXComponent=!0}}]);