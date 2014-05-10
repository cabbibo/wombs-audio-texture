
  var Component = require( 'wombs-component' );
  var THREE     = require( 'three' );


  AudioTexture.prototype = new Component();

  function AudioTexture( analyser ){

    this._init();


    this.analyser = analyser;

    this.reset(); 

    this.addToUpdateArray( function(){

      this.texture._needsUpdate = true;

    });

  }


  AudioTexture.prototype.reset = function(){

    this.analyser.texture = new THREE.DataTexture(
      this.analyser.array,
      this.analyser.array.length,
      1,
      THREE.RGBAFormat,
      THREE.UnsignedIntType
    );

    this.texture = this.analyser.texture;

  };


  AudioTexture.createDebugMesh = function( scene ){

    var mat = new THREE.MeshBasicMaterial({
      map: this.analyser.texture
    });

    var geo = new THREE.BoxGeometry( 10 , 10 , 10 );


    var mesh = new THREE.Mesh( geo , mat );

    scene.add( mesh );


  }

  

  module.exports = AudioTexture;
