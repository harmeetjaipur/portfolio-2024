"use strict";(self.webpackChunkmy_portfolio_2024=self.webpackChunkmy_portfolio_2024||[]).push([[8731],{8731:(e,i,n)=>{n.d(i,{BaseMover:()=>s});var t=n(4409);const o=1;function a(e,i,n,a,s,c){!function(e,i){var n;const a=e.options,s=a.move.path;if(!s.enable)return;if(e.lastPathTime<=e.pathDelay)return void(e.lastPathTime+=i.value);const c=null===(n=e.pathGenerator)||void 0===n?void 0:n.generate(e,i);c&&e.velocity.addTo(c);s.clamp&&(e.velocity.x=(0,t.qE)(e.velocity.x,-o,o),e.velocity.y=(0,t.qE)(e.velocity.y,-o,o));e.lastPathTime-=e.pathDelay}(e,c);const l=e.gravity,r=null!==l&&void 0!==l&&l.enable&&l.inverse?-o:o;s&&n&&(e.velocity.x+=s*c.factor/(60*n)),null!==l&&void 0!==l&&l.enable&&n&&(e.velocity.y+=r*(l.acceleration*c.factor)/(60*n));const v=e.moveDecay;e.velocity.multTo(v);const p=e.velocity.mult(n);null!==l&&void 0!==l&&l.enable&&a>0&&(!l.inverse&&p.y>=0&&p.y>=a||l.inverse&&p.y<=0&&p.y<=-a)&&(p.y=r*a,n&&(e.velocity.y=p.y/n));const y=e.options.zIndex,d=(o-e.zIndexFactor)**y.velocityRate;p.multTo(d);const{position:u}=e;u.addTo(p),i.vibrate&&(u.x+=Math.sin(u.x*Math.cos(u.y)),u.y+=Math.cos(u.y*Math.sin(u.x)))}class s{init(e){const i=e.options.move.gravity;e.gravity={enable:i.enable,acceleration:(0,t.VG)(i.acceleration),inverse:i.inverse},function(e){var i;const n=e.container,o=e.options.move.spin;if(!o.enable)return;const a=null!==(i=o.position)&&void 0!==i?i:{x:50,y:50},s={x:.01*a.x*n.canvas.size.width,y:.01*a.y*n.canvas.size.height},c=e.getPosition(),l=(0,t.Yf)(c,s),r=(0,t.VG)(o.acceleration);e.retina.spinAcceleration=r*n.retina.pixelRatio,e.spin={center:s,direction:e.velocity.x>=0?"clockwise":"counter-clockwise",angle:e.velocity.angle,radius:l,acceleration:e.retina.spinAcceleration}}(e)}isEnabled(e){return!e.destroyed&&e.options.move.enable}move(e,i){var n,s,c,l,r;const v=e.options,p=v.move;if(!p.enable)return;const y=e.container,d=y.retina.pixelRatio;null!==(s=(n=e.retina).moveSpeed)&&void 0!==s||(n.moveSpeed=(0,t.VG)(p.speed)*d),null!==(l=(c=e.retina).moveDrift)&&void 0!==l||(c.moveDrift=(0,t.VG)(e.options.move.drift)*d);const u=function(e){return e.slow.inRange?e.slow.factor:o}(e),x=e.retina.moveSpeed*y.retina.reduceFactor,m=e.retina.moveDrift,f=(0,t.W9)(v.size.value)*d,h=x*(p.size?e.getRadius()/f:1)*u*(i.factor||1)/2,b=null!==(r=e.retina.maxSpeed)&&void 0!==r?r:y.retina.maxSpeed;p.spin.enable?function(e,i){const n=e.container;if(!e.spin)return;const t={x:"clockwise"===e.spin.direction?Math.cos:Math.sin,y:"clockwise"===e.spin.direction?Math.sin:Math.cos};e.position.x=e.spin.center.x+e.spin.radius*t.x(e.spin.angle),e.position.y=e.spin.center.y+e.spin.radius*t.y(e.spin.angle),e.spin.radius+=e.spin.acceleration;const a=Math.max(n.canvas.size.width,n.canvas.size.height),s=.5*a;e.spin.radius>s?(e.spin.radius=s,e.spin.acceleration*=-o):e.spin.radius<0&&(e.spin.radius=0,e.spin.acceleration*=-o),e.spin.angle+=.01*i*(o-e.spin.radius/a)}(e,h):a(e,p,h,b,m,i),function(e){var i,n;const o=e.initialPosition,{dx:a,dy:s}=(0,t.vr)(o,e.position),c=Math.abs(a),l=Math.abs(s),{maxDistance:r}=e.retina,v=r.horizontal,p=r.vertical;if(!v&&!p)return;const y=null!==(n=p&&l>=p)&&void 0!==n&&n;if((null!==(i=v&&c>=v)&&void 0!==i&&i||y)&&!e.misplaced)e.misplaced=!!v&&c>v||!!p&&l>p,v&&(e.velocity.x=.5*e.velocity.y-e.velocity.x),p&&(e.velocity.y=.5*e.velocity.x-e.velocity.y);else if((!v||c<v)&&(!p||l<p)&&e.misplaced)e.misplaced=!1;else if(e.misplaced){const i=e.position,n=e.velocity;v&&(i.x<o.x&&n.x<0||i.x>o.x&&n.x>0)&&(n.x*=-(0,t.G0)()),p&&(i.y<o.y&&n.y<0||i.y>o.y&&n.y>0)&&(n.y*=-(0,t.G0)())}}(e)}}}}]);
//# sourceMappingURL=8731.e4f2ff79.chunk.js.map