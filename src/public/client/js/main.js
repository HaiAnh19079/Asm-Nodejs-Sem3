$(document).ready(function () {
    // Instantiate MixItUp:
    $('.filter__buttons li').on('click', function () {
        $('.filter__buttons li').removeClass('active')
        $(this).addClass('active')
    })
    if ($('.product__filter').length > 0) {
        var containerEl = document.querySelector('.product__filter')
        var mixer = mixitup(containerEl)
    }

    $(
        '.product-color-select label ,.shop__sidebar-size label,.option-item label'
    ).on('click', function () {
        $(
            '.product-color-select label,.shop__sidebar-size label , .option-item label'
        ).removeClass('active')
        $(this).addClass('active')
    })

    //shop pagination active
    $('.js-shop__product-pagination a').on('click', function (e) {
        e.preventDefault()
        $('.js-shop__product-pagination a').removeClass('active')
        $(this).addClass('active')
    })

    /*------------------
    Background Set
    --------------------*/
    $('.set-bg').each(function () {
        let bg = $(this).data('setbg')
        // console.log(this)
        // console.log(bg)
        let first = bg.slice(0,9)
        let last = bg.slice(9)
        // console.log("first->",first)
        // console.log("last->",last)
        // console.log(`url(\\${bg})`);
        
        $(this).css('background-image', `url(\\${first}\\${last})`)
    })

    $('.label-color').each(function () {
        var color = $(this).attr('for')
        $(this).css('background-color', `${color}`)
    })

    //select color active
    $('.label-color').on('click', function (e) {
        $('.label-color').removeClass('active')
        $(this).addClass('active')
    })

    //tab img product detail

    $('.tab-item').each(function (index, tab) {
        const pane = $('.tab-pane')[index]

        tab.onclick = function (e) {
            e.preventDefault()
            $('.tab-item.active').removeClass('active')
            $('.tab-pane.active').removeClass('active')

            $(this).addClass('active')
            $(pane).addClass('active')
        }
    })
    $('.quick-view-btn').on('click', function (e) {
        e.preventDefault()
    })
    // switch modal login - logout

    const modal = $('.js-modal')
    const btnShowModals = $('.js-show-modal')
    const switchBtns = $('.auth-form__switch-btn')
    const hiddenModals = $('.js-hidden-modal')
    const signInForm = $('.form-signin')
    const signUpForm = $('.form-signup')
    const cartModal = $('.modal-cart')
    const modalQuickView = $('.modal-quick-view')

    function hiddenModal() {
        modal.removeClass('show')
        if (signInForm.hasClass('show')) {
            signInForm.removeClass('show')
        }
        if (signUpForm.hasClass('show')) {
            signUpForm.removeClass('show')
        }
        if (modalQuickView.hasClass('show')) {
            modalQuickView.removeClass('show')
        }
        if (cartModal.hasClass('show')) {
            cartModal.removeClass('show')
        }
    }
    function switchForm() {
        if (signInForm.hasClass('show')) {
            signUpForm.addClass('show')
            signInForm.removeClass('show')
        } else {
            signUpForm.removeClass('show')
            signInForm.addClass('show')
        }
    }

    function openModal() {
        if ($(this).hasClass('js-signup-btn')) {
            modal.addClass('show')
            signUpForm.addClass('show')
        }
        if ($(this).hasClass('js-signin-btn')) {
            modal.addClass('show')
            signInForm.addClass('show')
        }

        if ($(this).hasClass('js-modal-quick-view')) {
            modal.addClass('show')
            modalQuickView.addClass('show')
        }

        if ($(this).hasClass('js-modal-cart')) {
            console.log($(this))
            modal.addClass('show')
            cartModal.addClass('show')
        }
    }

    btnShowModals.each(function (index, btnShow) {
        btnShow.onclick = openModal
    });

    switchBtns.each(function (index, switchBtn) {
        switchBtn.onclick = switchForm
    });

    hiddenModals.each(function (index, hidden) {
        hidden.onclick = hiddenModal
    });


    $('.js-addcart-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.product-title h6 , .detail-name').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to cart !", "success");
        });
    });
    // var windowH = $(window).height();
    // $('.header-cart').css('height',`${windowH}`)
    // window.onresize = ()=> $('.header-cart').css('height',`${windowH}`)
    $('.header-cart').css('height',`${window.innerHeight}`)
    $(window).resize(function(){
        $('.header-cart').css('height',`${window.innerHeight}`)
      });




    $(document).on('click', '.js-modal-quick-view', function() {
        var dataId = $(this).attr("data-id");
        console.log(dataId);
        $.ajax({
            url: '/products',
            method: 'POST',
            dataType: 'json',
            data: { id: dataId },
            success: function(product) {
                const imgs = product
                console.log(imgs)
                // $('.img-modal').attr('src', `${product.image[0]}`)
                // $('.img-modal').attr('data-thumb', `${product.image[0]}`)
                $('#product-name').text(product.name)
                $('#product-price').text('$' + product.price)
                $('#product-desc').text(product.description)
                // for (var i = 0; i < product.size.length; i++) {
                //     var s = `<option>Size ${product.size[i]}</option>`
                //     $('#product-size').append(s)
                // }
                // for (var i = 0; i < product.color.length; i++) {
                //     var c = `<option>${product.color[i]}</option>`
                //     $('#product-color').append(c)
                // }
            },
            error: function(response) {
                alert('server error')
            }
        });
    });
})
