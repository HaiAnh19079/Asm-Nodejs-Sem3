$(document).ready(function () {
    $(document).on('click', '#show-modal-qv', function () {
        var dataId = $(this).attr('data-id')
        $.ajax({
            url: '/products',
            method: 'POST',
            dataType: 'json',
            data: { id: dataId },
            success: function (product) {
                $('.img-modal').attr('src', `${product.image[0]}`)
                $('.img-modal').attr('data-thumb', `${product.image[0]}`)
                $('#product-name').text(product.name)
                $('#product-price').text('$' + product.price)
                $('#product-desc').text(product.description)
                for (var i = 0; i < product.size.length; i++) {
                    var s = `<option>Size ${product.size[i]}</option>`
                    $('#product-size').append(s)
                }
                for (var i = 0; i < product.color.length; i++) {
                    var c = `<option>${product.color[i]}</option>`
                    $('#product-color').append(c)
                }
            },
            error: function (response) {
                alert('server error')
            },
        })
    })

    //select2---------------------------------------------------------------
    $('.select2-multiple-gender').select2({
        placeholder: 'gender',
        allowClear: true,
        // tags: true,
    })
    $('.select2-multiple-category').select2({
        placeholder: 'category',
        allowClear: true,
        // tags: true,
        minimumResultsForSearch: Infinity,
    })

    $('.select2-multiple-size').select2({
        placeholder: 'size',
        multiple: true,
        allowClear: true,
        tags: true,
        minimumResultsForSearch: Infinity,
    })

    $('.select2-multiple-color').select2({
        placeholder: 'color',
        tags:true,
        allowClear: true,
        minimumResultsForSearch: Infinity,
    })
})
