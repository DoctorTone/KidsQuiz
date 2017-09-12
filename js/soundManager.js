/**
 * Created by DrTone on 12/09/2017.
 */

//Manage all web sounds

class SoundManager {
    constructor() {
        this.sounds = [];
    }

    loadSounds(sounds) {
        let sound, soundInfo;
        let path = "./sounds/", ext = ".wav";
        let numSounds = sounds.length;
        for(let i=0; i<numSounds; ++i) {
            sound = new Howl(
                {
                    src: [path + sounds[i] + ext]
                }
            );
            soundInfo = {};
            soundInfo.sound = sound;
            soundInfo.name = sounds[i];
            this.sounds.push(soundInfo);
        }
        this.numSounds = numSounds;
    }

    playSound(name) {
        for(let i=0; i<this.numSounds; ++i) {
            if(name === this.sounds[i].name) {
                this.sounds[i].sound.play();
                return;
            }
        }
    }
}
