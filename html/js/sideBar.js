let curCategory = ""; 
let tags = []
localStorage.setItem('page', 1)
document.addEventListener("DOMContentLoaded", function() {
    let categoryLinks = document.querySelectorAll("#categoryList a");
    let tagLinks = document.querySelectorAll("#tagList a");
    
    categoryLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let categoryName = this.getAttribute("name");
            for (let i = 0; i < categoryLinks.length; i++) {
                if (categoryLinks[i].getAttribute("name") === curCategory) {
                    categoryLinks[i].classList.remove("font-weight-bold");
                }
            }
            this.classList.add("font-weight-bold");
            curCategory = categoryName
            // console.log(categoryName)
        });
        
    });
    tagLinks.forEach(function(tag) {
        tag.addEventListener("click", function(event) {
            event.preventDefault();
            let tagName = this.getAttribute("name");
            let index = tags.indexOf(tagName);

            if (index === -1) {
                tags.push(tagName);
            } else {
                tags.splice(index, 1);
            }
            tag.classList.toggle("font-weight-bold", index === -1);
            // console.log(tags);
        });
    });
});
function process(event) {
    event.preventDefault();
    
    const searchValue = document.querySelector('input[name="search"]').value;

    let qCategory = curCategory
    let qTags = tags.join(',');
    console.log("HHHH")
    console.log(qCategory, qTags)

    // Tạo URL mới với các tham số curCategory, tags và search
    const page = localStorage.getItem('page')
    let Url = `/blogs?page=${page}`
    if (searchValue.trim() != "" || qCategory != "" || qTags != "") {
        if (searchValue.trim() != "") Url += `search=${searchValue}`;
        if (qCategory != "") Url += `&category=${qCategory}`
        
        if (qTags != "") Url += `&tags=${qTags}` 
    }
    // Chuyển hướng đến URL mới
    window.location.href = Url;
}
function processPage(newPage, event) {
    event.preventDefault()
    const url = window.location.href
    console.log(url.substring(34))
    if (newPage == "prev") {
        let page = localStorage.getItem('page')
        let nPage = parstInt(page)
        if (page != 0) {
            nPage --
            localStorage.setItem('page', parstInt(nPage))
        } 
        // console.log(page)
        let newUrl = `/blogs?page=${nPage}` + url.substring(34)
        // console.log(newUrl)
        window.location.href = newUrl
        return
    }
    if (newPage == "next")  {
        let page = localStorage.getItem('page')
        let nPage = parstInt(page)
        if (page != 3) {
            nPage ++
            localStorage.setItem('page', parstInt(nPage))
        } 
        let newUrl = `/blogs?page=${nPage}` + url.substring(34)
        window.location.href = newUrl
        return;
    }
    localStorage.setItem('page', parseInt(newPage))
    let newUrl = `/blogs?page=${newPage}` + url.substring(34)
    window.location.href = newUrl

}