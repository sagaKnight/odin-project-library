const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog > button");
const form = document.querySelector("form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read === "read") {
    this.read = "read";
  } else {
    this.read = "not read";
  }

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function checkLibrary(book) {
  for (let div of document.querySelectorAll("#library-content div")) {
    if (div.innerHTML === book.title) {
      return true
    } else {
      continue
    }
  }
}

function printLibrary() {
  for (let book of myLibrary) {
    if (!checkLibrary(book)) {
    const newBookDiv = document.createElement("div");
    const newTitle = document.createTextNode(book.title);
    newBookDiv.appendChild(newTitle);
    const libraryDiv = document.getElementById("library-content");
    libraryDiv.appendChild(newBookDiv);
    }
  }
}

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

form.onsubmit = function (e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const newBook = new Book(title, author, pages, status);
  e.preventDefault();
  addBookToLibrary(newBook);
  console.log(newBook);
  printLibrary();
};

const mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const harryPotter = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  309,
  false
);
const gatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

addBookToLibrary(mockingbird);
addBookToLibrary(harryPotter);
addBookToLibrary(gatsby);

printLibrary();
