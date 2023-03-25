/*! For license information please see 947.4293f46b.js.LICENSE.txt */
(self.webpackChunk_generate_license_file_website=self.webpackChunk_generate_license_file_website||[]).push([[947],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>u,kt:()=>p});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),l=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(n),h=o,p=d["".concat(i,".").concat(h)]||d[h]||f[h]||a;return n?r.createElement(p,s(s({ref:t},u),{},{components:n})):r.createElement(p,s({ref:t},u))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=h;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[d]="string"==typeof e?e:o,s[1]=c;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},4184:(e,t)=>{var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var s=o.apply(null,n);s&&e.push(s)}}else if("object"===a){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var c in n)r.call(n,c)&&n[c]&&e.push(c)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},5224:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(7294),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(){return a.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},a.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},888:(e,t,n)=>{"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7294),s=f(a),c=f(n(4184)),i=f(n(5697)),l=f(n(5224)),u=f(n(6963)),d=n(1520);function f(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=n.handleClick.bind(n),n.handleTouchStart=n.handleTouchStart.bind(n),n.handleTouchMove=n.handleTouchMove.bind(n),n.handleTouchEnd=n.handleTouchEnd.bind(n),n.handleFocus=n.handleFocus.bind(n),n.handleBlur=n.handleBlur.bind(n),n.previouslyChecked=!(!e.checked&&!e.defaultChecked),n.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){if(!this.props.disabled){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var n=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:n})}}},{key:"handleTouchStart",value:function(e){this.props.disabled||(this.startX=(0,d.pointerCoord)(e).x,this.activated=!0)}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var n=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>n?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<n&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var n=this.props.icons;return n?void 0===n[e]?t.defaultProps.icons[e]:n[e]:null}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,o=(t.icons,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["className","icons"])),a=(0,c.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},n);return s.default.createElement("div",{className:a,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},s.default.createElement("div",{className:"react-toggle-track"},s.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),s.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),s.default.createElement("div",{className:"react-toggle-thumb"}),s.default.createElement("input",r({},o,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(a.PureComponent);t.Z=h,h.displayName="Toggle",h.defaultProps={icons:{checked:s.default.createElement(l.default,null),unchecked:s.default.createElement(u.default,null)}},h.propTypes={checked:i.default.bool,disabled:i.default.bool,defaultChecked:i.default.bool,onChange:i.default.func,onFocus:i.default.func,onBlur:i.default.func,className:i.default.string,name:i.default.string,value:i.default.string,id:i.default.string,"aria-labelledby":i.default.string,"aria-label":i.default.string,icons:i.default.oneOfType([i.default.bool,i.default.shape({checked:i.default.node,unchecked:i.default.node})])}},1520:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}var r=e.pageX;if(void 0!==r)return{x:r,y:e.pageY}}return{x:0,y:0}}},6963:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(7294),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(){return a.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},a.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},8583:(e,t,n)=>{"use strict";n.d(t,{Dv:()=>i,KO:()=>u});var r=n(7294),o=n(5103);const a=(0,r.createContext)(void 0),s=e=>{const t=(0,r.useContext)(a);return(null==e?void 0:e.store)||t||(0,o.K7)()},c=r.use||(e=>{if("pending"===e.status)throw e;if("fulfilled"===e.status)return e.value;throw"rejected"===e.status?e.reason:(e.status="pending",e.then((t=>{e.status="fulfilled",e.value=t}),(t=>{e.status="rejected",e.reason=t})),e)});function i(e,t){const n=s(t),[[o,a,i],l]=(0,r.useReducer)((t=>{const r=n.get(e);return Object.is(t[0],r)&&t[1]===n&&t[2]===e?t:[r,n,e]}),void 0,(()=>[n.get(e),n,e]));let u=o;a===n&&i===e||(l(),u=n.get(e));const d=null==t?void 0:t.delay;return(0,r.useEffect)((()=>{const t=n.sub(e,(()=>{"number"!=typeof d?l():setTimeout(l,d)}));return l(),t}),[n,e,d]),(0,r.useDebugValue)(u),u instanceof Promise?c(u):u}function l(e,t){const n=s(t);return(0,r.useCallback)(((...t)=>{if(!("write"in e))throw new Error("not writable atom");return n.set(e,...t)}),[n,e])}function u(e,t){return[i(e,t),l(e,t)]}},5103:(e,t,n)=>{"use strict";n.d(t,{K7:()=>y,cn:()=>o});let r=0;function o(e,t){const n="atom"+ ++r,o={toString:()=>n};return"function"==typeof e?o.read=e:(o.init=e,o.read=e=>e(o),o.write=(e,t,n)=>t(o,"function"==typeof n?n(e(o)):n)),t&&(o.write=t),o}const a=e=>"init"in e,s=e=>!!e.write,c=new WeakMap,i=(e,t)=>{const n=c.get(e);n&&(c.delete(e),n(t))},l=(e,t)=>{e.status="fulfilled",e.value=t},u=(e,t)=>{e.status="rejected",e.reason=t},d=(e,t)=>"v"in e&&"v"in t&&Object.is(e.v,t.v),f=(e,t)=>"e"in e&&"e"in t&&Object.is(e.e,t.e),h=e=>"v"in e&&e.v instanceof Promise,p=e=>{if("e"in e)throw e.e;return e.v},v=()=>{const e=new WeakMap,t=new WeakMap,n=new Map;let r,o,v;r=new Set,o=new Set,v=new Set;const g=t=>e.get(t),y=(t,r)=>{Object.freeze(r);const o=e.get(t);if(e.set(t,r),n.has(t)||n.set(t,o),o&&h(o)){const e="v"in r?r.v instanceof Promise?r.v:Promise.resolve(r.v):Promise.reject(r.e);i(o.v,e)}},b=(e,t,n)=>{const r=new Map;let o=!1;n.forEach((n=>{const a=n===e?t:g(n);a?(r.set(n,a),t.d.get(n)!==a&&(o=!0)):console.warn("[Bug] atom state not found")})),(o||t.d.size!==r.size)&&(t.d=r)},m=(e,t,n)=>{const r=g(e),o={d:(null==r?void 0:r.d)||new Map,v:t};return n&&b(e,o,n),r&&d(r,o)&&r.d===o.d?r:(y(e,o),o)},w=e=>{const n=g(e);if(n&&(n.d.forEach(((n,r)=>{r===e||t.has(r)||w(r)})),Array.from(n.d).every((([t,n])=>t===e||g(t)===n))))return n;const r=new Set;let o=!0;const i=t=>{if(r.add(t),t===e){const e=g(t);if(e)return p(e);if(a(t))return t.init;throw new Error("no atom init")}const n=w(t);return p(n)};let d,h;const v={get signal(){return d||(d=new AbortController),d.signal},get setSelf(){return s(e)||console.warn("setSelf function cannot be used with read-only atom"),!h&&s(e)&&(h=(...t)=>{if(o&&console.warn("setSelf function cannot be called in sync"),!o)return S(e,...t)}),h}};try{const t=e.read(i,v);if(t instanceof Promise){let n;const o=new Promise(((a,s)=>{let c=!1;t.then((t=>{c||(c=!0,m(e,o,r),l(o,t),a(t))}),(t=>{c||(c=!0,m(e,o,r),u(o,t),s(t))})),n=e=>{c||(c=!0,e.then((e=>l(o,e)),(e=>u(o,e))),a(e))}}));return o.status="pending",((e,t)=>{c.set(e,t),e.catch((()=>{})).finally((()=>c.delete(e)))})(o,(e=>{e&&n(e),null==d||d.abort()})),m(e,o,r)}return m(e,t,r)}catch(k){return((e,t,n)=>{const r=g(e),o={d:(null==r?void 0:r.d)||new Map,e:t};return n&&b(e,o,n),r&&f(r,o)&&r.d===o.d?r:(y(e,o),o)})(e,k,r)}finally{o=!1}},k=e=>p(w(e)),O=(e,t)=>!t.l.size&&(!t.t.size||1===t.t.size&&t.t.has(e)),E=e=>{const n=t.get(e);null==n||n.t.forEach((t=>{if(t!==e){const e=g(t),n=w(t);e&&d(e,n)||E(t)}}))},_=(e,...t)=>{let n=!0;const r=e.write((e=>p(w(e))),((t,...r)=>{let o;if(t===e){if(!a(t))throw new Error("atom not writable");const e=g(t),n=m(t,r[0]);e&&d(e,n)||E(t)}else o=_(t,...r);return n||T(),o}),...t);return n=!1,r},S=(e,...t)=>{const n=_(e,...t);return T(),n},j=(e,n)=>{const r={t:new Set(n&&[n]),l:new Set};if(t.set(e,r),v.add(e),w(e).d.forEach(((n,r)=>{const o=t.get(r);o?o.t.add(e):r!==e&&j(r,e)})),w(e),s(e)&&e.onMount){const t=e.onMount(((...t)=>S(e,...t)));t&&(r.u=t)}return r},P=e=>{var n;const r=null==(n=t.get(e))?void 0:n.u;r&&r(),t.delete(e),v.delete(e);const o=g(e);o?(h(o)&&i(o.v),o.d.forEach(((n,r)=>{if(r!==e){const n=t.get(r);n&&(n.t.delete(e),O(r,n)&&P(r))}}))):console.warn("[Bug] could not find atom state to unmount",e)},C=(e,n,r)=>{const o=new Set(n.d.keys());null==r||r.forEach(((n,r)=>{if(o.has(r))return void o.delete(r);const a=t.get(r);a&&(a.t.delete(e),O(r,a)&&P(r))})),o.forEach((n=>{const r=t.get(n);r?r.t.add(e):t.has(e)&&j(n,e)}))},T=()=>{for(;n.size;){const e=Array.from(n);n.clear(),e.forEach((([e,n])=>{const r=g(e);if(r){r.d!==(null==n?void 0:n.d)&&C(e,r,null==n?void 0:n.d);const o=t.get(e);!o||n&&!h(n)&&(d(n,r)||f(n,r))||o.l.forEach((e=>e()))}else console.warn("[Bug] no atom state to flush")}))}r.forEach((e=>e())),o.forEach((e=>e("state")))},x=(e,n)=>{const r=(e=>{let n=t.get(e);return n||(n=j(e)),n})(e);T();const a=r.l;return a.add(n),o.forEach((e=>e("sub"))),()=>{a.delete(n),(e=>{const n=t.get(e);n&&O(e,n)&&P(e)})(e),o.forEach((e=>e("unsub")))}};return{get:k,set:S,sub:x,dev_subscribe_state:e=>(console.warn("[DEPRECATED] dev_subscribe_state is deprecated and will be removed in the next minor version. use dev_subscribe_store instead."),r.add(e),()=>{r.delete(e)}),dev_subscribe_store:e=>(o.add(e),()=>{o.delete(e)}),dev_get_mounted_atoms:()=>v.values(),dev_get_atom_state:t=>e.get(t),dev_get_mounted:e=>t.get(e),dev_restore_atoms:e=>{for(const[t,n]of e)a(t)&&(m(t,n),E(t));T()}}};let g;const y=()=>(g||(g=v()),g)},5495:(e,t,n)=>{"use strict";n.d(t,{O4:()=>c});var r=n(5103);const o=Symbol();const a=Symbol();const s=function(e){let t,n;const r={getItem:r=>{var o,s;const c=e=>{if(t!==(e=e||"")){try{n=JSON.parse(e)}catch{return a}t=e}return n},i=null!=(s=null==(o=e())?void 0:o.getItem(r))?s:null;return i instanceof Promise?i.then(c):c(i)},setItem:(t,n)=>{var r;return null==(r=e())?void 0:r.setItem(t,JSON.stringify(n))},removeItem:t=>{var n;return null==(n=e())?void 0:n.removeItem(t)}};return"undefined"!=typeof window&&"function"==typeof window.addEventListener&&(r.subscribe=(e,t)=>{const n=n=>{n.key===e&&n.newValue&&t(JSON.parse(n.newValue))};return window.addEventListener("storage",n),()=>{window.removeEventListener("storage",n)}}),r}((()=>"undefined"!=typeof window?window.localStorage:void 0));function c(e,t,n=s){const c=(0,r.cn)(t);c.debugPrivate=!0,c.onMount=r=>{const o=n.getItem(e);let s;return o instanceof Promise?o.then((e=>r(e===a?t:e))):r(o===a?t:o),n.subscribe&&(s=n.subscribe(e,r)),s};return(0,r.cn)((e=>e(c)),((r,a,s)=>{const i="function"==typeof s?s(r(c)):s;return i===o?(a(c,t),n.removeItem(e)):(a(c,i),n.setItem(e,i))}))}}}]);