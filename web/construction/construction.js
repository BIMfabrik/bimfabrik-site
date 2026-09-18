(() => {
  const canvas = document.getElementById("signal-field");
  const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
  if (!gl || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const vertex = "attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }";
  const fragment = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float box(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float object(vec3 p){float d=box(p-vec3(0.,-.42,0.),vec3(1.46,.08,1.05));d=min(d,box(p-vec3(-.78,.13,-.44),vec3(.18,.48,.18)));d=min(d,box(p-vec3(-.30,.32,.20),vec3(.19,.67,.19)));d=min(d,box(p-vec3(.18,.10,-.30),vec3(.22,.45,.22)));d=min(d,box(p-vec3(.66,.38,.26),vec3(.17,.73,.17)));d=min(d,box(p-vec3(.83,-.02,-.67),vec3(.14,.30,.14)));d=min(d,box(p-vec3(-.12,.88,-.08),vec3(.38,.05,.38)));return d;}
float scene(vec3 p){return min(object(p),p.y+.58);}
vec3 normal(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}
void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;float angle=t*.17+(m.x-.5)*.58;vec3 ro=vec3(3.3,2.15,4.15);ro.xz=rot(angle)*ro.xz;vec3 target=vec3(0.,.15,0.);vec3 f=normalize(target-ro);vec3 right=normalize(cross(f,vec3(0.,1.,0.)));vec3 up=cross(right,f);vec3 rd=normalize(f+uv.x*right*1.1+uv.y*up*1.1);float travel=0.;float hit=0.;vec3 pos=ro;for(int i=0;i<64;i++){pos=ro+rd*travel;float d=scene(pos);if(d<.002){hit=1.;break;}travel+=d*.78;if(travel>12.)break;}vec3 col=vec3(.035,.037,.035)+vec3(.035,.028,.006)*(1.-smoothstep(.2,1.2,length(uv)));if(hit>.5){vec3 n=normal(pos);vec3 light=normalize(vec3(-2.,4.,3.));float diffuse=max(dot(n,light),.0);float rim=pow(1.-max(dot(n,-rd),.0),2.4);float floorHit=step(pos.y,-.575);vec3 material=mix(vec3(.14,.15,.13),vec3(.72,.46,.035),floorHit);float top=smoothstep(.65,1.,n.y);material=mix(material,vec3(.92,.70,.14),top*.55);col=material*(.18+.82*diffuse)+rim*vec3(.85,.55,.08)*.45;if(floorHit>.5){vec2 g=pos.xz;float lines=max(1.-smoothstep(.0,.018,abs(fract(g.x*1.5)-.5)),1.-smoothstep(.0,.018,abs(fract(g.y*1.5)-.5)));col+=lines*vec3(.28,.20,.04);}}float glow=0.;for(int i=0;i<5;i++){float fi=float(i);vec3 node=vec3(sin(fi*2.1)*.82,.08+fi*.18,cos(fi*1.7)*.58);glow+=.003/(length(pos-node)+.012);}col+=glow*vec3(1.,.55,.03);col=pow(col,vec3(.86));gl_FragColor=vec4(col,1.);}`;
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader; };
  const program = gl.createProgram(); gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "p"); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program,"r"), time = gl.getUniformLocation(program,"t"), mouse = gl.getUniformLocation(program,"m"); let pointer=[.5,.5];
  const resize = () => { const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,1.5); canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;gl.viewport(0,0,canvas.width,canvas.height); };
  addEventListener("resize",resize);canvas.addEventListener("pointermove",event=>{const rect=canvas.getBoundingClientRect();pointer=[(event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height];});resize();
  const draw = now => {gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(time,now/1000);gl.uniform2f(mouse,pointer[0],pointer[1]);gl.drawArrays(gl.TRIANGLES,0,3);requestAnimationFrame(draw);};requestAnimationFrame(draw);
})();
