'use strict';

export default class userCtrl {
    constructor($sce) {
        this.$sce = $sce;
    }
    $onInit() {
        this.config = {
            sources: [
                {src: this.$sce.trustAsResourceUrl('http://localhost:3000/enterprise/fetch/SampleVideo_1280x720_10mb.mp4'), type: 'video/mp4'}
            ],
            tracks: [
                {
                    src: 'http://www.videogular.com/assets/subs/pale-blue-dot.vtt',
                    kind: 'subtitles',
                    srclang: 'en',
                    label: 'English',
                    default: ''
                }
            ],
            theme: {
                url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
            },
            plugins: {
                poster: 'http://www.videogular.com/assets/images/videogular.png',
                controls: {
                    autoHide: false,
                    autoHideTime: 3000
                }
            }
        };
        console.log('User Ctrl is initialized');
    }

    logout() {
        // this.loginService.logout()  
        //TODO: delete the cookie or delete the session.
        this.state.go('home');
    }
}

userCtrl.$inject = ['$sce'];

jQuery(document).ready(function($) {
 
    $('#myCarousel').carousel({
            interval: 5000
    });

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
    var id_selector = $(this).attr("id");
    try {
        var id = /-(\d+)$/.exec(id_selector)[1];
        console.log(id_selector, id);
        jQuery('#myCarousel').carousel(parseInt(id));
    } catch (e) {
        console.log('Regex failed!', e);
    }
});
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
             var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
    });
});