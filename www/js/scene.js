//Obtener ancho y alto de la ventana
var WIDTH = window.innerWidth - 5;
var HEIGHT = window.innerHeight - 10;

var lienzo = new THREE.WebGLRenderer({antialias: true});

// Lienzo encargado del renderizado
lienzo.setSize(WIDTH,HEIGHT);

// Añadir lienzo a la página
document.body.appendChild(lienzo.domElement);
lienzo.shadowMap.enabled = true; //permite mapear ada una primitiva //
lienzo.shadowMap.soft = true; //suave la sombre osea apariencia //
lienzo.shadowMap.type = THREE.PCFShadowMap;
//sombra aqui sombra alla :)//

var scene = new THREE.Scene;

//Color aleatorio
function generarcolor() {
	long = 6;
	var caracteres = "0123456789ABCDEF";
	var color = "";
	for (i = 0; i < long; i++) color += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
	color = "#" + color;
	return color;
}

//Detectar la tecla presionada
var keyCode;
function tecla(e){
if(window.event)keyCode = window.event.keyCode;
else if(e) keyCode = e.which;
//alert(keyCode);
}


//Cubo
var geometryCube = new THREE.CubeGeometry(30,30,30);
var materialC = new THREE.MeshLambertMaterial({color: generarcolor()});
var cube = new THREE.Mesh(geometryCube, materialC);
cube.position.set(75,25,0);
scene.add( cube );
cube.castShadow =  true;
//Toroide
var geometryTorus = new THREE.TorusGeometry( 14, 4, 30, 200 );
var materialT = new THREE.MeshLambertMaterial({color: generarcolor()});
var torus = new THREE.Mesh(geometryTorus, materialT);
torus.position.set(-65,25,0);
scene.add( torus );
torus.castShadow =  true;
//Pirámide
var geometryCone = new THREE.ConeGeometry( 20, 30, 4, 64 );
var materialP = new THREE.MeshLambertMaterial({color:generarcolor()});
var cone = new THREE.Mesh(geometryCone, materialP);
cone.position.set(0,25,0);
scene.add( cone );
cone.castShadow =  true;

//plano para que se muestren las sombras de las primitivas.
let plane = new THREE.Mesh(new THREE.PlaneGeometry(500,400), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
plane.rotation.x += -Math.PI / 2;
plane.receiveShadow = true;

//cargar texturas de primitivas y detector de tecla
var CubeTexture = new THREE.ImageUtils.loadTexture("public/Cube/img.jpg");
var TorusTexture = new THREE.ImageUtils.loadTexture("public/Donnut/img.jpg");
var ConeTexture = new THREE.ImageUtils.loadTexture("public/Pyramid/img.jpg");
var KeyDetector = tecla();
if(KeyDetector){
	materialC = new THREE.MeshBasicMaterial({map: CubeTexture});
	materialT = new THREE.MeshBasicMaterial({map: TorusTexture});
	materialP = new THREE.MeshBasicMaterial({map: ConeTexture});
}

// Generar cámara
var camara = new THREE.PerspectiveCamera(
    45, // Campo de visión
    (WIDTH / HEIGHT), // Proporcion
    0.1,
    10000 // Campo de visión
);

//Posición cámara  
camara.position.y = 70; // Elevar cámara
camara.position.z = 170; // Alejar cámara

//Fijar cámara en la pirámide
camara.lookAt(cone.position);

//Añadir cámara a la escena
scene.add(camara);

//Luz puntual en el centro de la pantalla
var light1 = new THREE.PointLight(0xff0044);
light1.position.y = 60;
light1.position.z = 20;
light1.castShadow = true;

scene.background = new THREE.Color(0xD0F4C7);

//Luz ambiental
var light2 = new THREE.AmbientLight( 0x404040 ); 
light2.position.set(0,0,10);

//Añadir luces a la escena
scene.add(light2);
scene.add( plane );
scene.add(light1);

//Orbit controls
let controls = new THREE.OrbitControls(camara, lienzo.domElement);

function renderizar(){
	//Rotar cubo eje y
	cube.rotation.y += .01;

	//Rotar toroide en eje x
	torus.rotation.x +=.01;

	//Rotar pirámide en eje z
	cone.rotation.z +=.01;
	
	lienzo.render(scene, camara);
	requestAnimationFrame(renderizar);
}

renderizar();