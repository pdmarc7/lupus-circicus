$(function(){
    var hostname = location.origin;

    $.getJSON(`${hostname}/site_index.json`, function(data){
        navIndex = data[0]
        console.log(navIndex)
    });

    $('.categories-link').on('click', function(event){
        var category = $(this).text().toLowerCase()

        var categoryArticles = [];
        var hostname = location.origin;

        for (const index of navIndex[category]){
                categoryArticles.push(`
                    <p class='mb-0'><a href="${hostname+'/'+index['url']}">${index['title']}</a></p>
                    <p class='mb-0'>${index['date_published']}</p>
                    <p class="text-secondary">${index['description'].slice(0, 200)}...</p>
                `)
            }

        $('#categoriesModalLabel').text($(this).text())
        $('#categoriesModalBody').empty().append(categoryArticles)
        $('#categoriesModal').modal('show')
    })
})