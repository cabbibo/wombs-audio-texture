
  var Component = require( 'wombs-component' );
  var THREE     = require( 'three' );


  AudioTexture.prototype = new Component();

  function AudioTexture( analyser ){

    this._init();


    this.analyser = analyser;
    var array = analyser.array;
    var length = analyser.array.length;

    this.analyser.texture = new THREE.DataTexture(
      this.array,
      length,
      1,
      THREE.RGBAFormat,
      THREE.UnsignedIntType
    );

    this.texture = this.analyser.texture;

    this.addToUpdateArray( function(){

      this.texture.needsUpdate = true;

    });

  }

  AudioTexture.createDebugMesh = function(){

    var mat = THREE.MeshBasicMaterial({
      map: this.analyser.texture
    });


  }

  

  module.exports = AudioTexture;
