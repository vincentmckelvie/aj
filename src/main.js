import * as THREE from './build/three.module.js';
import { GUI } from './examples/jsm/libs/lil-gui.module.min.js';
import { NFTHelper } from './NFTHelper.js';
window.app;
window.external = false;
let currHDRIIndex = 5;
let rHue = Math.random();
window.color1 = new THREE.Color().setHSL(rHue, Math.random(), Math.random());
window.color2 = new THREE.Color().setHSL((rHue + (.5 + (-.15+Math.random()*.3)))%1.0 , Math.random(),Math.random());

window.hdriItems =
[
  {envMapValue:.5,  folder:"Bridge2", format:"jpg", name:"bridge"},
  {envMapValue:4.2, folder:"MilkyWay", format:"jpg", name:"milky way"},
  {envMapValue:.8,  folder:"Park2", format:"jpg", name:"park 1"},
  {envMapValue:.8,  folder:"Park3Med", format:"jpg", name:"park 2"},
  {envMapValue:.5,  folder:"pisa", format:"png", name:"pisa"},
  {envMapValue:.5,  folder:"skyboxsun25deg", format:"jpg", name:"skybox"},
  {envMapValue:1.4,  folder:"SwedishRoyalCastle", format:"jpg", name:"castle"},
  {envMapValue:.6,  folder:"rainforest", format:"jpg", name:"rainforest"},
  {envMapValue:1.2,  folder:"capehill", format:"jpg", name:"dark desert"},
  {envMapValue:.8,  folder:"kiara", format:"jpg", name:"desert"},
  {envMapValue:2,  folder:"sloot", format:"jpg", name:"dark sand"},
  {envMapValue:1.0,  folder:"mountains", format:"png", name:"mountains"},
];


window.getSettings = function(){
  return{
    'environment map intensity': window.hdriItems[ currHDRIIndex ].envMapValue,
    'normals multiply' : 1,
    'color r' : 1,
    'color g' : 1,
    'color b' : 1,
    'hue' : 4.366,
    'saturation' : 1,
    'outter size' : 10,
    'inner size' : 1,
    "rotation speed outter":0,
    "rotation speed inner":0,
    "rim size" : 20,
    'reflection tweak 1' : 0,
    'reflection tweak 2' : 0,
    'reflection tweak 3' : 0,
    'reflection tweak 4' : 1,
    'hdri':window.hdriItems[currHDRIIndex].name,
    'reflections': 5,
    'test 1' : 0,
    'test 2' : 0,
    'test 3' : 0,
    'test 4' : 0,
    'shape' : 0, 
    'color1': "#"+window.color1.getHexString(), 
    'color2': "#"+window.color2.getHexString(),
  }
} 

window.settings = window.getSettings();
let col = new THREE.Vector3(1,1,1);
window.currShape = 0;
let nft = new NFTHelper();




// let rSat = Math.random();
// let rBrt = Math.random();


const exportHelper = function(){
  //download(content, fileName, contentType) { 
  nft.prepareJSON();
}
const randomizeHelper = function(){ window.randomize() }



const buttons = {
  'export json':exportHelper,
  'randomize': randomizeHelper
}

window.randomize = function(){
  window.app.randomizeView();
  currHDRIIndex = Math.floor(Math.random()*window.hdriItems.length);
  const fldr = window.hdriItems[ currHDRIIndex ].folder;
  const fmt = window.hdriItems[ currHDRIIndex ].format;
  const nm = window.hdriItems[ currHDRIIndex ].name;
  const envMap = window.hdriItems[ currHDRIIndex ].envMapValue;
  window.app.updateHDRI({folder:fldr, format:fmt, envMap:envMap}); 
  window.settings["hdri"] = nm;
  
  let r = window.hdriItems[ currHDRIIndex ].envMapValue;
  window.settings["environment map intensity"] = r;
  window.app.bufferImage.uniforms['envMapMult'].value = r;

  r = Math.random()*(Math.PI*2);
  window.settings["hue"] = r;
  window.app.bufferImage.uniforms['hue'].value = r;

  r = .9 + Math.random()* .3;
  window.settings["saturation"] = r;
  window.app.bufferImage.uniforms['saturation'].value = r;
  
  r = 10;// + Math.random()* 10;
  window.settings["outter size"] = r;
  window.app.bufferImage.uniforms['outtieSize'].value = r;

  r = .4 + Math.random()* 1.2
  window.settings["inner size"] = r;
  window.app.bufferImage.uniforms['innieSize'].value = r;

  r =  -15 + Math.random()* 30
  window.settings["rotation speed inner"] = r;
  window.app.bufferImage.uniforms['rotSpeedInner'].value = r;

  r = -10 + Math.random()* 20
  window.settings["rotation speed outter"] = r;
  window.app.bufferImage.uniforms['rotSpeedOutter'].value = r;

  r = Math.floor(2+Math.random()*5)
  window.settings["reflections"] = r;
  window.app.bufferImage.uniforms['reflections'].value = r;

  r = 1+Math.random()*16
  window.settings["rim size"] = r;
  window.app.bufferImage.uniforms['rimSize'].value = r;

  r = .5+Math.random()
  window.settings["color r"] = r;
  col.x=r;
  
  r = .5+Math.random()
  window.settings["color g"] = r;
  col.y=r;
  
  r = .5+Math.random()
  window.settings["color b"] = r;
  col.z=r;
  
  window.app.bufferImage.uniforms['colMult'].value = col;
 
  r = -.9+ Math.random() * 1.8
  window.settings["normals multiply"] = r;
  window.app.bufferImage.uniforms['normalColorMult'].value = r;

  r =  Math.random()*.7
  window.settings["reflection tweak 1"] = r;
  window.app.bufferImage.uniforms['reflectionTweak1'].value = r;

  r = -.6+Math.random() * .9
  window.settings["reflection tweak 2"] = r;
  window.app.bufferImage.uniforms['reflectionTweak2'].value = r;

  r = -.35 + Math.random() * .4
  window.settings["reflection tweak 3"] = r;
  window.app.bufferImage.uniforms['reflectionTweak3'].value = r;


  r = .067 + Math.random() * .55
  window.settings["reflection tweak 4"] = r;
  window.app.bufferImage.uniforms['reflectionTweak4'].value = r;
  
  r = Math.floor(Math.random()*5);
  window.settings["shape"] = r;
  window.currShape = r;
  window.app.initShader();

  let rHue = Math.random();

  window.color1 = new THREE.Color().setHSL(rHue, Math.random(), Math.random());
  window.color2 = new THREE.Color().setHSL((rHue + (.5 + (-.15+Math.random()*.3)))%1.0 , Math.random(),Math.random());

  window.settings['color1'] = "#"+window.color1.getHexString();
  window.settings['color2'] = "#"+window.color2.getHexString();
  window.updateBackground();
  
}

