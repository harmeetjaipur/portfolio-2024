"use strict";(self.webpackChunkmy_portfolio_2024=self.webpackChunkmy_portfolio_2024||[]).push([[1638],{1638:(t,e,o)=>{o.d(e,{EmojiDrawer:()=>l});var a=o(4409);var i=o(6682);const n='"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';class l{constructor(){this._emojiShapeDict=new Map}destroy(){for(const[t,e]of this._emojiShapeDict)e instanceof ImageBitmap&&(null===e||void 0===e||e.close(),this._emojiShapeDict.delete(t))}draw(t){!function(t){const{context:e,particle:o,radius:a,opacity:i}=t,n=o.emojiData,l=2*a,c=e.globalAlpha;n&&(e.globalAlpha=i,e.drawImage(n,-a,-a,l,l),e.globalAlpha=c)}(t)}async init(t){const e=t.actualOptions;if(!i.u.find((t=>(0,a.hn)(t,e.particles.shape.type))))return;const o=[(0,a.Al)(n)],l=i.u.map((t=>e.particles.shape.options[t])).find((t=>!!t));l&&(0,a.wJ)(l,(t=>{t.font&&o.push((0,a.Al)(t.font))})),await Promise.all(o)}particleDestroy(t){delete t.emojiData}particleInit(t,e){var o;const i=e.shapeData;if(null===i||void 0===i||!i.value)return;const l=(0,a.TA)(i.value,e.randomIndexData),c=null!==(o=i.font)&&void 0!==o?o:n;if(!l)return;const s="".concat(l,"_").concat(c),r=this._emojiShapeDict.get(s);if(r)return void(e.emojiData=r);const p=2*(0,a.W9)(e.size.value);let f;const m=(0,a.W9)(e.size.value);if("undefined"!==typeof OffscreenCanvas){const t=new OffscreenCanvas(p,p),e=t.getContext("2d");if(!e)return;e.font="400 ".concat(2*m,"px ").concat(c),e.textBaseline="middle",e.textAlign="center",e.fillText(l,m,m),f=t.transferToImageBitmap()}else{const t=document.createElement("canvas");t.width=p,t.height=p;const e=t.getContext("2d");if(!e)return;e.font="400 ".concat(2*m,"px ").concat(c),e.textBaseline="middle",e.textAlign="center",e.fillText(l,m,m),f=t}this._emojiShapeDict.set(s,f),e.emojiData=f}}}}]);
//# sourceMappingURL=1638.1634363a.chunk.js.map