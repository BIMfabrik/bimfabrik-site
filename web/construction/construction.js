import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js";

const canvas = document.querySelector("#city-viewer"), stage = document.querySelector(".webgl-stage");
const fallback = document.querySelector(".webgl-fallback"), resetButton = document.querySelector("#reset-view");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" }); }
catch (_) { fallback.hidden = false; canvas.hidden = true; resetButton.hidden = true; document.querySelector(".viewer-hint").hidden = true; throw new Error("WebGL unavailable"); }
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); renderer.setClearColor(0x292922); renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.38;

const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x292922, .038);
const camera = new THREE.PerspectiveCamera(32, 1, .1, 130), target = new THREE.Vector3(0, .7, 0);
const initial = { azimuth: -.67, elevation: .72, distance: 21 }; let { azimuth, elevation, distance } = initial;
scene.add(new THREE.HemisphereLight(0xf2eee1, 0x2a2c25, 2.25));
const sun = new THREE.DirectionalLight(0xffefca, 3.7); sun.position.set(-13, 19, 10); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left:-17, right:17, top:17, bottom:-17 }); scene.add(sun);
const fill = new THREE.PointLight(0xffcf00, 7, 27, 2); fill.position.set(2, 6, -5); scene.add(fill);

const city = new THREE.Group(); city.rotation.y = -.12; scene.add(city);
const mat = {
  ground:new THREE.MeshStandardMaterial({ color:0x5b5c53, roughness:.92, metalness:.06 }), road:new THREE.MeshStandardMaterial({ color:0x282925, roughness:.84 }), lot:new THREE.MeshStandardMaterial({ color:0x494a42, roughness:.91 }),
  building:new THREE.MeshStandardMaterial({ color:0x74756b, roughness:.74, metalness:.14 }), light:new THREE.MeshStandardMaterial({ color:0x98978a, roughness:.68, metalness:.16 }),
  yellow:new THREE.MeshStandardMaterial({ color:0xffbf00, emissive:0x6b4600, emissiveIntensity:.85, roughness:.44, metalness:.18 }), tree:new THREE.MeshStandardMaterial({ color:0x44493a, roughness:.98 }), trunk:new THREE.MeshStandardMaterial({ color:0x25261f, roughness:1 })
};
function add(geometry, material, x, y, z) { const item = new THREE.Mesh(geometry, material); item.position.set(x,y,z); item.castShadow = item.receiveShadow = true; city.add(item); return item; }
add(new THREE.BoxGeometry(24,.42,18), mat.ground, 0,-.28,0);
[[23.6,2.05,0,.65],[2.1,17.6,1.5,0],[18.5,1.22,-2.1,-5.05]].forEach(([w,d,x,z]) => add(new THREE.BoxGeometry(w,.035,d),mat.road,x,-.035,z));
add(new THREE.BoxGeometry(6.4,.04,4.35),mat.lot,-4.25,.005,3.05); add(new THREE.CylinderGeometry(2.13,2.13,.045,48),mat.lot,-5.9,.02,-3.38);
const lineMat = new THREE.LineDashedMaterial({ color:0x88752b, dashSize:.36, gapSize:.34, transparent:true, opacity:.58 });
function roadLine(a,b) { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),lineMat); l.computeLineDistances(); l.position.y=.003; city.add(l); }
roadLine(new THREE.Vector3(-11,0,.65),new THREE.Vector3(11,0,.65)); roadLine(new THREE.Vector3(1.5,0,-8),new THREE.Vector3(1.5,0,8)); roadLine(new THREE.Vector3(-11,0,-5.05),new THREE.Vector3(7,0,-5.05));

