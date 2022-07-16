






// $(document).ready(function() {

//     $(document).on('click', '#show-modal-qv', function() {
//         var dataId = $(this).attr("data-id");
//         $.ajax({
//             url: '/products',
//             method: 'POST',
//             dataType: 'json',
//             data: { id: dataId },
//             success: function(product) {
//                 $('.img-modal').attr('src', `${product.image[0]}`)
//                 $('.img-modal').attr('data-thumb', `${product.image[0]}`)
//                 $('#product-name').text(product.name)
//                 $('#product-price').text('$' + product.price)
//                 $('#product-desc').text(product.description)
//                 for (var i = 0; i < product.size.length; i++) {
//                     var s = `<option>Size ${product.size[i]}</option>`
//                     $('#product-size').append(s)
//                 }
//                 for (var i = 0; i < product.color.length; i++) {
//                     var c = `<option>${product.color[i]}</option>`
//                     $('#product-color').append(c)
//                 }
//             },
//             error: function(response) {
//                 alert('server error')
//             }
//         });
//     });

//     $(document).on('click', '#submitCreateForm', function() {
//         const $ = document.querySelector.bind(document)
//         const $$ = document.querySelectorAll.bind(document)

//         const selectElement = $('.chosenselect')
//         const selectOptions = $$('.chosenselect option')
//         const select = $('#select')
//         var new_arr = [];
//         var values = [];
//         selectOptions.forEach(option => {
//             option.onclick = () => {
//                 if (option.getAttribute('selected') == 'true') {
//                     option.removeAttribute('selected');
//                     const valueToRemove = option.value;
//                     new_arr = values.filter(item => item !== valueToRemove);
//                     values = new_arr;
//                     option.style.color = 'black'
//                 } else {
//                     var valueoption = option.value
//                     option.setAttribute('selected', true);
//                     values.push(valueoption);
//                     option.style.color = '#ccc'
//                 }
//                 var selected = $$('option[selected="true"]')
//                 select.innerHTML += ""
//                 if (selected.length < 1) {
//                     select.innerHTML = 'select'
//                 }
//                 selected.forEach((function(sel) {
//                     if (sel) {
//                         select.innerHTML = values.join('  ')
//                     } else {
//                         select.innerHTML = values.join('  ')
//                     }
//                 }))
//                 $.ajax({
//                     url: '/create',
//                     method: 'POST',
//                     dataType: 'json',
//                     data: { color: values },
//                     success: function(data) {
//                         alert('Success', data)
//                     },
//                     error: function(response) {
//                         alert('server error')
//                     }
//                 });
//             };
//         });
//         // $.ajax({
//         //     url: '/create',
//         //     method: 'POST',
//         //     dataType: 'json',
//         //     data: { color: values },
//         //     success: function(data) {
//         //         alert('Success', data)
//         //     },
//         //     error: function(response) {
//         //         alert('server error')
//         //     }
//         // });
//     });

// });