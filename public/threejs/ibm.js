
			var container;

			var camera, scene, renderer, controls;

			var _mode = 0;

			var texture; // = THREE.ImageUtils.loadTexture( 'images/1.jpg' );
        		var backgroundMesh;

			var backgroundScene;
        		var backgroundCamera;

			var labels = [
				"Openness",
				"Emotional range",
				"Agreeableness",
				"Extraversion",
				"Conscientiousness"
			]

                        var labels_abbr = [
                                "Op",
                                "Er",
                                "Ag",
                                "Co",
                                "Ex"
                        ]

			function getParameterByName(name) {
    				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        				results = regex.exec(location.search);
    				return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			function init(_obj) {

				_mode = getParameterByName("mode");

				var _w = 600;
				var _h = 600;

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
				renderer.setClearColor( 0x5bcee9 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( _w, _h );
				document.getElementById("model_frame").appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, _w / _h, 1, 1000 );
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
				camera.position.set( 0, 450, 450 );
				scene.add( light2 );
				//

				var tags = {

				}

				/*
				* DRAW BG MESH
				*/
				/*
        			texture = THREE.ImageUtils.loadTexture( 'images/1.jpg' );
        			backgroundMesh = new THREE.Mesh(
            				new THREE.PlaneGeometry(2, 2, 0),
            				new THREE.MeshBasicMaterial({
                			map: texture
            			}));

        			backgroundMesh .material.depthTest = false;
        			backgroundMesh .material.depthWrite = false;

        			// Create your background scene
        			backgroundScene = new THREE.Scene();
        			backgroundCamera = new THREE.Camera();
        			backgroundScene .add(backgroundCamera );
        			backgroundScene .add(backgroundMesh );
				*/

                                var data_center = {
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

				var data = {
					text : "TextGeometry",
					size : 12,
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
				var textGeometry1 = new THREE.TextGeometry("Havas", data_center )
				var textMesh = new THREE.Mesh(textGeometry1, material3);
				
				textMesh.rotation.x = (100) * Math.PI/180;
				textMesh.translateZ(1.6*circleRadius);

				//Text Vertical
				textMesh.translateX(-17);
				textMesh.translateY(.1*circleRadius);
				scene.add(textMesh)

				//IBM
				textGeometry2 = new THREE.TextGeometry("IBM", data_center )
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
					_label_abbr = labels_abbr[i];
console.log(_label);
console.log(_value);
console.log(_label_abbr);
					_length = 2*circleRadius + 1.8*_value + 20;
					var _count = parseInt(_value / 10);

console.log(_count);

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
							var textGeometry = new THREE.TextGeometry(_label_abbr, data )
							var textMesh = new THREE.Mesh(textGeometry, material3);
						
							textMesh.rotation.z = (i*120 + 90) * Math.PI/180;
							textMesh.translateZ(.35*circleRadius);
							//Text Vertical
							textMesh.translateY(-.3*circleRadius);
							textMesh.translateX(45);
							scene.add(textMesh)

							//Percentage
							var perGeometry = new THREE.TextGeometry(_value, data )
							var perMesh = new THREE.Mesh(perGeometry, material3);

							perMesh.rotation.y = 180 * Math.PI/180;
							perMesh.rotation.z = (-i*120 + 90) * Math.PI/180;

							//Etch Depth
							perMesh.translateZ(.35*circleRadius);

							//Text Line Hieght
							perMesh.translateY(-.3*circleRadius);

							//DownLeg
							perMesh.translateX(45);
							scene.add(perMesh);

					} else {
							if (i == 3) {
								_rotX = 90;
							} else {
								_rotX = -90;
							}

							mesh.rotation.x = (_rotX) * Math.PI/180;
							mesh.translateY(.5*_length);
							earthMesh.rotation.x = (_rotX) * Math.PI/180;
							earthMesh.translateY(_length);

							//TEXT
							var textGeometry = new THREE.TextGeometry(_label_abbr, data )
							var textMesh = new THREE.Mesh(textGeometry, material3);

							//textMesh.rotation.z = 180 * Math.PI/180;
							textMesh.rotation.y = (_rotX) * Math.PI/180;
							textMesh.translateX(45);
							textMesh.translateZ(7);
							textMesh.translateY(-5);

							scene.add(textMesh)

							//PERCENTAGE
							var perGeometry = new THREE.TextGeometry(_value, data )
							var perMesh = new THREE.Mesh(perGeometry, material3);

							perMesh.rotation.z = 180 * Math.PI/180;
							perMesh.rotation.y = (_rotX) * Math.PI/180;
							perMesh.translateX(45);
							perMesh.translateZ(7);
							perMesh.translateY(-5);

							scene.add(perMesh)
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

				//renderer.autoClear = false;
				//renderer.clear();
				//renderer.render(backgroundScene, backgroundCamera );
				renderer.render( scene, camera );

			}
