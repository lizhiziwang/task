
<template>
    
    <head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
	</head>

    
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    // 运行一个立方体

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    // onMounted(() => {
    //     animate();
    // })

    onMounted(() => {
        const loader = new GLTFLoader();

        loader.load( 'file:///C:/Users/AX1653/Desktop/thtree.js/1.gltf', function ( gltf ) {

            scene.add( gltf.scene );

        }, undefined, function ( error ) {

            console.error( error );

        } );
    })


</script>
<style>
    #info {
        position: absolute;
        top: 10px;
        width: 100%;
        text-align: center;
        z-index: 100;
        display:block;
    }
</style>