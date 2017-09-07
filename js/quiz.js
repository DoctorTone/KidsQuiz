/**
 * Created by DrTone on 08/09/2017.
 */

//Play audio on startup


$(document).ready( () => {
    let sound = new Howl(
        {
            src: ["./sounds/horse-whinny.wav"]
        }
    );

    sound.play();
});

