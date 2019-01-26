let myLibrary = []

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}
let book1 = new Book("The Fellowship Of The Rings","J.R.R Tolkien","746",false)
let book2 = new Book("A Game of Thrones","George R.R Martin","691",true)
myLibrary.push(book1)
myLibrary.push(book2)

let addButton = document.querySelector('.addbook')

function addBookToLibrary(book) {
    myLibrary.push(book)

}
let render = function(template, node) {
    let classname = node.className
    $("." + classname).append(template)
}
let populate = function(){
    $(".example-book").remove();
    myLibrary.map(x => render(renderTemplate(x),document.querySelector(".library")))
    let deleteButton = document.querySelectorAll('.deletebutton')
    deleteButton.forEach(x => x.addEventListener('click',function(){
        myLibrary.splice(x.id,1);
        populate();
    }))
}
let renderTemplate = (book) =>{
    let checked = ''
    if(book.read === true){
        checked = "checked";
    }
    return`
        <div class="example-book">
            <p>${book.name}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" ${checked}>
            <label class="form-check-label" for="defaultCheck1">
                Read
            </label>
            </div> 
            <button type="button" id="${myLibrary.indexOf(book)}" class="btn btn-danger deletebutton">x</button>
        </div>
`}
addButton.addEventListener('click',function(){
    let check = false; 
    if($(".checkread:checked").length === 1){
        check = true
    }
    let addbook = new Book($(".title").val(),$(".author").val(),$(".pages").val(),check)
    myLibrary.push(addbook)
    populate()
    $(".title").val('')
    $(".author").val('')
    $(".pages").val('')
    $(".checkread").prop('checked',false);
    $(document).ready(function() {
        $('.alert').show()
        setTimeout(function() {
            $('.alert').hide();
        },2000);
    });
})

populate();