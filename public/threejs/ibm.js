
			var container;

			var camera, scene, renderer, controls;

			var _mode = 0;

			var labels = [
				"Openness",
				"Emotional range",
				"Agreeableness",
				"Extraversion",
				"Conscientiousness"
			]

			function getParameterByName(name) {
    				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        				results = regex.exec(location.search);
    				return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			function init(_obj) {

				_mode = getParameterByName("mode");

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.style.color = '#fff';
				info.style.link = '#f80';
				info.innerHTML = '';
				document.body.appendChild( info );

				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0x222222 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, -700, -500 );

				controls = new THREE.TrackballControls( camera, renderer.domElement );
				controls.minDistance = 200;
				controls.maxDistance = 500;

				scene.add( new THREE.AmbientLight( 0x555555 ) );
				//scene.add( new THREE.AmbientLight( 0x222222 ) );

				var light1 = new THREE.PointLight( 0xeeeeee );
				light1.position.copy( camera.position );
				scene.add( light1 );

				var light2 = new THREE.PointLight( 0xeeeeee );
				camera.position.set( 0, 700, 500 );
				light2.position.copy( camera.position );
				scene.add( light2 );
				//

				var tags = {

				}

				/*
				* DRAW BG MESH
				*/
				var data = {
					text : "TextGeometry",
					size : 8,
					height : 15,
					curveSegments : 12,
					font : "helvetiker",
					style : "normal",
					bevelEnabled : false,
					bevelThickness : 1,
					bevelSize : 0.5
				};

				/*
				* SPHERE SHAPE
				*/

				var material3  = new THREE.MeshPhongMaterial({
					color: 0xdfeaf0,
					emissive: 0x000000,
					specular: 0x111111,
					shininess: 82,
					shading: THREE.SmoothShading,
					wireframe: false,
					metal: 0
				})
				//var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );
                                ///var material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );
				
				var geometry   = new THREE.SphereGeometry(45, 24, 64)
				var earthMesh = new THREE.Mesh(geometry, material3)
				scene.add(earthMesh)

                                var circleRadius = 20;

				/*
				* Draw Labels
				*/

				//HAVAS
				var textGeometry1 = new THREE.TextGeometry("Havas", data )
				var textMesh = new THREE.Mesh(textGeometry1, material3);
				
				textMesh.rotation.x = (100) * Math.PI/180;
				textMesh.translateZ(1.6*circleRadius);

				//Text Vertical
				textMesh.translateX(-17);
				textMesh.translateY(.1*circleRadius);
				scene.add(textMesh)

				//IBM
				textGeometry2 = new THREE.TextGeometry("IBM", data )
				textMesh = new THREE.Mesh(textGeometry2, material3);

				textMesh.rotation.x = (80) * Math.PI/180;
				textMesh.translateZ(1.6*circleRadius);

				//Text Vertical
				textMesh.translateX(-10);
				textMesh.translateY(.1*circleRadius);
				scene.add(textMesh)


                                /*
                                * ARMS
                                */
				//Major Arms
                                //var arcShape = new THREE.Shape();

				//Draw Arms
				for (var i=0; i<5; i++) {

					_label = labels[i];
					_value = _obj[_label];
console.log(_label);
console.log(_value);
					_length = 140 + _value * .8;

					//Draw Arms
					geometry = new THREE.CylinderGeometry(circleRadius, circleRadius, _length,50);
                                	mesh = new THREE.Mesh( geometry, material3 );

					//Draw End
					geometry   = new THREE.SphereGeometry(circleRadius, 24, 64)
					earthMesh = new THREE.Mesh(geometry, material3)

					if (i < 3) {

							mesh.rotation.z = (i*120) * Math.PI/180;
							mesh.translateY(.5*_length);
							earthMesh.rotation.z = (i*120) * Math.PI/180;
							earthMesh.translateY(_length);

							//TEXT
							var textGeometry = new THREE.TextGeometry(labels[i], data )
							var textMesh = new THREE.Mesh(textGeometry, material3);
							textMesh.rotation.z = (i*120 + 90) * Math.PI/180;
							textMesh.translateZ(.35*circleRadius);
							//Text Vertical
							textMesh.translateY(-.2*circleRadius);
							textMesh.translateX(45);
							scene.add(textMesh)

					} else {
							//TEXT
							var textGeometry = new THREE.TextGeometry(_label, data )
							var textMesh = new THREE.Mesh(textGeometry, material3);

							if (i == 3) {
								_rotX = 90;
							} else {
								_rotX = -90;
							}

							mesh.rotation.x = (_rotX) * Math.PI/180;
							mesh.translateY(.5*_length);
							earthMesh.rotation.x = (_rotX) * Math.PI/180;
							earthMesh.translateY(_length);

							textMesh.rotation.y = (_rotX) * Math.PI/180;
							textMesh.translateX(45);
							textMesh.translateZ(7);

							scene.add(textMesh)
					}

					scene.add( mesh );
					scene.add( earthMesh )
				}

				//Save File
				//_newGeometry = geometry;
                                //saveSTL(_newGeometry, "_test");
			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				renderer.render( scene, camera );

			}
