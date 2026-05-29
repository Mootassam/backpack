import{k,T as Se,u as ie,Y as ae,p as N,$ as Me,a0 as Re,a1 as Ae,Z as ke,a2 as je,j as n,L as Ie,A as Pe}from"./index-54206aa9.js";import{u as De,y as ze,F as Fe}from"./FormErrors-a2b7d0a7.js";import{F as le}from"./FieldFormItem-b3e0fbf9.js";import{u as Le}from"./useDispatch-aee37e04.js";var Te=Object.defineProperty,J=Object.getOwnPropertySymbols,fe=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable,ce=(l,a,s)=>a in l?Te(l,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[a]=s,oe=(l,a)=>{for(var s in a||(a={}))fe.call(a,s)&&ce(l,s,a[s]);if(J)for(var s of J(a))me.call(a,s)&&ce(l,s,a[s]);return l},se=(l,a)=>{var s={};for(var u in l)fe.call(l,u)&&a.indexOf(u)<0&&(s[u]=l[u]);if(l!=null&&J)for(var u of J(l))a.indexOf(u)<0&&me.call(l,u)&&(s[u]=l[u]);return s};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var _;(l=>{const a=class b{constructor(e,o,t,r){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let i=[];for(let c=0;c<this.size;c++)i.push(!1);for(let c=0;c<this.size;c++)this.modules.push(i.slice()),this.isFunction.push(i.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(t);if(this.drawCodewords(d),r==-1){let c=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const m=this.getPenaltyScore();m<c&&(r=g,c=m),this.applyMask(g)}}x(0<=r&&r<=7),this.mask=r,this.applyMask(r),this.drawFormatBits(r),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return b.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return b.encodeSegments([t],o)}static encodeSegments(e,o,t=1,r=40,i=-1,d=!0){if(!(b.MIN_VERSION<=t&&t<=r&&r<=b.MAX_VERSION)||i<-1||i>7)throw new RangeError("Invalid value");let c,g;for(c=t;;c++){const h=b.getNumDataCodewords(c,o)*8,M=v.getTotalBits(e,c);if(M<=h){g=M;break}if(c>=r)throw new RangeError("Data too long")}for(const h of[b.Ecc.MEDIUM,b.Ecc.QUARTILE,b.Ecc.HIGH])d&&g<=b.getNumDataCodewords(c,h)*8&&(o=h);let m=[];for(const h of e){s(h.mode.modeBits,4,m),s(h.numChars,h.mode.numCharCountBits(c),m);for(const M of h.getData())m.push(M)}x(m.length==g);const S=b.getNumDataCodewords(c,o)*8;x(m.length<=S),s(0,Math.min(4,S-m.length),m),s(0,(8-m.length%8)%8,m),x(m.length%8==0);for(let h=236;m.length<S;h^=253)s(h,8,m);let E=[];for(;E.length*8<m.length;)E.push(0);return m.forEach((h,M)=>E[M>>>3]|=h<<7-(M&7)),new b(c,o,E,i)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let r=0;r<o;r++)t==0&&r==0||t==0&&r==o-1||t==o-1&&r==0||this.drawAlignmentPattern(e[t],e[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let i=0;i<10;i++)t=t<<1^(t>>>9)*1335;const r=(o<<10|t)^21522;x(r>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,u(r,i));this.setFunctionModule(8,7,u(r,6)),this.setFunctionModule(8,8,u(r,7)),this.setFunctionModule(7,8,u(r,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,u(r,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,u(r,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,u(r,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;x(o>>>18==0);for(let t=0;t<18;t++){const r=u(o,t),i=this.size-11+t%3,d=Math.floor(t/3);this.setFunctionModule(i,d,r),this.setFunctionModule(d,i,r)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let r=-4;r<=4;r++){const i=Math.max(Math.abs(r),Math.abs(t)),d=e+r,c=o+t;0<=d&&d<this.size&&0<=c&&c<this.size&&this.setFunctionModule(d,c,i!=2&&i!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)this.setFunctionModule(e+r,o+t,Math.max(Math.abs(r),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=b.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const r=b.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],i=b.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],d=Math.floor(b.getNumRawDataModules(o)/8),c=r-d%r,g=Math.floor(d/r);let m=[];const S=b.reedSolomonComputeDivisor(i);for(let h=0,M=0;h<r;h++){let A=e.slice(M,M+g-i+(h<c?0:1));M+=A.length;const O=b.reedSolomonComputeRemainder(A,S);h<c&&A.push(0),m.push(A.concat(O))}let E=[];for(let h=0;h<m[0].length;h++)m.forEach((M,A)=>{(h!=g-i||A>=c)&&E.push(M[h])});return x(E.length==d),E}drawCodewords(e){if(e.length!=Math.floor(b.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let r=0;r<this.size;r++)for(let i=0;i<2;i++){const d=t-i,g=(t+1&2)==0?this.size-1-r:r;!this.isFunction[g][d]&&o<e.length*8&&(this.modules[g][d]=u(e[o>>>3],7-(o&7)),o++)}}x(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let r;switch(e){case 0:r=(t+o)%2==0;break;case 1:r=o%2==0;break;case 2:r=t%3==0;break;case 3:r=(t+o)%3==0;break;case 4:r=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:r=t*o%2+t*o%3==0;break;case 6:r=(t*o%2+t*o%3)%2==0;break;case 7:r=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&r&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let i=0;i<this.size;i++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let m=0;m<this.size;m++)this.modules[i][m]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[i][m],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let i=0;i<this.size;i++){let d=!1,c=0,g=[0,0,0,0,0,0,0];for(let m=0;m<this.size;m++)this.modules[m][i]==d?(c++,c==5?e+=b.PENALTY_N1:c>5&&e++):(this.finderPenaltyAddHistory(c,g),d||(e+=this.finderPenaltyCountPatterns(g)*b.PENALTY_N3),d=this.modules[m][i],c=1);e+=this.finderPenaltyTerminateAndCount(d,c,g)*b.PENALTY_N3}for(let i=0;i<this.size-1;i++)for(let d=0;d<this.size-1;d++){const c=this.modules[i][d];c==this.modules[i][d+1]&&c==this.modules[i+1][d]&&c==this.modules[i+1][d+1]&&(e+=b.PENALTY_N2)}let o=0;for(const i of this.modules)o=i.reduce((d,c)=>d+(c?1:0),o);const t=this.size*this.size,r=Math.ceil(Math.abs(o*20-t*10)/t)-1;return x(0<=r&&r<=9),e+=r*b.PENALTY_N4,x(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let r=this.size-7;t.length<e;r-=o)t.splice(1,0,r);return t}}static getNumRawDataModules(e){if(e<b.MIN_VERSION||e>b.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return x(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(b.getNumRawDataModules(e)/8)-b.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*b.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let r=0;r<e-1;r++)o.push(0);o.push(1);let t=1;for(let r=0;r<e;r++){for(let i=0;i<o.length;i++)o[i]=b.reedSolomonMultiply(o[i],t),i+1<o.length&&(o[i]^=o[i+1]);t=b.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(r=>0);for(const r of e){const i=r^t.shift();t.push(0),o.forEach((d,c)=>t[c]^=b.reedSolomonMultiply(d,i))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let r=7;r>=0;r--)t=t<<1^(t>>>7)*285,t^=(o>>>r&1)*e;return x(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];x(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};a.MIN_VERSION=1,a.MAX_VERSION=40,a.PENALTY_N1=3,a.PENALTY_N2=3,a.PENALTY_N3=40,a.PENALTY_N4=10,a.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],a.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=a;function s(C,e,o){if(e<0||e>31||C>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(C>>>t&1)}function u(C,e){return(C>>>e&1)!=0}function x(C){if(!C)throw new Error("Assertion error")}const p=class R{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)s(t,8,o);return new R(R.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!R.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const r=Math.min(e.length-t,3);s(parseInt(e.substring(t,t+r),10),r*3+1,o),t+=r}return new R(R.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!R.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let r=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;r+=R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),s(r,11,o)}return t<e.length&&s(R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new R(R.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:R.isNumeric(e)?[R.makeNumeric(e)]:R.isAlphanumeric(e)?[R.makeAlphanumeric(e)]:[R.makeBytes(R.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)s(e,8,o);else if(e<16384)s(2,2,o),s(e,14,o);else if(e<1e6)s(6,3,o),s(e,21,o);else throw new RangeError("ECI assignment value out of range");return new R(R.Mode.ECI,0,o)}static isNumeric(e){return R.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return R.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const r of e){const i=r.mode.numCharCountBits(o);if(r.numChars>=1<<i)return 1/0;t+=4+i+r.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};p.NUMERIC_REGEX=/^[0-9]*$/,p.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,p.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let v=p;l.QrSegment=p})(_||(_={}));(l=>{(a=>{const s=class{constructor(x,p){this.ordinal=x,this.formatBits=p}};s.LOW=new s(0,1),s.MEDIUM=new s(1,0),s.QUARTILE=new s(2,3),s.HIGH=new s(3,2),a.Ecc=s})(l.QrCode||(l.QrCode={}))})(_||(_={}));(l=>{(a=>{const s=class{constructor(x,p){this.modeBits=x,this.numBitsCharCount=p}numCharCountBits(x){return this.numBitsCharCount[Math.floor((x+7)/17)]}};s.NUMERIC=new s(1,[10,12,14]),s.ALPHANUMERIC=new s(2,[9,11,13]),s.BYTE=new s(4,[8,16,16]),s.KANJI=new s(8,[8,10,12]),s.ECI=new s(7,[0,0,0]),a.Mode=s})(l.QrSegment||(l.QrSegment={}))})(_||(_={}));var $=_;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Ue={L:$.QrCode.Ecc.LOW,M:$.QrCode.Ecc.MEDIUM,Q:$.QrCode.Ecc.QUARTILE,H:$.QrCode.Ecc.HIGH},pe=128,he="L",ge="#FFFFFF",xe="#000000",be=!1,we=1,Oe=4,Be=0,_e=.1;function ye(l,a=0){const s=[];return l.forEach(function(u,x){let p=null;u.forEach(function(v,C){if(!v&&p!==null){s.push(`M${p+a} ${x+a}h${C-p}v1H${p+a}z`),p=null;return}if(C===u.length-1){if(!v)return;p===null?s.push(`M${C+a},${x+a} h1v1H${C+a}z`):s.push(`M${p+a},${x+a} h${C+1-p}v1H${p+a}z`);return}v&&p===null&&(p=C)})}),s.join("")}function ve(l,a){return l.slice().map((s,u)=>u<a.y||u>=a.y+a.h?s:s.map((x,p)=>p<a.x||p>=a.x+a.w?x:!1))}function $e(l,a,s,u){if(u==null)return null;const x=l.length+s*2,p=Math.floor(a*_e),v=x/a,C=(u.width||p)*v,e=(u.height||p)*v,o=u.x==null?l.length/2-C/2:u.x*v,t=u.y==null?l.length/2-e/2:u.y*v,r=u.opacity==null?1:u.opacity;let i=null;if(u.excavate){let c=Math.floor(o),g=Math.floor(t),m=Math.ceil(C+o-c),S=Math.ceil(e+t-g);i={x:c,y:g,w:m,h:S}}const d=u.crossOrigin;return{x:o,y:t,h:e,w:C,excavation:i,opacity:r,crossOrigin:d}}function Qe(l,a){return a!=null?Math.max(Math.floor(a),0):l?Oe:Be}function Ne({value:l,level:a,minVersion:s,includeMargin:u,marginSize:x,imageSettings:p,size:v,boostLevel:C}){let e=k.useMemo(()=>{const c=(Array.isArray(l)?l:[l]).reduce((g,m)=>(g.push(...$.QrSegment.makeSegments(m)),g),[]);return $.QrCode.encodeSegments(c,Ue[a],s,void 0,void 0,C)},[l,a,s,C]);const{cells:o,margin:t,numCells:r,calculatedImageSettings:i}=k.useMemo(()=>{let d=e.getModules();const c=Qe(u,x),g=d.length+c*2,m=$e(d,v,c,p);return{cells:d,margin:c,numCells:g,calculatedImageSettings:m}},[e,v,p,u,x]);return{qrcode:e,margin:t,cells:o,numCells:r,calculatedImageSettings:i}}var He=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ce=k.forwardRef(function(a,s){const u=a,{value:x,size:p=pe,level:v=he,bgColor:C=ge,fgColor:e=xe,includeMargin:o=be,minVersion:t=we,boostLevel:r,marginSize:i,imageSettings:d}=u,g=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:m}=g,S=se(g,["style"]),E=d==null?void 0:d.src,h=k.useRef(null),M=k.useRef(null),A=k.useCallback(P=>{h.current=P,typeof s=="function"?s(P):s&&(s.current=P)},[s]),[O,I]=k.useState(!1),{margin:F,cells:Y,numCells:Q,calculatedImageSettings:D}=Ne({value:x,level:v,minVersion:t,boostLevel:r,includeMargin:o,marginSize:i,imageSettings:d,size:p});k.useEffect(()=>{if(h.current!=null){const P=h.current,L=P.getContext("2d");if(!L)return;let z=Y;const U=M.current,V=D!=null&&U!==null&&U.complete&&U.naturalHeight!==0&&U.naturalWidth!==0;V&&D.excavation!=null&&(z=ve(Y,D.excavation));const X=window.devicePixelRatio||1;P.height=P.width=p*X;const q=p/Q*X;L.scale(q,q),L.fillStyle=C,L.fillRect(0,0,Q,Q),L.fillStyle=e,He?L.fill(new Path2D(ye(z,F))):Y.forEach(function(ee,W){ee.forEach(function(te,H){te&&L.fillRect(H+F,W+F,1,1)})}),D&&(L.globalAlpha=D.opacity),V&&L.drawImage(U,D.x+F,D.y+F,D.w,D.h)}}),k.useEffect(()=>{I(!1)},[E]);const G=oe({height:p,width:p},m);let T=null;return E!=null&&(T=k.createElement("img",{src:E,key:E,style:{display:"none"},onLoad:()=>{I(!0)},ref:M,crossOrigin:D==null?void 0:D.crossOrigin})),k.createElement(k.Fragment,null,k.createElement("canvas",oe({style:G,height:p,width:p,ref:A,role:"img"},S)),T)});Ce.displayName="QRCodeCanvas";var Ye=k.forwardRef(function(a,s){const u=a,{value:x,size:p=pe,level:v=he,bgColor:C=ge,fgColor:e=xe,includeMargin:o=be,minVersion:t=we,boostLevel:r,title:i,marginSize:d,imageSettings:c}=u,g=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:m,cells:S,numCells:E,calculatedImageSettings:h}=Ne({value:x,level:v,minVersion:t,boostLevel:r,includeMargin:o,marginSize:d,imageSettings:c,size:p});let M=S,A=null;c!=null&&h!=null&&(h.excavation!=null&&(M=ve(S,h.excavation)),A=k.createElement("image",{href:c.src,height:h.h,width:h.w,x:h.x+m,y:h.y+m,preserveAspectRatio:"none",opacity:h.opacity,crossOrigin:h.crossOrigin}));const O=ye(M,m);return k.createElement("svg",oe({height:p,width:p,viewBox:`0 0 ${E} ${E}`,ref:s,role:"img"},g),!!i&&k.createElement("title",null,i),k.createElement("path",{fill:C,d:`M0,0 h${E}v${E}H0z`,shapeRendering:"crispEdges"}),k.createElement("path",{fill:e,d:O,shapeRendering:"crispEdges"}),A)});Ye.displayName="QRCodeSVG";const de=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Z=100,Ge={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},ue=(l,a,s)=>{if(typeof l!="number"||!isFinite(l)||l===0)return"0";const u=s!==void 0?s:Ge[a==null?void 0:a.toUpperCase()]||2;return l>0&&l<1e-6?l.toFixed(u>8?u:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:u}).format(l)},Ve=l=>typeof l!="number"||!isFinite(l)||l===0?"$0.00":l>0&&l<.01?`$${l.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(l);function tt(){var ne;const l=Le(),a=Se(),s=((a==null?void 0:a.id)||"").toString(),u=ie(ae.selectRows),x=ie(ae.selectLoading),[p,v]=N.useState(!1),[C,e]=N.useState("Address copied"),[o,t]=N.useState(!1),[r,i]=N.useState(!1),[d,c]=N.useState({}),[g,m]=N.useState(!1),[S,E]=N.useState(""),[h,M]=N.useState(null),[A,O]=N.useState([]),[I,F]=N.useState(null),[Y,Q]=N.useState(0),[D,G]=N.useState("");N.useEffect(()=>{const f=async()=>{try{m(!0);const y=await Pe.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:de.join(","),tsyms:"USD"}});if(y.data&&y.data.Response!=="Error"){const j={};de.forEach(B=>{var K;(K=y.data[B])!=null&&K.USD&&(j[B]=y.data[B].USD)}),c(j)}}catch(y){console.error("Failed to fetch exchange rates:",y)}finally{m(!1)}};f();const w=setInterval(f,5*60*1e3);return()=>clearInterval(w)},[]);const T=N.useMemo(()=>{if(!s||!d[s.toUpperCase()])return 0;const f=d[s.toUpperCase()];return Z/f},[s,d]),P=N.useMemo(()=>T===0?"0":ue(T,s),[T,s]),L=N.useMemo(()=>Me().shape({amount:Re().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(T||0,`Minimum deposit is ${P} ${s}`),txid:Ae().required("Transaction ID is required")}),[T,P,s]),z=De({resolver:ze.yupResolver(L),mode:"onChange",defaultValues:{amount:"",txid:""}});N.useCallback((f,w)=>ue(f,s,w),[s]);const U=N.useCallback(f=>Ve(f),[]);N.useEffect(()=>{l(ke.doFetch())},[l]),N.useEffect(()=>{if(!u||!s)return;const f=u.find(w=>!w||!w.symbol?!1:w.symbol.toString().toLowerCase()===s.toString().toLowerCase());if(!f){M(null),O([]),F(null),E("");return}if(M(f),Q(T),Array.isArray(f.network)&&f.network.length>0){const w=f.network.map((j,B)=>({_id:j._id??`${f._id??s}-network-${B}`,name:j.name??j.network??`${f.name??s} Network`,wallet:j.wallet??j.address??j.depositAddress??"",raw:j}));O(w);const y=w.find(j=>j._id===I)||w[0];F(y._id),E(y.wallet||"")}else if(f.address){const w={_id:f._id??`${s}-single`,name:`${f.name??s} Network`,wallet:f.address,raw:null};O([w]),F(w._id),E(w.wallet||"")}else O([]),F(null),E("")},[u,s,T]),N.useEffect(()=>{if(!I)return;const f=A.find(w=>w._id===I);f&&E(f.wallet||"")},[I,A]);const V=N.useCallback(async()=>{if(!S){console.error("No address to copy");return}try{await navigator.clipboard.writeText(S),e("Address copied"),v(!0),setTimeout(()=>v(!1),3e3)}catch(f){console.error("Failed to copy address: ",f),e("Failed to copy address"),v(!0),setTimeout(()=>v(!1),3e3)}},[S]),X=N.useCallback(()=>{var w;const f=document.querySelector(".qr-box canvas");if(!(f instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3);return}try{const y=document.createElement("a"),j=(((w=A.find(B=>B._id===I))==null?void 0:w.name)||"deposit").replace(/\s+/g,"-");y.download=`${s}-${j}-address.png`,y.href=f.toDataURL("image/png"),y.click(),e("QR code saved"),v(!0),setTimeout(()=>v(!1),3e3)}catch(y){console.error("Failed to save QR code",y),e("Unable to save QR"),v(!0),setTimeout(()=>v(!1),3e3)}},[A,I,s]),q=N.useCallback(f=>{const w=f.target.value;F(w),z.setValue("amount",""),z.clearErrors("amount")},[z]),ee=N.useCallback(async f=>{if(!I||!h||!S){console.error("Missing required information");return}t(!0);try{const w=new Date,y=w.getFullYear(),j=String(w.getMonth()+1).padStart(2,"0"),B=String(w.getDate()).padStart(2,"0"),K=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),Ee={orderno:`RE${y}${j}${B}${K}`,amount:f.amount,txid:f.txid,rechargechannel:s,status:"pending",network:I,rechargetime:w.toISOString()};G(f.amount),await l(je.doCreate(Ee)),i(!0),z.reset()}catch(w){console.error("Deposit submission error:",w)}finally{t(!1)}},[I,h,S,s,l,z]),W=N.useCallback(()=>{i(!1),G("")},[]),te=N.useCallback(f=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${f?f.toUpperCase():""}.png`,[]),H=z.watch("amount"),re=N.useMemo(()=>{if(!H||!d[s==null?void 0:s.toUpperCase()])return 0;const f=Number(H);return isNaN(f)||!isFinite(f)?0:f*d[s.toUpperCase()]},[H,s,d]);return n.jsxs("div",{className:"deposit-container",children:[n.jsx("div",{className:"header",children:n.jsxs("div",{className:"nav-bar",children:[n.jsx(Ie,{to:"/deposit",className:"back-arrow","aria-label":"Back to deposits",children:n.jsx("i",{className:"fas fa-arrow-left"})}),n.jsxs("div",{className:"page-title",children:["Deposit ",s||"..."]})]})}),n.jsx("div",{className:"content-card",children:n.jsxs("div",{className:"deposit-content",children:[s&&d[s.toUpperCase()]&&n.jsxs("div",{className:"info-box",children:[n.jsxs("div",{className:"info-row",children:[n.jsx("span",{className:"info-label",children:"Minimum deposit:"}),n.jsxs("span",{className:"info-value",children:[P," ",s," (",U(Z),")"]})]}),g&&n.jsxs("div",{className:"rate-loading",children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]})]}),n.jsxs("div",{className:"section",children:[n.jsx("div",{className:"section-label",children:"Deposit currency"}),n.jsxs("div",{className:"currency-display",children:[n.jsx("div",{className:"currency-icon","aria-hidden":!0,children:n.jsx("img",{src:te(s),alt:s,onError:f=>{const w=f.target;w.onerror=null,w.style.display="none";const y=w.parentElement;y&&(y.textContent=s&&s.charAt(0)||"C",y.style.background="#f0f0f0",y.style.color="#333",y.style.fontSize="12px",y.style.fontWeight="bold",y.style.display="inline-flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.width="36px",y.style.height="36px",y.style.borderRadius="6px")}})}),n.jsxs("div",{className:"currency-details",children:[n.jsx("div",{className:"currency-name",children:(h==null?void 0:h.name)||s}),d[s==null?void 0:s.toUpperCase()]&&n.jsxs("div",{className:"currency-rate",children:["1 ",s," ≈ ",U(d[s.toUpperCase()])]})]})]}),n.jsx("div",{className:"section-note",children:"Fixed currency - cannot be changed"})]}),A.length>0&&n.jsxs("div",{className:"section",children:[n.jsx("div",{className:"section-label",children:"Deposit network"}),n.jsxs("div",{className:"network-select-wrapper",children:[n.jsx("select",{className:"network-select",value:I||"",onChange:q,"aria-label":"Select deposit network",children:A.map(f=>n.jsx("option",{value:f._id,children:f.name},f._id))}),n.jsx("div",{className:"select-arrow",children:n.jsx("i",{className:"fas fa-chevron-down"})})]})]}),S&&n.jsxs("div",{className:"qr-section",children:[n.jsx("div",{className:"section-label",children:"Save QR code"}),n.jsxs("div",{className:"qr-container",children:[n.jsx("div",{className:"qr-box","aria-hidden":!0,children:n.jsx(Ce,{value:S,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),n.jsxs("div",{className:"address-section",children:[n.jsx("div",{className:"address-label",children:"Wallet Address"}),n.jsx("div",{className:"address-text",id:"walletAddress",children:S}),n.jsxs("div",{className:"address-actions",children:[n.jsxs("button",{type:"button",className:"action-btn copy-btn",onClick:V,"aria-label":"Copy address",children:[n.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),n.jsxs("button",{type:"button",className:"action-btn save-btn",onClick:X,"aria-label":"Save QR code",children:[n.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),S&&n.jsx(Fe,{...z,children:n.jsxs("form",{onSubmit:z.handleSubmit(ee),className:"deposit-form",children:[n.jsx("div",{className:"section",children:n.jsxs("div",{className:"form-group",children:[n.jsxs("div",{className:"input-with-usd",children:[n.jsx(le,{name:"amount",label:`Amount (${s})`,placeholder:`Minimum: ${P} ${s}`,className:"form-input"}),re>0&&n.jsxs("div",{className:"usd-value-display",children:["≈ ",U(re)]})]}),n.jsxs("div",{className:"min-amount-note",children:["Minimum deposit: ",P," ",s," (",U(Z),")"]})]})}),n.jsx("div",{className:"section",children:n.jsx("div",{className:"form-group",children:n.jsx(le,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"form-input"})})}),n.jsx("div",{className:"form-actions",children:n.jsx("button",{type:"submit",className:"submit-btn",disabled:!z.formState.isValid||o||g,"aria-disabled":!z.formState.isValid||o||g,children:o?n.jsxs(n.Fragment,{children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):g?n.jsxs(n.Fragment,{children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),x&&n.jsxs("div",{className:"loading-section",role:"status","aria-live":"polite",children:[n.jsx("div",{className:"spinner"}),n.jsx("div",{children:"Loading deposit information..."})]}),!x&&!S&&s&&n.jsxs("div",{className:"error-section",role:"alert",children:[n.jsx("i",{className:"fas fa-exclamation-triangle"}),n.jsxs("div",{children:["No deposit address found for ",s]}),n.jsx("div",{className:"error-note",children:"Please contact support or try another currency."})]}),n.jsxs("div",{className:"hint-section",children:[n.jsx("div",{className:"hint-title",children:"Important Notes"}),n.jsxs("div",{className:"hint-content",children:[n.jsxs("div",{className:"hint-item",children:["1. Send only ",s," to this deposit address. Sending other currencies may result in permanent loss."]}),n.jsxs("div",{className:"hint-item",children:["2. Ensure you are using the correct network (",(ne=A.find(f=>f._id===I))==null?void 0:ne.name,")."]}),n.jsxs("div",{className:"hint-item",children:["3. Minimum deposit amount: ",P," ",s," ($",Z," USD equivalent)"]}),n.jsx("div",{className:"hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),n.jsx("div",{className:"hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),n.jsxs("div",{className:`toast ${p?"visible":""}`,role:"status","aria-live":"polite",children:[n.jsx("i",{className:"fas fa-check-circle toast-icon"}),C]}),r&&n.jsx("div",{className:"modal-overlay",role:"dialog","aria-modal":"true",children:n.jsxs("div",{className:"modal-content",children:[n.jsxs("div",{className:"modal-header",children:[n.jsx("h3",{children:"Deposit Submitted Successfully"}),n.jsx("button",{className:"modal-close",onClick:W,"aria-label":"Close",children:n.jsx("i",{className:"fas fa-times"})})]}),n.jsxs("div",{className:"modal-body",children:[n.jsx("div",{className:"success-icon",children:n.jsx("i",{className:"fas fa-check-circle"})}),n.jsxs("div",{className:"success-message",children:["Your deposit of ",D," ",s," has been submitted for processing."]}),n.jsxs("div",{className:"success-details",children:[n.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),n.jsx("p",{children:"You can track the status in your transaction history."})]})]}),n.jsx("div",{className:"modal-footer",children:n.jsx("button",{className:"modal-btn",onClick:W,children:"OK"})})]})}),n.jsx("style",{children:`
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

        /* ── Success modal ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; backdrop-filter: blur(3px);
          animation: depFadeIn 0.25s ease;
        }
        @keyframes depFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-content {
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 20px; width: 90%; max-width: 360px;
          overflow: hidden;
          animation: depSlideUp 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes depSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .modal-header {
          padding: 18px 20px;
          border-bottom: 1px solid #1e1f26;
          display: flex; justify-content: space-between; align-items: center;
        }
        .modal-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: #fff; }
        .modal-close {
          width: 28px; height: 28px; border-radius: 50%;
          background: #1e1f26; border: none; color: #888;
          cursor: pointer; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .modal-close:hover { background: #2a2a2e; color: #fd4b4e; }
        .modal-body { padding: 28px 20px; text-align: center; }
        .success-icon { font-size: 56px; color: #26a17b; margin-bottom: 16px; }
        .success-message { font-size: 15px; color: #fff; font-weight: 700; margin-bottom: 12px; }
        .success-details { font-size: 13px; color: #555; line-height: 1.6; }
        .success-details p { margin: 8px 0; }
        .modal-footer { padding: 16px 20px; border-top: 1px solid #1e1f26; }
        .modal-btn {
          width: 100%; padding: 13px;
          background: #fd4b4e; color: #fff;
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .modal-btn:hover { background: #e8393c; }
      `})]})}export{tt as default};
