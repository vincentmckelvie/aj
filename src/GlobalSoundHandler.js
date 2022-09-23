
class GlobalSoundHandler {
	//{aliveTime:aliveTime, bullet:bullet};
	constructor(OBJ) {

		this.context;


		
		this.currLoaded = 0;
		this.loadedAll = false;
		//console.log("hiiii")

		this.samples = [];
		//console.log(soundfile)
		this.inited = false;

		const self = this;
		
		this.mainAudioSource;
		this.mainAudioGainNode;
		this.gainNode;
		this.sources = [];
		this.dest;
		//self.init();

	}
	
	update(){
	}

	init(){
		if(!this.inited){
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
			this.gainNode = this.context.createGain();
			this.gainNode.gain.value = 1;//window.vol; // 10 	%
			this.gainNode.connect(this.context.destination);
			
			//var audioCtx = new AudioContext();
  // create a stream from our AudioContext
  			this.dest = this.context.createMediaStreamDestination();
  			window.aStream = this.dest.stream;
			//console.log(window.aStream)

			if (this.context.decodeAudioData.length !== 1) {
			const originalDecodeAudioData = this.context.decodeAudioData.bind(this.context);
			this.decodeAudioData = buffer =>
				new Promise((resolve, reject) =>
				originalDecodeAudioData(buffer, resolve, reject)
				);
			}

			for(let i = 0; i<4; i++){
				//let sound = new Audio(this.audioFiles[i]);
				this.load({url:"./assets/tone ("+(i+1)+").mp3", index:i, name:"audio-"+i});
			}

			this.inited = true;
		}
		
	}


	load(OBJ){

		const name = OBJ.name;
		const index = OBJ.index;
		const self = this;
		fetch(OBJ.url).then(function(response) {
		    if (!response.ok) {
		      throw new Error("HTTP error, status = " + response.status);
		    }
	    	return response.arrayBuffer();
	 	}).then(function(buffer) {
			self.context.decodeAudioData(buffer, function(decodedData) {
				
				

				self.currLoaded ++;
				
				if(self.currLoaded==4){
					window.init();
					self.loaded = true;
				}

				const obj = {sample:decodedData, name:name, index:index};
				self.samples.push(obj);

			});
	  	});

	}

	playSoundByName(OBJ){
	
		if(this.loaded){
			this.playSoundByNameHelper(OBJ);
		}	

	}

	playSoundByNameHelper(OBJ){
		const sample = this.getSampleByName(OBJ.name);
		//const sample = this.samples[0];
		const obj = {sample:sample, dist:1, note:this.getKey(true)}
		this.playAudio(obj);
	}

	getSampleByName(name){
		for(let i = 0; i<this.samples.length; i++){
			const s = this.samples[i];
			if(s.name == name)
				return this.samples[i];  
		}
		return false;
	}



	playAudio(OBJ){
		
		const source = this.context.createBufferSource();
		source.buffer = OBJ.sample.sample;
		const gainNode = this.context.createGain()
		gainNode.gain.value = .7; // 10 %
		//this.lastGainNode = gainNode;
		//source.playbackRate.value = note;
		//console.log(2 ** ((OBJ.note - 60) / 12));
		source.playbackRate.value = 1;//2 ** ((OBJ.note - 60) / 12);
		source.connect(gainNode);

		gainNode.connect(this.gainNode);

		gainNode.connect(this.dest);
		

		source.start(0);
		///this.sources.push(source);
	}

	updateGainNode(){
		if(this.mainAudioGainNode!=null)
			this.mainAudioGainNode.gain.value = window.vol * (1); // 10 %
	}

	restartSources(){
		//if(window.vol<=0.00){
			// for(let i = 0; i<this.sources.length; i++){
			// 	this.sources[i].stop();
			// }
			// this.sources = [];
		//}
	}

	
	getKey(shouldDoRandom){
		let start = 60;
		//let fnl = start+(-2+Math.random()*4);
		//console.log("SHOULD DO RANDOM"+shouldDoRandom)
		//if(shouldDoRandom){
			return start;
		//}else{
			//return start;
		//}
	}
}

export { GlobalSoundHandler };