window.updateBackground = function(){
  document.body.style = "background: radial-gradient(circle at center 50vh, "+window.settings["color1"]+" "+0+"%, "+window.settings["color2"]+" "+100+"%);";
}


function hdriButtonPress(){
  currHDRIIndex = getHDRIIndexByName(window.settings["hdri"]);
  const fldr = window.hdriItems[ currHDRIIndex ].folder;
  const fmt = window.hdriItems[ currHDRIIndex ].format;
  const envMap = window.hdriItems[ currHDRIIndex ].envMapValue;
  window.app.updateHDRI({folder:fldr, format:fmt, envMap:envMap}); 
}

function getHDRIIndexByName(name){
  for(let i = 0; i<window.hdriItems.length; i++){
    if(window.hdriItems[i].name==name){
      return i
    }
  }
}

window.initGUI = function(){
  
  const panel = new GUI( {width:400});
  //panel.hide();
  const hdris = [];
  for(let i = 0; i<window.hdriItems.length; i++){
    hdris["" + i + ""] = window.hdriItems[i].name;
  }
  panel.add( window.settings, "hdri", hdris ).listen().onChange( function ( toggle ) {
    hdriButtonPress();
  });

  panel.add( window.settings, "environment map intensity", 0, 10, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['envMapMult'].value = val;
  }).listen();

  panel.add( window.settings, "hue", 0, Math.PI*2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['hue'].value = val;
  }).listen();
  panel.add( window.settings, "saturation", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['saturation'].value = val;
  }).listen();

  panel.add( window.settings, "outter size", 0, 20, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['outtieSize'].value = val;
  }).listen();
  panel.add( window.settings, "inner size", 0, 20, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['innieSize'].value = val;
  }).listen();
  panel.add( window.settings, "rotation speed inner", -20, 20, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['rotSpeedInner'].value = val;
  }).listen();
  panel.add( window.settings, "rotation speed outter", -20, 20, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['rotSpeedOutter'].value = val;
  }).listen();

  panel.add( window.settings, "reflections", 1, 25, 1 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['reflections'].value = Math.floor(val);
  }).listen();
  panel.add( window.settings, "rim size", 0, 100, .01 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['rimSize'].value = val;
  }).listen();

  
  panel.add( window.settings, "color r", 0, 2, .001 ).listen().onChange( function ( val ) {
    col.x=val;
    window.app.bufferImage.uniforms['colMult'].value = col;
  }).listen();
  panel.add( window.settings, "color g", 0, 2, .001 ).listen().onChange( function ( val ) {
    col.y=val;
    window.app.bufferImage.uniforms['colMult'].value = col;
  }).listen();
  panel.add( window.settings, "color b", 0, 2, .001 ).listen().onChange( function ( val ) {
    col.z=val;
    window.app.bufferImage.uniforms['colMult'].value = col;
  }).listen();

  panel.add( window.settings, "normals multiply", -3, 3, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['normalColorMult'].value = val;
  }).listen();


  panel.add( window.settings, "reflection tweak 1", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['reflectionTweak1'].value = val;
  }).listen();
  panel.add( window.settings, "reflection tweak 2", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['reflectionTweak2'].value = val;
  }).listen();
  panel.add( window.settings, "reflection tweak 3", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['reflectionTweak3'].value = val;
  }).listen();
  panel.add( window.settings, "reflection tweak 4", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['reflectionTweak4'].value = val;
  }).listen();
 
  panel.add( window.settings, "test 1", -4, 4, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['test1'].value = val;
  }).listen();
  panel.add( window.settings, "test 2", -2, 2, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['test2'].value = val;
  }).listen();
  panel.add( window.settings, "test 3", -10, 10, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['test3'].value = val;
  }).listen();
  panel.add( window.settings, "test 4", -10, 10, .001 ).listen().onChange( function ( val ) {
    window.app.bufferImage.uniforms['test4'].value = val;
  }).listen();
  panel.add( window.settings, "shape", 0, 4, 1 ).listen().onChange( function ( val ) {
    window.currShape = Math.floor(val);
    window.app.initShader()
  }).listen();

  panel.addColor( window.settings, "color1").onChange( function ( val ) {
    //window.color1.setStyle(val);
    //app.bufferImage.uniforms['c1'].value = new THREE.Vector4(window.color1.r, window.color1.g, window.color1.b, 1.);
    updateBackground();
  }).listen();
  panel.addColor( window.settings, "color2").onChange( function ( val ) {
    //window.color2.setStyle(val);
    //app.bufferImage.uniforms['c2'].value = new THREE.Vector4(window.color2.r, window.color2.g, window.color2.b, 1.);
    updateBackground();
  }).listen();

  panel.add(buttons,'export json');
  panel.add(buttons,'randomize');
  

}

