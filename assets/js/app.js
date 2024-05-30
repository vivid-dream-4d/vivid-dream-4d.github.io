// JavaScript to handle mouseover and mouseout events
var activeMethodPill = null;
var activeScenePill = null;
var activeModePill = null;
var activeVidID = 0;
var select = false;


$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    activeMethodPill = $('.method-pill').filter('.active')[0];
    activeModePill = $('.mode-pill').filter('.active')[0];
    activeScenePill = $('.scene-pill').filter('.active')[0];

    promptTextBox = $('#prompt-box');
    promptTextBox.hide();
});

function selectCompVideo(methodPill, scenePill, n_views, modePill) {
    // Your existing logic for video selection
    // var video = document.getElementById("compVideo");
    select = true;

    if (activeMethodPill) {
        activeMethodPill.classList.remove("active");
    }

    if (activeScenePill) {
        activeScenePill.classList.remove("active");
    }

    if (modePill) {
        activeModePill.classList.remove("active");
        modePill.classList.add("active");
        activeModePill = modePill;
    }

    activeMethodPill = methodPill;
    activeScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    mode = activeModePill.getAttribute("data-value");

    promptTextBox = $('#prompt-box');
    switch (pill) {
        case 'fireworks':
            promptTextBox.show();
            promptTextBox.text("Fireworks exploding in the night sky above a city skyline ...");
            break;
        case 'canyon':
            promptTextBox.show();
            promptTextBox.text("a realistic canyon with a mighty river flowing through its depths ...");
            break;
        case 'artic':
            promptTextBox.show();
            promptTextBox.text("an Arctic landscape featuring towering icebergs floating in a vast ...");
            break;
        case 'flag':
            promptTextBox.show();
            promptTextBox.text("a flag unfurling in the breeze on the surface of the moon ...");
            break;
        case 'lake-van-goh':
            promptTextBox.show();
            promptTextBox.text("a Van Gogh-inspired painting of a serene lake ....");
            break;
        case 'meadow_river':
            promptTextBox.show();
            promptTextBox.text("a tranquil meadow with a winding river flowing through ...");
            break;
        case 'lightning':
            promptTextBox.show();
            promptTextBox.text("dramatic thunderstorms, lightning illuminating the dark ...");
            break;
        case 'aurora':
            promptTextBox.show();
            promptTextBox.text("lake scene illuminated by the aurora ...");
            break;
        case 'tornado':
            promptTextBox.show();
            promptTextBox.text("a powerful tornado in the background, dark storm clouds swirling above ...");
            break;
        case 'forest_fire':
            promptTextBox.show();
            promptTextBox.text("a forest fire raging, flames and smoke reflecting off the calm water ...");
            break;
                
        default:
            promptTextBox.hide(); // text("");
            break;
    }
    // promptTextBox.text("Loading...");

    // console.log("Pill: " + pill + " Mode: " + mode);

    // if (videoSwitch.checked) {
    //     mode = 'depth'
    // } else {
    //     mode = 'rgb'
    // }

    // swap video to avoid flickering
    activeVidID = 1 - activeVidID;
    var video_active = document.getElementById("compVideo" + activeVidID);
    var video_hidden = document.getElementById("compVideo" + (1 - activeVidID));
    // video_active.src = "assets/videos/demo/" + mode + "/" + pill + ".mp4";
    if (mode == "rgb") {
        video_active.src = "assets/videos/demo/" + pill + ".mp4";
    } else {
        video_active.src = "assets/videos/demo/" + pill + "_depth.mp4";
    }
    // console.log("videos/results/" + mode + "/" + pill + ".mp4");
    video_active.load();
}