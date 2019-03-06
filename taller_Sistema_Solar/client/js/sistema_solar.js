var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 20;
var controls = new THREE.OrbitControls(camera);
controls.minDistance = 20;
controls.maxDistance = 200;

var earth = crearPlaneta(1, 24, 24, 'images/tierraTextura.jpg', 8, 0, 0);
var moon = crearPlaneta(0.2,24,24,'images/lunaTextura.jpeg',8,2,0);



var geometrySol = new THREE.SphereGeometry(4, 24, 24);
var textureSol = new THREE.TextureLoader().load('images/solTextura.jpeg');
var materialSol = new THREE.MeshBasicMaterial({ map: textureSol });
var sun = new THREE.Mesh(geometrySol, materialSol);

light = new THREE.PointLight(0xb4e7f2, 0.8);
light.angle = Math.PI / 5;
light.position.set(0, 0, 0);
scene.add(light)

scene.add(sun);
time = 0;



var urls = ['images/px.jpg', 'images/nx.jpg', 'images/py.jpg', 'images/ny.jpg', 'images/pz.jpg', 'images/nz.jpg'];
textureCube = new THREE.CubeTextureLoader().load(urls);
textureCube.format = THREE.RGBFormat;
scene.background = textureCube;

hacerAnillo(5, 0.05, 480, 0x757064, 0);

var render = function () {
    requestAnimationFrame(render);

    time += 0.01;

    earth.rotation.x += 0.0;
    earth.rotation.y += 0.01;
    moon.rotation.x += 0.0;
    moon.rotation.y += 0.01;
    sun.rotation.x += 0.0;
    sun.rotation.y += 0.01;

    earth.position.x = 8 * Math.cos(time);
    earth.position.y = 8 * Math.sin(time);

    moon.position.x = 2 * Math.cos(time * 2) + earth.position.x;
    moon.position.y = 2 * Math.sin(time * 2) + earth.position.y;

    renderer.render(scene, camera);
};

function crearPlaneta(radioEsfera, anchoEsfera, altoEsfera, pathTextura, posicionX, posicionY, posicionZ) {
    var geometry = new THREE.SphereGeometry(radioEsfera, anchoEsfera, altoEsfera);
    var texture = new THREE.TextureLoader().load(pathTextura);
    var material = new THREE.MeshStandardMaterial({ map: texture });
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
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}


render();