const buildingGeo = new THREE.BoxGeometry(1,1,1), roofGeo = new THREE.BoxGeometry(1.02,.09,1.02), nodes=[];
function building({x,z,w,d,h,accent=false,light=false}) { const body=add(buildingGeo,light?mat.light:mat.building,x,h/2,z); body.scale.set(w,h,d); const roof=add(roofGeo,accent?mat.yellow:mat.lot,x,h+.055,z); roof.scale.set(w,1,d); if(accent){const band=add(new THREE.BoxGeometry(w+.025,.12,d+.025),mat.yellow,x,h*.7,z); band.castShadow=false; nodes.push(new THREE.Vector3(x,h+.22,z));} }
[
[-8.3,3.2,2.1,2.4,3.3,1],[-5.7,4.4,1.35,2.1,2.15],[-4,5.5,1.9,1.3,4.65,0,1],[-1.55,4.15,2.15,2.5,2.72,1],[4.2,4.3,2.15,2.35,4.25],[7.2,4,2.85,2.5,2.72,0,1],[9.3,5.6,1.3,1.45,5.45,1],[-8.8,-1.7,2.45,2.2,2.4],[-4.45,-1.75,1.75,2.25,5.05,1],[-1.1,-2,1.35,2.65,3.35],[4.25,-2.15,2.7,2.2,5.75,1],[7.65,-1.95,2,2.4,3.45],[10,-2.3,1.35,1.75,4.5],[-8.65,-7.05,2.45,1.3,3.05],[-5.45,-6.75,1.6,1.75,5.45,0,1],[-2.75,-7,2.1,1.4,2.4],[4,-7.15,2.2,1.4,3.75],[6.95,-6.85,1.85,1.8,5.25,1]
].forEach(([x,z,w,d,h,accent,light])=>building({x,z,w,d,h,accent:!!accent,light:!!light}));
function tree(x,z,size=1){ const t=add(new THREE.CylinderGeometry(.08*size,.11*size,.58*size,8),mat.trunk,x,.29*size,z);t.castShadow=false;const c=add(new THREE.DodecahedronGeometry(.42*size),mat.tree,x,.75*size,z);c.scale.y=1.28; }
[[-6.1,2.55,1.2],[-5.2,2.5,.78],[-4.35,2.85,.9],[-6.45,-3.2,1.15],[-5.5,-4.2,.75],[-6.4,-4.55,.8],[-2.3,1.8,.9],[2.7,2.85,1.1],[3,1.8,.7],[8.9,-4.5,1.05],[9.75,-5.45,.7]].forEach(v=>tree(...v));
const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,.045,1)); [[-5.9,-3.38,4.1,4.1],[-4.25,3.05,6.4,4.35],[6.85,3.85,7.1,5.25]].forEach(([x,z,w,d])=>{const e=new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0xffcf00,transparent:true,opacity:.39}));e.position.set(x,.075,z);e.scale.set(w,1,d);city.add(e);});
const path = new THREE.CatmullRomCurve3([new THREE.Vector3(-10,.24,.65),new THREE.Vector3(-4,.24,.65),new THREE.Vector3(1.5,.24,.65),new THREE.Vector3(1.5,.24,-5.05),new THREE.Vector3(-3,.24,-5.05),new THREE.Vector3(-8,.24,-5.05),new THREE.Vector3(-8,.24,.65)],true,"centripetal");
const electronMaterial = new THREE.MeshBasicMaterial({color:0xffcf00,transparent:true,opacity:.92});
const electrons = Array.from({length:18},(_,index)=>{const electron=new THREE.Mesh(new THREE.SphereGeometry(index%4===0?.115:.065,12,12),electronMaterial);electron.userData.offset=index*.032;city.add(electron);return electron;});
const electronLights = [0,6,12].map(index=>{const light=new THREE.PointLight(0xffcf00,5,4.6,2);city.add(light);return {light,index};});
const haze=new THREE.Mesh(new THREE.PlaneGeometry(60,16),new THREE.MeshBasicMaterial({color:0xb49857,transparent:true,opacity:.052,depthWrite:false}));haze.position.set(0,6.5,-12);scene.add(haze);
function updateCamera(){const flat=Math.cos(elevation)*distance;camera.position.set(Math.sin(azimuth)*flat,Math.sin(elevation)*distance+1.2,Math.cos(azimuth)*flat);camera.lookAt(target);}
function render(){updateCamera();renderer.render(scene,camera);}
function resize(){const {width,height}=stage.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render();}
new ResizeObserver(resize).observe(stage); addEventListener("resize",resize,{passive:true});
let dragging=false,last={x:0,y:0}; canvas.addEventListener("pointerdown",e=>{dragging=true;last={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener("pointermove",e=>{if(!dragging)return;azimuth-=(e.clientX-last.x)*.008;elevation=THREE.MathUtils.clamp(elevation+(e.clientY-last.y)*.008,.27,1.25);last={x:e.clientX,y:e.clientY};render();});["pointerup","pointercancel"].forEach(type=>canvas.addEventListener(type,()=>dragging=false));canvas.addEventListener("wheel",e=>{e.preventDefault();distance=THREE.MathUtils.clamp(distance+e.deltaY*.012,13,32);render();},{passive:false});resetButton.addEventListener("click",()=>{({azimuth,elevation,distance}=initial);render();});
let visible=true,frame=0,previous=0;new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)requestFrame();},{threshold:.01}).observe(stage);function requestFrame(){if(!frame&&visible&&!document.hidden&&!reduced)frame=requestAnimationFrame(animate);}function animate(now){frame=0;const delta=Math.min((now-previous)/1000||0,.05);previous=now;if(!dragging)azimuth+=delta*.055;const progress=(now*.000055)%1;electrons.forEach(electron=>{const travel=(progress-electron.userData.offset+1)%1;electron.position.copy(path.getPointAt(travel));electron.position.y+=.18;const size=1+Math.sin(now*.008+electron.userData.offset*28)*.17;electron.scale.setScalar(size);});electronLights.forEach(({light,index})=>light.position.copy(electrons[index].position));render();requestFrame();}document.addEventListener("visibilitychange",()=>{if(!document.hidden){previous=performance.now();requestFrame();}});updateCamera();resize();requestFrame();
