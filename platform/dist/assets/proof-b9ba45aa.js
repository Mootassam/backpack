import{k as Ne,an as Qe,ao as ct,p as te,a4 as G,j as d,ak as lt,y as dt,u as ut,n as pt,q as C,ai as Pe,$ as ft,ap as ht}from"./index-52cad42e.js";import{a as mt,b as gt,u as bt,y as xt,F as vt}from"./FormErrors-ab744f80.js";import{y as ee}from"./yupFormSchemas-c51678b2.js";import{I as Ee}from"./InputFormItem-cac83a68.js";import{F as Ge}from"./fileUploader-e1a92c4a.js";import{u as yt}from"./useDispatch-a8300b64.js";import"./v4-4a60fe23.js";function wt(e){function r(p,l,u,x,o){for(var I=0,c=0,O=0,R=0,E,v,L=0,Y=0,j,$=j=E=0,P=0,B=0,ge=0,U=0,we=u.length,be=we-1,Q,h="",D="",Ie="",Re="",ne;P<we;){if(v=u.charCodeAt(P),P===be&&c+R+O+I!==0&&(c!==0&&(v=c===47?10:47),R=O=I=0,we++,be++),c+R+O+I===0){if(P===be&&(0<B&&(h=h.replace(T,"")),0<h.trim().length)){switch(v){case 32:case 9:case 59:case 13:case 10:break;default:h+=u.charAt(P)}v=59}switch(v){case 123:for(h=h.trim(),E=h.charCodeAt(0),j=1,U=++P;P<we;){switch(v=u.charCodeAt(P)){case 123:j++;break;case 125:j--;break;case 47:switch(v=u.charCodeAt(P+1)){case 42:case 47:e:{for($=P+1;$<be;++$)switch(u.charCodeAt($)){case 47:if(v===42&&u.charCodeAt($-1)===42&&P+2!==$){P=$+1;break e}break;case 10:if(v===47){P=$+1;break e}}P=$}}break;case 91:v++;case 40:v++;case 34:case 39:for(;P++<be&&u.charCodeAt(P)!==v;);}if(j===0)break;P++}switch(j=u.substring(U,P),E===0&&(E=(h=h.replace(b,"").trim()).charCodeAt(0)),E){case 64:switch(0<B&&(h=h.replace(T,"")),v=h.charCodeAt(1),v){case 100:case 109:case 115:case 45:B=l;break;default:B=pe}if(j=r(l,B,j,v,o+1),U=j.length,0<W&&(B=t(pe,h,ge),ne=f(3,j,B,l,X,q,U,v,o,x),h=B.join(""),ne!==void 0&&(U=(j=ne.trim()).length)===0&&(v=0,j="")),0<U)switch(v){case 115:h=h.replace(ae,i);case 100:case 109:case 45:j=h+"{"+j+"}";break;case 107:h=h.replace(A,"$1 $2"),j=h+"{"+j+"}",j=H===1||H===2&&s("@"+j,3)?"@-webkit-"+j+"@"+j:"@"+j;break;default:j=h+j,x===112&&(j=(D+=j,""))}else j="";break;default:j=r(l,t(l,h,ge),j,x,o+1)}Ie+=j,j=ge=B=$=E=0,h="",v=u.charCodeAt(++P);break;case 125:case 59:if(h=(0<B?h.replace(T,""):h).trim(),1<(U=h.length))switch($===0&&(E=h.charCodeAt(0),E===45||96<E&&123>E)&&(U=(h=h.replace(" ",":")).length),0<W&&(ne=f(1,h,l,p,X,q,D.length,x,o,x))!==void 0&&(U=(h=ne.trim()).length)===0&&(h="\0\0"),E=h.charCodeAt(0),v=h.charCodeAt(1),E){case 0:break;case 64:if(v===105||v===99){Re+=h+u.charAt(P);break}default:h.charCodeAt(U-1)!==58&&(D+=n(h,E,v,h.charCodeAt(2)))}ge=B=$=E=0,h="",v=u.charCodeAt(++P)}}switch(v){case 13:case 10:c===47?c=0:1+E===0&&x!==107&&0<h.length&&(B=1,h+="\0"),0<W*he&&f(0,h,l,p,X,q,D.length,x,o,x),q=1,X++;break;case 59:case 125:if(c+R+O+I===0){q++;break}default:switch(q++,Q=u.charAt(P),v){case 9:case 32:if(R+I+c===0)switch(L){case 44:case 58:case 9:case 32:Q="";break;default:v!==32&&(Q=" ")}break;case 0:Q="\\0";break;case 12:Q="\\f";break;case 11:Q="\\v";break;case 38:R+c+I===0&&(B=ge=1,Q="\f"+Q);break;case 108:if(R+c+I+J===0&&0<$)switch(P-$){case 2:L===112&&u.charCodeAt(P-3)===58&&(J=L);case 8:Y===111&&(J=Y)}break;case 58:R+c+I===0&&($=P);break;case 44:c+O+R+I===0&&(B=1,Q+="\r");break;case 34:case 39:c===0&&(R=R===v?0:R===0?v:R);break;case 91:R+c+O===0&&I++;break;case 93:R+c+O===0&&I--;break;case 41:R+c+I===0&&O--;break;case 40:if(R+c+I===0){if(E===0)switch(2*L+3*Y){case 533:break;default:E=1}O++}break;case 64:c+O+R+I+$+j===0&&(j=1);break;case 42:case 47:if(!(0<R+I+O))switch(c){case 0:switch(2*v+3*u.charCodeAt(P+1)){case 235:c=47;break;case 220:U=P,c=42}break;case 42:v===47&&L===42&&U+2!==P&&(u.charCodeAt(U+2)===33&&(D+=u.substring(U,P+1)),Q="",c=0)}}c===0&&(h+=Q)}Y=L,L=v,P++}if(U=D.length,0<U){if(B=l,0<W&&(ne=f(2,D,B,p,X,q,U,x,o,x),ne!==void 0&&(D=ne).length===0))return Re+D+Ie;if(D=B.join(",")+"{"+D+"}",H*J!==0){switch(H!==2||s(D,2)||(J=0),J){case 111:D=D.replace(F,":-moz-$1")+D;break;case 112:D=D.replace(M,"::-webkit-input-$1")+D.replace(M,"::-moz-$1")+D.replace(M,":-ms-input-$1")+D}J=0}}return Re+D+Ie}function t(p,l,u){var x=l.trim().split(w);l=x;var o=x.length,I=p.length;switch(I){case 0:case 1:var c=0;for(p=I===0?"":p[0]+" ";c<o;++c)l[c]=a(p,l[c],u).trim();break;default:var O=c=0;for(l=[];c<o;++c)for(var R=0;R<I;++R)l[O++]=a(p[R]+" ",x[c],u).trim()}return l}function a(p,l,u){var x=l.charCodeAt(0);switch(33>x&&(x=(l=l.trim()).charCodeAt(0)),x){case 38:return l.replace(z,"$1"+p.trim());case 58:return p.trim()+l.replace(z,"$1"+p.trim());default:if(0<1*u&&0<l.indexOf("\f"))return l.replace(z,(p.charCodeAt(0)===58?"":"$1")+p.trim())}return p+l}function n(p,l,u,x){var o=p+";",I=2*l+3*u+4*x;if(I===944){p=o.indexOf(":",9)+1;var c=o.substring(p,o.length-1).trim();return c=o.substring(0,p).trim()+c+";",H===1||H===2&&s(c,1)?"-webkit-"+c+c:c}if(H===0||H===2&&!s(o,1))return o;switch(I){case 1015:return o.charCodeAt(10)===97?"-webkit-"+o+o:o;case 951:return o.charCodeAt(3)===116?"-webkit-"+o+o:o;case 963:return o.charCodeAt(5)===110?"-webkit-"+o+o:o;case 1009:if(o.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+o+o;case 978:return"-webkit-"+o+"-moz-"+o+o;case 1019:case 983:return"-webkit-"+o+"-moz-"+o+"-ms-"+o+o;case 883:if(o.charCodeAt(8)===45)return"-webkit-"+o+o;if(0<o.indexOf("image-set(",11))return o.replace(ce,"$1-webkit-$2")+o;break;case 932:if(o.charCodeAt(4)===45)switch(o.charCodeAt(5)){case 103:return"-webkit-box-"+o.replace("-grow","")+"-webkit-"+o+"-ms-"+o.replace("grow","positive")+o;case 115:return"-webkit-"+o+"-ms-"+o.replace("shrink","negative")+o;case 98:return"-webkit-"+o+"-ms-"+o.replace("basis","preferred-size")+o}return"-webkit-"+o+"-ms-"+o+o;case 964:return"-webkit-"+o+"-ms-flex-"+o+o;case 1023:if(o.charCodeAt(8)!==99)break;return c=o.substring(o.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+c+"-webkit-"+o+"-ms-flex-pack"+c+o;case 1005:return g.test(o)?o.replace(S,":-webkit-")+o.replace(S,":-moz-")+o:o;case 1e3:switch(c=o.substring(13).trim(),l=c.indexOf("-")+1,c.charCodeAt(0)+c.charCodeAt(l)){case 226:c=o.replace(_,"tb");break;case 232:c=o.replace(_,"tb-rl");break;case 220:c=o.replace(_,"lr");break;default:return o}return"-webkit-"+o+"-ms-"+c+o;case 1017:if(o.indexOf("sticky",9)===-1)break;case 975:switch(l=(o=p).length-10,c=(o.charCodeAt(l)===33?o.substring(0,l):o).substring(p.indexOf(":",7)+1).trim(),I=c.charCodeAt(0)+(c.charCodeAt(7)|0)){case 203:if(111>c.charCodeAt(8))break;case 115:o=o.replace(c,"-webkit-"+c)+";"+o;break;case 207:case 102:o=o.replace(c,"-webkit-"+(102<I?"inline-":"")+"box")+";"+o.replace(c,"-webkit-"+c)+";"+o.replace(c,"-ms-"+c+"box")+";"+o}return o+";";case 938:if(o.charCodeAt(5)===45)switch(o.charCodeAt(6)){case 105:return c=o.replace("-items",""),"-webkit-"+o+"-webkit-box-"+c+"-ms-flex-"+c+o;case 115:return"-webkit-"+o+"-ms-flex-item-"+o.replace(V,"")+o;default:return"-webkit-"+o+"-ms-flex-line-pack"+o.replace("align-content","").replace(V,"")+o}break;case 973:case 989:if(o.charCodeAt(3)!==45||o.charCodeAt(4)===122)break;case 931:case 953:if(oe.test(p)===!0)return(c=p.substring(p.indexOf(":")+1)).charCodeAt(0)===115?n(p.replace("stretch","fill-available"),l,u,x).replace(":fill-available",":stretch"):o.replace(c,"-webkit-"+c)+o.replace(c,"-moz-"+c.replace("fill-",""))+o;break;case 962:if(o="-webkit-"+o+(o.charCodeAt(5)===102?"-ms-"+o:"")+o,u+x===211&&o.charCodeAt(13)===105&&0<o.indexOf("transform",10))return o.substring(0,o.indexOf(";",27)+1).replace(y,"$1-webkit-$2")+o}return o}function s(p,l){var u=p.indexOf(l===1?":":"{"),x=p.substring(0,l!==3?u:10);return u=p.substring(u+1,p.length-1),fe(l!==2?x:x.replace(K,"$1"),u,l)}function i(p,l){var u=n(l,l.charCodeAt(0),l.charCodeAt(1),l.charCodeAt(2));return u!==l+";"?u.replace(se," or ($1)").substring(4):"("+l+")"}function f(p,l,u,x,o,I,c,O,R,E){for(var v=0,L=l,Y;v<W;++v)switch(Y=Z[v].call(N,p,L,u,x,o,I,c,O,R,E)){case void 0:case!1:case!0:case null:break;default:L=Y}if(L!==l)return L}function k(p){switch(p){case void 0:case null:W=Z.length=0;break;default:if(typeof p=="function")Z[W++]=p;else if(typeof p=="object")for(var l=0,u=p.length;l<u;++l)k(p[l]);else he=!!p|0}return k}function m(p){return p=p.prefix,p!==void 0&&(fe=null,p?typeof p!="function"?H=1:(H=2,fe=p):H=0),m}function N(p,l){var u=p;if(33>u.charCodeAt(0)&&(u=u.trim()),me=u,u=[me],0<W){var x=f(-1,l,u,u,X,q,0,0,0,0);x!==void 0&&typeof x=="string"&&(l=x)}var o=r(pe,u,l,0,0);return 0<W&&(x=f(-2,o,u,u,X,q,o.length,0,0,0),x!==void 0&&(o=x)),me="",J=0,q=X=1,o}var b=/^\0+/g,T=/[\0\r\f]/g,S=/: */g,g=/zoo|gra/,y=/([,: ])(transform)/g,w=/,\r+?/g,z=/([\t\r\n ])*\f?&/g,A=/@(k\w+)\s*(\S*)\s*/,M=/::(place)/g,F=/:(read-only)/g,_=/[svh]\w+-[tblr]{2}/,ae=/\(\s*(.*)\s*\)/g,se=/([\s\S]*?);/g,V=/-self|flex-/g,K=/[^]*?(:[rp][el]a[\w-]+)[^]*/,oe=/stretch|:\s*\w+\-(?:conte|avail)/,ce=/([^-])(image-set\()/,q=1,X=1,J=0,H=1,pe=[],Z=[],W=0,fe=null,he=0,me="";return N.use=k,N.set=m,e!==void 0&&m(e),N}var kt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function St(e){var r={};return function(t){return r[t]===void 0&&(r[t]=e(t)),r[t]}}var Ct=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,He=St(function(e){return Ct.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function re(){return(re=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var Ye=function(e,r){for(var t=[e[0]],a=0,n=r.length;a<n;a+=1)t.push(r[a],e[a+1]);return t},_e=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!Qe.typeOf(e)},Ae=Object.freeze([]),ie=Object.freeze({});function ve(e){return typeof e=="function"}function qe(e){return e.displayName||e.name||"Component"}function Be(e){return e&&typeof e.styledComponentId=="string"}var de=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",Ue=typeof window<"u"&&"HTMLElement"in window,At=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function ye(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var jt=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var r=e.prototype;return r.indexOfGroup=function(t){for(var a=0,n=0;n<t;n++)a+=this.groupSizes[n];return a},r.insertRules=function(t,a){if(t>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,i=s;t>=i;)(i<<=1)<0&&ye(16,""+t);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var f=s;f<i;f++)this.groupSizes[f]=0}for(var k=this.indexOfGroup(t+1),m=0,N=a.length;m<N;m++)this.tag.insertRule(k,a[m])&&(this.groupSizes[t]++,k++)},r.clearGroup=function(t){if(t<this.length){var a=this.groupSizes[t],n=this.indexOfGroup(t),s=n+a;this.groupSizes[t]=0;for(var i=n;i<s;i++)this.tag.deleteRule(n)}},r.getGroup=function(t){var a="";if(t>=this.length||this.groupSizes[t]===0)return a;for(var n=this.groupSizes[t],s=this.indexOfGroup(t),i=s+n,f=s;f<i;f++)a+=this.tag.getRule(f)+`/*!sc*/
`;return a},e}(),Ce=new Map,je=new Map,Te=1,ke=function(e){if(Ce.has(e))return Ce.get(e);for(;je.has(Te);)Te++;var r=Te++;return Ce.set(e,r),je.set(r,e),r},Nt=function(e){return je.get(e)},It=function(e,r){Ce.set(e,r),je.set(r,e)},Rt="style["+de+'][data-styled-version="5.2.1"]',Pt=new RegExp("^"+de+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Et=function(e,r,t){for(var a,n=t.split(","),s=0,i=n.length;s<i;s++)(a=n[s])&&e.registerName(r,a)},Tt=function(e,r){for(var t=r.innerHTML.split(`/*!sc*/
`),a=[],n=0,s=t.length;n<s;n++){var i=t[n].trim();if(i){var f=i.match(Pt);if(f){var k=0|parseInt(f[1],10),m=f[2];k!==0&&(It(m,k),Et(e,m,f[3]),e.getTag().insertRules(k,a)),a.length=0}else a.push(i)}}},zt=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},Ke=function(e){var r=document.head,t=e||r,a=document.createElement("style"),n=function(f){for(var k=f.childNodes,m=k.length;m>=0;m--){var N=k[m];if(N&&N.nodeType===1&&N.hasAttribute(de))return N}}(t),s=n!==void 0?n.nextSibling:null;a.setAttribute(de,"active"),a.setAttribute("data-styled-version","5.2.1");var i=zt();return i&&a.setAttribute("nonce",i),t.insertBefore(a,s),a},Ot=function(){function e(t){var a=this.element=Ke(t);a.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var s=document.styleSheets,i=0,f=s.length;i<f;i++){var k=s[i];if(k.ownerNode===n)return k}ye(17)}(a),this.length=0}var r=e.prototype;return r.insertRule=function(t,a){try{return this.sheet.insertRule(a,t),this.length++,!0}catch{return!1}},r.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},r.getRule=function(t){var a=this.sheet.cssRules[t];return a!==void 0&&typeof a.cssText=="string"?a.cssText:""},e}(),_t=function(){function e(t){var a=this.element=Ke(t);this.nodes=a.childNodes,this.length=0}var r=e.prototype;return r.insertRule=function(t,a){if(t<=this.length&&t>=0){var n=document.createTextNode(a),s=this.nodes[t];return this.element.insertBefore(n,s||null),this.length++,!0}return!1},r.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},r.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Dt=function(){function e(t){this.rules=[],this.length=0}var r=e.prototype;return r.insertRule=function(t,a){return t<=this.length&&(this.rules.splice(t,0,a),this.length++,!0)},r.deleteRule=function(t){this.rules.splice(t,1),this.length--},r.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Ve=Ue,Ft={isServer:!Ue,useCSSOMInjection:!At},Je=function(){function e(t,a,n){t===void 0&&(t=ie),a===void 0&&(a={}),this.options=re({},Ft,{},t),this.gs=a,this.names=new Map(n),!this.options.isServer&&Ue&&Ve&&(Ve=!1,function(s){for(var i=document.querySelectorAll(Rt),f=0,k=i.length;f<k;f++){var m=i[f];m&&m.getAttribute(de)!=="active"&&(Tt(s,m),m.parentNode&&m.parentNode.removeChild(m))}}(this))}e.registerId=function(t){return ke(t)};var r=e.prototype;return r.reconstructWithOptions=function(t,a){return a===void 0&&(a=!0),new e(re({},this.options,{},t),this.gs,a&&this.names||void 0)},r.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},r.getTag=function(){return this.tag||(this.tag=(n=(a=this.options).isServer,s=a.useCSSOMInjection,i=a.target,t=n?new Dt(i):s?new Ot(i):new _t(i),new jt(t)));var t,a,n,s,i},r.hasNameForId=function(t,a){return this.names.has(t)&&this.names.get(t).has(a)},r.registerName=function(t,a){if(ke(t),this.names.has(t))this.names.get(t).add(a);else{var n=new Set;n.add(a),this.names.set(t,n)}},r.insertRules=function(t,a,n){this.registerName(t,a),this.getTag().insertRules(ke(t),n)},r.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},r.clearRules=function(t){this.getTag().clearGroup(ke(t)),this.clearNames(t)},r.clearTag=function(){this.tag=void 0},r.toString=function(){return function(t){for(var a=t.getTag(),n=a.length,s="",i=0;i<n;i++){var f=Nt(i);if(f!==void 0){var k=t.names.get(f),m=a.getGroup(i);if(k!==void 0&&m.length!==0){var N=de+".g"+i+'[id="'+f+'"]',b="";k!==void 0&&k.forEach(function(T){T.length>0&&(b+=T+",")}),s+=""+m+N+'{content:"'+b+`"}/*!sc*/
`}}}return s}(this)},e}(),Mt=/(a)(d)/gi,We=function(e){return String.fromCharCode(e+(e>25?39:97))};function De(e){var r,t="";for(r=Math.abs(e);r>52;r=r/52|0)t=We(r%52)+t;return(We(r%52)+t).replace(Mt,"$1-$2")}var le=function(e,r){for(var t=r.length;t;)e=33*e^r.charCodeAt(--t);return e},et=function(e){return le(5381,e)};function Lt(e){for(var r=0;r<e.length;r+=1){var t=e[r];if(ve(t)&&!Be(t))return!1}return!0}var Bt=et("5.2.1"),Ut=function(){function e(r,t,a){this.rules=r,this.staticRulesId="",this.isStatic=(a===void 0||a.isStatic)&&Lt(r),this.componentId=t,this.baseHash=le(Bt,t),this.baseStyle=a,Je.registerId(t)}return e.prototype.generateAndInjectStyles=function(r,t,a){var n=this.componentId,s=[];if(this.baseStyle&&s.push(this.baseStyle.generateAndInjectStyles(r,t,a)),this.isStatic&&!a.hash)if(this.staticRulesId&&t.hasNameForId(n,this.staticRulesId))s.push(this.staticRulesId);else{var i=ue(this.rules,r,t,a).join(""),f=De(le(this.baseHash,i.length)>>>0);if(!t.hasNameForId(n,f)){var k=a(i,"."+f,void 0,n);t.insertRules(n,f,k)}s.push(f),this.staticRulesId=f}else{for(var m=this.rules.length,N=le(this.baseHash,a.hash),b="",T=0;T<m;T++){var S=this.rules[T];if(typeof S=="string")b+=S;else if(S){var g=ue(S,r,t,a),y=Array.isArray(g)?g.join(""):g;N=le(N,y+T),b+=y}}if(b){var w=De(N>>>0);if(!t.hasNameForId(n,w)){var z=a(b,"."+w,void 0,n);t.insertRules(n,w,z)}s.push(w)}}return s.join(" ")},e}(),$t=/^\s*\/\/.*$/gm,Gt=[":","[",".","#"];function Ht(e){var r,t,a,n,s=e===void 0?ie:e,i=s.options,f=i===void 0?ie:i,k=s.plugins,m=k===void 0?Ae:k,N=new wt(f),b=[],T=function(y){function w(z){if(z)try{y(z+"}")}catch{}}return function(z,A,M,F,_,ae,se,V,K,oe){switch(z){case 1:if(K===0&&A.charCodeAt(0)===64)return y(A+";"),"";break;case 2:if(V===0)return A+"/*|*/";break;case 3:switch(V){case 102:case 112:return y(M[0]+A),"";default:return A+(oe===0?"/*|*/":"")}case-2:A.split("/*|*/}").forEach(w)}}}(function(y){b.push(y)}),S=function(y,w,z){return w===0&&Gt.includes(z[t.length])||z.match(n)?y:"."+r};function g(y,w,z,A){A===void 0&&(A="&");var M=y.replace($t,""),F=w&&z?z+" "+w+" { "+M+" }":M;return r=A,t=w,a=new RegExp("\\"+t+"\\b","g"),n=new RegExp("(\\"+t+"\\b){2,}"),N(z||!w?"":w,F)}return N.use([].concat(m,[function(y,w,z){y===2&&z.length&&z[0].lastIndexOf(t)>0&&(z[0]=z[0].replace(a,S))},T,function(y){if(y===-2){var w=b;return b=[],w}}])),g.hash=m.length?m.reduce(function(y,w){return w.name||ye(15),le(y,w.name)},5381).toString():"",g}var tt=Ne.createContext();tt.Consumer;var rt=Ne.createContext(),Yt=(rt.Consumer,new Je),Fe=Ht();function qt(){return te.useContext(tt)||Yt}function Vt(){return te.useContext(rt)||Fe}var Wt=function(){function e(r,t){var a=this;this.inject=function(n,s){s===void 0&&(s=Fe);var i=a.name+s.hash;n.hasNameForId(a.id,i)||n.insertRules(a.id,i,s(a.rules,i,"@keyframes"))},this.toString=function(){return ye(12,String(a.name))},this.name=r,this.id="sc-keyframes-"+r,this.rules=t}return e.prototype.getName=function(r){return r===void 0&&(r=Fe),this.name+r.hash},e}(),Xt=/([A-Z])/,Zt=/([A-Z])/g,Qt=/^ms-/,Kt=function(e){return"-"+e.toLowerCase()};function Xe(e){return Xt.test(e)?e.replace(Zt,Kt).replace(Qt,"-ms-"):e}var Ze=function(e){return e==null||e===!1||e===""};function ue(e,r,t,a){if(Array.isArray(e)){for(var n,s=[],i=0,f=e.length;i<f;i+=1)(n=ue(e[i],r,t,a))!==""&&(Array.isArray(n)?s.push.apply(s,n):s.push(n));return s}if(Ze(e))return"";if(Be(e))return"."+e.styledComponentId;if(ve(e)){if(typeof(m=e)!="function"||m.prototype&&m.prototype.isReactComponent||!r)return e;var k=e(r);return ue(k,r,t,a)}var m;return e instanceof Wt?t?(e.inject(t,a),e.getName(a)):e:_e(e)?function N(b,T){var S,g,y=[];for(var w in b)b.hasOwnProperty(w)&&!Ze(b[w])&&(_e(b[w])?y.push.apply(y,N(b[w],w)):ve(b[w])?y.push(Xe(w)+":",b[w],";"):y.push(Xe(w)+": "+(S=w,(g=b[w])==null||typeof g=="boolean"||g===""?"":typeof g!="number"||g===0||S in kt?String(g).trim():g+"px")+";"));return T?[T+" {"].concat(y,["}"]):y}(e):e.toString()}function Jt(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];return ve(e)||_e(e)?ue(Ye(Ae,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:ue(Ye(e,t))}var er=function(e,r,t){return t===void 0&&(t=ie),e.theme!==t.theme&&e.theme||r||t.theme},tr=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,rr=/(^-|-$)/g;function ze(e){return e.replace(tr,"-").replace(rr,"")}var ar=function(e){return De(et(e)>>>0)};function Se(e){return typeof e=="string"&&!0}var Me=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},or=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function nr(e,r,t){var a=e[t];Me(r)&&Me(a)?at(a,r):e[t]=r}function at(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];for(var n=0,s=t;n<s.length;n++){var i=s[n];if(Me(i))for(var f in i)or(f)&&nr(e,i[f],f)}return e}var ot=Ne.createContext();ot.Consumer;var Oe={};function nt(e,r,t){var a=Be(e),n=!Se(e),s=r.attrs,i=s===void 0?Ae:s,f=r.componentId,k=f===void 0?function(A,M){var F=typeof A!="string"?"sc":ze(A);Oe[F]=(Oe[F]||0)+1;var _=F+"-"+ar("5.2.1"+F+Oe[F]);return M?M+"-"+_:_}(r.displayName,r.parentComponentId):f,m=r.displayName,N=m===void 0?function(A){return Se(A)?"styled."+A:"Styled("+qe(A)+")"}(e):m,b=r.displayName&&r.componentId?ze(r.displayName)+"-"+r.componentId:r.componentId||k,T=a&&e.attrs?Array.prototype.concat(e.attrs,i).filter(Boolean):i,S=r.shouldForwardProp;a&&e.shouldForwardProp&&(S=r.shouldForwardProp?function(A,M){return e.shouldForwardProp(A,M)&&r.shouldForwardProp(A,M)}:e.shouldForwardProp);var g,y=new Ut(t,b,a?e.componentStyle:void 0),w=y.isStatic&&i.length===0,z=function(A,M){return function(F,_,ae,se){var V=F.attrs,K=F.componentStyle,oe=F.defaultProps,ce=F.foldedComponentIds,q=F.shouldForwardProp,X=F.styledComponentId,J=F.target,H=function(x,o,I){x===void 0&&(x=ie);var c=re({},o,{theme:x}),O={};return I.forEach(function(R){var E,v,L,Y=R;for(E in ve(Y)&&(Y=Y(c)),Y)c[E]=O[E]=E==="className"?(v=O[E],L=Y[E],v&&L?v+" "+L:v||L):Y[E]}),[c,O]}(er(_,te.useContext(ot),oe)||ie,_,V),pe=H[0],Z=H[1],W=function(x,o,I,c){var O=qt(),R=Vt(),E=o?x.generateAndInjectStyles(ie,O,R):x.generateAndInjectStyles(I,O,R);return E}(K,se,pe),fe=ae,he=Z.$as||_.$as||Z.as||_.as||J,me=Se(he),p=Z!==_?re({},_,{},Z):_,l={};for(var u in p)u[0]!=="$"&&u!=="as"&&(u==="forwardedAs"?l.as=p[u]:(q?q(u,He):!me||He(u))&&(l[u]=p[u]));return _.style&&Z.style!==_.style&&(l.style=re({},_.style,{},Z.style)),l.className=Array.prototype.concat(ce,X,W!==X?W:null,_.className,Z.className).filter(Boolean).join(" "),l.ref=fe,te.createElement(he,l)}(g,A,M,w)};return z.displayName=N,(g=Ne.forwardRef(z)).attrs=T,g.componentStyle=y,g.displayName=N,g.shouldForwardProp=S,g.foldedComponentIds=a?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):Ae,g.styledComponentId=b,g.target=a?e.target:e,g.withComponent=function(A){var M=r.componentId,F=function(ae,se){if(ae==null)return{};var V,K,oe={},ce=Object.keys(ae);for(K=0;K<ce.length;K++)V=ce[K],se.indexOf(V)>=0||(oe[V]=ae[V]);return oe}(r,["componentId"]),_=M&&M+"-"+(Se(A)?A:ze(qe(A)));return nt(A,re({},F,{attrs:T,componentId:_}),t)},Object.defineProperty(g,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(A){this._foldedDefaultProps=a?at({},e.defaultProps,A):A}}),g.toString=function(){return"."+g.styledComponentId},n&&ct(g,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),g}var Le=function(e){return function r(t,a,n){if(n===void 0&&(n=ie),!Qe.isValidElementType(a))return ye(1,String(a));var s=function(){return t(a,n,Jt.apply(void 0,arguments))};return s.withConfig=function(i){return r(t,a,re({},n,{},i))},s.attrs=function(i){return r(t,a,re({},n,{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},s}(nt,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){Le[e]=Le(e)});const it=Le,ir=it.div`
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
`,sr=it.div`
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
`;function st(e){return d.jsx(sr,{children:d.jsxs("div",{className:"modal",children:[d.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),d.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}st.propTypes={src:G.string.isRequired,alt:G.string.isRequired,onClose:G.func.isRequired};function $e(e){const[r,t]=te.useState(!1),[a,n]=te.useState(null),s=te.useRef(),i=()=>{const{value:S}=e;return S?Array.isArray(S)?S:[S]:[]},f=S=>{const g=i().filter(y=>y.id!==S);e.onChange(g)},k=async S=>{try{const g=S.target.files;if(!g||!g.length)return;let y=g[0];Ge.validate(y,{storage:e.storage,image:!0}),t(!0),y=await Ge.upload(y,{storage:e.storage,image:!0}),s!=null&&s.current&&(s.current.value=null),t(!1),e.onChange([y])}catch(g){s!=null&&s.current&&(s.current.value=null),console.error(g),t(!1),lt.showMessage(g)}},m=S=>{n({src:S.downloadUrl,alt:S.name})},N=()=>{n(null)},{readonly:b}=e,T=d.jsx("label",{children:d.jsxs("div",{className:"upload-area",children:[d.jsx("div",{className:"upload-icon",children:d.jsx("i",{className:"fas fa-cloud-upload-alt"})}),d.jsx("div",{className:"upload-text",children:e.text}),d.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),d.jsx("input",{style:{display:"none"},disabled:r||b,accept:"image/*",type:"file",onChange:k,ref:s})]})});return d.jsxs(ir,{children:[b||i().length>0?null:T,i().length>0&&d.jsx("div",{className:"upload-card",children:i().length===0?T:i().map(S=>d.jsxs("div",{className:"uploaded-box",children:[d.jsx("img",{alt:S.name,src:S.downloadUrl,className:"uploaded-img"}),d.jsxs("div",{className:"img-buttons",children:[d.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>m(S),children:d.jsx("i",{className:"fas fa-search"})}),!b&&d.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>f(S.id),children:d.jsx("i",{className:"fas fa-times"})})]})]},S.id||S.name))}),a&&d.jsx(st,{src:a.src,alt:a.alt,onClose:N})]})}$e.propTypes={readonly:G.bool,storage:G.object,value:G.any,onChange:G.func,text:G.string};$e.defaultProps={text:"Upload"};function xe(e){const{label:r,name:t,text:a,hint:n,storage:s,max:i,required:f,externalErrorMessage:k}=e,{errors:m,formState:{touched:N,isSubmitted:b},setValue:T,watch:S,register:g}=mt();te.useEffect(()=>{g({name:t})},[g,t]);const y=gt.errorMessage(t,m,N,b,k);return d.jsxs("div",{className:"file-upload",children:[!!r&&d.jsx("label",{className:`input-label ${f?"required":null}`,htmlFor:t,children:r}),d.jsx($e,{storage:s,value:S(t),onChange:w=>{T(t,w,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(w)},text:a,max:i}),d.jsx("div",{className:"invalid-feedback",children:y}),!!n&&d.jsx("small",{className:"form-text text-muted",children:n})]})}xe.defaultProps={max:void 0,required:!1};xe.propTypes={storage:G.object.isRequired,max:G.number,required:G.bool,name:G.string.isRequired,label:G.string,hint:G.string,formItemProps:G.object,text:G.string};const cr={status:["pending","canceled","success"],type:["withdraw","deposit"]},lr=e=>ft().shape({user:ee.relationToOne(C("entities.vip.fields.title"),{}),Documenttype:ee.string(C("pages.proof.fields.documentType")),realname:ee.string(C("pages.proof.fields.fullName"),{required:!0}),idnumer:ee.string(C("pages.proof.fields.documentNumber"),{required:!0}),address:ee.string(C("pages.proof.fields.address"),{required:!0}),front:ee.images(C("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?ee.images(C("pages.proof.fields.backSide")):ee.images(C("pages.proof.fields.backSide"),{required:!0}),selfie:ee.images(C("pages.proof.fields.selfie"),{required:!0}),status:ee.enumerator(C("entities.transaction.fields.status"),{options:cr.status})});function br(){const e=dt(),[r,t]=te.useState("passport"),a=ut(pt.selectCurrentUser),n=yt(),s=te.useMemo(()=>lr(r),[r]),i=bt({resolver:xt.yupResolver(s),mode:"all",defaultValues:{user:a||[],Documenttype:r,realname:"",idnumer:"",address:"",front:[],back:[],selfie:[],status:"pending"}}),f=b=>{const T={...b,user:a,Documenttype:r};r==="passport"&&(T.back=[]),n(ht.doCreate(T))},k=b=>{t(b),b==="passport"&&i.setValue("back",[])},m=()=>e.goBack(),N=[{value:"passport",label:C("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:C("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:C("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return d.jsxs("div",{className:"proof-wrapper",children:[d.jsxs("div",{className:"proof-card",children:[d.jsxs("div",{className:"header",children:[d.jsx("div",{className:"back-button",onClick:m,children:d.jsx("i",{className:"fas fa-arrow-left"})}),d.jsx("h1",{className:"page-title",children:C("pages.proof.title")}),d.jsx("div",{className:"header-spacer"})]}),d.jsx("div",{className:"instructions",children:C("pages.proof.instructions")}),d.jsx(vt,{...i,children:d.jsxs("form",{onSubmit:i.handleSubmit(f),children:[d.jsxs("div",{className:"form-section",children:[d.jsx("div",{className:"section-title",children:C("pages.proof.sections.documentInfo")}),d.jsxs("div",{className:"input-group",children:[d.jsxs("label",{className:"input-label",children:[C("pages.proof.fields.documentType")," ",d.jsx("span",{className:"required",children:"*"})]}),d.jsx("div",{className:"radio-group",children:N.map(b=>d.jsxs("div",{className:`radio-option ${b.value===r?"selected":""}`,onClick:()=>k(b.value),children:[d.jsx("i",{className:`${b.icon} radio-icon`}),d.jsx("span",{className:"radio-text",children:b.label})]},b.value))})]}),d.jsx(Ee,{className:"text-input",name:"realname",label:C("pages.proof.fields.fullName"),placeholder:C("pages.proof.placeholders.fullName")}),d.jsx(Ee,{className:"text-input",name:"idnumer",label:C("pages.proof.fields.documentNumber"),placeholder:C("pages.proof.placeholders.documentNumber")}),d.jsx(Ee,{className:"text-input",name:"address",label:C("pages.proof.fields.address"),placeholder:C("pages.proof.placeholders.address")})]}),d.jsxs("div",{className:"form-section",children:[d.jsx("div",{className:"section-title",children:C("pages.proof.sections.documentUpload")}),d.jsx(xe,{name:"front",label:C("pages.proof.fields.frontSide"),storage:Pe.values.categoryPhoto,text:C("pages.proof.uploadTexts.frontSide"),max:2}),r!=="passport"&&d.jsx(xe,{name:"back",label:C("pages.proof.fields.backSide"),storage:Pe.values.categoryPhoto,text:C("pages.proof.uploadTexts.backSide"),max:2}),d.jsx(xe,{name:"selfie",label:C("pages.proof.fields.selfie"),storage:Pe.values.categoryPhoto,text:C("pages.proof.uploadTexts.selfie"),max:2})]}),d.jsxs("div",{className:"security-note",children:[d.jsxs("div",{className:"security-title",children:[d.jsx("i",{className:"fas fa-shield-alt"})," ",C("pages.proof.security.title")]}),d.jsx("div",{className:"security-text",children:C("pages.proof.security.text")})]}),d.jsx("button",{type:"submit",className:"submit-button",children:C("pages.proof.buttons.validateDocuments")})]})}),d.jsxs("div",{className:"footer",children:[C("pages.proof.footer.copyright")," | ",d.jsx("a",{href:"#",children:C("pages.proof.footer.privacyPolicy")})]})]}),d.jsx("style",{children:`
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
      `})]})}export{br as default};
