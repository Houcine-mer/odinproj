const myLibrary = [];

function Book(author ,title,numberofpages, read) {
  this.author=author;
  this.title=title;
  this.numberofpages=numberofpages;
  this.read=read;
  this.id=crypto.randomUUID();

  this.status= function() {
    return (this.read == true) ? "Yes" : "No";
  }
}

function addBookToLibrary(author,title,numberofpages,read) {
  const bk = new Book(author,title,numberofpages,read);
  myLibrary.push(bk);
}

function Displaybooks() {
  for (var i=0 ; i<myLibrary.length ;i++ ) {
    console.log(myLibrary[i].title);
    console.log("Author: " + myLibrary[i].author);
    console.log("Pages: " + myLibrary[i].numberofpages);
    console.log("Read: " + myLibrary[i].status());
  }
}


const button = do