class Buffer{
  constructor(){
    this.BUFFER_FINAL_FRAG = "";
  }
  getBufferFrag(){

    this.BUFFER_FINAL_FRAG = "#define shpe "+window.currShape;
    this.BUFFER_FINAL_FRAG += `
    
    //uniform sampler2D iChannel0;
    uniform samplerCube iChannel0;
    uniform vec3 iResolution;
    uniform vec3 colMult;
    uniform float time;
    
    uniform float mx;
    uniform float my;
    uniform float zoom;
    uniform float hue;
    uniform float saturation;

    uniform float envMapMult;
    uniform float normalColorMult;

    uniform float outtieSize;
    uniform float innieSize;

    uniform float rotSpeedOutter;
    uniform float rotSpeedInner;

    uniform float reflectionTweak1;
    uniform float reflectionTweak2;
    uniform float reflectionTweak3;
    uniform float reflectionTweak4;

    uniform vec4 c1;
    uniform vec4 c2;

    uniform float test1;
    uniform float test2;
    uniform float test3;
    uniform float test4;
    uniform int currShape; 

    uniform float rimSize; 

    uniform int reflections;
    
    varying vec2 vUv;

    #define pi 3.1415927
    
    #define phi 1.61803398875

    #define ICO_FACES 20
    const mat3 icoIndices[ICO_FACES] = mat3[ICO_FACES](
      mat3(0.851,0.526,0.0,0.0,0.851,0.526,0.526,0.0,0.851),
      mat3(0.851,0.526,0.0,0.526,0.0,-0.851,0.0,0.851,-0.526),
      mat3(0.851,-0.526,0.0,0.526,0.0,0.851,0.0,-0.851,0.526),
      mat3(0.851,-0.526,0.0,0.0,-0.851,-0.526,0.526,0.0,-0.851),
      mat3(-0.851,0.526,0.0,-0.526,0.0,0.851,0.0,0.851,0.526),
      mat3(-0.851,0.526,0.0,0.0,0.851,-0.526,-0.526,0.0,-0.851),
      mat3(-0.851,-0.526,0.0,0.0,-0.851,0.526,-0.526,0.0,0.851),
      mat3(-0.851,-0.526,0.0,-0.526,0.0,-0.851,0.0,-0.851,-0.526),
      mat3(0.851,0.526,0.0,0.0,0.851,-0.526,0.0,0.851,0.526),
      mat3(-0.851,0.526,0.0,0.0,0.851,0.526,0.0,0.851,-0.526),
      mat3(0.851,-0.526,0.0,0.0,-0.851,0.526,0.0,-0.851,-0.526),
      mat3(-0.851,-0.526,0.0,0.0,-0.851,-0.526,0.0,-0.851,0.526),
      mat3(0.526,0.0,0.851,0.851,-0.526,0.0,0.851,0.526,0.0),
      mat3(0.526,0.0,-0.851,0.851,0.526,0.0,0.851,-0.526,0.0),
      mat3(-0.526,0.0,0.851,-0.851,0.526,0.0,-0.851,-0.526,0.0),
      mat3(-0.526,0.0,-0.851,-0.851,-0.526,0.0,-0.851,0.526,0.0),
      mat3(0.0,0.851,0.526,-0.526,0.0,0.851,0.526,0.0,0.851),
      mat3(0.0,-0.851,0.526,0.526,0.0,0.851,-0.526,0.0,0.851),
      mat3(0.0,0.851,-0.526,0.526,0.0,-0.851,-0.526,0.0,-0.851),
      mat3(0.0,-0.851,-0.526,-0.526,0.0,-0.851,0.526,0.0,-0.851)
    );

    #define DOD_FACES 36
    const mat3 dodIndices[DOD_FACES] = mat3[DOD_FACES](
      mat3(0.357,0.935,0.0,0.0,0.357,0.935,0.578,0.578,0.578),
      mat3(0.357,0.935,0.0,-0.357,0.935,0.0,-0.578,0.578,0.578),
      mat3(0.935,0.0,0.357,0.357,0.935,0.0,0.578,0.578,0.578),
      mat3(0.935,0.0,0.357,0.935,0.0,-0.357,0.578,0.578,-0.578),
      mat3(0.0,0.357,0.935,0.935,0.0,0.357,0.578,0.578,0.578),
      mat3(0.0,0.357,0.935,0.0,-0.357,0.935,0.578,-0.578,0.578),
      mat3(0.578,0.578,-0.578,-0.357,0.935,0.0,0.357,0.935,0.0),
      mat3(0.578,0.578,-0.578,0.0,0.357,-0.935,-0.578,0.578,-0.578),
      mat3(0.578,-0.578,0.578,0.935,0.0,-0.357,0.935,0.0,0.357),
      mat3(0.578,-0.578,0.578,0.357,-0.935,0.0,0.578,-0.578,-0.578),
      mat3(-0.578,0.578,0.578,0.0,-0.357,0.935,0.0,0.357,0.935),
      mat3(-0.578,0.578,0.578,-0.935,0.0,0.357,-0.578,-0.578,0.578),
      mat3(-0.357,0.935,0.0,-0.935,0.0,0.357,-0.578,0.578,0.578),
      mat3(-0.578,0.578,-0.578,-0.935,0.0,-0.357,-0.935,0.0,0.357),
      mat3(-0.357,-0.935,0.0,0.0,-0.357,0.935,-0.578,-0.578,0.578),
      mat3(-0.357,-0.935,0.0,0.357,-0.935,0.0,0.578,-0.578,0.578),
      mat3(0.0,-0.357,-0.935,0.935,0.0,-0.357,0.578,-0.578,-0.578),
      mat3(0.0,-0.357,-0.935,0.0,0.357,-0.935,0.578,0.578,-0.578),
      mat3(-0.578,-0.578,-0.578,0.0,0.357,-0.935,0.0,-0.357,-0.935),
      mat3(-0.935,0.0,-0.357,-0.578,0.578,-0.578,0.0,0.357,-0.935),
      mat3(-0.357,-0.935,0.0,-0.935,0.0,-0.357,-0.578,-0.578,-0.578),
      mat3(-0.357,-0.935,0.0,-0.578,-0.578,0.578,-0.935,0.0,0.357),
      mat3(0.0,-0.357,-0.935,-0.357,-0.935,0.0,-0.578,-0.578,-0.578),
      mat3(0.0,-0.357,-0.935,0.578,-0.578,-0.578,0.357,-0.935,0.0),
      mat3(0.357,0.935,0.0,-0.578,0.578,0.578,0.0,0.357,0.935),
      mat3(0.935,0.0,0.357,0.578,0.578,-0.578,0.357,0.935,0.0),
      mat3(0.0,0.357,0.935,0.578,-0.578,0.578,0.935,0.0,0.357),
      mat3(0.578,0.578,-0.578,-0.578,0.578,-0.578,-0.357,0.935,0.0),
      mat3(0.578,-0.578,0.578,0.578,-0.578,-0.578,0.935,0.0,-0.357),
      mat3(-0.578,0.578,0.578,-0.578,-0.578,0.578,0.0,-0.357,0.935),
      mat3(-0.357,0.935,0.0,-0.578,0.578,-0.578,-0.935,0.0,0.357),
      mat3(-0.357,-0.935,0.0,0.578,-0.578,0.578,0.0,-0.357,0.935),
      mat3(0.0,-0.357,-0.935,0.578,0.578,-0.578,0.935,0.0,-0.357),
      mat3(-0.578,-0.578,-0.578,-0.935,0.0,-0.357,0.0,0.357,-0.935),
      mat3(-0.357,-0.935,0.0,-0.935,0.0,0.357,-0.935,0.0,-0.357),
      mat3(0.0,-0.357,-0.935,0.357,-0.935,0.0,-0.357,-0.935,0.0)
    );

    const int dodEdge[DOD_FACES] = int[DOD_FACES](
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      5,
      6,
      1,
      1,
      1,
      1,
      1,
      1,
      3,
      1,
      1,
      3,
      1,
      1
    );

    #define OCT_FACES 8
    const mat3 octIndices[OCT_FACES] = mat3[OCT_FACES](
      mat3(0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0,0.0),
      mat3(0.0,0.0,1.0,0.0,1.0,0.0,-1.0,0.0,0.0),
      mat3(0.0,0.0,1.0,-1.0,0.0,0.0,0.0,-1.0,0.0),
      mat3(0.0,0.0,1.0,0.0,-1.0,0.0,1.0,0.0,0.0),
      mat3(0.0,0.0,-1.0,0.0,1.0,0.0,1.0,0.0,0.0),
      mat3(0.0,0.0,-1.0,-1.0,0.0,0.0,0.0,1.0,0.0),
      mat3(0.0,0.0,-1.0,0.0,-1.0,0.0,-1.0,0.0,0.0),
      mat3(0.0,0.0,-1.0,1.0,0.0,0.0,0.0,-1.0,0.0)
    );
    
    #define TET_FACES 4
    const mat3 tetIndices[TET_FACES] = mat3[TET_FACES](
      mat3(0.05,0.0,1.297,1.248,0.0,-1.099,-1.149,1.198,-1.099),
      mat3(0.05,0.0,1.297,-1.149,1.198,-1.099,-1.149,-1.198,-1.099),
      mat3(0.05,0.0,1.297,-1.149,-1.198,-1.099,1.248,0.0,-1.099),
      mat3(1.248,0.0,-1.099,-1.149,-1.198,-1.099,-1.149,1.198,-1.099)
    );

    #define CUB_FACES 12
    const mat3 cubIndices[CUB_FACES] = mat3[CUB_FACES](
      mat3(-1.0,-1.0,1.0,-1.0,1.0,-1.0,-1.0,-1.0,-1.0),
      mat3(-1.0,1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,-1.0),
      mat3(1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0),
      mat3(1.0,-1.0,1.0,-1.0,-1.0,-1.0,1.0,-1.0,-1.0),
      mat3(1.0,1.0,-1.0,-1.0,-1.0,-1.0,-1.0,1.0,-1.0),
      mat3(-1.0,1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0),
      mat3(-1.0,-1.0,1.0,-1.0,1.0,1.0,-1.0,1.0,-1.0),
      mat3(-1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0),
      mat3(1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0),
      mat3(1.0,-1.0,1.0,-1.0,-1.0,1.0,-1.0,-1.0,-1.0),
      mat3(1.0,1.0,-1.0,1.0,-1.0,-1.0,-1.0,-1.0,-1.0),
      mat3(-1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0)
    );
    const int cubEdge[CUB_FACES] = int[CUB_FACES](
      5,
      5,
      5,
      5,
      5,
      5,
      6,
      6,
      6,
      6,
      6,
      6
    );
    const float GAMMA = 2.2;

    
  
    void tri (vec3 p, vec3 d, mat3 tr, inout vec4 col, inout float depth, inout vec3 norm, int sideHelper) {
        vec4 grad = vec4(col);
        //vec3 n = normalize( cross( tr[1] - tr[0], tr[2] - tr[0] ) );
        vec3 n = normalize( cross( tr[1] - tr[0], tr[2] - tr[0] ) ) ;
        
        //if ( dot(n,-d) < 0. ) n *= -1.;
        if ( dot( n, -d) < 0. ) n *= 1.;
        
        mat3 nn = mat3(
          normalize( cross( n, tr[2] - tr[1] ) ),
          normalize( cross( n, tr[0] - tr[2] ) ),
          normalize( cross( n, tr[1] - tr[0] ) )
        );
        
        vec3 w = p - tr[0];
        
        //float x = -dot(w,n)/dot(d,n);
        float x = -dot(w, n ) / dot(d,n);
        
        if (x < 0.) return;
        
        //vec3 i = p + d * x;
        vec3 i = p + d * x;
        //vec3 ipol = vec3( dot(nn[0], i-tr[1]), dot(nn[1],i-tr[2]),dot(nn[2],i-tr[0]))/vec3(dot(nn[0],tr[0]-tr[1]),dot(nn[1],tr[1]-tr[2]),dot(nn[2],tr[2]-tr[0]));
        
        vec3 ipol = vec3( 
        dot( nn[0], i - tr[1]), 
        dot( nn[1], i - tr[2]),
        dot( nn[2], i - tr[0])
        )/vec3(
        dot( nn[0], tr[0] - tr[1] ),
        dot( nn[1], tr[1] - tr[2] ),
        dot( nn[2], tr[2] - tr[0] )
        );//dividing gives wire frames 

        
        vec4 c = vec4(1.);
        //c.w *= step( 0. , ipol.x );
        //c.w *= step( 0. , ipol.y );
        //c.w *= step( 0. , ipol.z );
        
        c.w *= step(0. , ipol.x); //makes the triangles touch each other
        c.w *= step(0. , ipol.y);
        c.w *= step(0. , ipol.z);
          
        if (c.w == 0.0) return;
        //if (c.w == 0.) x=1000.; 

        if (x < depth ) {

            vec3 u = normalize( reflect( (p - i), n*normalColorMult ) );

            float p1 = rimSize * .0005; //default .02;
            float p2 = p1+.001;

            vec4 envColor = textureCube( iChannel0, u ) * envMapMult;
            
            //c.xyz =  ( texture2D( iChannel0, u.xy ).xyz * abs(u) ) - 1. + ((smoothstep(p1,p2,ipol.x) * smoothstep(p1,p2,ipol.y) * smoothstep(p1,p2,ipol.z)) );
            
            //float alpha = vec3( (smoothstep( p1 , p2 , ipol.x  )*1.) * smoothstep( p1 , p2 , ipol.y ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            float alpha = 1.;
            
            if(sideHelper==0){
              alpha = vec3( smoothstep( p1 , p2 , ipol.x  ) * smoothstep( p1 , p2 , ipol.y ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            }
            
            if(sideHelper==1){
              alpha = vec3( smoothstep( p1 , p2 , ipol.x  ) ).x;
            }
            if(sideHelper==2){
              alpha = vec3( smoothstep( p1 , p2 , ipol.y  ) ).x;
            }
            if(sideHelper==3){
              alpha = vec3( smoothstep( p1 , p2 , ipol.z  ) ).x;
            }
            
            if(sideHelper==5){ //xy
              alpha = vec3( smoothstep( p1 , p2 , ipol.x ) * smoothstep( p1 , p2 , ipol.y ) ).x;
            }
            if(sideHelper==6){//xz
              alpha = vec3( smoothstep( p1 , p2 , ipol.x ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            }
            if(sideHelper==7){//yz
              alpha = vec3( smoothstep( p1 , p2 , ipol.y ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            }

            if(sideHelper==5){ //xy
              alpha = vec3( smoothstep( p1 , p2 , ipol.x ) * smoothstep( p1 , p2 , ipol.y ) ).x;
            }
            if(sideHelper==6){//xz
              alpha = vec3( smoothstep( p1 , p2 , ipol.x ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            }
            if(sideHelper==7){//yz
              alpha = vec3( smoothstep( p1 , p2 , ipol.y ) * smoothstep( p1 , p2 , ipol.z ) ).x;
            }
            
            c.xyz = ( envColor.xyz * abs(u) ) - 1. + alpha ;
            vec3 mask = ( envColor.xyz * abs(u) ) - 1.;
            
            c.x *= (.5 + sin( (hue + 0.0 *0. ) ) *.5 );
            c.y *= (.5 + sin( (hue + 6.28*.33) ) *.5 );
            c.z *= (.5 + sin( (hue + 6.28*.66) ) *.5 );

            //vec3 sat = vec3(c.x * colMult.x, c.y * colMult.y, c.z * colMult.z);
            vec3 sat = vec3(c.x, c.y, c.z);
            float avg = sat.x+sat.y+sat.z/3.;

            col.xyz = mix( vec4(sat,1.), vec4(avg,avg,avg,1.), 1.-saturation).xyz;
            //col.xyz = mix(vec4(col.xyz,1.), grad, mask.x).xyz;

            col.x *= colMult.x*(alpha);
            col.y *= colMult.y*(alpha);
            col.z *= colMult.z*(alpha);

            //col = col; //(1.0 - col) * 1.;
            //col.a = alpha + (1.0-alpha);
            col.a = 20.;
            depth = x;
            norm = n;

        }
    }

  
    
    //sph (p,d,vec4(sin(t+float(i)),cos(t+float(i)),sin(phi*t+float(i*i)),.2), c, depth, norm);
    void sph (vec3 p, vec3 d, vec4 cr, inout vec4 col, inout float depth, inout vec3 norm) {
      
      vec3 w = p-cr.xyz;
      float B = 2.*dot(w,d);
      float C = dot(w,w)-cr.w*cr.w;
      float dl = B*B-4.*C;
      if (dl < 0.) return;
      float x = 0.5*(-B-sqrt(dl));
      if (x < 0.) return;
      vec3 i = p + d*x;
      vec4 c = vec4(1.);
      if (x < depth) {
        norm = normalize(i-cr.xyz);
        vec3 r = normalize( reflect( p - i, norm ) );
        vec4 envColor = textureCube( iChannel0, r );
        c.xyz = abs(r) * envColor.xyz;
        col = c;
        depth = x;
      } 
    }

    mat3 rot (vec3 u) {
      vec3 s = sin(u), c = cos(u);
      mat3 x = mat3(1,0,0,        0,c.x,s.x,    0,-s.x,c.x);
      mat3 y = mat3(c.y,0,s.y,    0,1,0,      -s.y,0,c.y);
      mat3 z = mat3(s.z, c.z, 0,  -c.z,s.z,0,   0,0,1);
      return x*y*z;
    }

    void sceneAll (inout vec3 p, inout vec3 d, inout vec4 col, float i, vec2 uv) {//OCTAHEDRON
      
      float depth = 1e3;
      vec3 norm=vec3(0);
      //vec4 c = vec4(0);
      // vec4 c1 = vec4(1.,0.,0.,1.);
      // vec4 c2 = vec4(0.,1.,0.,1.);
      //vec4 c = mix( c1, c2, 1.0-uv.y);
      vec4 c = vec4(0.);//  mix( c1, c2, 1.0-uv.y);
      float t = time/pi;
      
      float mlt = innieSize;
      if(shpe == 0){ //oct
        mlt = innieSize;
        for (int i = 0; i < OCT_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * (octIndices[i]*mlt), c, depth, norm, 0);
        }
        mlt = outtieSize;
        for (int i = 0; i < OCT_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedOutter, 0 , 0) ) * (octIndices[i]*mlt), c, depth, norm, 0);
        }
        
      }

      if(shpe == 1){ //ico
        mlt = innieSize;
        for (int i = 0; i < ICO_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * (icoIndices[i]*mlt), c, depth, norm, 0);
        }
        mlt = outtieSize;
        for (int i = 0; i < ICO_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedOutter, 0 , 0) ) * (icoIndices[i]*mlt), c, depth, norm, 0);
        }
      }

      if(shpe == 2){ //tet
        mlt = innieSize;
        for (int i = 0; i < TET_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * (tetIndices[i]*mlt), c, depth, norm, 0);
        }
        mlt = outtieSize;
        for (int i = 0; i < TET_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedOutter, 0 , 0) ) * (tetIndices[i]*mlt), c, depth, norm, 0);
        }
      }

      if(shpe == 3){ //cube
        mlt = innieSize;
        for (int i = 0; i < CUB_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * (cubIndices[i]*mlt), c, depth, norm, cubEdge[i]);
        }
        mlt = outtieSize;
        for (int i = 0; i < CUB_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedOutter, 0 , 0) ) * (cubIndices[i]*mlt), c, depth, norm, cubEdge[i]);
        }
      }

      if(shpe == 4){ //dod
        mlt = innieSize;
        for (int i = 0; i < DOD_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * (dodIndices[i]*mlt), c, depth, norm, dodEdge[i]);
        }
        mlt = outtieSize;
        for (int i = 0; i < DOD_FACES; i++) {
          tri( p, d, rot( vec3( t * rotSpeedOutter, 0 , 0) ) * (dodIndices[i]*mlt), c, depth, norm, dodEdge[i]);
        }
      }

      //sph (p,d,vec4(sin(t+float(i)),cos(t+float(i)),sin(phi*t+float(i*i)),.2), c, depth, norm);

      p = p + d * depth ;
      d = reflect( d, norm);
      p += 0.0001 * d;

      //col += 0.8 * c / ( .8 + 2. * (i) );
      col += (0.6+reflectionTweak1) * c / ( (1. + reflectionTweak2) + ( 0.3 + reflectionTweak3) * (i*reflectionTweak4) );
        
    }

    vec3 gamma(vec3 color, float g) {
      return pow(color, vec3(g));
    }
    vec3 linearToScreen(vec3 linearRGB) {
      return gamma(linearRGB, 1.0 / GAMMA);
    }
  
    
    
    void main() {
      
        vec2 uv = (vUv*2.-1.)*iResolution.xy/iResolution.yy;
        
        mat3 m = rot( vec3( mx , my ,0.));
        vec3 p = m*vec3(0,0, zoom);
        vec3 d = m*normalize(vec3(uv,1));
        
        vec4 col = vec4(0.,0.,0.,0.);
        
        for (int i = 0; i < reflections; i++) sceneAll( p , d , col , float(i), uv);
        
        //vec4 grad = mix( vec4(c1.xyz, 1.-col.a), vec4(c2.xyz, 1.-col.a), 1.0-uv.y );
        //vec4 c = mix( vec4(col.xyz), grad, 1.0-uv.y);
        gl_FragColor = col;

    }`;
    return this.BUFFER_FINAL_FRAG;
  }
}

