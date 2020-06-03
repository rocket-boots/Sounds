# Sounds
Sound manager

## Install

`npm install git+https://github.com/rocket-boots/Sounds.git#v0.3.0`

(Substitute the version number for the version of your choice)

## How to Use

```js
import { Sounds } from 'rocket-boot-sounds';

const sounds = new Sounds(['coin', 'inflate', 'jump', 'release', 'unlock', 'win']);
// List of sounds assumes that files are in a "sounds" directory and that the files are all MP3 files with an `.mp3` extension.

sounds.play('coin');

sounds.toggle(); // turn on/off

// For more methods, check the code
```

