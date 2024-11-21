const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector(".closeBtn");
const form = document.querySelector("form");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (status === "read") {
    this.status = "read";
  } else {
    this.status = "not read";
  }

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.status}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function checkLibrary(book) {
  for (let bookTitle of document.querySelectorAll("#library-content div h3")) {
    if (bookTitle.textContent === book.title) {
      return true;
    } else {
      continue;
    }
  }
}

function deleteBook(bookNum) {
  document.querySelector(`div[book-num="${bookNum}"]`).remove();
}

function changeStatus(bookNum) {
  let status = document.querySelector(`div[book-num="${bookNum}"] p`);
  if (status.textContent === "read") {
    status.textContent = "not read";
  } else {
    status.textContent = "read";
  }
}

function createBookDiv(book, bookNum) {
  const newBookDiv = document.createElement("div");
  const newTitle = document.createElement("h3");
  const newStatus = document.createElement("p");
  newTitle.textContent = book.title;
  newStatus.textContent = book.status;

  const newCloseBtn = document.createElement("button");
  newCloseBtn.classList.add("closeBtn");
  newCloseBtn.textContent = "x";
  newCloseBtn.addEventListener("click", () => deleteBook(bookNum));

  const newStatusBtn = document.createElement("button");
  newStatusBtn.classList.add("statusBtn");
  newStatusBtn.textContent = "";
  newStatusBtn.addEventListener("click", () => changeStatus(bookNum));

  newBookDiv.appendChild(newTitle);
  newBookDiv.appendChild(newStatus);
  newBookDiv.appendChild(newCloseBtn);
  newBookDiv.appendChild(newStatusBtn);
  newBookDiv.setAttribute("book-num", bookNum);

  return newBookDiv;
}


function printLibrary() {
  const libraryDiv = document.getElementById("library-content");
  for (let [bookNum, book] of myLibrary.entries()) {
      if (!checkLibrary(book)) {
          const newBookDiv = createBookDiv(book, bookNum);
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
  printLibrary();
  form.reset();
  dialog.close();
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
