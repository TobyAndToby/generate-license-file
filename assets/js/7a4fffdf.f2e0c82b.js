"use strict";(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[172],{876:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(2784);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),h=i,f=d["".concat(s,".").concat(h)]||d[h]||u[h]||o;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5245:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7896),i=(n(2784),n(876));const o={sidebar_position:0,title:"Introduction"},a=void 0,l={unversionedId:"intro/index",id:"intro/index",title:"Introduction",description:"What is Generate License File?",source:"@site/docs/intro/index.md",sourceDirName:"intro",slug:"/intro/",permalink:"/generate-license-file/docs/next/intro/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro/index.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,title:"Introduction"},sidebar:"docs",next:{title:"Getting Started",permalink:"/generate-license-file/docs/next/intro/getting-started"}},s={},c=[{value:"What is Generate License File?",id:"what-is-generate-license-file",level:2},{value:"Why should I generate my license file?",id:"why-should-i-generate-my-license-file",level:2},{value:"How can I use it?",id:"how-can-i-use-it",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"what-is-generate-license-file"},"What is Generate License File?"),(0,i.kt)("p",null,"Generate license file provides tooling to generate a single ",(0,i.kt)("inlineCode",{parentName:"p"},"third-party-licenses.txt")," file containing all of the licenses for your production third party dependencies. With both a CLI and a programmatic API, you have complete control over how and when the third party license file is generated."),(0,i.kt)("p",null,"Generate license file does this by recursively locating the license for each dependency found in the package.json ",(0,i.kt)("inlineCode",{parentName:"p"},"dependencies")," array - starting with a package.json that you provide the path to (most commonly the project root, ",(0,i.kt)("inlineCode",{parentName:"p"},"./package.json"),"). Licenses are not always found in the same place, so generate license file will check various locations with the following precedence:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},"LICENSE.md")," (or ",(0,i.kt)("inlineCode",{parentName:"li"},"LICENCE.md"),") file."),(0,i.kt)("li",{parentName:"ul"},"The README.md.")),(0,i.kt)("h2",{id:"why-should-i-generate-my-license-file"},"Why should I generate my license file?"),(0,i.kt)("p",null,"Third party libraries likely play an integral part of the projects you develop. Most of these libraries will have licenses that govern how that code can be distributed, and how the original authors are attributed to. Under most licenses of the third party software that you use, it is mandatory to distribute their license as part of your software:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"MIT")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software...")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"ISC")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"BSD-3 Clause")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Redistributions in binary form must reproduce the above copyright notice, this list of conditions...")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"LGPLv3")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"For a Combined Work that displays copyright notices during execution, include the copyright notice for the Library...")),(0,i.kt)("p",null,"These are only a fraction of the different types of licenses your third party dependencies may be using. Generate license file automates the process of ensuring you are adhering to your dependencies' licenses."),(0,i.kt)("h2",{id:"how-can-i-use-it"},"How can I use it?"),(0,i.kt)("p",null,"Head on over to our ",(0,i.kt)("a",{parentName:"p",href:"intro/getting-started"},"Getting Started")," page to see how you can use generate license file in your projects!"))}u.isMDXComponent=!0}}]);