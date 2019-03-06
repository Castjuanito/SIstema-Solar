var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(1, 24, 24);
    var texture = new THREE.TextureLoader().load('images/tierraTextura.jpg');
    var material = new THREE.MeshStandardMaterial({ map: texture });
    var earth = new THREE.Mesh(geometry, material);
    earth.position.x = 8;
    scene.add(earth);
    camera.position.z = 20;


       var controls = new THREE.OrbitControls( camera );
				controls.minDistance = 500;
				controls.maxDistance = 2500;

    var geometry1 = new THREE.SphereGeometry(0.2, 24, 24);
    var texture1 = new THREE.TextureLoader().load('images/lunaTextura.jpeg');
    var material1 = new THREE.MeshStandardMaterial({ map: texture1 });
    var moon = new THREE.Mesh(geometry1, material1);
    moon.position.x = 8;
    moon.position.y = 2;
   
    scene.add(moon);



    var geometry2 = new THREE.SphereGeometry(4, 24, 24);
    var texture2 = new THREE.TextureLoader().load('images/solTextura.jpeg');
    var material2 = new THREE.MeshBasicMaterial({ map: texture2 });

    var sun = new THREE.Mesh(geometry2, material2);

    light = new THREE.PointLight( 0xb4e7f2, 0.8 );
    light.angle = Math.PI / 5;
    light.position.set( 0, 0, 0 );
    scene.add( light )

    scene.add(sun);

    time = 0;



    var urls = ['images/px.jpg','images/nx.jpg','images/py.jpg','images/ny.jpg','images/pz.jpg','images/nz.jpg'];
    //var refleccion = new THREE.CubeTextureLoader().url(urls);
    //refleccion.format = THREE.RGBFormat;
    //scene.background = refleccion;

    var render = function () {
      requestAnimationFrame(render);

      time += 0.01;

      earth.rotation.x += 0.0;
      earth.rotation.y += 0.01;
      moon.rotation.x += 0.0;
      moon.rotation.y += 0.01;
      sun.rotation.x += 0.0;
      sun.rotation.y += 0.01;
      
      earth.position.x = 8*Math.cos(time);
      earth.position.y = 8*Math.sin(time);

      moon.position.x = 2 * Math.cos(time * 2) + earth.position.x;
      moon.position.y = 2 * Math.sin(time * 2) + earth.position.y;

      renderer.render(scene, camera);
    };




    render();