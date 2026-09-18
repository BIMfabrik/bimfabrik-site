(() => {
  const canvas = document.getElementById("signal-field");
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
  if (!gl || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const vertex = "attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }";
  const fragment = "precision mediump float; uniform vec2 r; uniform float t; uniform vec2 m; float line(float v,float w){return 1.-smoothstep(w,w+.012,abs(v));} void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/r.y; uv.x+= (m.x-.5)*.08; vec3 col=vec3(.045,.045,.043); float horizon=.23+sin(t*.18)*.018; float perspective=1./max(.08,uv.y+horizon+.42); float depth=perspective*1.4; float lanes=line(fract(uv.x*perspective*2.8)-.5,.018); float rows=line(fract(depth*1.9)-.5,.022); float grid=max(lanes,rows); col+=grid*vec3(.17,.17,.15); float orbit=sin(uv.x*9.+depth*7.-t*.9)+sin(uv.x*3.-depth*11.+t*.6); float path=smoothstep(.94,.99,orbit*.5+.5)*smoothstep(.85,.08,abs(uv.y+.02)); col+=path*vec3(.47,.31,.01); for(int i=0;i<4;i++){float fi=float(i); vec2 node=vec2(sin(t*(.18+fi*.03)+fi*2.1)*.55, -.08+fract(t*(.035+fi*.008)+fi*.24)*.72); float glow=.016/(length(uv-node)+.012); col+=glow*vec3(1.,.62,.02);} float haze=smoothstep(.8,.05,length(uv-vec2(0.,.12))); col+=haze*vec3(.08,.065,.015); gl_FragColor=vec4(col,1.);}";
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader; };
  const program = gl.createProgram(); gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "p"); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "r"); const time = gl.getUniformLocation(program, "t"); const mouse = gl.getUniformLocation(program, "m"); let pointer = [0.5, 0.5];
  const resize = () => { const dpr = Math.min(devicePixelRatio, 1.5); canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; gl.viewport(0,0,canvas.width,canvas.height); };
  addEventListener("resize", resize); canvas.addEventListener("pointermove", event => { const rect = canvas.getBoundingClientRect(); pointer = [(event.clientX-rect.left)/rect.width, 1-(event.clientY-rect.top)/rect.height]; }); resize();
  const draw = now => { gl.uniform2f(resolution, canvas.width, canvas.height); gl.uniform1f(time, now/1000); gl.uniform2f(mouse, pointer[0], pointer[1]); gl.drawArrays(gl.TRIANGLES, 0, 3); requestAnimationFrame(draw); };
  requestAnimationFrame(draw);
})();
