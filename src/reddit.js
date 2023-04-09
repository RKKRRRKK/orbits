//I am not sure why I have this file here but refer to "script.js"

fetch('data_normal.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const height = row.height;
      const inclination = row.inclination;
      const angle = row.angle;
      const speed = row.speed;
      const satellite =  new THREE.Mesh( spheresat, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) );
      const pivot = new THREE.Object3D();
      pivot.position.set(0,0,0);
      scene.add(pivot);
      pivot.add(satellite);
      satellite.position.set(0, 0, height)
      pivot.rotation.set(inclination,angle,0)
        const clock = new THREE.Clock()
        const tick = () =>
        {
        const elapsedTime = clock.getElapsedTime()
        pivot.rotation.y = speed * elapsedTime
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
        }
        tick()
      
    }
  })



