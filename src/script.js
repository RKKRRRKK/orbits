import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import * as dat from 'dat.gui'

// Loading

const textureLoader = new THREE.TextureLoader()
const colormap = textureLoader.load('/textures/color.png')
const roughness = textureLoader.load('/textures/wbreflect.png')
const hdr = textureLoader.load('/textures/hdr.hdr')
const texture = textureLoader.load('/textures/normal_larger.jpg')
const displacement = textureLoader.load('/textures/displacement.jpg')


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 350)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

/**
 * Animate
 */


// Objects + Materials
let envmaploader = new THREE.PMREMGenerator(renderer);

new RGBELoader().setPath('textures/').load('hdr5.hdr', function(hdrmap) {
   let envmap = envmaploader.fromCubemap(hdrmap);
   const ballmaterial = {
    color: new THREE.Color(0xffffff),
    reflectivity: 1,
    roughnessMap: roughness,
    normalMap: texture,
    displacementMap: displacement,
    displacementScale: 0.03,
    
  }
   const glassmaterial = {
    color: new THREE.Color(0xffffff),
    reflectivity: 1,
    envMap: envmap.texture,
    roughness: 0.25,
    transmission: 1,
    transparent: true,
    opacity: 0.15,
    metalness: 1,
    envMapIntensity: 1,
   }

    let geometry = new THREE.SphereBufferGeometry(2,640,640)
    let geometry2 = new THREE.SphereBufferGeometry(2.035,640,640)
    let material = new THREE.MeshPhysicalMaterial(ballmaterial);
    let material2 = new THREE.MeshPhysicalMaterial(glassmaterial);
    let glass = new THREE.Mesh(geometry2, material2)
    let sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)
    sphere.add(glass)
    const clock = new THREE.Clock()

    const tick = () =>
    {
    
        const elapsedTime = clock.getElapsedTime()
    
        // Update objects
        sphere.rotation.y = .1 * elapsedTime
    
        // Update Orbital Controls
        // controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

});

//ORBITS


const georing = new THREE.RingGeometry( 13.4, 13.5, 360, 1);
const rmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
rmaterial.side = THREE.DoubleSide;
rmaterial.transparent = true;
rmaterial.opacity = 0.03;
rmaterial.wireframe = true;
const GEO = new THREE.Mesh(georing, rmaterial);
scene.add(GEO)
GEO.rotation.set(1.57,0,0)
const spheresat = new THREE.SphereGeometry(0.01, 3, 2 );
const moonsphere = new THREE.SphereGeometry(0.552, 16,16);

//Earth radius = 6400
//distance multiplier =  0.00031796875
//GEO = 11.38



//JSON stuff:


// creating loop 
fetch('data_normal.json')
  .then(response => response.json())
  .then(data => {
    const satellites = [];
    const pivots = [];
    const speeds = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const height = row.height;
      const inclination = row.inclination;
      const angle = row.angle;
      const speed = row.speed;
      const satellite = new THREE.Mesh(spheresat, new THREE.MeshBasicMaterial({ color: 0xff0040 }));
      const pivot = new THREE.Object3D();
      pivot.position.set(0, 0, 0);
      scene.add(pivot);
      pivot.add(satellite);
      satellite.position.set(0, 0, height);
      pivot.rotation.set((inclination),angle, 0);
      
      satellites.push(satellite);
      pivots.push(pivot);
      speeds.push(speed);
    }

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      for (let i = 0; i < pivots.length; i++) {
        pivots[i].rotation.y = speeds[i] * elapsedTime;
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate(); 
  });

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
  scene.add( directionalLight );

  //moon

  const moon = new THREE.Mesh(moonsphere, new THREE.MeshBasicMaterial({color: 0xfffff}))
  moon.position.set(0,0,123.65804)
  scene.add(moon)



  const pivot2 = new THREE.Object3D();
  pivot2.position.set(0, 0, 0);
  scene.add(pivot2);


  const moonsphere2 = new THREE.SphereGeometry(0.2, 16,16);
  const moon2 = new THREE.Mesh(moonsphere, new THREE.MeshBasicMaterial({color: 0xfffff}))
  moon2.position.set(0,0,3)
  pivot2.rotation.set(2.32,0,0)
  pivot2.add(moon2)


  //distance: 123.658046875
//radius: 0.552
//earth inclination 0.4101524