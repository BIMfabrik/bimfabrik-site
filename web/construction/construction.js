(() => {
  const canvas = document.getElementById("signal-field");
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
  if (!gl || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const vertex = "attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }";
  const fragment = "precision mediump float; uniform vec2 r; uniform float t; void main(){ vec2 uv=gl_FragCoord.xy/r; vec2 q=uv-.5; float wave=sin(q.x*16.+t*.55)+cos(q.y*14.-t*.4); float ring=sin(length(q)*32.-t*.7); float line=smoothstep(.94,1.,sin((q.x-q.y)*23.+wave)); float glow=smoothstep(.4,0.,length(q-vec2(.18,-.08)))*.17; vec3 base=vec3(.96,.96,.94); vec3 ink=vec3(.08,.08,.075); vec3 yellow=vec3(1.,.76,0.); vec3 col=mix(base, ink, line*.1); col=mix(col, yellow, (line*.12+glow)*(.5+.5*ring)); gl_FragColor=vec4(col, .42); }";
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader; };
  const program = gl.createProgram(); gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "p"); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "r"); const time = gl.getUniformLocation(program, "t");
  const resize = () => { const dpr = Math.min(devicePixelRatio, 1.5); canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; gl.viewport(0,0,canvas.width,canvas.height); };
  addEventListener("resize", resize); resize();
  const draw = now => { gl.uniform2f(resolution, canvas.width, canvas.height); gl.uniform1f(time, now/1000); gl.drawArrays(gl.TRIANGLES, 0, 3); requestAnimationFrame(draw); };
  requestAnimationFrame(draw);
})();
