(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/SoundBank.js

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

/* harmony default export */ var src_SoundBank = (SoundBank);


// CONCATENATED MODULE: ./index.mjs


/* harmony default export */ var index = __webpack_exports__["default"] = ({ Sounds: src_SoundBank });


/***/ })
/******/ ])["default"]));