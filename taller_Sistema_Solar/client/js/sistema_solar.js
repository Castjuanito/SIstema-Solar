var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 200;
var controls = new THREE.OrbitControls(camera);
controls.minDistance = 20;
controls.maxDistance = 200;



var mercury = crearPlaneta(0.7,24,24,'images/mercuryTexture.png',12,0,0);
//hacerAnillo(20, 0.05, 480, 0x757064, 0);
var venus = crearPlaneta(2,24,24,'images/venusTextura.jpg',12,0,0);
//hacerAnillo(30, 0.05, 480, 0x757064, 0);
var earth = crearPlaneta(2, 24, 24, 'images/tierraTextura.jpg', 12, 0, 0);
//hacerAnillo(42, 0.05, 480, 0x757064, 0);
var moon = crearPlaneta(0.27,24,24,'images/lunaTextura.jpeg',12,2,0);

var marte = crearPlaneta(1.2,24,24,'images/marteTextura.jpg',12,0,0);
//hacerAnillo(55, 0.05, 480, 0x757064, 0);
var jupiter = crearPlaneta(8,24,24,'images/jupiterTexture.jpg',12,0,0);

var saturn = crearPlaneta(6,24,24,'images/saturnTextura.jpeg',12,0,0);

var uranus = crearPlaneta(4.5,24,24,'images/uranusTextura.jpeg',12,0,0);

var neptune = crearPlaneta(4.3,24,24,'images/neptuneTextura.jpg',12,0,0);

var pluto = crearPlaneta(0.3,24,24,'images/plutoTextura.jpeg',12,0,0);




var geometrySol = new THREE.SphereGeometry(15, 24, 24);
var textureSol = new THREE.TextureLoader().load('images/solTextura.jpeg');
var materialSol = new THREE.MeshBasicMaterial({ map: textureSol });
var sun = new THREE.Mesh(geometrySol, materialSol);

light = new THREE.PointLight(0xb4e7f2, 1.5);
light.angle = Math.PI / 2;
light.position.set(0, 0, 0);
scene.add(light)

scene.add(sun);
time = 0;



var urls = ['images/stars.png', 'images/stars.png', 'images/stars.png', 'images/stars.png', 'images/stars.png', 'images/stars.png'];
textureCube = new THREE.CubeTextureLoader().load(urls);
textureCube.format = THREE.RGBFormat;
scene.background = textureCube;



var render = function () {
    requestAnimationFrame(render);

    time += 0.01;

    earth.rotation.x += 0.0;
    earth.rotation.y += 0.01;
    moon.rotation.x += 0.0;
    moon.rotation.y += 0.01;
    mercury.rotation.x += 0.0;
    mercury.rotation.y += 0.05;
    venus.rotation.x += 0.0;
    venus.rotation.y += 0.03;
    marte.rotation.x += 0.0;
    marte.rotation.y += 0.01;
    sun.rotation.x += 0.0;
    sun.rotation.y += 0.01;



    mercury.position.x= 20 * Math.cos(time*2);
    mercury.position.y = 20 * Math.sin(time*2);

    venus.position.x= 30  * Math.cos(time*1.5);
    venus.position.y = 30 * Math.sin(time*1.5);

    earth.position.x = 42 * Math.cos(time*1.2);
    earth.position.y = 42 * Math.sin(time*1.2);

    moon.position.x = 3 * Math.cos(time * 2) + earth.position.x;
    moon.position.y = 3 * Math.sin(time * 2) + earth.position.y;

    marte.position.x= 55 * Math.cos(time*1.6);
    marte.position.y = 55 * Math.sin(time*1.6);

    jupiter.position.x= 73 * Math.cos(time*1.7);
    jupiter.position.y = 73 * Math.sin(time*1.7);

    saturn.position.x= 100 * Math.cos(time);
    saturn.position.y = 100 * Math.sin(time);
    //saturn.position.z = 130 * Math.sin(time);

    uranus.position.x= 125 * Math.cos(time*1.5);
    uranus.position.y = 125 * Math.sin(time*1.5);

    neptune.position.x= 140 * Math.cos(time*1.1);
    neptune.position.y = 140 * Math.sin(time*1.1);

    pluto.position.x= 150 * Math.cos(time*1.8);
    pluto.position.y = 150 * Math.sin(time*1.8);

    renderer.render(scene, camera);
};

function crearPlaneta(radioEsfera, anchoEsfera, altoEsfera, pathTextura, posicionX, posicionY, posicionZ) {
    var geometry = new THREE.SphereGeometry(radioEsfera, anchoEsfera, altoEsfera);
    var texture = new THREE.TextureLoader().load(pathTextura);
    var material = new THREE.MeshStandardMaterial({ map: texture });
    //var material = new THREE.MeshBasicMaterial({ map: texture });
    var planeta = new THREE.Mesh(geometry, material);
    if (posicionX != 0) { planeta.position.x = posicionX; }

    if (posicionY != 0) { planeta.position.y = posicionY; }

    if (posicionZ != 0) { planeta.position.z = posicionZ; }

    scene.add(planeta);
    return planeta;
}
function hacerAnillo(size, innerDiameter, facets, myColor, distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(size, innerDiameter, facets, facets);
    var ringMaterial = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.position.set(distanceFromAxis, 0, 0);
    //myRing.rotation.z = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}


render();
