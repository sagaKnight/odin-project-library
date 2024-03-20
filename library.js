const myLibrary = [];
const addBookBtn = document.querySelector(".addBook");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("dialog button");
const libraryDiv = document.querySelector(".library");

function Book(name, author, totalPages, status) {
  this.name = name;
  this.author = author;
  this.totalPages = totalPages;
  this.status = status;
  this.value = [name, author, totalPages, status];
}

let bookHarryPotter = new Book("Harry Potter and the Philosopher's Stone","J. K. Rowling","352","Read");
let book1984 = new Book("1984", "George Orwell", "328", "Wishlisted");
let bookKafka = new Book("Kafka on the Shore", "Haruki Murakami", "480", "TBR");

addBookToLibrary(bookHarryPotter);
addBookToLibrary(book1984);
addBookToLibrary(bookKafka);

myLibrary.forEach((book) => {
  printOut(book);
});

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteItem(e) {
  e.parentElement.remove();
}

function changeStatus(e) {
  const breakpoint = ","
  const split = e.previousSibling.previousSibling.textContent.split(breakpoint);
  if (split[3] != "Read") {
    split[3] = "Read"
  } else {
    split[3] = "Unread"
  }
  e.previousSibling.previousSibling.textContent = split.toString();
}

function printOut(book) {
  let paragraphElemBook = document.createElement("p");
  let bookBorder = document.createElement("div");
  bookBorder.classList.add("bookBorder");

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("deleteBtn");

  let editBtn = document.createElement("button");
  editBtn.textContent = "read/unread";
  editBtn.classList.add("editBtn");

  bookBorder.appendChild(paragraphElemBook);
  bookBorder.appendChild(deleteBtn);
  bookBorder.appendChild(editBtn);
  paragraphElemBook.textContent = book.value.toString();
  libraryDiv.appendChild(bookBorder);

  deleteBtn.addEventListener("click", function () {
    deleteItem(this);
  });

  editBtn.addEventListener("click", function () {
    changeStatus(this);
  })
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").value;
  let newBook = new Book(title, author, pages, status);
  addBookToLibrary(newBook);
  printOut(newBook);
  dialog.close();
});
