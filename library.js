const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read == true) {
    this.read = "read"
  } else {
    this.read = "not read"
  }

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function printLibrary() {
  for (let book of myLibrary) {
    const newBookDiv = document.createElement("div");
    const newTitle = document.createTextNode(book.title);
    newBookDiv.appendChild(newTitle);
    const libraryDiv = document.getElementById("library-content");
    console.log(libraryDiv);
    libraryDiv.appendChild(newBookDiv);
  }
}

showButton.addEventListener("click", () => {
  dialog.showModal();
})

closeButton.addEventListener("click", () => {
  dialog.close();
})

const mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, false);
const gatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

addBookToLibrary(mockingbird);
addBookToLibrary(harryPotter);
addBookToLibrary(gatsby);

printLibrary();