const VERTEX_SHADER = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;



class App {
  
  constructor() {
    
    window.updateBackground();
   
    const self = this;
    this.buffer = new Buffer();
    this.textureCube;
    this.canControl = true;
    

    this.mouse = {
      zoom:-35,
      zoomTarg:-35,
      pos:new THREE.Vector2(),
      curr:new THREE.Vector2(),
      prev:new THREE.Vector2(),
      dist:new THREE.Vector2(),
      targ:new THREE.Vector2(),
      down:false
    }
    
    self.randomizeView();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;
    this.renderer = new THREE.WebGLRenderer({alpha:true});

    this.fustrumSize = 1;
    this.orthoCamera = new THREE.OrthographicCamera(-this.fustrumSize, this.fustrumSize, this.fustrumSize, -this.fustrumSize, 0, 1);
    this.counter = 0;
    this.clock = new THREE.Clock;
    
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);

    this.targetC = new BufferManager(this.renderer, {
      width: this.width,
      height: this.height
    });
    this.bufferImage = null
  }

  handleMouseMove(e){
    
    this.mouse.curr.set(e.clientX, e.clientY);
    
    if(this.mouse.down){
      this.mouse.targ.x += (this.mouse.dist.x)*.002;
      this.mouse.targ.y += (this.mouse.dist.y)*.002;
      if(this.mouse.targ.y>Math.PI*.5)
        this.mouse.targ.y=Math.PI*.5;
      if(this.mouse.targ.y<-Math.PI*.5)
        this.mouse.targ.y=-Math.PI*.5;
    }

    this.mouse.dist.x = this.mouse.prev.x-this.mouse.curr.x;
    this.mouse.dist.y = this.mouse.prev.y-this.mouse.curr.y;
    this.mouse.prev.copy(this.mouse.curr);

  }

  handlePointerDown(e){
    if(this.canControl){
      this.mouse.down = true;
    }
  }
  handlePointerUp(e){
    this.mouse.down = false;
  }
  handleScroll(e){
    if(this.canControl){
      this.mouse.zoomTarg -= e.deltaY*.008;
      if(this.mouse.zoomTarg>-.1)this.mouse.zoomTarg = -.1;
      if(this.mouse.zoomTarg<-35)this.mouse.zoomTarg = -35;
    }
  }


  handleWindowResize(){

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const resolution = new THREE.Vector3(this.width, this.height, window.devicePixelRatio);
    this.bufferImage.uniforms['iResolution'].value = resolution;
    
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    //this.bufferImage.resize();
  }

  start() {
   
    const self = this;
    
    if(!window.external){
      
      this.initShader();

      const r = './assets/cube/skyboxsun25deg/';
      const urls = [
        r + 'px.jpg', r + 'nx.jpg',
        r + 'py.jpg', r + 'ny.jpg',
        r + 'pz.jpg', r + 'nz.jpg'
      ];

      this.textureCube = new THREE.CubeTextureLoader().load( urls );
      this.textureCube.mapping = THREE.CubeRefractionMapping;
      this.animate();
      
    }

    this.renderer.domElement.addEventListener("mousemove",function(e){
      self.handleMouseMove(e);
    })
    this.renderer.domElement.addEventListener("pointerdown",function(e){
      self.handlePointerDown(e);
    })
    this.renderer.domElement.addEventListener("pointerup",function(e){
      self.handlePointerUp(e);
    })
    this.renderer.domElement.addEventListener('wheel', function(e){
      self.handleScroll(e);
    });
    window.addEventListener( 'resize', function(e){
      self.handleWindowResize();
    } );
       
    window.initGUI();

  }

  initShader(){
    const resolution = new THREE.Vector3(this.width, this.height, window.devicePixelRatio);
    // window.settings = {
    //   'environment map intensity': window.hdriItems[ currHDRIIndex ].envMapValue,
    //   'normals multiply' : 1,
    //   'color r' : 1,
    //   'color g' : 1,
    //   'color b' : 1,
    //   'hue' : 4.366,
    //   'saturation' : 1,
    //   'outter size' : 4,
    //   'inner size' : 1,
    //   "rotation speed outter":0,
    //   "rotation speed inner":0,
    //   "rim size" : 20,
    //   'reflection tweak 1' : 0,
    //   'reflection tweak 2' : 0,
    //   'reflection tweak 3' : 0,
    //   'reflection tweak 4' : 1,
    //   'hdri':window.hdriItems[currHDRIIndex].name,
    //   'reflections': 1,
    //   'test 1' : 4,
    //   'test 2' : 0,
    //   'test 3' : 0,
    //   'test 4' : 0,
    //   'shape' : 0
    // } 


    this.bufferImage = new BufferShader(this.buffer.getBufferFrag(), {
      iResolution: {
        value: resolution
      },
      time: {
        value: 0
      },
      mx: {
        value: this.mouse.pos.y
      },
      my: {
        value: this.mouse.pos.y
      },
      zoom: {
        value: this.mouse.zoom
      },
      iChannel0: {
        value: null
      },
      envMapMult:{
        value:window.settings["environment map intensity"]
      },
      normalColorMult:{
        value:window.settings["normals multiply"]
      },
      colMult:{
        value:new THREE.Vector3( window.settings["color r"], window.settings["color g"], window.settings["color b"])
      },
      hue:{
        value:window.settings["hue"]
      },
      saturation:{
        value:window.settings["saturation"]
      },
      innieSize:{
        value:window.settings["inner size"]
      },
      rotSpeedInner:{
        value:window.settings["rotation speed inner"]
      },
      rotSpeedOutter:{
        value:window.settings["rotation speed outter"]
      },
      outtieSize:{
        value:window.settings["outter size"]
      },
      reflections:{
        value:window.settings["reflections"]
      },
      rimSize:{
        value:window.settings["rim size"]
      },
      reflectionTweak1:{
        value:window.settings["reflection tweak 1"]
      },
      reflectionTweak2:{
        value:window.settings["reflection tweak 2"]
      },
      reflectionTweak3:{
        value:window.settings["reflection tweak 3"]
      },
      reflectionTweak4:{
        value:window.settings["reflection tweak 4"]
      },
      test1:{
        value:window.settings["test 1"]
      },
      test2:{
        value:window.settings["test 2"]
      },
      test3:{
        value:window.settings["test 3"]
      },
      test4:{
        value:window.settings["test 4"]
      },
      c1:{
        value:new THREE.Vector4(window.color1.r, window.color1.g, window.color1.b, 1.)
      },
      c2:{
        value:new THREE.Vector4(window.color2.r, window.color2.g, window.color2.b, 1.) 
      }
    });
  }

  randomizeView(){
    this.mouse.targ.x = this.mouse.pos.x = Math.random()*(Math.PI*2);
    this.mouse.targ.y = this.mouse.pos.y = ((-Math.PI*.5)+Math.random()*Math.PI)*.6;
  }

  updateHDRI(OBJ){
    const r = './assets/cube/'+OBJ.folder+"/";
    const urls = [
      r + 'px.'+OBJ.format, r + 'nx.'+OBJ.format,
      r + 'py.'+OBJ.format, r + 'ny.'+OBJ.format,
      r + 'pz.'+OBJ.format, r + 'nz.'+OBJ.format
    ];
    
    this.textureCube = new THREE.CubeTextureLoader().load( urls );
    this.textureCube.mapping = THREE.CubeRefractionMapping;
    
    if(this.bufferImage != null){
      this.bufferImage.uniforms['envMapMult'].value = OBJ.envMap;
    }
    window.settings["environment map intensity"] = OBJ.envMap;

  }

  animate() {
    requestAnimationFrame(() => {

      const delta = this.clock.getDelta();

      this.mouse.pos.lerp(this.mouse.targ, .1);
      this.mouse.zoom += (this.mouse.zoomTarg - this.mouse.zoom)*delta*20;

      if(this.bufferImage != null){

        this.bufferImage.uniforms['time'].value = this.time;
        this.bufferImage.uniforms['mx'].value = this.mouse.pos.x;
        this.bufferImage.uniforms['my'].value = this.mouse.pos.y;
        this.bufferImage.uniforms['zoom'].value = this.mouse.zoom;
        
        if(this.textureCube!=null)
          this.bufferImage.uniforms['iChannel0'].value = this.textureCube;
      }
      this.targetC.render(this.bufferImage.scene, this.orthoCamera, true);
      this.time +=.002;

      this.animate();

    });

  }

}

class BufferShader {

  constructor(fragmentShader, uniforms = {}) {

    this.uniforms = uniforms;
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: VERTEX_SHADER,
      uniforms: uniforms
    });
    this.scene = new THREE.Scene();
    this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material); 
    this.scene.add(this.mesh);
  }
  
  // resize(){

  // }
  

}

class BufferManager {

  constructor(renderer, size) {

    this.renderer = renderer;

    this.readBuffer = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      stencilBuffer: false
    });

    this.writeBuffer = this.readBuffer.clone();

  }

  swap() {
    const temp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = temp;
  }

  render(scene, camera, toScreen = false) {
    if (toScreen) {
      this.renderer.render(scene, camera);
    } else {
      this.renderer.setRenderTarget(this.writeBuffer);
      this.renderer.clear();
      this.renderer.render(scene, camera)
      this.renderer.setRenderTarget(null);
      this.swap();
    }
    
  }

}

window.app = new App();
window.app.start();
