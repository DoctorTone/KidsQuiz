/**
 * Created by DrTone on 08/09/2017.
 */

//Play audio on startup


$(document).ready( () => {
    let snort = new Howl(
        {
            src: ["./sounds/horse-snort.webm", "./sounds/horse-snort.mp3"],
            autoplay: true
        }
    );
    let whinny = new Howl(
        {
            src: ["./sounds/horse-whinny.mp3", "./sounds/horse-whinny.wav"]
        }
    );

    $('#play').on("click", () => {
        whinny.play();
        whinny.on("end", () => {
            window.location.href = "questions.html";
        });
    });
});

