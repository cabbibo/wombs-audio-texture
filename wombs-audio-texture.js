
  var _         = require( 'underscore'       );
  var THREE     = require( 'three'            );

  var Component = require( 'wombs-component'  );

  
  var mutate = {};
 

  //resets the 
  mutate.reset = function(){

    var data = this.processAudio();

    this.analyser.texture = new THREE.DataTexture(
      data,
      data.length / 16,
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    
    this.texture = this.analyser.texture;

    this.texture.needsUpdate = true;

    

  };

  mutate.processAudio = function(){

    var width = this.analyser.array.length;

    var audioTextureData = new Float32Array( width * 4 );
    
    for (var i = 0; i < width; i+=4) {
      
      audioTextureData[ i+0 ] = this.analyser.array[ (i/4) + 0 ] / 256;
      audioTextureData[ i+1 ] = this.analyser.array[ (i/4) + 1 ] / 256;
      audioTextureData[ i+2 ] = this.analyser.array[ (i/4) + 2 ] / 256;
      audioTextureData[ i+3 ] = this.analyser.array[ (i/4) + 3 ] / 256;

    }
   
    return audioTextureData;

  }

  mutate.update = function(){

    this.texture.image.data = this.processAudio(); 
    this.texture.needsUpdate = true;

  }

  mutate.createDebugMesh =  function( scene ){

    var mat = new THREE.MeshBasicMaterial({
      map: this.texture
    });

   // var mat = new THREE.MeshNormalMaterial();

    var geo = new THREE.BoxGeometry( 10 , 10 , 10 );


    var mesh = new THREE.Mesh( geo , mat );
    mesh.rotation.x = Math.PI / 4;
    mesh.rotation.y = Math.PI / 4;
    mesh.rotation.z = Math.PI / 4;

    scene.add( mesh );


    this.addToUpdateArray(function(){

      mesh.materialNeedsUpdate = true;

    });

  }

  AudioTexture.prototype =  _.extend( 
    Component.prototype,
    mutate 
  );

  function AudioTexture( analyser ){

    Component.call( this );

    this.analyser = analyser;

    this.reset();

    this.addToUpdateArray(this.update);

  }
  

  module.exports = AudioTexture;
