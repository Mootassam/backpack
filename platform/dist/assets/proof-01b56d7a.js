import{g as dt,q as j,ah as ut,ai as pt,x as ft,k as Ne,aj as Qe,ak as ht,p as ne,a3 as W,j as u,al as mt,v as gt,u as bt,n as xt,am as Pe,Z as vt,an as yt}from"./index-07486408.js";import{a as wt,b as kt,u as St,y as Ct,F as At}from"./FormErrors-54de97cf.js";import{y as oe}from"./yupFormSchemas-f9e8a9e4.js";import{I as Re}from"./InputFormItem-04efe07d.js";import{v as jt}from"./v4-4a60fe23.js";import{u as Nt}from"./useDispatch-69f3e435.js";var Je={exports:{}};(function(t,r){(function(e){var a=/^(b|B)$/,n={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},s={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function i(d){var m,h,N,b,P,k,g,w,x,B,A,F,D,M,J,_=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},v=[],q=0,I=void 0,X=void 0;if(isNaN(d))throw new TypeError("Invalid number");return h=_.bits===!0,A=_.unix===!0,m=_.base||2,B=_.round!==void 0?_.round:A?1:2,k=_.locale!==void 0?_.locale:"",g=_.localeOptions||{},F=_.separator!==void 0?_.separator:"",D=_.spacer!==void 0?_.spacer:A?"":" ",J=_.symbols||{},M=m===2&&_.standard||"jedec",x=_.output||"string",b=_.fullform===!0,P=_.fullforms instanceof Array?_.fullforms:[],I=_.exponent!==void 0?_.exponent:-1,N=2<m?1e3:1024,(w=(X=Number(d))<0)&&(X=-X),(I===-1||isNaN(I))&&(I=Math.floor(Math.log(X)/Math.log(N)))<0&&(I=0),8<I&&(I=8),x==="exponent"?I:(X===0?(v[0]=0,v[1]=A?"":n[M][h?"bits":"bytes"][I]):(q=X/(m===2?Math.pow(2,10*I):Math.pow(1e3,I)),h&&N<=(q*=8)&&I<8&&(q/=N,I++),v[0]=Number(q.toFixed(0<I?B:0)),v[0]===N&&I<8&&_.exponent===void 0&&(v[0]=1,I++),v[1]=m===10&&I===1?h?"kb":"kB":n[M][h?"bits":"bytes"][I],A&&(v[1]=M==="jedec"?v[1].charAt(0):0<I?v[1].replace(/B$/,""):v[1],a.test(v[1])&&(v[0]=Math.floor(v[0]),v[1]=""))),w&&(v[0]=-v[0]),v[1]=J[v[1]]||v[1],k===!0?v[0]=v[0].toLocaleString():0<k.length?v[0]=v[0].toLocaleString(k,g):0<F.length&&(v[0]=v[0].toString().replace(".",F)),x==="array"?v:(b&&(v[1]=P[I]?P[I]:s[M][I]+(h?"bit":"byte")+(v[0]===1?"":"s")),x==="object"?{value:v[0],symbol:v[1],exponent:I}:v.join(D)))}i.partial=function(d){return function(m){return i(m,d)}},t.exports=i})()})(Je);var It=Je.exports;const Et=dt(It);class Ge{static validate(r,e){if(!e)return;if(e.image&&!r.type.startsWith("image"))throw new Error(j("fileUploader.image"));if(e.storage.maxSizeInBytes&&r.size>e.storage.maxSizeInBytes)throw new Error(j("fileUploader.size",Et(e.storage.maxSizeInBytes)));const a=He(r.name);if(e.formats&&!e.formats.includes(a))throw new Error(j("fileUploader.formats",e.formats.join(", ")))}static async upload(r,e){try{this.validate(r,e)}catch(h){return Promise.reject(h)}const a=He(r.name),n=jt(),s=`${n}.${a}`,{uploadCredentials:i,downloadUrl:d,privateUrl:m}=await this.fetchFileCredentials(s,e);return await this.uploadToServer(r,i),{id:n,name:r.name,sizeInBytes:r.size,publicUrl:i&&i.publicUrl?i.publicUrl:null,privateUrl:m,downloadUrl:d,new:!0}}static async fetchFileCredentials(r,e){const a=ut.get(),{data:n}=await pt.get(`/tenant/${a}/file/credentials`,{params:{filename:r,storageId:e.storage.id}});return n}static async uploadToServer(r,e){try{const a=e.url,n=new FormData;for(const[s,i]of Object.entries(e.fields||{}))n.append(s,i);return n.append("file",r),ft.post(a,n,{headers:{"Content-Type":"multipart/form-data"}})}catch(a){throw console.error(a),a}}}function He(t){if(!t)return null;const e=/(?:\.([^.]+))?$/.exec(t);return e?e[1]:null}function Pt(t){function r(f,l,p,S,o){for(var R=0,c=0,L=0,T=0,O,C,$=0,Z=0,E,Y=E=O=0,z=0,G=0,ge=0,H=0,we=p.length,be=we-1,re,y="",U="",Ie="",Ee="",se;z<we;){if(C=p.charCodeAt(z),z===be&&c+T+L+R!==0&&(c!==0&&(C=c===47?10:47),T=L=R=0,we++,be++),c+T+L+R===0){if(z===be&&(0<G&&(y=y.replace(P,"")),0<y.trim().length)){switch(C){case 32:case 9:case 59:case 13:case 10:break;default:y+=p.charAt(z)}C=59}switch(C){case 123:for(y=y.trim(),O=y.charCodeAt(0),E=1,H=++z;z<we;){switch(C=p.charCodeAt(z)){case 123:E++;break;case 125:E--;break;case 47:switch(C=p.charCodeAt(z+1)){case 42:case 47:e:{for(Y=z+1;Y<be;++Y)switch(p.charCodeAt(Y)){case 47:if(C===42&&p.charCodeAt(Y-1)===42&&z+2!==Y){z=Y+1;break e}break;case 10:if(C===47){z=Y+1;break e}}z=Y}}break;case 91:C++;case 40:C++;case 34:case 39:for(;z++<be&&p.charCodeAt(z)!==C;);}if(E===0)break;z++}switch(E=p.substring(H,z),O===0&&(O=(y=y.replace(b,"").trim()).charCodeAt(0)),O){case 64:switch(0<G&&(y=y.replace(P,"")),C=y.charCodeAt(1),C){case 100:case 109:case 115:case 45:G=l;break;default:G=pe}if(E=r(l,G,E,C,o+1),H=E.length,0<Q&&(G=e(pe,y,ge),se=d(3,E,G,l,ee,K,H,C,o,S),y=G.join(""),se!==void 0&&(H=(E=se.trim()).length)===0&&(C=0,E="")),0<H)switch(C){case 115:y=y.replace(J,i);case 100:case 109:case 45:E=y+"{"+E+"}";break;case 107:y=y.replace(A,"$1 $2"),E=y+"{"+E+"}",E=V===1||V===2&&s("@"+E,3)?"@-webkit-"+E+"@"+E:"@"+E;break;default:E=y+E,S===112&&(E=(U+=E,""))}else E="";break;default:E=r(l,e(l,y,ge),E,S,o+1)}Ie+=E,E=ge=G=Y=O=0,y="",C=p.charCodeAt(++z);break;case 125:case 59:if(y=(0<G?y.replace(P,""):y).trim(),1<(H=y.length))switch(Y===0&&(O=y.charCodeAt(0),O===45||96<O&&123>O)&&(H=(y=y.replace(" ",":")).length),0<Q&&(se=d(1,y,l,f,ee,K,U.length,S,o,S))!==void 0&&(H=(y=se.trim()).length)===0&&(y="\0\0"),O=y.charCodeAt(0),C=y.charCodeAt(1),O){case 0:break;case 64:if(C===105||C===99){Ee+=y+p.charAt(z);break}default:y.charCodeAt(H-1)!==58&&(U+=n(y,O,C,y.charCodeAt(2)))}ge=G=Y=O=0,y="",C=p.charCodeAt(++z)}}switch(C){case 13:case 10:c===47?c=0:1+O===0&&S!==107&&0<y.length&&(G=1,y+="\0"),0<Q*he&&d(0,y,l,f,ee,K,U.length,S,o,S),K=1,ee++;break;case 59:case 125:if(c+T+L+R===0){K++;break}default:switch(K++,re=p.charAt(z),C){case 9:case 32:if(T+R+c===0)switch($){case 44:case 58:case 9:case 32:re="";break;default:C!==32&&(re=" ")}break;case 0:re="\\0";break;case 12:re="\\f";break;case 11:re="\\v";break;case 38:T+c+R===0&&(G=ge=1,re="\f"+re);break;case 108:if(T+c+R+ae===0&&0<Y)switch(z-Y){case 2:$===112&&p.charCodeAt(z-3)===58&&(ae=$);case 8:Z===111&&(ae=Z)}break;case 58:T+c+R===0&&(Y=z);break;case 44:c+L+T+R===0&&(G=1,re+="\r");break;case 34:case 39:c===0&&(T=T===C?0:T===0?C:T);break;case 91:T+c+L===0&&R++;break;case 93:T+c+L===0&&R--;break;case 41:T+c+R===0&&L--;break;case 40:if(T+c+R===0){if(O===0)switch(2*$+3*Z){case 533:break;default:O=1}L++}break;case 64:c+L+T+R+Y+E===0&&(E=1);break;case 42:case 47:if(!(0<T+R+L))switch(c){case 0:switch(2*C+3*p.charCodeAt(z+1)){case 235:c=47;break;case 220:H=z,c=42}break;case 42:C===47&&$===42&&H+2!==z&&(p.charCodeAt(H+2)===33&&(U+=p.substring(H,z+1)),re="",c=0)}}c===0&&(y+=re)}Z=$,$=C,z++}if(H=U.length,0<H){if(G=l,0<Q&&(se=d(2,U,G,f,ee,K,H,S,o,S),se!==void 0&&(U=se).length===0))return Ee+U+Ie;if(U=G.join(",")+"{"+U+"}",V*ae!==0){switch(V!==2||s(U,2)||(ae=0),ae){case 111:U=U.replace(D,":-moz-$1")+U;break;case 112:U=U.replace(F,"::-webkit-input-$1")+U.replace(F,"::-moz-$1")+U.replace(F,":-ms-input-$1")+U}ae=0}}return Ee+U+Ie}function e(f,l,p){var S=l.trim().split(x);l=S;var o=S.length,R=f.length;switch(R){case 0:case 1:var c=0;for(f=R===0?"":f[0]+" ";c<o;++c)l[c]=a(f,l[c],p).trim();break;default:var L=c=0;for(l=[];c<o;++c)for(var T=0;T<R;++T)l[L++]=a(f[T]+" ",S[c],p).trim()}return l}function a(f,l,p){var S=l.charCodeAt(0);switch(33>S&&(S=(l=l.trim()).charCodeAt(0)),S){case 38:return l.replace(B,"$1"+f.trim());case 58:return f.trim()+l.replace(B,"$1"+f.trim());default:if(0<1*p&&0<l.indexOf("\f"))return l.replace(B,(f.charCodeAt(0)===58?"":"$1")+f.trim())}return f+l}function n(f,l,p,S){var o=f+";",R=2*l+3*p+4*S;if(R===944){f=o.indexOf(":",9)+1;var c=o.substring(f,o.length-1).trim();return c=o.substring(0,f).trim()+c+";",V===1||V===2&&s(c,1)?"-webkit-"+c+c:c}if(V===0||V===2&&!s(o,1))return o;switch(R){case 1015:return o.charCodeAt(10)===97?"-webkit-"+o+o:o;case 951:return o.charCodeAt(3)===116?"-webkit-"+o+o:o;case 963:return o.charCodeAt(5)===110?"-webkit-"+o+o:o;case 1009:if(o.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+o+o;case 978:return"-webkit-"+o+"-moz-"+o+o;case 1019:case 983:return"-webkit-"+o+"-moz-"+o+"-ms-"+o+o;case 883:if(o.charCodeAt(8)===45)return"-webkit-"+o+o;if(0<o.indexOf("image-set(",11))return o.replace(X,"$1-webkit-$2")+o;break;case 932:if(o.charCodeAt(4)===45)switch(o.charCodeAt(5)){case 103:return"-webkit-box-"+o.replace("-grow","")+"-webkit-"+o+"-ms-"+o.replace("grow","positive")+o;case 115:return"-webkit-"+o+"-ms-"+o.replace("shrink","negative")+o;case 98:return"-webkit-"+o+"-ms-"+o.replace("basis","preferred-size")+o}return"-webkit-"+o+"-ms-"+o+o;case 964:return"-webkit-"+o+"-ms-flex-"+o+o;case 1023:if(o.charCodeAt(8)!==99)break;return c=o.substring(o.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+c+"-webkit-"+o+"-ms-flex-pack"+c+o;case 1005:return g.test(o)?o.replace(k,":-webkit-")+o.replace(k,":-moz-")+o:o;case 1e3:switch(c=o.substring(13).trim(),l=c.indexOf("-")+1,c.charCodeAt(0)+c.charCodeAt(l)){case 226:c=o.replace(M,"tb");break;case 232:c=o.replace(M,"tb-rl");break;case 220:c=o.replace(M,"lr");break;default:return o}return"-webkit-"+o+"-ms-"+c+o;case 1017:if(o.indexOf("sticky",9)===-1)break;case 975:switch(l=(o=f).length-10,c=(o.charCodeAt(l)===33?o.substring(0,l):o).substring(f.indexOf(":",7)+1).trim(),R=c.charCodeAt(0)+(c.charCodeAt(7)|0)){case 203:if(111>c.charCodeAt(8))break;case 115:o=o.replace(c,"-webkit-"+c)+";"+o;break;case 207:case 102:o=o.replace(c,"-webkit-"+(102<R?"inline-":"")+"box")+";"+o.replace(c,"-webkit-"+c)+";"+o.replace(c,"-ms-"+c+"box")+";"+o}return o+";";case 938:if(o.charCodeAt(5)===45)switch(o.charCodeAt(6)){case 105:return c=o.replace("-items",""),"-webkit-"+o+"-webkit-box-"+c+"-ms-flex-"+c+o;case 115:return"-webkit-"+o+"-ms-flex-item-"+o.replace(v,"")+o;default:return"-webkit-"+o+"-ms-flex-line-pack"+o.replace("align-content","").replace(v,"")+o}break;case 973:case 989:if(o.charCodeAt(3)!==45||o.charCodeAt(4)===122)break;case 931:case 953:if(I.test(f)===!0)return(c=f.substring(f.indexOf(":")+1)).charCodeAt(0)===115?n(f.replace("stretch","fill-available"),l,p,S).replace(":fill-available",":stretch"):o.replace(c,"-webkit-"+c)+o.replace(c,"-moz-"+c.replace("fill-",""))+o;break;case 962:if(o="-webkit-"+o+(o.charCodeAt(5)===102?"-ms-"+o:"")+o,p+S===211&&o.charCodeAt(13)===105&&0<o.indexOf("transform",10))return o.substring(0,o.indexOf(";",27)+1).replace(w,"$1-webkit-$2")+o}return o}function s(f,l){var p=f.indexOf(l===1?":":"{"),S=f.substring(0,l!==3?p:10);return p=f.substring(p+1,f.length-1),fe(l!==2?S:S.replace(q,"$1"),p,l)}function i(f,l){var p=n(l,l.charCodeAt(0),l.charCodeAt(1),l.charCodeAt(2));return p!==l+";"?p.replace(_," or ($1)").substring(4):"("+l+")"}function d(f,l,p,S,o,R,c,L,T,O){for(var C=0,$=l,Z;C<Q;++C)switch(Z=te[C].call(N,f,$,p,S,o,R,c,L,T,O)){case void 0:case!1:case!0:case null:break;default:$=Z}if($!==l)return $}function m(f){switch(f){case void 0:case null:Q=te.length=0;break;default:if(typeof f=="function")te[Q++]=f;else if(typeof f=="object")for(var l=0,p=f.length;l<p;++l)m(f[l]);else he=!!f|0}return m}function h(f){return f=f.prefix,f!==void 0&&(fe=null,f?typeof f!="function"?V=1:(V=2,fe=f):V=0),h}function N(f,l){var p=f;if(33>p.charCodeAt(0)&&(p=p.trim()),me=p,p=[me],0<Q){var S=d(-1,l,p,p,ee,K,0,0,0,0);S!==void 0&&typeof S=="string"&&(l=S)}var o=r(pe,p,l,0,0);return 0<Q&&(S=d(-2,o,p,p,ee,K,o.length,0,0,0),S!==void 0&&(o=S)),me="",ae=0,K=ee=1,o}var b=/^\0+/g,P=/[\0\r\f]/g,k=/: */g,g=/zoo|gra/,w=/([,: ])(transform)/g,x=/,\r+?/g,B=/([\t\r\n ])*\f?&/g,A=/@(k\w+)\s*(\S*)\s*/,F=/::(place)/g,D=/:(read-only)/g,M=/[svh]\w+-[tblr]{2}/,J=/\(\s*(.*)\s*\)/g,_=/([\s\S]*?);/g,v=/-self|flex-/g,q=/[^]*?(:[rp][el]a[\w-]+)[^]*/,I=/stretch|:\s*\w+\-(?:conte|avail)/,X=/([^-])(image-set\()/,K=1,ee=1,ae=0,V=1,pe=[],te=[],Q=0,fe=null,he=0,me="";return N.use=m,N.set=h,t!==void 0&&h(t),N}var Rt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Tt(t){var r={};return function(e){return r[e]===void 0&&(r[e]=t(e)),r[e]}}var zt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ye=Tt(function(t){return zt.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91});function ie(){return(ie=Object.assign||function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t}).apply(this,arguments)}var We=function(t,r){for(var e=[t[0]],a=0,n=r.length;a<n;a+=1)e.push(r[a],t[a+1]);return e},Be=function(t){return t!==null&&typeof t=="object"&&(t.toString?t.toString():Object.prototype.toString.call(t))==="[object Object]"&&!Qe.typeOf(t)},Ae=Object.freeze([]),ce=Object.freeze({});function ve(t){return typeof t=="function"}function qe(t){return t.displayName||t.name||"Component"}function Le(t){return t&&typeof t.styledComponentId=="string"}var de=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",Ue=typeof window<"u"&&"HTMLElement"in window,Ot=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function ye(t){for(var r=arguments.length,e=new Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];throw new Error("An error occurred. See https://git.io/JUIaE#"+t+" for more information."+(e.length>0?" Args: "+e.join(", "):""))}var Bt=function(){function t(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var r=t.prototype;return r.indexOfGroup=function(e){for(var a=0,n=0;n<e;n++)a+=this.groupSizes[n];return a},r.insertRules=function(e,a){if(e>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,i=s;e>=i;)(i<<=1)<0&&ye(16,""+e);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var d=s;d<i;d++)this.groupSizes[d]=0}for(var m=this.indexOfGroup(e+1),h=0,N=a.length;h<N;h++)this.tag.insertRule(m,a[h])&&(this.groupSizes[e]++,m++)},r.clearGroup=function(e){if(e<this.length){var a=this.groupSizes[e],n=this.indexOfGroup(e),s=n+a;this.groupSizes[e]=0;for(var i=n;i<s;i++)this.tag.deleteRule(n)}},r.getGroup=function(e){var a="";if(e>=this.length||this.groupSizes[e]===0)return a;for(var n=this.groupSizes[e],s=this.indexOfGroup(e),i=s+n,d=s;d<i;d++)a+=this.tag.getRule(d)+`/*!sc*/
`;return a},t}(),Ce=new Map,je=new Map,Te=1,ke=function(t){if(Ce.has(t))return Ce.get(t);for(;je.has(Te);)Te++;var r=Te++;return Ce.set(t,r),je.set(r,t),r},_t=function(t){return je.get(t)},Mt=function(t,r){Ce.set(t,r),je.set(r,t)},Ft="style["+de+'][data-styled-version="5.2.1"]',Dt=new RegExp("^"+de+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Lt=function(t,r,e){for(var a,n=e.split(","),s=0,i=n.length;s<i;s++)(a=n[s])&&t.registerName(r,a)},Ut=function(t,r){for(var e=r.innerHTML.split(`/*!sc*/
`),a=[],n=0,s=e.length;n<s;n++){var i=e[n].trim();if(i){var d=i.match(Dt);if(d){var m=0|parseInt(d[1],10),h=d[2];m!==0&&(Mt(h,m),Lt(t,h,d[3]),t.getTag().insertRules(m,a)),a.length=0}else a.push(i)}}},$t=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},et=function(t){var r=document.head,e=t||r,a=document.createElement("style"),n=function(d){for(var m=d.childNodes,h=m.length;h>=0;h--){var N=m[h];if(N&&N.nodeType===1&&N.hasAttribute(de))return N}}(e),s=n!==void 0?n.nextSibling:null;a.setAttribute(de,"active"),a.setAttribute("data-styled-version","5.2.1");var i=$t();return i&&a.setAttribute("nonce",i),e.insertBefore(a,s),a},Gt=function(){function t(e){var a=this.element=et(e);a.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var s=document.styleSheets,i=0,d=s.length;i<d;i++){var m=s[i];if(m.ownerNode===n)return m}ye(17)}(a),this.length=0}var r=t.prototype;return r.insertRule=function(e,a){try{return this.sheet.insertRule(a,e),this.length++,!0}catch{return!1}},r.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},r.getRule=function(e){var a=this.sheet.cssRules[e];return a!==void 0&&typeof a.cssText=="string"?a.cssText:""},t}(),Ht=function(){function t(e){var a=this.element=et(e);this.nodes=a.childNodes,this.length=0}var r=t.prototype;return r.insertRule=function(e,a){if(e<=this.length&&e>=0){var n=document.createTextNode(a),s=this.nodes[e];return this.element.insertBefore(n,s||null),this.length++,!0}return!1},r.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},r.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},t}(),Yt=function(){function t(e){this.rules=[],this.length=0}var r=t.prototype;return r.insertRule=function(e,a){return e<=this.length&&(this.rules.splice(e,0,a),this.length++,!0)},r.deleteRule=function(e){this.rules.splice(e,1),this.length--},r.getRule=function(e){return e<this.length?this.rules[e]:""},t}(),Ve=Ue,Wt={isServer:!Ue,useCSSOMInjection:!Ot},tt=function(){function t(e,a,n){e===void 0&&(e=ce),a===void 0&&(a={}),this.options=ie({},Wt,{},e),this.gs=a,this.names=new Map(n),!this.options.isServer&&Ue&&Ve&&(Ve=!1,function(s){for(var i=document.querySelectorAll(Ft),d=0,m=i.length;d<m;d++){var h=i[d];h&&h.getAttribute(de)!=="active"&&(Ut(s,h),h.parentNode&&h.parentNode.removeChild(h))}}(this))}t.registerId=function(e){return ke(e)};var r=t.prototype;return r.reconstructWithOptions=function(e,a){return a===void 0&&(a=!0),new t(ie({},this.options,{},e),this.gs,a&&this.names||void 0)},r.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},r.getTag=function(){return this.tag||(this.tag=(n=(a=this.options).isServer,s=a.useCSSOMInjection,i=a.target,e=n?new Yt(i):s?new Gt(i):new Ht(i),new Bt(e)));var e,a,n,s,i},r.hasNameForId=function(e,a){return this.names.has(e)&&this.names.get(e).has(a)},r.registerName=function(e,a){if(ke(e),this.names.has(e))this.names.get(e).add(a);else{var n=new Set;n.add(a),this.names.set(e,n)}},r.insertRules=function(e,a,n){this.registerName(e,a),this.getTag().insertRules(ke(e),n)},r.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},r.clearRules=function(e){this.getTag().clearGroup(ke(e)),this.clearNames(e)},r.clearTag=function(){this.tag=void 0},r.toString=function(){return function(e){for(var a=e.getTag(),n=a.length,s="",i=0;i<n;i++){var d=_t(i);if(d!==void 0){var m=e.names.get(d),h=a.getGroup(i);if(m!==void 0&&h.length!==0){var N=de+".g"+i+'[id="'+d+'"]',b="";m!==void 0&&m.forEach(function(P){P.length>0&&(b+=P+",")}),s+=""+h+N+'{content:"'+b+`"}/*!sc*/
`}}}return s}(this)},t}(),qt=/(a)(d)/gi,Ze=function(t){return String.fromCharCode(t+(t>25?39:97))};function _e(t){var r,e="";for(r=Math.abs(t);r>52;r=r/52|0)e=Ze(r%52)+e;return(Ze(r%52)+e).replace(qt,"$1-$2")}var le=function(t,r){for(var e=r.length;e;)t=33*t^r.charCodeAt(--e);return t},rt=function(t){return le(5381,t)};function Vt(t){for(var r=0;r<t.length;r+=1){var e=t[r];if(ve(e)&&!Le(e))return!1}return!0}var Zt=rt("5.2.1"),Xt=function(){function t(r,e,a){this.rules=r,this.staticRulesId="",this.isStatic=(a===void 0||a.isStatic)&&Vt(r),this.componentId=e,this.baseHash=le(Zt,e),this.baseStyle=a,tt.registerId(e)}return t.prototype.generateAndInjectStyles=function(r,e,a){var n=this.componentId,s=[];if(this.baseStyle&&s.push(this.baseStyle.generateAndInjectStyles(r,e,a)),this.isStatic&&!a.hash)if(this.staticRulesId&&e.hasNameForId(n,this.staticRulesId))s.push(this.staticRulesId);else{var i=ue(this.rules,r,e,a).join(""),d=_e(le(this.baseHash,i.length)>>>0);if(!e.hasNameForId(n,d)){var m=a(i,"."+d,void 0,n);e.insertRules(n,d,m)}s.push(d),this.staticRulesId=d}else{for(var h=this.rules.length,N=le(this.baseHash,a.hash),b="",P=0;P<h;P++){var k=this.rules[P];if(typeof k=="string")b+=k;else if(k){var g=ue(k,r,e,a),w=Array.isArray(g)?g.join(""):g;N=le(N,w+P),b+=w}}if(b){var x=_e(N>>>0);if(!e.hasNameForId(n,x)){var B=a(b,"."+x,void 0,n);e.insertRules(n,x,B)}s.push(x)}}return s.join(" ")},t}(),Kt=/^\s*\/\/.*$/gm,Qt=[":","[",".","#"];function Jt(t){var r,e,a,n,s=t===void 0?ce:t,i=s.options,d=i===void 0?ce:i,m=s.plugins,h=m===void 0?Ae:m,N=new Pt(d),b=[],P=function(w){function x(B){if(B)try{w(B+"}")}catch{}}return function(B,A,F,D,M,J,_,v,q,I){switch(B){case 1:if(q===0&&A.charCodeAt(0)===64)return w(A+";"),"";break;case 2:if(v===0)return A+"/*|*/";break;case 3:switch(v){case 102:case 112:return w(F[0]+A),"";default:return A+(I===0?"/*|*/":"")}case-2:A.split("/*|*/}").forEach(x)}}}(function(w){b.push(w)}),k=function(w,x,B){return x===0&&Qt.includes(B[e.length])||B.match(n)?w:"."+r};function g(w,x,B,A){A===void 0&&(A="&");var F=w.replace(Kt,""),D=x&&B?B+" "+x+" { "+F+" }":F;return r=A,e=x,a=new RegExp("\\"+e+"\\b","g"),n=new RegExp("(\\"+e+"\\b){2,}"),N(B||!x?"":x,D)}return N.use([].concat(h,[function(w,x,B){w===2&&B.length&&B[0].lastIndexOf(e)>0&&(B[0]=B[0].replace(a,k))},P,function(w){if(w===-2){var x=b;return b=[],x}}])),g.hash=h.length?h.reduce(function(w,x){return x.name||ye(15),le(w,x.name)},5381).toString():"",g}var at=Ne.createContext();at.Consumer;var ot=Ne.createContext(),er=(ot.Consumer,new tt),Me=Jt();function tr(){return ne.useContext(at)||er}function rr(){return ne.useContext(ot)||Me}var ar=function(){function t(r,e){var a=this;this.inject=function(n,s){s===void 0&&(s=Me);var i=a.name+s.hash;n.hasNameForId(a.id,i)||n.insertRules(a.id,i,s(a.rules,i,"@keyframes"))},this.toString=function(){return ye(12,String(a.name))},this.name=r,this.id="sc-keyframes-"+r,this.rules=e}return t.prototype.getName=function(r){return r===void 0&&(r=Me),this.name+r.hash},t}(),or=/([A-Z])/,nr=/([A-Z])/g,ir=/^ms-/,sr=function(t){return"-"+t.toLowerCase()};function Xe(t){return or.test(t)?t.replace(nr,sr).replace(ir,"-ms-"):t}var Ke=function(t){return t==null||t===!1||t===""};function ue(t,r,e,a){if(Array.isArray(t)){for(var n,s=[],i=0,d=t.length;i<d;i+=1)(n=ue(t[i],r,e,a))!==""&&(Array.isArray(n)?s.push.apply(s,n):s.push(n));return s}if(Ke(t))return"";if(Le(t))return"."+t.styledComponentId;if(ve(t)){if(typeof(h=t)!="function"||h.prototype&&h.prototype.isReactComponent||!r)return t;var m=t(r);return ue(m,r,e,a)}var h;return t instanceof ar?e?(t.inject(e,a),t.getName(a)):t:Be(t)?function N(b,P){var k,g,w=[];for(var x in b)b.hasOwnProperty(x)&&!Ke(b[x])&&(Be(b[x])?w.push.apply(w,N(b[x],x)):ve(b[x])?w.push(Xe(x)+":",b[x],";"):w.push(Xe(x)+": "+(k=x,(g=b[x])==null||typeof g=="boolean"||g===""?"":typeof g!="number"||g===0||k in Rt?String(g).trim():g+"px")+";"));return P?[P+" {"].concat(w,["}"]):w}(t):t.toString()}function cr(t){for(var r=arguments.length,e=new Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];return ve(t)||Be(t)?ue(We(Ae,[t].concat(e))):e.length===0&&t.length===1&&typeof t[0]=="string"?t:ue(We(t,e))}var lr=function(t,r,e){return e===void 0&&(e=ce),t.theme!==e.theme&&t.theme||r||e.theme},dr=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ur=/(^-|-$)/g;function ze(t){return t.replace(dr,"-").replace(ur,"")}var pr=function(t){return _e(rt(t)>>>0)};function Se(t){return typeof t=="string"&&!0}var Fe=function(t){return typeof t=="function"||typeof t=="object"&&t!==null&&!Array.isArray(t)},fr=function(t){return t!=="__proto__"&&t!=="constructor"&&t!=="prototype"};function hr(t,r,e){var a=t[e];Fe(r)&&Fe(a)?nt(a,r):t[e]=r}function nt(t){for(var r=arguments.length,e=new Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];for(var n=0,s=e;n<s.length;n++){var i=s[n];if(Fe(i))for(var d in i)fr(d)&&hr(t,i[d],d)}return t}var it=Ne.createContext();it.Consumer;var Oe={};function st(t,r,e){var a=Le(t),n=!Se(t),s=r.attrs,i=s===void 0?Ae:s,d=r.componentId,m=d===void 0?function(A,F){var D=typeof A!="string"?"sc":ze(A);Oe[D]=(Oe[D]||0)+1;var M=D+"-"+pr("5.2.1"+D+Oe[D]);return F?F+"-"+M:M}(r.displayName,r.parentComponentId):d,h=r.displayName,N=h===void 0?function(A){return Se(A)?"styled."+A:"Styled("+qe(A)+")"}(t):h,b=r.displayName&&r.componentId?ze(r.displayName)+"-"+r.componentId:r.componentId||m,P=a&&t.attrs?Array.prototype.concat(t.attrs,i).filter(Boolean):i,k=r.shouldForwardProp;a&&t.shouldForwardProp&&(k=r.shouldForwardProp?function(A,F){return t.shouldForwardProp(A,F)&&r.shouldForwardProp(A,F)}:t.shouldForwardProp);var g,w=new Xt(e,b,a?t.componentStyle:void 0),x=w.isStatic&&i.length===0,B=function(A,F){return function(D,M,J,_){var v=D.attrs,q=D.componentStyle,I=D.defaultProps,X=D.foldedComponentIds,K=D.shouldForwardProp,ee=D.styledComponentId,ae=D.target,V=function(S,o,R){S===void 0&&(S=ce);var c=ie({},o,{theme:S}),L={};return R.forEach(function(T){var O,C,$,Z=T;for(O in ve(Z)&&(Z=Z(c)),Z)c[O]=L[O]=O==="className"?(C=L[O],$=Z[O],C&&$?C+" "+$:C||$):Z[O]}),[c,L]}(lr(M,ne.useContext(it),I)||ce,M,v),pe=V[0],te=V[1],Q=function(S,o,R,c){var L=tr(),T=rr(),O=o?S.generateAndInjectStyles(ce,L,T):S.generateAndInjectStyles(R,L,T);return O}(q,_,pe),fe=J,he=te.$as||M.$as||te.as||M.as||ae,me=Se(he),f=te!==M?ie({},M,{},te):M,l={};for(var p in f)p[0]!=="$"&&p!=="as"&&(p==="forwardedAs"?l.as=f[p]:(K?K(p,Ye):!me||Ye(p))&&(l[p]=f[p]));return M.style&&te.style!==M.style&&(l.style=ie({},M.style,{},te.style)),l.className=Array.prototype.concat(X,ee,Q!==ee?Q:null,M.className,te.className).filter(Boolean).join(" "),l.ref=fe,ne.createElement(he,l)}(g,A,F,x)};return B.displayName=N,(g=Ne.forwardRef(B)).attrs=P,g.componentStyle=w,g.displayName=N,g.shouldForwardProp=k,g.foldedComponentIds=a?Array.prototype.concat(t.foldedComponentIds,t.styledComponentId):Ae,g.styledComponentId=b,g.target=a?t.target:t,g.withComponent=function(A){var F=r.componentId,D=function(J,_){if(J==null)return{};var v,q,I={},X=Object.keys(J);for(q=0;q<X.length;q++)v=X[q],_.indexOf(v)>=0||(I[v]=J[v]);return I}(r,["componentId"]),M=F&&F+"-"+(Se(A)?A:ze(qe(A)));return st(A,ie({},D,{attrs:P,componentId:M}),e)},Object.defineProperty(g,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(A){this._foldedDefaultProps=a?nt({},t.defaultProps,A):A}}),g.toString=function(){return"."+g.styledComponentId},n&&ht(g,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),g}var De=function(t){return function r(e,a,n){if(n===void 0&&(n=ce),!Qe.isValidElementType(a))return ye(1,String(a));var s=function(){return e(a,n,cr.apply(void 0,arguments))};return s.withConfig=function(i){return r(e,a,ie({},n,{},i))},s.attrs=function(i){return r(e,a,ie({},n,{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},s}(st,t)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(t){De[t]=De(t)});const ct=De,mr=ct.div`
  /* Upload card (outer container) */
  .upload-card {
    background-color: #15161c;
    border-radius: 14px;
    padding: 16px;                           /* reduced – padding moved to inner area */
    text-align: center;
    margin-bottom: 16px;
  }

  /* Drop‑zone (the clickable area) – now with border & padding */
  .upload-area {
    border: 1px dashed #2a2a2e;
    border-radius: 12px;
    padding: 28px 24px;
    background-color: #0e0f14;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .upload-card:hover .upload-area {
    border-color: #fd4b4e;
    background-color: rgba(253, 75, 78, 0.03);
  }

  .upload-icon i {
    font-size: 36px;
    color: #fd4b4e;
  }

  .upload-text {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
  }

  .upload-subtext {
    color: #888888;
    font-size: 13px;
  }

  /* Uploaded image preview container */
  .uploaded-box {
    position: relative;
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    background-color: #0e0f14;
    border: 1px solid #2a2a2e;
    height: 200px;
    margin-bottom: 16px;
  }

  .uploaded-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Action buttons on the preview */
  .img-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 8px 10px;
  }

  .img-buttons button {
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .img-buttons button:hover {
    color: #fd4b4e;
  }

  /* Hide file input */
  input[type="file"] {
    display: none;
  }
`,gr=ct.div`
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(
      0,
      0,
      0,
      0.9
    ); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
`;function lt(t){return u.jsx(gr,{children:u.jsxs("div",{className:"modal",children:[u.jsx("span",{className:"close",onClick:t.onClose,children:"×"}),u.jsx("img",{className:"modal-content",src:t.src,alt:t.alt})]})})}lt.propTypes={src:W.string.isRequired,alt:W.string.isRequired,onClose:W.func.isRequired};function $e(t){const[r,e]=ne.useState(!1),[a,n]=ne.useState(null),s=ne.useRef(),i=()=>{const{value:k}=t;return k?Array.isArray(k)?k:[k]:[]},d=k=>{const g=i().filter(w=>w.id!==k);t.onChange(g)},m=async k=>{try{const g=k.target.files;if(!g||!g.length)return;let w=g[0];Ge.validate(w,{storage:t.storage,image:!0}),e(!0),w=await Ge.upload(w,{storage:t.storage,image:!0}),s!=null&&s.current&&(s.current.value=null),e(!1),t.onChange([w])}catch(g){s!=null&&s.current&&(s.current.value=null),console.error(g),e(!1),mt.showMessage(g)}},h=k=>{n({src:k.downloadUrl,alt:k.name})},N=()=>{n(null)},{readonly:b}=t,P=u.jsx("label",{children:u.jsxs("div",{className:"upload-area",children:[u.jsx("div",{className:"upload-icon",children:u.jsx("i",{className:"fas fa-cloud-upload-alt"})}),u.jsx("div",{className:"upload-text",children:t.text}),u.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),u.jsx("input",{style:{display:"none"},disabled:r||b,accept:"image/*",type:"file",onChange:m,ref:s})]})});return u.jsxs(mr,{children:[b||i().length>0?null:P,i().length>0&&u.jsx("div",{className:"upload-card",children:i().length===0?P:i().map(k=>u.jsxs("div",{className:"uploaded-box",children:[u.jsx("img",{alt:k.name,src:k.downloadUrl,className:"uploaded-img"}),u.jsxs("div",{className:"img-buttons",children:[u.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>h(k),children:u.jsx("i",{className:"fas fa-search"})}),!b&&u.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>d(k.id),children:u.jsx("i",{className:"fas fa-times"})})]})]},k.id||k.name))}),a&&u.jsx(lt,{src:a.src,alt:a.alt,onClose:N})]})}$e.propTypes={readonly:W.bool,storage:W.object,value:W.any,onChange:W.func,text:W.string};$e.defaultProps={text:"Upload"};function xe(t){const{label:r,name:e,text:a,hint:n,storage:s,max:i,required:d,externalErrorMessage:m}=t,{errors:h,formState:{touched:N,isSubmitted:b},setValue:P,watch:k,register:g}=wt();ne.useEffect(()=>{g({name:e})},[g,e]);const w=kt.errorMessage(e,h,N,b,m);return u.jsxs("div",{className:"file-upload",children:[!!r&&u.jsx("label",{className:`input-label ${d?"required":null}`,htmlFor:e,children:r}),u.jsx($e,{storage:s,value:k(e),onChange:x=>{P(e,x,{shouldValidate:!0,shouldDirty:!0}),t.onChange&&t.onChange(x)},text:a,max:i}),u.jsx("div",{className:"invalid-feedback",children:w}),!!n&&u.jsx("small",{className:"form-text text-muted",children:n})]})}xe.defaultProps={max:void 0,required:!1};xe.propTypes={storage:W.object.isRequired,max:W.number,required:W.bool,name:W.string.isRequired,label:W.string,hint:W.string,formItemProps:W.object,text:W.string};const br={status:["pending","canceled","success"],type:["withdraw","deposit"]},xr=t=>vt().shape({user:oe.relationToOne(j("entities.vip.fields.title"),{}),Documenttype:oe.string(j("pages.proof.fields.documentType")),realname:oe.string(j("pages.proof.fields.fullName"),{required:!0}),idnumer:oe.string(j("pages.proof.fields.documentNumber"),{required:!0}),address:oe.string(j("pages.proof.fields.address"),{required:!0}),front:oe.images(j("pages.proof.fields.frontSide"),{required:!0}),back:t==="passport"?oe.images(j("pages.proof.fields.backSide")):oe.images(j("pages.proof.fields.backSide"),{required:!0}),selfie:oe.images(j("pages.proof.fields.selfie"),{required:!0}),status:oe.enumerator(j("entities.transaction.fields.status"),{options:br.status})});function Ar(){const t=gt(),[r,e]=ne.useState("passport"),a=bt(xt.selectCurrentUser),n=Nt(),s=ne.useMemo(()=>xr(r),[r]),i=St({resolver:Ct.yupResolver(s),mode:"all",defaultValues:{user:a||[],Documenttype:r,realname:"",idnumer:"",address:"",front:[],back:[],selfie:[],status:"pending"}}),d=b=>{const P={...b,user:a,Documenttype:r};r==="passport"&&(P.back=[]),n(yt.doCreate(P))},m=b=>{e(b),b==="passport"&&i.setValue("back",[])},h=()=>t.goBack(),N=[{value:"passport",label:j("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:j("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:j("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return u.jsxs("div",{className:"proof-wrapper",children:[u.jsxs("div",{className:"proof-card",children:[u.jsxs("div",{className:"header",children:[u.jsx("div",{className:"back-button",onClick:h,children:u.jsx("i",{className:"fas fa-arrow-left"})}),u.jsx("h1",{className:"page-title",children:j("pages.proof.title")}),u.jsx("div",{className:"header-spacer"})]}),u.jsx("div",{className:"instructions",children:j("pages.proof.instructions")}),u.jsx(At,{...i,children:u.jsxs("form",{onSubmit:i.handleSubmit(d),children:[u.jsxs("div",{className:"form-section",children:[u.jsx("div",{className:"section-title",children:j("pages.proof.sections.documentInfo")}),u.jsxs("div",{className:"input-group",children:[u.jsxs("label",{className:"input-label",children:[j("pages.proof.fields.documentType")," ",u.jsx("span",{className:"required",children:"*"})]}),u.jsx("div",{className:"radio-group",children:N.map(b=>u.jsxs("div",{className:`radio-option ${b.value===r?"selected":""}`,onClick:()=>m(b.value),children:[u.jsx("i",{className:`${b.icon} radio-icon`}),u.jsx("span",{className:"radio-text",children:b.label})]},b.value))})]}),u.jsx(Re,{className:"text-input",name:"realname",label:j("pages.proof.fields.fullName"),placeholder:j("pages.proof.placeholders.fullName")}),u.jsx(Re,{className:"text-input",name:"idnumer",label:j("pages.proof.fields.documentNumber"),placeholder:j("pages.proof.placeholders.documentNumber")}),u.jsx(Re,{className:"text-input",name:"address",label:j("pages.proof.fields.address"),placeholder:j("pages.proof.placeholders.address")})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("div",{className:"section-title",children:j("pages.proof.sections.documentUpload")}),u.jsx(xe,{name:"front",label:j("pages.proof.fields.frontSide"),storage:Pe.values.categoryPhoto,text:j("pages.proof.uploadTexts.frontSide"),max:2}),r!=="passport"&&u.jsx(xe,{name:"back",label:j("pages.proof.fields.backSide"),storage:Pe.values.categoryPhoto,text:j("pages.proof.uploadTexts.backSide"),max:2}),u.jsx(xe,{name:"selfie",label:j("pages.proof.fields.selfie"),storage:Pe.values.categoryPhoto,text:j("pages.proof.uploadTexts.selfie"),max:2})]}),u.jsxs("div",{className:"security-note",children:[u.jsxs("div",{className:"security-title",children:[u.jsx("i",{className:"fas fa-shield-alt"})," ",j("pages.proof.security.title")]}),u.jsx("div",{className:"security-text",children:j("pages.proof.security.text")})]}),u.jsx("button",{type:"submit",className:"submit-button",children:j("pages.proof.buttons.validateDocuments")})]})}),u.jsxs("div",{className:"footer",children:[j("pages.proof.footer.copyright")," | ",u.jsx("a",{href:"#",children:j("pages.proof.footer.privacyPolicy")})]})]}),u.jsx("style",{children:`
        .proof-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .proof-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
          margin-top: 0;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .back-button {
          color: #ffffff;
          font-size: 18px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .back-button:hover {
          background-color: rgba(253, 75, 78, 0.15);
        }

        .header-spacer {
          width: 32px;
        }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          margin: 0;
          flex: 1;
        }

        /* Instructions */
        .instructions {
          background-color: #0e0f14;
          border-left: 3px solid #fd4b4e;
          color: #cccccc;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        /* Form sections */
        .form-section {
          margin-bottom: 20px;
        }

        .section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* Radio group – now horizontal, options column-centred */
        .radio-group {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .radio-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px 10px;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .radio-option.selected {
          border-color: #fd4b4e;
          background-color: rgba(253, 75, 78, 0.08);
        }

        .radio-icon {
          color: #aaaaaa;
          font-size: 22px;
          transition: color 0.2s;
        }

        .radio-option.selected .radio-icon {
          color: #fd4b4e;
        }

        .radio-text {
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        .required {
          color: #fd4b4e;
        }

        /* Security note */
        .security-note {
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .security-title {
          color: #fd4b4e;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .security-text {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.4;
        }

        /* Submit button */
        .submit-button {
          width: 100%;
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #e04345;
        }

        /* Footer */
        .footer {
          text-align: center;
          color: #888888;
          font-size: 12px;
          margin-top: 16px;
        }

        .footer a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .footer a:hover {
          opacity: 0.8;
        }

        /* Override ImagesFormItem background to match theme */
        .images-form-item {
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .images-form-item label {
          color: #ffffff;
        }
      `})]})}export{Ar as default};
