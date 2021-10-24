$(document).ready(() => {
    AOS.init();
});
$(document).ready(() => {
    $(function() {
        // on recupere la position du bloc par rapport au haut du site
        var position = $("#scroll").offset().top;
        // au scroll dans la fenetre on déclenche la fonction
        $(window).scroll(function () {
            // si on a defile de plus de 150px du haut vers le bas
            if ($(this).scrollTop() > position) {
                // on ajoute la classe "fix" a id="scroll"
                $('#scroll').addClass("fix");
            } else {
                // sinon on retire la classe "fix" a id="scroll"
                $('#scroll').removeClass("fix");
            }
        });
    });
});
let modalId = $('.modal');
$(document).ready(function () {
    loadGallery(true, 'a');
    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image').show();
        if (counter_max === counter_current) {
            $('#show-next-image').hide();
        } else if (counter_current === 1) {
            $('#show-previous-image').hide();
        }
    }
    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */
    function loadGallery(setIDs, setClickAttr) {
        let current_image,
        selector,
        counter = 0;
        $('#show-next-image, #show-previous-image').click(function () {
            if ($(this).attr('id') === 'show-previous-image') {
                current_image--;
            } else {
                current_image++;
            }
            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });
    function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('.modal-title').text($sel.data('title'));
        $('.modal-body .img-fluid').attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
    }
    if (setIDs == true) {
        $('[data-image-id]').each(function () {
            counter++;
            $(this).attr('data-image-id', counter);
        });
    }
    $(setClickAttr).on('click', function () {
        updateGallery($(this));
    });
    }
});
$(document)
    .keydown(function (e) {
    switch (e.which) {
        case 37: // gauche
            if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                $('#show-previous-image').click();
            }
        break;
        case 39: // droite
            if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                $('#show-next-image').click();
        }
        break;
        default:
        return;
    }
    e.preventDefault();
});