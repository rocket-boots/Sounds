
class SoundBank {
	constructor(arr) {
		this.sounds = {};
		this.isSoundOn = true;
		this.isMusicOn = true;
		this.soundHook = function(){}; 
		this.musicHook = function(){};
		if (arr) {
			this.loadSounds(arr);
		}
	}

	_set(bool){
		if (!bool) this._setMusic(false);
		this.isSoundOn = bool;
		this.soundHook(bool);
	}

	_setMusic(bool){
		if (bool) this._set(true);
		this.isMusicOn = bool;
		this.musicHook(bool);
	}

	on() {
		this._set(true);
		return this;
	}

	off() {
		this._set(false);
		return this;
	}
	
	soundOn() { return this.on(); } // alias
	soundOff() { return this.off(); } // alias

	musicOn() {
		this._setMusic(true);
		return this;
	}

	musicOff() {
		this._setMusic(false);
		return this;
	}

	toggle(forceSound) {
		if (typeof forceSound === 'boolean') { 	
			this._set(forceSound);
		} else {
			this._set( !this.isSoundOn );
		}
		return this.isSoundOn;	
	}
	toggleSound() { return this.toggle(); } // alias

	toggleMusic(forceMusic) {
		if (typeof forceMusic === 'boolean') { 	
			this._setMusic(forceMusic);
		} else {
			this._setMusic(!this.isMusicOn);
		}
		return this.isMusicOn;	
	}

	loadSounds(soundNameArray, directory = "sounds/", extension = "mp3") {
		var sn, snL = soundNameArray.length;
		for (var i = 0; i < snL; i++) {
			sn = soundNameArray[i];
			// *** TODO: if array is another array, then use index 0 as name, index 1 as volume
			this.sounds[sn] = new Audio(directory + sn + '.' + extension);
			this.sounds[sn].volume = 0.6;
		}
		console.log("Loaded", snL, "sounds.");
	}

	play(soundName, isLooped) {
		if (!this.isSoundOn) { return false; }
		if (typeof this.sounds[soundName] === 'undefined') {
			console.log("Sound does not exist: " + soundName);
			return false;
		}
		if (typeof isLooped !== 'boolean') {
			isLooped = false;
		}
		this.sounds[soundName].loop = isLooped;
		if (!isLooped || this.isMusicOn) {
			this.sounds[soundName].play();
		}
		return true;
	}

	stop(soundName){
		if (this.sounds[soundName]) {
			this.sounds[soundName].pause();
		} else {
			console.warning("Sound not found", soundName, this.sounds);
		}
	};
}

export default SoundBank;

