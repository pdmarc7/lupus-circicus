$(function(){
    $.getJSON('/site_index_uncategorized.json', function(data){
        articlesIndex = data
    });

    $('#searchModalCloseBtn').on('click', function(event){
        console.log(event)
        $('#searchModalInput').val("");
    });

    $('#searchModalButton').on('click', function(event){
        event.preventDefault();
        var searchQuery = $('#searchModalInput').val();
        
        if (searchQuery == ''){
            $('#searchModalBody').empty().append(
                `<p class="mt-3">What exactly are you searching for? 🤔</p>`
            )
        } else {
            var searchResults = [];
            var hostname = location.origin;

            for (const index of articlesIndex){
                if (index['title'].toLowerCase().includes(searchQuery.toLowerCase()) || index['description'].toLowerCase().includes(searchQuery.toLowerCase())){
                    searchResults.push(`
                        <p class='mb-0'><a href="${hostname+'/'+index['url']}">${index['title']}</a></p>
                        <p class='mb-0'>${index['date_published']}</p>
                        <p class="text-secondary">${index['description'].slice(0, 200)}...</p>
                    `)
                }
            };

            if (searchResults.length > 0){
                $('#searchModalBody').empty().append(searchResults)
            } else {
                $('#searchModalBody').empty().append(`
                    <p class="mt-3">No results found 🤷‍♂️</p>
                `)
            }

        };

        $('#searchModal').modal('show');
    });
})