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

    $('.product-color-select label ,.shop__sidebar-size label ').on(
        'click',
        function () {
            $(
                '.product-color-select label,.shop__sidebar-size label'
            ).removeClass('active')
            console.log('123')
            $(this).addClass('active')
        }
    );
    $('.option-item.size label').on('click', function (e) {
        $('.option-item.size label').removeClass('active')
        $(this).addClass('active')
        // $('option-item.size label input').removeAttr('checked')
        // $(e.target).attr('checked', true)
    });
    $(' .option-item.color label').on('click', function (e) {
        $('.option-item.color label').removeClass('active')
        $(this).addClass('active')
        // console.log(e.target)
        // $('.option-item.color label input').attr('checked', false)
        // $(e.target).attr('checked', true)
    });

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
        let first = bg.slice(0, 9)
        let last = bg.slice(9)
        // console.log("first->",first)
        // console.log("last->",last)
        // console.log(`url(\\${bg})`);

        $(this).css('background-image', `url(\\${first}\\${last})`)
    })
    $('.tab-content #tabs-1').addClass('active')
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
    $('.quick-view-btn,.js-signin-btn,.js-signup-btn').on(
        'click',
        function (e) {
            e.preventDefault()
        }
    )
    $('.add-cart-btn').on('click', function (e) {
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
    })
    switchBtns.each(function (index, switchBtn) {
        switchBtn.onclick = switchForm
    })
    hiddenModals.each(function (index, hidden) {
        hidden.onclick = hiddenModal
    })

    $('.js-addcart-detail').each(function () {
        var nameProduct = $(this)
            .parent()
            .parent()
            .parent()
            .find('.product-title h6 , .detail-name')
            .html()
        $(this).on('click', function () {
            swal(nameProduct, 'is added to cart !', 'success')
        })
    })
    
    $('.header-cart').css('height', `${window.innerHeight}`)
    $(window).resize(function () {
        $('.header-cart').css('height', `${window.innerHeight}`)
    })

    $('.select2-size.select-size').select2({
        placeholder: 'size',
        // allowClear: true,
        minimumResultsForSearch: Infinity,
    })
    $('.select2-color').select2({
        placeholder: 'color',
        // allowClear: true,
        minimumResultsForSearch: Infinity,
    })

    $('.add-cart-btn').on('click', function () {
        $('.form-add-to-cart').submit()
    })
    var proQty = $('.pro-qty-1')
    proQty.on('click', '.qtybtn-qv', function () {
        var $button = $(this)
        var oldValue = $button.parent().find('input').val()
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1
            } else {
                newVal = 0
            }
        }
        $button.parent().find('input').val(newVal)
    })
    var proQty = $('.pro-qty-2')
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this)
        var oldValue = $button.parent().find('input').val()
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1
            } else {
                newVal = 0
            }
        }
        $button.parent().find('input').val(newVal)
    });
    

    $(document).on('click', '.js-modal-quick-view', function () {
        var dataId = $(this).attr('data-id')
        console.log(dataId)
        $.ajax({
            url: '/products',
            method: 'POST',
            dataType: 'json',
            data: { id: dataId },
            success: function (product) {
                const imgs = product.images
                console.log('imgs', imgs)
                let imgContent = ''
                let html = ''
                for (let i = 0; i < imgs.length; i++) {
                    // const element = imgs[i]
                    console.log('i', i)
                    if (i === 0) {
                        html += `
                        <li class="tab-item active">
                            <a href="#tabs-${i + 1}" class="tab-link">
                                <div class="product-thumb-item set-bg"
                                    data-setbg="${imgs[i].url}" >
                                </div>
                            </a>
                        </li>
                        `
                        imgContent += `
                        <div class="tab-pane active" id="tabs-${i + 1}">
                            <div class="product-img-item">
                                <img src="${imgs[i].url}" alt="">
                            </div>
                        </div>
                        `
                    } else {
                        html += `
                        <li class="tab-item">
                            <a href="#tabs-${i + 1}" class="tab-link">
                                <div class="product-thumb-item set-bg"
                                    data-setbg="${imgs[i].url}" >
                                </div>
                            </a>
                        </li>
                        `
                        imgContent += `
                        <div class="tab-pane" id="tabs-${i + 1}">
                            <div class="product-img-item">
                                <img src="${imgs[i].url}" alt="">
                            </div>
                        </div>
                        `
                    }
                };
                $('.nav.nav-tabs.img-tabs.img-qv').html(html);
                $('.tab-content.img-qv').html(imgContent);
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

                $('.set-bg').each(function () {
                    let bg = $(this).data('setbg')
                    let first = bg.slice(0, 9)
                    let last = bg.slice(9)
                    $(this).css('background-image', `url(\\${first}\\${last})`)
                })
                $('#product-name').text(product.name)
                $('#product-price').text('$' + product.price)
                $('#product-desc').text(product.description)
                const sizes = Array.from(new Set(product.sizes))
                console.log(sizes)
                for (var i = 0; i < product.sizes.length; i++) {
                    var s = `<option value="${product.sizes[i]}" style="padding:0 10px;font-size:16px;">Size ${product.sizes[i]}</option>`
                    $('#product-size').append(s)
                }
                $('.form-add-to-cart').attr(
                    'action',
                    `/cart/add/${product._id}`
                )
                for (var i = 0; i < product.colors.length; i++) {
                    var c = `<option value="${product.colors[i]}" style="padding:0 10px;font-size:16px;">Color ${product.colors[i]}</option>`
                    $('#product-color').append(c)
                }
            },
            error: function (response) {
                alert('server error')
            },
        })
    })

    $('.set-bg').each(function () {
        let bg = $(this).data('setbg')
        let first = bg.slice(0, 9)
        let last = bg.slice(9)
        $(this).css('background-image', `url(\\${first}\\${last})`)
    })
    $('.tab-item').each(function (index, tab) {
        const pane = $('.tab-pane')[index]
        tab.onclick = function (e) {
            e.preventDefault()
            $('.tab-item.active').removeClass('active')
            $('.tab-pane.active').removeClass('active')
            $(this).addClass('active')
            $(pane).addClass('active')
        }
    });


})
