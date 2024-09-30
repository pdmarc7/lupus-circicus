$(function(){

    $('.categories-link').on('click', function(event){
        var category = $(this).text().toLowerCase()

        var categoryArticles = [];
        var hostname = location.origin;

        for (const index of siteIndex[category]){
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

    $.getJSON('/site_index.json', function(data){
        siteIndex = data[0]

        for (const topic of ['technology', 'politics', 'climate']){
            for (const index of siteIndex[topic].slice(0, 5)){
                $(`#${topic}-articles`).append(articleCol4Card(index))
            }
        }

    });

    function articleCol4Card(articleObject){
        return `                    
        <div class="col-md-4 mb-4">
            <div class="card w-100 shadow">
                <img src="${articleObject.top_image}" class="card-img-top rounded-0" alt="..." style="object-fit: cover; height: 240px;">
                <div class="card-body border-white">
                    <a href="${articleObject.url}" class='title-link'><h5 class="card-title mb-2">${articleObject.title}</h5></a>
                    <h6 class="card-subtitle mb-2 text-muted">${articleObject.date_published}</h6>
                    <p class="card-text">${articleObject.description}</p>
                    <div class="d-flex justify-content-center">
                        <a href="${articleObject.url}" class="card-link btn btn-dark" style="width: 200px">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    `
    }
})
