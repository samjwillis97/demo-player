import{C as qe,s as oe,e as _e,i as K,d as R,D as H,B as Ke,E as $,F as Pe,x as ne,f as V,g as B,h as te,G as xe,I as Xe,J as Me,y as se,z as ie,A as le,K as Je,a as Ye,c as Ze,j as z,v as ee,o as Qe,l as et,m as tt}from"../chunks/scheduler.fa5f7e19.js";import{S as ae,i as ce,g as rt,t as C,c as ot,a as P,b as $e,d as Ie,m as Ne,e as je}from"../chunks/index.1e9db64d.js";import{d as nt,r as ze}from"../chunks/index.566e0069.js";function Fe(e,t){const s={},r={},i={$$scope:1};let n=e.length;for(;n--;){const l=e[n],a=t[n];if(a){for(const u in l)u in a||(r[u]=1);for(const u in a)i[u]||(s[u]=a[u],i[u]=1);e[n]=a}else for(const u in l)i[u]=1}for(const l in r)l in s||(s[l]=void 0);return s}function st(e){return typeof e=="object"&&e!==null?e:{}}const it=!1,io=Object.freeze(Object.defineProperty({__proto__:null,ssr:it},Symbol.toStringTag,{value:"Module"}));function lt(e){return Object.keys(e).reduce((t,s)=>e[s]===void 0?t:t+`${s}:${e[s]};`,"")}lt({position:"absolute",opacity:0,"pointer-events":"none",margin:0,transform:"translateX(-100%)"});function ve(e){function t(s){return s(e),()=>{}}return{subscribe:t}}const W=e=>new Proxy(e,{get(t,s,r){return Reflect.get(t,s,r)},ownKeys(t){return Reflect.ownKeys(t).filter(s=>s!=="action")}}),Ae=e=>typeof e=="function";function at(e,t){const{stores:s,action:r,returned:i}=t??{},n=(()=>{if(s&&i)return nt(s,a=>{const u=i(a);if(Ae(u)){const d=(...f)=>W({...u(...f),[`data-melt-${e}`]:"",action:r??M});return d.action=r??M,d}return W({...u,[`data-melt-${e}`]:"",action:r??M})});{const a=i,u=a==null?void 0:a();if(Ae(u)){const d=(...f)=>W({...u(...f),[`data-melt-${e}`]:"",action:r??M});return d.action=r??M,ve(d)}return ve(W({...u,[`data-melt-${e}`]:"",action:r??M}))}})(),l=r??(()=>{});return l.subscribe=n.subscribe,l}function ct(e){return e instanceof HTMLElement}function M(){}function Ue(e,t,s,r){const i=Array.isArray(t)?t:[t];return i.forEach(n=>e.addEventListener(n,s,r)),()=>{i.forEach(n=>e.removeEventListener(n,s,r))}}function ut(e,t,s,r){const i=Array.isArray(t)?t:[t];if(typeof s=="function"){const n=ft(l=>s(l));return i.forEach(l=>e.addEventListener(l,n,r)),()=>{i.forEach(l=>e.removeEventListener(l,n,r))}}return()=>void 0}function dt(e){const t=e.currentTarget;if(!ct(t))return null;const s=new CustomEvent(`m-${e.type}`,{detail:{originalEvent:e},cancelable:!0});return t.dispatchEvent(s),s}function ft(e){return t=>{const s=dt(t);if(!(s!=null&&s.defaultPrevented))return e(t)}}const mt={ALT:"Alt",ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight",ARROW_UP:"ArrowUp",BACKSPACE:"Backspace",CAPS_LOCK:"CapsLock",CONTROL:"Control",DELETE:"Delete",END:"End",ENTER:"Enter",ESCAPE:"Escape",F1:"F1",F10:"F10",F11:"F11",F12:"F12",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",HOME:"Home",META:"Meta",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SHIFT:"Shift",SPACE:" ",TAB:"Tab",CTRL:"Control",ASTERISK:"*",A:"a",P:"p"};ze(void 0,e=>{function t(r){e(r),e(void 0)}return Ue(document,"pointerup",t,{passive:!1,capture:!0})});ze(void 0,e=>{function t(r){r&&r.key===mt.ESCAPE&&e(r),e(void 0)}return Ue(document,"keydown",t,{passive:!1,capture:!0})});function pt(){return{elements:{root:at("label",{action:t=>({destroy:ut(t,"mousedown",r=>{!r.defaultPrevented&&r.detail>1&&r.preventDefault()})})})}}}function w(e,t){const s={};return t.forEach(r=>{s[r]={[`data-bits-${e}-${r}`]:""}}),r=>s[r]}function gt(){const e=qe();return t=>{const{originalEvent:s}=t.detail,{cancelable:r}=t,i=s.type;e(i,{originalEvent:s,currentTarget:s.currentTarget},{cancelable:r})||t.preventDefault()}}function Le(e){return Object.keys(e).reduce((t,s)=>e[s]===void 0?t:t+`${s}:${e[s]};`,"")}Le({position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"});Le({position:"absolute",width:"25px",height:"25px",opacity:"0",margin:"0px",pointerEvents:"none",transform:"translateX(-100%)"});const ht="accordion",bt=["root","content","header","item","trigger"];w(ht,bt);const yt="alert-dialog",wt=["action","cancel","content","description","overlay","portal","title","trigger"];w(yt,wt);const _t="avatar",xt=["root","image","fallback"];w(_t,xt);const vt="checkbox",At=["root","input","indicator"];w(vt,At);const Et="collapsible",Tt=["root","content","trigger"];w(Et,Tt);const kt="context-menu",St=["arrow","checkbox-indicator","checkbox-item","content","group","item","label","radio-group","radio-item","separator","sub-content","sub-trigger","trigger"];w(kt,St);const Rt="dialog",Ct=["close","content","description","overlay","portal","title","trigger"];w(Rt,Ct);const Pt="dropdown-menu",Mt=["arrow","checkbox-indicator","checkbox-item","content","group","item","label","radio-group","radio-item","separator","sub-content","sub-trigger","trigger"];w(Pt,Mt);const $t="link-preview",It=["arrow","content","trigger"];w($t,It);const Nt="label",jt=["root"],zt=w(Nt,jt),Ft=e=>({builder:e&2}),Ee=e=>({builder:e[1],attrs:e[4]}),Ut=e=>({builder:e&2}),Te=e=>({builder:e[1],attrs:e[4]});function Lt(e){let t,s,r,i;const n=e[8].default,l=ne(n,e,e[7],Ee);let a=[e[1],e[5],e[4]],u={};for(let d=0;d<a.length;d+=1)u=$(u,a[d]);return{c(){t=V("label"),l&&l.c(),this.h()},l(d){t=B(d,"LABEL",{});var f=te(t);l&&l.l(f),f.forEach(R),this.h()},h(){xe(t,u)},m(d,f){K(d,t,f),l&&l.m(t,null),s=!0,r||(i=[Xe(e[1].action(t)),Me(t,"m-mousedown",e[3])],r=!0)},p(d,f){l&&l.p&&(!s||f&130)&&se(l,n,d,d[7],s?le(n,d[7],f,Ft):ie(d[7]),Ee),xe(t,u=Fe(a,[f&2&&d[1],f&32&&d[5],d[4]]))},i(d){s||(P(l,d),s=!0)},o(d){C(l,d),s=!1},d(d){d&&R(t),l&&l.d(d),r=!1,Je(i)}}}function Gt(e){let t;const s=e[8].default,r=ne(s,e,e[7],Te);return{c(){r&&r.c()},l(i){r&&r.l(i)},m(i,n){r&&r.m(i,n),t=!0},p(i,n){r&&r.p&&(!t||n&130)&&se(r,s,i,i[7],t?le(s,i[7],n,Ut):ie(i[7]),Te)},i(i){t||(P(r,i),t=!0)},o(i){C(r,i),t=!1},d(i){r&&r.d(i)}}}function Ot(e){let t,s,r,i;const n=[Gt,Lt],l=[];function a(u,d){return u[0]?0:1}return t=a(e),s=l[t]=n[t](e),{c(){s.c(),r=_e()},l(u){s.l(u),r=_e()},m(u,d){l[t].m(u,d),K(u,r,d),i=!0},p(u,[d]){let f=t;t=a(u),t===f?l[t].p(u,d):(rt(),C(l[f],1,1,()=>{l[f]=null}),ot(),s=l[t],s?s.p(u,d):(s=l[t]=n[t](u),s.c()),P(s,1),s.m(r.parentNode,r))},i(u){i||(P(s),i=!0)},o(u){C(s),i=!1},d(u){u&&R(r),l[t].d(u)}}}function Wt(e,t,s){let r;const i=["asChild"];let n=H(t,i),l,{$$slots:a={},$$scope:u}=t,{asChild:d=!1}=t;const{elements:{root:f}}=pt();Ke(e,f,m=>s(6,l=m));const o=gt(),c=zt("root");return e.$$set=m=>{t=$($({},t),Pe(m)),s(5,n=H(t,i)),"asChild"in m&&s(0,d=m.asChild),"$$scope"in m&&s(7,u=m.$$scope)},e.$$.update=()=>{e.$$.dirty&64&&s(1,r=l)},[d,r,f,o,c,n,l,u,a]}let Dt=class extends ae{constructor(t){super(),ce(this,t,Wt,Ot,oe,{asChild:0})}};const Vt="menubar",Bt=["root","arrow","checkbox-indicator","checkbox-item","content","group","item","label","radio-group","radio-item","separator","sub-content","sub-trigger","trigger"];w(Vt,Bt);const Ht="popover",qt=["arrow","close","content","trigger"];w(Ht,qt);const Kt="progress",Xt=["root"];w(Kt,Xt);const Jt="radio-group",Yt=["root","item","input"];w(Jt,Yt);const Zt="select",Qt=["arrow","content","group","item","input","label","trigger","value"];w(Zt,Qt);const er="separator",tr=["root"];w(er,tr);const rr="slider",or=["root","input","range","thumb","tick"];w(rr,or);const nr="switch",sr=["root","input","thumb"];w(nr,sr);const ir="tabs",lr=["root","content","list","trigger"];w(ir,lr);const ar="toggle",cr=["root","input"];w(ar,cr);const ur="toggle-group",dr=["root","item"];w(ur,dr);const fr="tooltip",mr=["arrow","content","trigger"];w(fr,mr);function Ge(e){var t,s,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(s=Ge(e[t]))&&(r&&(r+=" "),r+=s);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function pr(){for(var e,t,s=0,r="";s<arguments.length;)(e=arguments[s++])&&(t=Ge(e))&&(r&&(r+=" "),r+=t);return r}const ue="-";function gr(e){const t=br(e),{conflictingClassGroups:s,conflictingClassGroupModifiers:r}=e;function i(l){const a=l.split(ue);return a[0]===""&&a.length!==1&&a.shift(),Oe(a,t)||hr(l)}function n(l,a){const u=s[l]||[];return a&&r[l]?[...u,...r[l]]:u}return{getClassGroupId:i,getConflictingClassGroupIds:n}}function Oe(e,t){var l;if(e.length===0)return t.classGroupId;const s=e[0],r=t.nextPart.get(s),i=r?Oe(e.slice(1),r):void 0;if(i)return i;if(t.validators.length===0)return;const n=e.join(ue);return(l=t.validators.find(({validator:a})=>a(n)))==null?void 0:l.classGroupId}const ke=/^\[(.+)\]$/;function hr(e){if(ke.test(e)){const t=ke.exec(e)[1],s=t==null?void 0:t.substring(0,t.indexOf(":"));if(s)return"arbitrary.."+s}}function br(e){const{theme:t,prefix:s}=e,r={nextPart:new Map,validators:[]};return wr(Object.entries(e.classGroups),s).forEach(([n,l])=>{re(l,r,n,t)}),r}function re(e,t,s,r){e.forEach(i=>{if(typeof i=="string"){const n=i===""?t:Se(t,i);n.classGroupId=s;return}if(typeof i=="function"){if(yr(i)){re(i(r),t,s,r);return}t.validators.push({validator:i,classGroupId:s});return}Object.entries(i).forEach(([n,l])=>{re(l,Se(t,n),s,r)})})}function Se(e,t){let s=e;return t.split(ue).forEach(r=>{s.nextPart.has(r)||s.nextPart.set(r,{nextPart:new Map,validators:[]}),s=s.nextPart.get(r)}),s}function yr(e){return e.isThemeGetter}function wr(e,t){return t?e.map(([s,r])=>{const i=r.map(n=>typeof n=="string"?t+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([l,a])=>[t+l,a])):n);return[s,i]}):e}function _r(e){if(e<1)return{get:()=>{},set:()=>{}};let t=0,s=new Map,r=new Map;function i(n,l){s.set(n,l),t++,t>e&&(t=0,r=s,s=new Map)}return{get(n){let l=s.get(n);if(l!==void 0)return l;if((l=r.get(n))!==void 0)return i(n,l),l},set(n,l){s.has(n)?s.set(n,l):i(n,l)}}}const We="!";function xr(e){const t=e.separator,s=t.length===1,r=t[0],i=t.length;return function(l){const a=[];let u=0,d=0,f;for(let h=0;h<l.length;h++){let _=l[h];if(u===0){if(_===r&&(s||l.slice(h,h+i)===t)){a.push(l.slice(d,h)),d=h+i;continue}if(_==="/"){f=h;continue}}_==="["?u++:_==="]"&&u--}const o=a.length===0?l:l.substring(d),c=o.startsWith(We),m=c?o.substring(1):o,g=f&&f>d?f-d:void 0;return{modifiers:a,hasImportantModifier:c,baseClassName:m,maybePostfixModifierPosition:g}}}function vr(e){if(e.length<=1)return e;const t=[];let s=[];return e.forEach(r=>{r[0]==="["?(t.push(...s.sort(),r),s=[]):s.push(r)}),t.push(...s.sort()),t}function Ar(e){return{cache:_r(e.cacheSize),splitModifiers:xr(e),...gr(e)}}const Er=/\s+/;function Tr(e,t){const{splitModifiers:s,getClassGroupId:r,getConflictingClassGroupIds:i}=t,n=new Set;return e.trim().split(Er).map(l=>{const{modifiers:a,hasImportantModifier:u,baseClassName:d,maybePostfixModifierPosition:f}=s(l);let o=r(f?d.substring(0,f):d),c=!!f;if(!o){if(!f)return{isTailwindClass:!1,originalClassName:l};if(o=r(d),!o)return{isTailwindClass:!1,originalClassName:l};c=!1}const m=vr(a).join(":");return{isTailwindClass:!0,modifierId:u?m+We:m,classGroupId:o,originalClassName:l,hasPostfixModifier:c}}).reverse().filter(l=>{if(!l.isTailwindClass)return!0;const{modifierId:a,classGroupId:u,hasPostfixModifier:d}=l,f=a+u;return n.has(f)?!1:(n.add(f),i(u,d).forEach(o=>n.add(a+o)),!0)}).reverse().map(l=>l.originalClassName).join(" ")}function kr(){let e=0,t,s,r="";for(;e<arguments.length;)(t=arguments[e++])&&(s=De(t))&&(r&&(r+=" "),r+=s);return r}function De(e){if(typeof e=="string")return e;let t,s="";for(let r=0;r<e.length;r++)e[r]&&(t=De(e[r]))&&(s&&(s+=" "),s+=t);return s}function Sr(e,...t){let s,r,i,n=l;function l(u){const d=t.reduce((f,o)=>o(f),e());return s=Ar(d),r=s.cache.get,i=s.cache.set,n=a,a(u)}function a(u){const d=r(u);if(d)return d;const f=Tr(u,s);return i(u,f),f}return function(){return n(kr.apply(null,arguments))}}function b(e){const t=s=>s[e]||[];return t.isThemeGetter=!0,t}const Ve=/^\[(?:([a-z-]+):)?(.+)\]$/i,Rr=/^\d+\/\d+$/,Cr=new Set(["px","full","screen"]),Pr=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Mr=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,$r=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ir=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function x(e){return S(e)||Cr.has(e)||Rr.test(e)}function E(e){return I(e,"length",Or)}function S(e){return!!e&&!Number.isNaN(Number(e))}function D(e){return I(e,"number",S)}function F(e){return!!e&&Number.isInteger(Number(e))}function Nr(e){return e.endsWith("%")&&S(e.slice(0,-1))}function p(e){return Ve.test(e)}function T(e){return Pr.test(e)}const jr=new Set(["length","size","percentage"]);function zr(e){return I(e,jr,Be)}function Fr(e){return I(e,"position",Be)}const Ur=new Set(["image","url"]);function Lr(e){return I(e,Ur,Dr)}function Gr(e){return I(e,"",Wr)}function U(){return!0}function I(e,t,s){const r=Ve.exec(e);return r?r[1]?typeof t=="string"?r[1]===t:t.has(r[1]):s(r[2]):!1}function Or(e){return Mr.test(e)}function Be(){return!1}function Wr(e){return $r.test(e)}function Dr(e){return Ir.test(e)}function Vr(){const e=b("colors"),t=b("spacing"),s=b("blur"),r=b("brightness"),i=b("borderColor"),n=b("borderRadius"),l=b("borderSpacing"),a=b("borderWidth"),u=b("contrast"),d=b("grayscale"),f=b("hueRotate"),o=b("invert"),c=b("gap"),m=b("gradientColorStops"),g=b("gradientColorStopPositions"),h=b("inset"),_=b("margin"),A=b("opacity"),v=b("padding"),de=b("saturate"),X=b("scale"),fe=b("sepia"),me=b("skew"),pe=b("space"),ge=b("translate"),J=()=>["auto","contain","none"],Y=()=>["auto","hidden","clip","visible","scroll"],Z=()=>["auto",p,t],y=()=>[p,t],he=()=>["",x,E],L=()=>["auto",S,p],be=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],G=()=>["solid","dashed","dotted","double","none"],ye=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"],Q=()=>["start","end","center","between","around","evenly","stretch"],N=()=>["","0",p],we=()=>["auto","avoid","all","avoid-page","page","left","right","column"],j=()=>[S,D],O=()=>[S,p];return{cacheSize:500,separator:":",theme:{colors:[U],spacing:[x,E],blur:["none","",T,p],brightness:j(),borderColor:[e],borderRadius:["none","","full",T,p],borderSpacing:y(),borderWidth:he(),contrast:j(),grayscale:N(),hueRotate:O(),invert:N(),gap:y(),gradientColorStops:[e],gradientColorStopPositions:[Nr,E],inset:Z(),margin:Z(),opacity:j(),padding:y(),saturate:j(),scale:j(),sepia:N(),skew:O(),space:y(),translate:y()},classGroups:{aspect:[{aspect:["auto","square","video",p]}],container:["container"],columns:[{columns:[T]}],"break-after":[{"break-after":we()}],"break-before":[{"break-before":we()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...be(),p]}],overflow:[{overflow:Y()}],"overflow-x":[{"overflow-x":Y()}],"overflow-y":[{"overflow-y":Y()}],overscroll:[{overscroll:J()}],"overscroll-x":[{"overscroll-x":J()}],"overscroll-y":[{"overscroll-y":J()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[h]}],"inset-x":[{"inset-x":[h]}],"inset-y":[{"inset-y":[h]}],start:[{start:[h]}],end:[{end:[h]}],top:[{top:[h]}],right:[{right:[h]}],bottom:[{bottom:[h]}],left:[{left:[h]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",F,p]}],basis:[{basis:Z()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",p]}],grow:[{grow:N()}],shrink:[{shrink:N()}],order:[{order:["first","last","none",F,p]}],"grid-cols":[{"grid-cols":[U]}],"col-start-end":[{col:["auto",{span:["full",F,p]},p]}],"col-start":[{"col-start":L()}],"col-end":[{"col-end":L()}],"grid-rows":[{"grid-rows":[U]}],"row-start-end":[{row:["auto",{span:[F,p]},p]}],"row-start":[{"row-start":L()}],"row-end":[{"row-end":L()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",p]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",p]}],gap:[{gap:[c]}],"gap-x":[{"gap-x":[c]}],"gap-y":[{"gap-y":[c]}],"justify-content":[{justify:["normal",...Q()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...Q(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...Q(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[_]}],mx:[{mx:[_]}],my:[{my:[_]}],ms:[{ms:[_]}],me:[{me:[_]}],mt:[{mt:[_]}],mr:[{mr:[_]}],mb:[{mb:[_]}],ml:[{ml:[_]}],"space-x":[{"space-x":[pe]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[pe]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",p,t]}],"min-w":[{"min-w":["min","max","fit",p,x]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[T]},T,p]}],h:[{h:[p,t,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",x,p]}],"max-h":[{"max-h":[p,t,"min","max","fit"]}],"font-size":[{text:["base",T,E]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",D]}],"font-family":[{font:[U]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",p]}],"line-clamp":[{"line-clamp":["none",S,D]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",x,p]}],"list-image":[{"list-image":["none",p]}],"list-style-type":[{list:["none","disc","decimal",p]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[A]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[A]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...G(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",x,E]}],"underline-offset":[{"underline-offset":["auto",x,p]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:y()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",p]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",p]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[A]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...be(),Fr]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",zr]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Lr]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[m]}],"gradient-via":[{via:[m]}],"gradient-to":[{to:[m]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[A]}],"border-style":[{border:[...G(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[A]}],"divide-style":[{divide:G()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...G()]}],"outline-offset":[{"outline-offset":[x,p]}],"outline-w":[{outline:[x,E]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:he()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[A]}],"ring-offset-w":[{"ring-offset":[x,E]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",T,Gr]}],"shadow-color":[{shadow:[U]}],opacity:[{opacity:[A]}],"mix-blend":[{"mix-blend":ye()}],"bg-blend":[{"bg-blend":ye()}],filter:[{filter:["","none"]}],blur:[{blur:[s]}],brightness:[{brightness:[r]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",T,p]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[o]}],saturate:[{saturate:[de]}],sepia:[{sepia:[fe]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[s]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[o]}],"backdrop-opacity":[{"backdrop-opacity":[A]}],"backdrop-saturate":[{"backdrop-saturate":[de]}],"backdrop-sepia":[{"backdrop-sepia":[fe]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",p]}],duration:[{duration:O()}],ease:[{ease:["linear","in","out","in-out",p]}],delay:[{delay:O()}],animate:[{animate:["none","spin","ping","pulse","bounce",p]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[X]}],"scale-x":[{"scale-x":[X]}],"scale-y":[{"scale-y":[X]}],rotate:[{rotate:[F,p]}],"translate-x":[{"translate-x":[ge]}],"translate-y":[{"translate-y":[ge]}],"skew-x":[{"skew-x":[me]}],"skew-y":[{"skew-y":[me]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",p]}],accent:[{accent:["auto",e]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",p]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":y()}],"scroll-mx":[{"scroll-mx":y()}],"scroll-my":[{"scroll-my":y()}],"scroll-ms":[{"scroll-ms":y()}],"scroll-me":[{"scroll-me":y()}],"scroll-mt":[{"scroll-mt":y()}],"scroll-mr":[{"scroll-mr":y()}],"scroll-mb":[{"scroll-mb":y()}],"scroll-ml":[{"scroll-ml":y()}],"scroll-p":[{"scroll-p":y()}],"scroll-px":[{"scroll-px":y()}],"scroll-py":[{"scroll-py":y()}],"scroll-ps":[{"scroll-ps":y()}],"scroll-pe":[{"scroll-pe":y()}],"scroll-pt":[{"scroll-pt":y()}],"scroll-pr":[{"scroll-pr":y()}],"scroll-pb":[{"scroll-pb":y()}],"scroll-pl":[{"scroll-pl":y()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",p]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[x,E,D]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const He=Sr(Vr);function Re(...e){return He(pr(e))}function Br(e){let t;const s=e[2].default,r=ne(s,e,e[3],null);return{c(){r&&r.c()},l(i){r&&r.l(i)},m(i,n){r&&r.m(i,n),t=!0},p(i,n){r&&r.p&&(!t||n&8)&&se(r,s,i,i[3],t?le(s,i[3],n,null):ie(i[3]),null)},i(i){t||(P(r,i),t=!0)},o(i){C(r,i),t=!1},d(i){r&&r.d(i)}}}function Hr(e){let t,s;const r=[{class:Re("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",e[0])},e[1]];let i={$$slots:{default:[Br]},$$scope:{ctx:e}};for(let n=0;n<r.length;n+=1)i=$(i,r[n]);return t=new Dt({props:i}),{c(){$e(t.$$.fragment)},l(n){Ie(t.$$.fragment,n)},m(n,l){Ne(t,n,l),s=!0},p(n,[l]){const a=l&3?Fe(r,[l&1&&{class:Re("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",n[0])},l&2&&st(n[1])]):{};l&8&&(a.$$scope={dirty:l,ctx:n}),t.$set(a)},i(n){s||(P(t.$$.fragment,n),s=!0)},o(n){C(t.$$.fragment,n),s=!1},d(n){je(t,n)}}}function qr(e,t,s){const r=["class"];let i=H(t,r),{$$slots:n={},$$scope:l}=t,{class:a=void 0}=t;return e.$$set=u=>{t=$($({},t),Pe(u)),s(1,i=H(t,r)),"class"in u&&s(0,a=u.class),"$$scope"in u&&s(3,l=u.$$scope)},[a,i,n,l]}class Kr extends ae{constructor(t){super(),ce(this,t,qr,Hr,oe,{class:0})}}(()=>{const e=()=>{const r=new Error("not implemented");return r.code="ENOSYS",r};if(!globalThis.fs){let r="";globalThis.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(i,n){r+=s.decode(n);const l=r.lastIndexOf(`
`);return l!=-1&&(console.log(r.substring(0,l)),r=r.substring(l+1)),n.length},write(i,n,l,a,u,d){if(l!==0||a!==n.length||u!==null){d(e());return}const f=this.writeSync(i,n);d(null,f)},chmod(i,n,l){l(e())},chown(i,n,l,a){a(e())},close(i,n){n(e())},fchmod(i,n,l){l(e())},fchown(i,n,l,a){a(e())},fstat(i,n){n(e())},fsync(i,n){n(null)},ftruncate(i,n,l){l(e())},lchown(i,n,l,a){a(e())},link(i,n,l){l(e())},lstat(i,n){n(e())},mkdir(i,n,l){l(e())},open(i,n,l,a){a(e())},read(i,n,l,a,u,d){d(e())},readdir(i,n){n(e())},readlink(i,n){n(e())},rename(i,n,l){l(e())},rmdir(i,n){n(e())},stat(i,n){n(e())},symlink(i,n,l){l(e())},truncate(i,n,l){l(e())},unlink(i,n){n(e())},utimes(i,n,l,a){a(e())}}}if(globalThis.process||(globalThis.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw e()},pid:-1,ppid:-1,umask(){throw e()},cwd(){throw e()},chdir(){throw e()}}),!globalThis.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!globalThis.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!globalThis.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!globalThis.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");const t=new TextEncoder("utf-8"),s=new TextDecoder("utf-8");globalThis.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=o=>{o!==0&&console.warn("exit code:",o)},this._exitPromise=new Promise(o=>{this._resolveExitPromise=o}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;const r=(o,c)=>{this.mem.setUint32(o+0,c,!0),this.mem.setUint32(o+4,Math.floor(c/4294967296),!0)},i=o=>{const c=this.mem.getUint32(o+0,!0),m=this.mem.getInt32(o+4,!0);return c+m*4294967296},n=o=>{const c=this.mem.getFloat64(o,!0);if(c===0)return;if(!isNaN(c))return c;const m=this.mem.getUint32(o,!0);return this._values[m]},l=(o,c)=>{if(typeof c=="number"&&c!==0){if(isNaN(c)){this.mem.setUint32(o+4,2146959360,!0),this.mem.setUint32(o,0,!0);return}this.mem.setFloat64(o,c,!0);return}if(c===void 0){this.mem.setFloat64(o,0,!0);return}let g=this._ids.get(c);g===void 0&&(g=this._idPool.pop(),g===void 0&&(g=this._values.length),this._values[g]=c,this._goRefCounts[g]=0,this._ids.set(c,g)),this._goRefCounts[g]++;let h=0;switch(typeof c){case"object":c!==null&&(h=1);break;case"string":h=2;break;case"symbol":h=3;break;case"function":h=4;break}this.mem.setUint32(o+4,2146959360|h,!0),this.mem.setUint32(o,g,!0)},a=o=>{const c=i(o+0),m=i(o+8);return new Uint8Array(this._inst.exports.mem.buffer,c,m)},u=o=>{const c=i(o+0),m=i(o+8),g=new Array(m);for(let h=0;h<m;h++)g[h]=n(c+h*8);return g},d=o=>{const c=i(o+0),m=i(o+8);return s.decode(new DataView(this._inst.exports.mem.buffer,c,m))},f=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":o=>{o>>>=0;const c=this.mem.getInt32(o+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(c)},"runtime.wasmWrite":o=>{o>>>=0;const c=i(o+8),m=i(o+16),g=this.mem.getInt32(o+24,!0);fs.writeSync(c,new Uint8Array(this._inst.exports.mem.buffer,m,g))},"runtime.resetMemoryDataView":o=>{o>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":o=>{o>>>=0,r(o+8,(f+performance.now())*1e6)},"runtime.walltime":o=>{o>>>=0;const c=new Date().getTime();r(o+8,c/1e3),this.mem.setInt32(o+16,c%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":o=>{o>>>=0;const c=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(c,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(c);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},i(o+8)+1)),this.mem.setInt32(o+16,c,!0)},"runtime.clearTimeoutEvent":o=>{o>>>=0;const c=this.mem.getInt32(o+8,!0);clearTimeout(this._scheduledTimeouts.get(c)),this._scheduledTimeouts.delete(c)},"runtime.getRandomData":o=>{o>>>=0,crypto.getRandomValues(a(o+8))},"syscall/js.finalizeRef":o=>{o>>>=0;const c=this.mem.getUint32(o+8,!0);if(this._goRefCounts[c]--,this._goRefCounts[c]===0){const m=this._values[c];this._values[c]=null,this._ids.delete(m),this._idPool.push(c)}},"syscall/js.stringVal":o=>{o>>>=0,l(o+24,d(o+8))},"syscall/js.valueGet":o=>{o>>>=0;const c=Reflect.get(n(o+8),d(o+16));o=this._inst.exports.getsp()>>>0,l(o+32,c)},"syscall/js.valueSet":o=>{o>>>=0,Reflect.set(n(o+8),d(o+16),n(o+32))},"syscall/js.valueDelete":o=>{o>>>=0,Reflect.deleteProperty(n(o+8),d(o+16))},"syscall/js.valueIndex":o=>{o>>>=0,l(o+24,Reflect.get(n(o+8),i(o+16)))},"syscall/js.valueSetIndex":o=>{o>>>=0,Reflect.set(n(o+8),i(o+16),n(o+24))},"syscall/js.valueCall":o=>{o>>>=0;try{const c=n(o+8),m=Reflect.get(c,d(o+16)),g=u(o+32),h=Reflect.apply(m,c,g);o=this._inst.exports.getsp()>>>0,l(o+56,h),this.mem.setUint8(o+64,1)}catch(c){o=this._inst.exports.getsp()>>>0,l(o+56,c),this.mem.setUint8(o+64,0)}},"syscall/js.valueInvoke":o=>{o>>>=0;try{const c=n(o+8),m=u(o+16),g=Reflect.apply(c,void 0,m);o=this._inst.exports.getsp()>>>0,l(o+40,g),this.mem.setUint8(o+48,1)}catch(c){o=this._inst.exports.getsp()>>>0,l(o+40,c),this.mem.setUint8(o+48,0)}},"syscall/js.valueNew":o=>{o>>>=0;try{const c=n(o+8),m=u(o+16),g=Reflect.construct(c,m);o=this._inst.exports.getsp()>>>0,l(o+40,g),this.mem.setUint8(o+48,1)}catch(c){o=this._inst.exports.getsp()>>>0,l(o+40,c),this.mem.setUint8(o+48,0)}},"syscall/js.valueLength":o=>{o>>>=0,r(o+16,parseInt(n(o+8).length))},"syscall/js.valuePrepareString":o=>{o>>>=0;const c=t.encode(String(n(o+8)));l(o+16,c),r(o+24,c.length)},"syscall/js.valueLoadString":o=>{o>>>=0;const c=n(o+8);a(o+16).set(c)},"syscall/js.valueInstanceOf":o=>{o>>>=0,this.mem.setUint8(o+24,n(o+8)instanceof n(o+16)?1:0)},"syscall/js.copyBytesToGo":o=>{o>>>=0;const c=a(o+8),m=n(o+32);if(!(m instanceof Uint8Array||m instanceof Uint8ClampedArray)){this.mem.setUint8(o+48,0);return}const g=m.subarray(0,c.length);c.set(g),r(o+40,g.length),this.mem.setUint8(o+48,1)},"syscall/js.copyBytesToJS":o=>{o>>>=0;const c=n(o+8),m=a(o+16);if(!(c instanceof Uint8Array||c instanceof Uint8ClampedArray)){this.mem.setUint8(o+48,0);return}const g=m.subarray(0,c.length);c.set(g),r(o+40,g.length),this.mem.setUint8(o+48,1)},debug:o=>{console.log(o)}}}}async run(r){if(!(r instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=r,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,globalThis,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[globalThis,5],[this,6]]),this._idPool=[],this.exited=!1;let i=4096;const n=o=>{const c=i,m=t.encode(o+"\0");return new Uint8Array(this.mem.buffer,i,m.length).set(m),i+=m.length,i%8!==0&&(i+=8-i%8),c},l=this.argv.length,a=[];this.argv.forEach(o=>{a.push(n(o))}),a.push(0),Object.keys(this.env).sort().forEach(o=>{a.push(n(`${o}=${this.env[o]}`))}),a.push(0);const d=i;a.forEach(o=>{this.mem.setUint32(i,o,!0),this.mem.setUint32(i+4,0,!0),i+=8});const f=4096+8192;if(i>=f)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(l,d),this.exited&&this._resolveExitPromise(),await this._exitPromise}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(r){const i=this;return function(){const n={id:r,this:this,args:arguments};return i._pendingEvent=n,i._resume(),n.result}}}})();const q=typeof global<"u"?global:typeof window<"u"?window:typeof self<"u"?self:void 0;q.__go_wasm__||(q.__go_wasm__={});const Xr=3*1e3,k=q.__go_wasm__;function Jr(e){return(...t)=>{const s=e.apply(void 0,t);if(s.error instanceof Error)throw s.error;return s.result}}function Yr(){return new Promise(e=>{requestAnimationFrame(()=>e()),setTimeout(()=>{e()},50)})}function Zr(e){let t,s;async function r(){k.__wrapper__=Jr,s=new q.Go;let i=await e,n=await WebAssembly.instantiate(i,s.importObject);s.run(n.instance)}return r(),setTimeout(()=>{k.__ready__!==!0&&console.warn("Golang WASM Bridge (__go_wasm__.__ready__) still not true after max time")},Xr),t=new Proxy({},{get:(i,n)=>(...l)=>new Promise(async(a,u)=>{if(!s||s.exited)return u(new Error("The Go instance is not active."));for(;k.__ready__!==!0;)await Yr();if(typeof k[n]!="function"){a(k[n]),l.length!==0&&console.warn("Retrieved value from WASM returned function type, however called with arguments.");return}try{a(k[n].apply(void 0,l))}catch(d){u(d)}})}),k.__proxy__=t,t}const Qr=fetch(new URL("../assets/main.3448b92f.wasm",import.meta.url).href).then(e=>e.arrayBuffer()),Ce=Zr(Qr);function eo(e){let t;return{c(){t=et("Demo")},l(s){t=tt(s,"Demo")},m(s,r){K(s,t,r)},d(s){s&&R(t)}}}function to(e){let t,s,r,i,n,l,a,u;return r=new Kr({props:{for:"demo",$$slots:{default:[eo]},$$scope:{ctx:e}}}),{c(){t=V("div"),s=V("div"),$e(r.$$.fragment),i=Ye(),n=V("input"),this.h()},l(d){t=B(d,"DIV",{class:!0});var f=te(t);s=B(f,"DIV",{class:!0});var o=te(s);Ie(r.$$.fragment,o),i=Ze(o),n=B(o,"INPUT",{id:!0,type:!0,class:!0}),o.forEach(R),f.forEach(R),this.h()},h(){n.disabled=e[1],z(n,"id","demo"),z(n,"type","file"),z(n,"class",He("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50")),z(s,"class","flex flex-col max-w-sm gap-1.5"),z(t,"class","flex flex-col h-full justify-center items-center")},m(d,f){K(d,t,f),ee(t,s),Ne(r,s,null),ee(s,i),ee(s,n),l=!0,a||(u=Me(n,"change",e[2]),a=!0)},p(d,[f]){const o={};f&16&&(o.$$scope={dirty:f,ctx:d}),r.$set(o),(!l||f&2)&&(n.disabled=d[1])},i(d){l||(P(r.$$.fragment,d),l=!0)},o(d){C(r.$$.fragment,d),l=!1},d(d){d&&R(t),je(r),a=!1,u()}}}function ro(e,t,s){Qe(async()=>{console.log(await Ce.test())});let r=!1,i;const n=async a=>{if(!i||i.length===0)return;s(1,r=!0);const u=await a.arrayBuffer();console.log(await Ce.passFileToGo(u)),s(1,r=!1)};function l(){i=this.files,s(0,i)}return e.$$.update=()=>{e.$$.dirty&1&&i&&i.length>0&&n(i[0]).then()},[i,r,l]}class ao extends ae{constructor(t){super(),ce(this,t,ro,to,oe,{})}}export{ao as component,io as universal};
