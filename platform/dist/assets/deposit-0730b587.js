import{k as A,v as te,T as Re,u as ne,Y as le,p as E,$ as Ae,a0 as Ie,a1 as ke,Z as je,a2 as ce,j as i,L as Pe,A as De}from"./index-f6bcde00.js";import{u as Fe,y as Le,F as ze}from"./FormErrors-8d84a8c7.js";import{F as de}from"./FieldFormItem-638e5b85.js";import{S as Te}from"./sucessModal-6f9180fe.js";import{u as Oe}from"./useDispatch-f673bc67.js";var Ue=Object.defineProperty,ee=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,ue=(a,c,s)=>c in a?Ue(a,c,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[c]=s,re=(a,c)=>{for(var s in c||(c={}))me.call(c,s)&&ue(a,s,c[s]);if(ee)for(var s of ee(c))he.call(c,s)&&ue(a,s,c[s]);return a},ie=(a,c)=>{var s={};for(var d in a)me.call(a,d)&&c.indexOf(d)<0&&(s[d]=a[d]);if(a!=null&&ee)for(var d of ee(a))c.indexOf(d)<0&&he.call(a,d)&&(s[d]=a[d]);return s};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var _;(a=>{const c=class b{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let l=0;l<this.size;l++)r.push(!1);for(let l=0;l<this.size;l++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const f=this.addEccAndInterleave(t);if(this.drawCodewords(f),n==-1){let l=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const u=this.getPenaltyScore();u<l&&(n=g,l=u),this.applyMask(g)}}x(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=a.QrSegment.makeSegments(e);return b.encodeSegments(t,o)}static encodeBinary(e,o){const t=a.QrSegment.makeBytes(e);return b.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,r=-1,f=!0){if(!(b.MIN_VERSION<=t&&t<=n&&n<=b.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let l,g;for(l=t;;l++){const h=b.getNumDataCodewords(l,o)*8,v=R.getTotalBits(e,l);if(v<=h){g=v;break}if(l>=n)throw new RangeError("Data too long")}for(const h of[b.Ecc.MEDIUM,b.Ecc.QUARTILE,b.Ecc.HIGH])f&&g<=b.getNumDataCodewords(l,h)*8&&(o=h);let u=[];for(const h of e){s(h.mode.modeBits,4,u),s(h.numChars,h.mode.numCharCountBits(l),u);for(const v of h.getData())u.push(v)}x(u.length==g);const I=b.getNumDataCodewords(l,o)*8;x(u.length<=I),s(0,Math.min(4,I-u.length),u),s(0,(8-u.length%8)%8,u),x(u.length%8==0);for(let h=236;u.length<I;h^=253)s(h,8,u);let N=[];for(;N.length*8<u.length;)N.push(0);return u.forEach((h,v)=>N[v>>>3]|=h<<7-(v&7)),new b(l,o,N,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;x(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,d(n,r));this.setFunctionModule(8,7,d(n,6)),this.setFunctionModule(8,8,d(n,7)),this.setFunctionModule(7,8,d(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,d(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,d(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,d(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;x(o>>>18==0);for(let t=0;t<18;t++){const n=d(o,t),r=this.size-11+t%3,f=Math.floor(t/3);this.setFunctionModule(r,f,n),this.setFunctionModule(f,r,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(t)),f=e+n,l=o+t;0<=f&&f<this.size&&0<=l&&l<this.size&&this.setFunctionModule(f,l,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=b.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=b.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=b.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],f=Math.floor(b.getNumRawDataModules(o)/8),l=n-f%n,g=Math.floor(f/n);let u=[];const I=b.reedSolomonComputeDivisor(r);for(let h=0,v=0;h<n;h++){let k=e.slice(v,v+g-r+(h<l?0:1));v+=k.length;const j=b.reedSolomonComputeRemainder(k,I);h<l&&k.push(0),u.push(k.concat(j))}let N=[];for(let h=0;h<u[0].length;h++)u.forEach((v,k)=>{(h!=g-r||k>=l)&&N.push(v[h])});return x(N.length==f),N}drawCodewords(e){if(e.length!=Math.floor(b.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const f=t-r,g=(t+1&2)==0?this.size-1-n:n;!this.isFunction[g][f]&&o<e.length*8&&(this.modules[g][f]=d(e[o>>>3],7-(o&7)),o++)}}x(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let f=!1,l=0,g=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[r][u]==f?(l++,l==5?e+=b.PENALTY_N1:l>5&&e++):(this.finderPenaltyAddHistory(l,g),f||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),f=this.modules[r][u],l=1);e+=this.finderPenaltyTerminateAndCount(f,l,g)*b.PENALTY_N3}for(let r=0;r<this.size;r++){let f=!1,l=0,g=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[u][r]==f?(l++,l==5?e+=b.PENALTY_N1:l>5&&e++):(this.finderPenaltyAddHistory(l,g),f||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),f=this.modules[u][r],l=1);e+=this.finderPenaltyTerminateAndCount(f,l,g)*b.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let f=0;f<this.size-1;f++){const l=this.modules[r][f];l==this.modules[r][f+1]&&l==this.modules[r+1][f]&&l==this.modules[r+1][f+1]&&(e+=b.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((f,l)=>f+(l?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return x(0<=n&&n<=9),e+=n*b.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return x(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(b.getNumRawDataModules(e)/8)-b.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*b.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let r=0;r<o.length;r++)o[r]=b.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=b.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const r=n^t.shift();t.push(0),o.forEach((f,l)=>t[l]^=b.reedSolomonMultiply(f,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];x(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};c.MIN_VERSION=1,c.MAX_VERSION=40,c.PENALTY_N1=3,c.PENALTY_N2=3,c.PENALTY_N3=40,c.PENALTY_N4=10,c.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],c.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],a.QrCode=c;function s(w,e,o){if(e<0||e>31||w>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(w>>>t&1)}function d(w,e){return(w>>>e&1)!=0}function x(w){if(!w)throw new Error("Assertion error")}const m=class S{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)s(t,8,o);return new S(S.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!S.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);s(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new S(S.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!S.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=S.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=S.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),s(n,11,o)}return t<e.length&&s(S.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new S(S.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:S.isNumeric(e)?[S.makeNumeric(e)]:S.isAlphanumeric(e)?[S.makeAlphanumeric(e)]:[S.makeBytes(S.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)s(e,8,o);else if(e<16384)s(2,2,o),s(e,14,o);else if(e<1e6)s(6,3,o),s(e,21,o);else throw new RangeError("ECI assignment value out of range");return new S(S.Mode.ECI,0,o)}static isNumeric(e){return S.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return S.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const r=n.mode.numCharCountBits(o);if(n.numChars>=1<<r)return 1/0;t+=4+r+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let R=m;a.QrSegment=m})(_||(_={}));(a=>{(c=>{const s=class{constructor(x,m){this.ordinal=x,this.formatBits=m}};s.LOW=new s(0,1),s.MEDIUM=new s(1,0),s.QUARTILE=new s(2,3),s.HIGH=new s(3,2),c.Ecc=s})(a.QrCode||(a.QrCode={}))})(_||(_={}));(a=>{(c=>{const s=class{constructor(x,m){this.modeBits=x,this.numBitsCharCount=m}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};s.NUMERIC=new s(1,[10,12,14]),s.ALPHANUMERIC=new s(2,[9,11,13]),s.BYTE=new s(4,[8,16,16]),s.KANJI=new s(8,[8,10,12]),s.ECI=new s(7,[0,0,0]),c.Mode=s})(a.QrSegment||(a.QrSegment={}))})(_||(_={}));var Q=_;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Be={L:Q.QrCode.Ecc.LOW,M:Q.QrCode.Ecc.MEDIUM,Q:Q.QrCode.Ecc.QUARTILE,H:Q.QrCode.Ecc.HIGH},ge=128,xe="L",be="#FFFFFF",we="#000000",ye=!1,Ce=1,_e=4,$e=0,Qe=.1;function ve(a,c=0){const s=[];return a.forEach(function(d,x){let m=null;d.forEach(function(R,w){if(!R&&m!==null){s.push(`M${m+c} ${x+c}h${w-m}v1H${m+c}z`),m=null;return}if(w===d.length-1){if(!R)return;m===null?s.push(`M${w+c},${x+c} h1v1H${w+c}z`):s.push(`M${m+c},${x+c} h${w+1-m}v1H${m+c}z`);return}R&&m===null&&(m=w)})}),s.join("")}function Ee(a,c){return a.slice().map((s,d)=>d<c.y||d>=c.y+c.h?s:s.map((x,m)=>m<c.x||m>=c.x+c.w?x:!1))}function He(a,c,s,d){if(d==null)return null;const x=a.length+s*2,m=Math.floor(c*Qe),R=x/c,w=(d.width||m)*R,e=(d.height||m)*R,o=d.x==null?a.length/2-w/2:d.x*R,t=d.y==null?a.length/2-e/2:d.y*R,n=d.opacity==null?1:d.opacity;let r=null;if(d.excavate){let l=Math.floor(o),g=Math.floor(t),u=Math.ceil(w+o-l),I=Math.ceil(e+t-g);r={x:l,y:g,w:u,h:I}}const f=d.crossOrigin;return{x:o,y:t,h:e,w,excavation:r,opacity:n,crossOrigin:f}}function Ye(a,c){return c!=null?Math.max(Math.floor(c),0):a?_e:$e}function Ne({value:a,level:c,minVersion:s,includeMargin:d,marginSize:x,imageSettings:m,size:R,boostLevel:w}){let e=A.useMemo(()=>{const l=(Array.isArray(a)?a:[a]).reduce((g,u)=>(g.push(...Q.QrSegment.makeSegments(u)),g),[]);return Q.QrCode.encodeSegments(l,Be[c],s,void 0,void 0,w)},[a,c,s,w]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:r}=A.useMemo(()=>{let f=e.getModules();const l=Ye(d,x),g=f.length+l*2,u=He(f,R,l,m);return{cells:f,margin:l,numCells:g,calculatedImageSettings:u}},[e,R,m,d,x]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:r}}var Ge=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Se=A.forwardRef(function(c,s){const d=c,{value:x,size:m=ge,level:R=xe,bgColor:w=be,fgColor:e=we,includeMargin:o=ye,minVersion:t=Ce,boostLevel:n,marginSize:r,imageSettings:f}=d,g=ie(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:u}=g,I=ie(g,["style"]),N=f==null?void 0:f.src,h=A.useRef(null),v=A.useRef(null),k=A.useCallback(z=>{h.current=z,typeof s=="function"?s(z):s&&(s.current=z)},[s]),[j,O]=A.useState(!1),{margin:$,cells:H,numCells:Y,calculatedImageSettings:D}=Ne({value:x,level:R,minVersion:t,boostLevel:n,includeMargin:o,marginSize:r,imageSettings:f,size:m});A.useEffect(()=>{if(h.current!=null){const z=h.current,M=z.getContext("2d");if(!M)return;let U=H;const B=v.current,X=D!=null&&B!==null&&B.complete&&B.naturalHeight!==0&&B.naturalWidth!==0;X&&D.excavation!=null&&(U=Ee(H,D.excavation));const q=window.devicePixelRatio||1;z.height=z.width=m*q;const W=m/Y*q;M.scale(W,W),M.fillStyle=w,M.fillRect(0,0,Y,Y),M.fillStyle=e,Ge?M.fill(new Path2D(ve(U,$))):H.forEach(function(oe,se){oe.forEach(function(G,K){G&&M.fillRect(K+$,se+$,1,1)})}),D&&(M.globalAlpha=D.opacity),X&&M.drawImage(B,D.x+$,D.y+$,D.w,D.h)}}),A.useEffect(()=>{O(!1)},[N]);const F=re({height:m,width:m},u);let L=null;return N!=null&&(L=A.createElement("img",{src:N,key:N,style:{display:"none"},onLoad:()=>{O(!0)},ref:v,crossOrigin:D==null?void 0:D.crossOrigin})),A.createElement(A.Fragment,null,A.createElement("canvas",re({style:F,height:m,width:m,ref:k,role:"img"},I)),L)});Se.displayName="QRCodeCanvas";var Ve=A.forwardRef(function(c,s){const d=c,{value:x,size:m=ge,level:R=xe,bgColor:w=be,fgColor:e=we,includeMargin:o=ye,minVersion:t=Ce,boostLevel:n,title:r,marginSize:f,imageSettings:l}=d,g=ie(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:u,cells:I,numCells:N,calculatedImageSettings:h}=Ne({value:x,level:R,minVersion:t,boostLevel:n,includeMargin:o,marginSize:f,imageSettings:l,size:m});let v=I,k=null;l!=null&&h!=null&&(h.excavation!=null&&(v=Ee(I,h.excavation)),k=A.createElement("image",{href:l.src,height:h.h,width:h.w,x:h.x+u,y:h.y+u,preserveAspectRatio:"none",opacity:h.opacity,crossOrigin:h.crossOrigin}));const j=ve(v,u);return A.createElement("svg",re({height:m,width:m,viewBox:`0 0 ${N} ${N}`,ref:s,role:"img"},g),!!r&&A.createElement("title",null,r),A.createElement("path",{fill:w,d:`M0,0 h${N}v${N}H0z`,shapeRendering:"crispEdges"}),A.createElement("path",{fill:e,d:j,shapeRendering:"crispEdges"}),k)});Ve.displayName="QRCodeSVG";const V=a=>a.deposit.form,Xe=te([V],a=>a.record),qe=te([V],a=>!!a.initLoading),We=te([V],a=>!!a.saveLoading),Ke=te([V],a=>!!a.depositModal),Ze={selectInitLoading:qe,selectSaveLoading:We,selectRecord:Xe,selectDepositModal:Ke,selectRaw:V},fe=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],J=100,Je={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},pe=(a,c,s)=>{if(typeof a!="number"||!isFinite(a)||a===0)return"0";const d=s!==void 0?s:Je[c==null?void 0:c.toUpperCase()]||2;return a>0&&a<1e-6?a.toFixed(d>8?d:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:d}).format(a)},et=a=>typeof a!="number"||!isFinite(a)||a===0?"$0.00":a>0&&a<.01?`$${a.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(a);function ct(){var ae;const a=Oe(),c=Re(),s=((c==null?void 0:c.id)||"").toString(),d=ne(le.selectRows),x=ne(le.selectLoading),m=ne(Ze.selectDepositModal),[R,w]=E.useState(!1),[e,o]=E.useState("Address copied"),[t,n]=E.useState(!1),[r,f]=E.useState({}),[l,g]=E.useState(!1),[u,I]=E.useState(""),[N,h]=E.useState(null),[v,k]=E.useState([]),[j,O]=E.useState(null),[$,H]=E.useState(0),[Y,D]=E.useState("");E.useEffect(()=>{const p=async()=>{try{g(!0);const C=await De.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:fe.join(","),tsyms:"USD"}});if(C.data&&C.data.Response!=="Error"){const P={};fe.forEach(T=>{var Z;(Z=C.data[T])!=null&&Z.USD&&(P[T]=C.data[T].USD)}),f(P)}}catch(C){console.error("Failed to fetch exchange rates:",C)}finally{g(!1)}};p();const y=setInterval(p,5*60*1e3);return()=>clearInterval(y)},[]);const F=E.useMemo(()=>{if(!s||!r[s.toUpperCase()])return 0;const p=r[s.toUpperCase()];return J/p},[s,r]),L=E.useMemo(()=>F===0?"0":pe(F,s),[F,s]),z=E.useMemo(()=>Ae().shape({amount:Ie().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(F||0,`Minimum deposit is ${L} ${s}`),txid:ke().required("Transaction ID is required")}),[F,L,s]),M=Fe({resolver:Le.yupResolver(z),mode:"onChange",defaultValues:{amount:"",txid:""}});E.useCallback((p,y)=>pe(p,s,y),[s]);const U=E.useCallback(p=>et(p),[]);E.useEffect(()=>{a(je.doFetch())},[a]),E.useEffect(()=>{if(!d||!s)return;const p=d.find(y=>!y||!y.symbol?!1:y.symbol.toString().toLowerCase()===s.toString().toLowerCase());if(!p){h(null),k([]),O(null),I("");return}if(h(p),H(F),Array.isArray(p.network)&&p.network.length>0){const y=p.network.map((P,T)=>({_id:P._id??`${p._id??s}-network-${T}`,name:P.name??P.network??`${p.name??s} Network`,wallet:P.wallet??P.address??P.depositAddress??"",raw:P}));k(y);const C=y.find(P=>P._id===j)||y[0];O(C._id),I(C.wallet||"")}else if(p.address){const y={_id:p._id??`${s}-single`,name:`${p.name??s} Network`,wallet:p.address,raw:null};k([y]),O(y._id),I(y.wallet||"")}else k([]),O(null),I("")},[d,s,F]),E.useEffect(()=>{if(!j)return;const p=v.find(y=>y._id===j);p&&I(p.wallet||"")},[j,v]);const B=E.useCallback(async()=>{if(!u){console.error("No address to copy");return}try{await navigator.clipboard.writeText(u),o("Address copied"),w(!0),setTimeout(()=>w(!1),3e3)}catch(p){console.error("Failed to copy address: ",p),o("Failed to copy address"),w(!0),setTimeout(()=>w(!1),3e3)}},[u]),X=E.useCallback(()=>{var y;const p=document.querySelector(".qr-box canvas");if(!(p instanceof HTMLCanvasElement)){console.error("QR canvas not found"),o("Unable to save QR"),w(!0),setTimeout(()=>w(!1),3e3);return}try{const C=document.createElement("a"),P=(((y=v.find(T=>T._id===j))==null?void 0:y.name)||"deposit").replace(/\s+/g,"-");C.download=`${s}-${P}-address.png`,C.href=p.toDataURL("image/png"),C.click(),o("QR code saved"),w(!0),setTimeout(()=>w(!1),3e3)}catch(C){console.error("Failed to save QR code",C),o("Unable to save QR"),w(!0),setTimeout(()=>w(!1),3e3)}},[v,j,s]),q=E.useCallback(p=>{const y=p.target.value;O(y),M.setValue("amount",""),M.clearErrors("amount")},[M]),W=E.useCallback(async p=>{if(!j||!N||!u){console.error("Missing required information");return}n(!0);try{const y=new Date,C=y.getFullYear(),P=String(y.getMonth()+1).padStart(2,"0"),T=String(y.getDate()).padStart(2,"0"),Z=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),Me={orderno:`RE${C}${P}${T}${Z}`,amount:p.amount,txid:p.txid,rechargechannel:s,status:"pending",network:j,rechargetime:y.toISOString()};D(p.amount),await a(ce.doCreate(Me)),M.reset()}catch(y){console.error("Deposit submission error:",y)}finally{n(!1)}},[j,N,u,s,a,M]),oe=E.useCallback(()=>{a(ce.doClose()),D("")},[a]),se=E.useCallback(p=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${p?p.toUpperCase():""}.png`,[]),G=M.watch("amount"),K=E.useMemo(()=>{if(!G||!r[s==null?void 0:s.toUpperCase()])return 0;const p=Number(G);return isNaN(p)||!isFinite(p)?0:p*r[s.toUpperCase()]},[G,s,r]);return i.jsxs("div",{className:"deposit-container",children:[i.jsx("div",{className:"header",children:i.jsxs("div",{className:"nav-bar",children:[i.jsx(Pe,{to:"/deposit",className:"back-arrow","aria-label":"Back to deposits",children:i.jsx("i",{className:"fas fa-arrow-left"})}),i.jsxs("div",{className:"page-title",children:["Deposit ",s||"..."]})]})}),i.jsx("div",{className:"content-card",children:i.jsxs("div",{className:"deposit-content",children:[s&&r[s.toUpperCase()]&&i.jsxs("div",{className:"info-box",children:[i.jsxs("div",{className:"info-row",children:[i.jsx("span",{className:"info-label",children:"Minimum deposit:"}),i.jsxs("span",{className:"info-value",children:[L," ",s," (",U(J),")"]})]}),l&&i.jsxs("div",{className:"rate-loading",children:[i.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]})]}),i.jsxs("div",{className:"section",children:[i.jsx("div",{className:"section-label",children:"Deposit currency"}),i.jsxs("div",{className:"currency-display",children:[i.jsx("div",{className:"currency-icon","aria-hidden":!0,children:i.jsx("img",{src:se(s),alt:s,onError:p=>{const y=p.target;y.onerror=null,y.style.display="none";const C=y.parentElement;C&&(C.textContent=s&&s.charAt(0)||"C",C.style.background="#f0f0f0",C.style.color="#333",C.style.fontSize="12px",C.style.fontWeight="bold",C.style.display="inline-flex",C.style.alignItems="center",C.style.justifyContent="center",C.style.width="36px",C.style.height="36px",C.style.borderRadius="6px")}})}),i.jsxs("div",{className:"currency-details",children:[i.jsx("div",{className:"currency-name",children:(N==null?void 0:N.name)||s}),r[s==null?void 0:s.toUpperCase()]&&i.jsxs("div",{className:"currency-rate",children:["1 ",s," ≈ ",U(r[s.toUpperCase()])]})]})]}),i.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),v.length>0&&i.jsxs("div",{className:"section",children:[i.jsx("div",{className:"section-label",children:"Deposit network"}),i.jsxs("div",{className:"network-select-wrapper",children:[i.jsx("select",{className:"network-select",value:j||"",onChange:q,"aria-label":"Select deposit network",children:v.map(p=>i.jsx("option",{value:p._id,children:p.name},p._id))}),i.jsx("div",{className:"select-arrow",children:i.jsx("i",{className:"fas fa-chevron-down"})})]})]}),u&&i.jsxs("div",{className:"qr-section",children:[i.jsx("div",{className:"section-label",children:"Save QR code"}),i.jsxs("div",{className:"qr-container",children:[i.jsx("div",{className:"qr-box","aria-hidden":!0,children:i.jsx(Se,{value:u,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),i.jsxs("div",{className:"address-section",children:[i.jsx("div",{className:"address-label",children:"Wallet Address"}),i.jsx("div",{className:"address-text",id:"walletAddress",children:u}),i.jsxs("div",{className:"address-actions",children:[i.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:B,"aria-label":"Copy address",children:[i.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),i.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:X,"aria-label":"Save QR code",children:[i.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),u&&i.jsx(ze,{...M,children:i.jsxs("form",{onSubmit:M.handleSubmit(W),className:"deposit-form",children:[i.jsx("div",{className:"section",children:i.jsxs("div",{className:"form-group",children:[i.jsxs("div",{className:"input-with-usd",children:[i.jsx(de,{name:"amount",label:`Amount (${s})`,placeholder:`Minimum: ${L} ${s}`,className:"form-input"}),K>0&&i.jsxs("div",{className:"usd-value-display",children:["≈ ",U(K)]})]}),i.jsxs("div",{className:"min-amount-note",children:["Minimum deposit: ",L," ",s," (",U(J),")"]})]})}),i.jsx("div",{className:"section",children:i.jsx("div",{className:"form-group",children:i.jsx(de,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"form-input"})})}),i.jsx("div",{className:"form-actions",children:i.jsx("button",{type:"submit",className:"submit-btn",disabled:!M.formState.isValid||t||l,"aria-disabled":!M.formState.isValid||t||l,children:t?i.jsxs(i.Fragment,{children:[i.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):l?i.jsxs(i.Fragment,{children:[i.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),x&&i.jsxs("div",{className:"loading-section",role:"status","aria-live":"polite",children:[i.jsx("div",{className:"spinner"}),i.jsx("div",{children:"Loading deposit information..."})]}),!x&&!u&&s&&i.jsxs("div",{className:"error-section",role:"alert",children:[i.jsx("i",{className:"fas fa-exclamation-triangle"}),i.jsxs("div",{children:["No deposit address found for ",s]}),i.jsx("div",{className:"error-note",children:"Please contact support or try another currency."})]}),i.jsxs("div",{className:"hint-section",children:[i.jsx("div",{className:"hint-title",children:"Important Notes"}),i.jsxs("div",{className:"hint-content",children:[i.jsxs("div",{className:"hint-item",children:["1. Send only ",s," to this deposit address. Sending other currencies may result in permanent loss."]}),i.jsxs("div",{className:"hint-item",children:["2. Ensure you are using the correct network (",(ae=v.find(p=>p._id===j))==null?void 0:ae.name,")."]}),i.jsxs("div",{className:"hint-item",children:["3. Minimum deposit amount: ",L," ",s," ($",J," USD equivalent)"]}),i.jsx("div",{className:"hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),i.jsx("div",{className:"hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),i.jsxs("div",{className:`toast ${R?"visible":""}`,role:"status","aria-live":"polite",children:[i.jsx("i",{className:"fas fa-check-circle toast-icon"}),e]}),i.jsx(Te,{isOpen:m,onClose:oe,type:"deposit",amount:Y,coinType:s}),i.jsx("style",{children:`
        /* ── Base ── */
        .deposit-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }

        /* ── Top bar ── */
        .header {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          background: #0e0f14;
          border-bottom: 1px solid #1e1f26;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .back-arrow {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          color: #fff;
          font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .back-arrow:hover { background: #2a2a2e; border-color: #fd4b4e; color: #fd4b4e; }
        .page-title {
          color: #fff; font-size: 15px; font-weight: 700;
          position: absolute; left: 50%; transform: translateX(-50%);
        }

        /* ── Content ── */
        .content-card {
          background: #0e0f14;
          padding: 20px 16px;
          min-height: calc(100vh - 56px);
        }
        .deposit-content { width: 100%; }

        /* ── Info box (min deposit) ── */
        .info-box {
          background: rgba(38,161,123,0.08);
          border: 1px solid rgba(38,161,123,0.25);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 18px;
        }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
        .info-label { font-size: 12px; color: #26a17b; font-weight: 600; }
        .info-value { font-size: 12px; font-weight: 700; color: #e8e8e8; }
        .rate-loading { font-size: 11px; color: #555; text-align: center; margin-top: 4px; }

        /* ── Section ── */
        .section { margin-bottom: 16px; }
        .section-label {
          font-size: 12px; font-weight: 700; color: #888;
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
        }
        .section-note { font-size: 11px; color: #444; margin-top: 6px; font-style: italic; }

        /* ── Currency display ── */
        .currency-display {
          display: flex; align-items: center; gap: 12px;
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 14px; padding: 14px;
        }
        .currency-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: #0e0f14; border: 1px solid #1e1f26;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .currency-icon img { width: 100%; height: 100%; object-fit: contain; }
        .currency-details { flex: 1; }
        .currency-name { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .currency-rate { font-size: 11.5px; color: #555; }

        /* ── Network select ── */
        .network-select-wrapper { position: relative; }
        .network-select {
          width: 100%; padding: 13px 42px 13px 14px;
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 12px; color: #e8e8e8;
          font-size: 14px; font-weight: 600;
          appearance: none; cursor: pointer; outline: none;
          transition: border-color 0.2s;
        }
        .network-select:focus { border-color: #fd4b4e; }
        .select-arrow {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          color: #555; pointer-events: none; font-size: 12px;
        }

        /* ── QR section ── */
        .qr-section { margin-bottom: 20px; }
        .qr-container {
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .qr-box {
          padding: 12px; background: #fff; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .qr-box canvas { border-radius: 6px; display: block; }
        .address-section { width: 100%; text-align: center; }
        .address-label { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .address-text {
          font-size: 12px; color: #aaa;
          background: #0e0f14; border: 1px solid #1e1f26;
          padding: 12px; border-radius: 10px;
          word-break: break-all; font-family: 'Courier New', monospace;
          line-height: 1.5; margin-bottom: 14px;
        }
        .address-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .action-btn {
          flex: 1; min-width: 120px;
          padding: 11px 14px; border: none; border-radius: 10px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .action-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .copy-btn { background: #fd4b4e; color: #fff; }
        .save-btn { background: #15161c; color: #aaa; border: 1.5px solid #2a2a2e; }
        .save-btn:hover { border-color: #fd4b4e; color: #fd4b4e; }

        /* ── Form ── */
        .deposit-form { margin-top: 4px; }
        .form-group { margin-bottom: 4px; }
        .input-with-usd { position: relative; }
        /* FieldFormItem renders its own input — target it via global selector */
        .deposit-form input[type="text"],
        .deposit-form input[type="number"],
        .deposit-form input {
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 12px !important;
          color: #e8e8e8 !important;
          padding: 13px 14px !important;
          font-size: 14px !important;
          width: 100% !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: border-color 0.2s !important;
        }
        .deposit-form input:focus {
          border-color: #fd4b4e !important;
        }
        .deposit-form label {
          color: #888 !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 6px !important;
          display: block !important;
        }
        .usd-value-display {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 12px; color: #555;
          background: #15161c; padding: 2px 8px; border-radius: 6px;
          pointer-events: none;
        }
        .min-amount-note { font-size: 11.5px; color: #444; margin-top: 6px; }

        /* ── Submit ── */
        .form-actions { margin-top: 20px; }
        .submit-btn {
          width: 100%; padding: 14px;
          background: #fd4b4e; color: #fff;
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .submit-btn:hover:not(:disabled) { background: #e8393c; transform: translateY(-1px); }
        .submit-btn:disabled { background: #2a2a2e; color: #444; cursor: not-allowed; }

        /* ── Spinner ── */
        .fa-spin { animation: depSpin 1s infinite linear; }
        @keyframes depSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-section { text-align: center; padding: 40px 0; color: #555; }
        .spinner {
          border: 3px solid #1e1f26; border-top: 3px solid #fd4b4e;
          border-radius: 50%; width: 40px; height: 40px;
          animation: depSpin 1s linear infinite; margin: 0 auto 16px;
        }

        /* ── Error state ── */
        .error-section { text-align: center; padding: 40px 20px; }
        .error-section i { font-size: 40px; color: #fd4b4e; margin-bottom: 16px; display: block; }
        .error-section div { color: #aaa; font-size: 14px; }
        .error-note { margin-top: 8px; font-size: 12px; color: #555; }

        /* ── Important notes ── */
        .hint-section {
          margin-top: 24px; background: #15161c;
          border: 1px solid #1e1f26; border-radius: 16px; padding: 18px;
        }
        .hint-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 12px; }
        .hint-content { display: flex; flex-direction: column; gap: 9px; }
        .hint-item {
          font-size: 11.5px; color: #555; line-height: 1.5;
          padding-left: 14px; position: relative;
        }
        .hint-item::before { content: "•"; position: absolute; left: 0; color: #fd4b4e; font-weight: bold; }

        /* ── Toast ── */
        .toast {
          position: fixed; bottom: 24px; left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: #15161c; border: 1px solid #2a2a2e;
          color: #fff; padding: 12px 22px; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .toast.visible { transform: translateX(-50%) translateY(0); }
        .toast-icon { color: #26a17b; }

      `})]})}export{ct as default};
