window.HELP_IMPROVE_VIDEOJS = false;
function reload() {
    var videos = document.getElementsByClassName('item');
    for(var i = 0; i < videos.length; i++) {
        // videos[i].style.width = width;
    }
}

function configure_carousel() {
    var options = {
            slidesToScroll: 1,
            slidesToShow: 4,
            loop: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 3000,
    }
    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
    
    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        // Add listener to  event
        // carousels[i].reset();
        carousels[i].on('before:show', state => {
            console.log(state);
        });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#item');
    if (element && element.bulmaCarousel) {
        // bulmaCarousel instance is available as element.bulmaCarousel
        element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
        });
    }
    
    bulmaSlider.attach();
    reload();
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    configure_carousel();

})

function click_button(button_family_name, clicked_button) {
    btns = document.getElementsByClassName(button_family_name);
    for(var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    clicked_button.classList.add('active');
}

var compare_method = 'baseline';
var compare_video = 'waterfalls';
function change_method(ele, method_name) {
    click_button('btn-compare-method', ele);
    compare_method = method_name;

    if(method_name == 'baseline') {
        document.getElementById('method_label').innerHTML = '<b>Baseline</b>';
        document.getElementById('method_desc').innerHTML = 'The baseline method first generates a single SVD video and then perform video 3D reconstruction for training a 4D scene model, leading to many unseen areas and limited free-view synthesis.';
    } else if (method_name == 'second') {
        document.getElementById('method_label').innerHTML = '<b>Without SDEdit quality refinement</b>';
        document.getElementById('method_desc').innerHTML = 'Without a second-time SDEdit by SVD, the Time-Reversal output is blurry, resulting in a lower quality of 4D scene model, particularly in "campfire" example';
    } else if (method_name == 'mask') {
        document.getElementById('method_label').innerHTML = '<b>Without visibility mask</b>';
        document.getElementById('method_desc').innerHTML = 'By explicitly ensuring each part of the scene to be seen by only one video, the blurriness in the trained 4D scene model can be alleviated.';
    } else { // motion embed
        document.getElementById('method_label').innerHTML = '<b>Without motion embedding</b>';
        document.getElementById('method_desc').innerHTML = 'By implicitly handling the multi-video inconsistencies in the embedding space, particularly in the "waterfalls" case.';
    }

    change_comparison_video(0, compare_video);

}



function change_comparison_video(ele, case_name) {
    if(ele == 0) {
        var btns = document.getElementsByClassName('btn-compare-case');
        for(var i = 0; i < btns.length; i++) {
            if(btns[i].innerHTML.includes(case_name)) {
                ele = btns[i];
                break;
            }
        }
    }
    click_button('btn-compare-case', ele);

    nerf_video = case_name;
    var video = document.getElementById('video_method_comparison');
    var source = document.getElementById('source_method_comparison');
    video.pause()
    source.setAttribute('src', 
                        './assets/videos/comparisons/' + case_name + '_' + compare_method + '.mp4')
    video.load();
    video.play();
}

function change_video_gen(ele, case_name) {
    ele_desc = 'video_gen_method_desc';
    ele_label_right = 'label-video-gen-right';
    ele_label_mid = 'label-video-gen-mid'
    ele_label_left = 'label-video-gen-left';
    if(case_name == 'comp_svd') {
        document.getElementById(ele_label_right).innerHTML = '<b>Stable Video Diffusio</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-point-cloud rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = 'Naively applying <a href="https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt">SVD</a> with only the start view results in uncontrollable camera poses.';
    } else if(case_name == 'comp_tr') {
        document.getElementById(ele_label_right).innerHTML = '<b>Time-Reversal</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-point-cloud rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = '<a href="https://time-reversal.github.io/">Time-Reversal</a> ensures start and end view consistency but suffers from blurriness and camera trajectory deviations in the middle frames.';
    } else if(case_name == 'comp_dynamicrafter') {
        document.getElementById(ele_label_right).innerHTML = '<b>DynamiCrafter</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-point-cloud rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = 'The <a href="https://doubiiu.github.io/projects/DynamiCrafter/">DynamiCrafter</a> interpolation model generates a 512x320 video with 16 frames using start- and end-view images as conditions. In contrast, we opt for SVD to produce a higher-resolution video (1024x768) with 25 frames.';
    } else if(case_name == 'comp_motionctrl') {
        document.getElementById(ele_label_right).innerHTML = '<b>MotionCtrl</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-point-cloud rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = '<a href="https://wzhouxiff.github.io/projects/MotionCtrl/">MotionCtrl</a> with 14-frame SVD uses the start-view image and virtual camera trajectory as conditions. However, the generated video may not consistently adhere to the conditioning camera poses.';
    } else if(case_name == 'comp_cameractrl') {
        document.getElementById(ele_label_right).innerHTML = '<b>CameraCtrl</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-point-cloud rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = 'The video generated by <a href="https://hehao13.github.io/projects-CameraCtrl/">CameraCtrl</a> with 25-frame SVD better matches the specified camera trajectory but exhibits minimal scene motion and a resolution of only 576x320.';
    } else if (case_name == 'comp_ours_baseline') {
        document.getElementById(ele_label_right).innerHTML = '<b><a href="https://time-reversal.github.io/">Time-Reversal</a> with SDEdit,<br>conditioned on static-rendering video</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-rendering video with specified trajectory</b>';
        document.getElementById(ele_label_mid).style.display = 'none';
        document.getElementById(ele_desc).innerHTML = 'Using the static scene video as a condition for Time-Reversal in an SDEdit manner encourages following the desired trajectory but yields low-quality results.';
    } else if (case_name == 'comp_tr-sdedit_svd-sdedit') {
        document.getElementById(ele_label_right).innerHTML = '<b>Refine quality by SDEdit with SVD</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-rendering video</b>';
        document.getElementById(ele_label_mid).style.display = 'block';
        document.getElementById(ele_label_mid).innerHTML = '<b>Time-Reversal with SDEdit</b>';
        document.getElementById(ele_desc).innerHTML = 'Applying SDEdit again with only the start view improves quality but causes the deviations of camera poses and appearance in end-views.';
    } else { // motion embed
        document.getElementById(ele_label_right).innerHTML = '<b>End-frame correction</b>';
        document.getElementById(ele_label_left).innerHTML = '<b>Static-rendering video</b>';
        document.getElementById(ele_label_mid).style.display = 'block';
        document.getElementById(ele_label_mid).innerHTML = '<b>Quality refinement by SVD-SDEdit</b>';
        document.getElementById(ele_desc).innerHTML = 'We correct the quality-refined video by applying a smooth transition to the last frames using FILM to match the end view. Our approach generates animated videos with ambient dynamics while respecting the specified camera trajectory.';
    }

    if(ele == 0) {
        var btns = document.getElementsByClassName('btn-compare-video-gen');
        for(var i = 0; i < btns.length; i++) {
            if(btns[i].innerHTML.includes(case_name)) {
                ele = btns[i];
                break;
            }
        }
    }
    click_button('btn-compare-video-gen', ele);

    nerf_video = case_name;
    var video = document.getElementById('video_video_gen_comparison');
    var source = document.getElementById('source_video_gen_comparison');
    video.pause()
    source.setAttribute('src', 
                        './assets/videos/video-generation/' + case_name + '.mp4')
    video.load();
    video.play();

}