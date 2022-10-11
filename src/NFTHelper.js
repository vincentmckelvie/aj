import {Color} from './build/three.module.js';
class NFTHelper{

    constructor(){
      this.json;
      const self = this;
      const shouldLoad = self.getQueryVariable();
      if(shouldLoad){
        window.external = true;
        self.loadMainJson()
      }
    }

    getQueryVariable() {
        const query = window.location.search.substring(1);
        const q = query.split('=');
        if( q.length == 2){
          if( q[1] != null ){
            this.json = q[1];
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
        
    }

    getHDRIIndexByName(name){
        for(let i = 0; i < window.hdriItems.length; i++){
           if(window.hdriItems[i].name == name){
                return i;
           }
        }
    }

    loadMainJson(){
      //https://api.ipfsbrowser.com/ipfs/get.php?hash=QmVuNv8J5ghjJd7mSn8bZDq3JMYiPp3CUV2FdXookDz8iN
      const urlFNL = "https://api.ipfsbrowser.com/ipfs/get.php?hash="+this.json;         
      const self = this;   
      this.readTextFile(urlFNL, this.json, function(text, hash){
        
        const stngs  = JSON.parse(text);
        console.log(stngs)
        // for (const property in stngs["attribute"]) {
        //   const val = stngs[property];
        //   console.log(val)
        //   window.settings[property] = val;
        // }
        console
        for(let i = 0; i < stngs["attributes"].length; i++){
          const prop = stngs["attributes"][i]["trait_type"];
          const val = stngs["attributes"][i]["value"];
          
          //console.log(prop);
          window.settings[prop] = val;

        }
        console.log(window.settings)

        window.app.initShader();  
        window.app.randomizeView();
        console.log(window.settings["hdri"]);
        const currHDRIIndex = self.getHDRIIndexByName(window.settings["hdri"]);
        
        const fldr = window.hdriItems[ currHDRIIndex ].folder;
        const fmt = window.hdriItems[ currHDRIIndex ].format;
        const nm = window.hdriItems[ currHDRIIndex ].name;
        const envMap = window.hdriItems[ currHDRIIndex ].envMapValue;

        window.app.updateHDRI({folder:fldr, format:fmt, envMap:envMap}); 
        
        let r = hdriItems[ currHDRIIndex ].envMapValue;
        window.app.bufferImage.uniforms['envMapMult'].value = r;
      
        r = window.settings["hue"];
        window.app.bufferImage.uniforms['hue'].value = r;
      
        r = window.settings["saturation"];
        window.app.bufferImage.uniforms['saturation'].value = r;
        
      
        r = window.settings["outter size"];// + Math.random()* 10;
        window.app.bufferImage.uniforms['outtieSize'].value = r;
      
        r = window.settings["inner size"];
        window.app.bufferImage.uniforms['innieSize'].value = r;
      
        r = window.settings["rotation speed inner"];
        window.app.bufferImage.uniforms['rotSpeedInner'].value = r;
      
        r = window.settings["rotation speed outter"];
        window.app.bufferImage.uniforms['rotSpeedOutter'].value = r;
      
        r = window.settings["reflections"];
        window.app.bufferImage.uniforms['reflections'].value = r;
      
        r = window.settings["rim size"];
        window.app.bufferImage.uniforms['rimSize'].value = r;
        
        const col = new Color();    
        r = window.settings["color r"];
        col.x=r;
        
        r = window.settings["color g"];
        col.y=r;
        
        r = window.settings["color b"]
        col.z=r;
        
        window.app.bufferImage.uniforms['colMult'].value = col;
       
        r = window.settings["normals multiply"];
        window.app.bufferImage.uniforms['normalColorMult'].value = r;
      
        r = window.settings["reflection tweak 1"];
        window.app.bufferImage.uniforms['reflectionTweak1'].value = r;
      
        r = window.settings["reflection tweak 2"];
        window.app.bufferImage.uniforms['reflectionTweak2'].value = r;
      
        r = window.settings["reflection tweak 3"];
        window.app.bufferImage.uniforms['reflectionTweak3'].value = r;
      
      
        r = window.settings["reflection tweak 4"];
        window.app.bufferImage.uniforms['reflectionTweak4'].value = r;
        
        r = window.settings["shape"];
        window.currShape = r;
        window.app.initShader();
      
        window.color1 = window.settings['color1'];// new THREE.Color().setHSL(rHue, Math.random(), Math.random());
        window.color2 = window.settings['color2'];//new THREE.Color().setHSL((rHue + (.5 + (-.15+Math.random()*.3)))%1.0 , Math.random(),Math.random());
      
        window.updateBackground();
       
        window.app.animate();

      });
    }

    
    prepareJSON(){
      const arr = [];
      for (const property in window.settings) {
        arr.push({"trait_type" : property, "value" : window.settings[property] })
      }
      const params = {"name":"Anthony James Platonic Solids", "description":"A collection of platonic solids.", "image":"PLACEHOLDER.gif", "attributes":arr};
      const jsonData = JSON.stringify(params);
      this.download(jsonData, 'json.json', 'text/plain');
    }

    download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    }
    
    readTextFile(file, hash, callback) {
      const rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText, hash);
          }
      }
      rawFile.send(null);
    }
}

export {NFTHelper};
