const myLibrary = [];

function Book(author ,title,numberofpages, read) {
  this.author=author;
  this.title=title;
  this.numberofpages=numberofpages;
  this.read=read;
  this.id=crypto.randomUUID();
}

Book.prototype.togglestat = function(){
  this.read=!this.read;
}

document.addEventListener("click", function(event) {
    // Find the button that was clicked
    const clickedButton = event.target.closest("#readstat");
    if (clickedButton) {
      // Find the containing book element
      const anchorTag = clickedButton.closest("[data-id]");
        
      if (anchorTag) {
        const bookId = anchorTag.dataset.bookId;
        
        // Find and toggle the book's read status
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === bookId) {
                myLibrary[i].togglestat(); // Toggle the read status
                break;
            }
        }// Find the specific read status display within this book container
        const statusDisplay = anchorTag.querySelector("#readstat");
        
        if (statusDisplay) {  // Update the text based on the new status
          if (statusDisplay.textContent === "Not read") {
            statusDisplay.textContent = "Read";
          } 
          else {
            statusDisplay.textContent = "Not read";
          }
        }
      }
    }
});


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

const addbookbutton= document.getElementById("addbookbutton") ;

addbookbutton.addEventListener("click" ,function() {

  let creationdiv=document.getElementById("newbookdiv");

  if(!creationdiv) { //if the div doesn't exist
    const creationdiv =document.createElement("div");
    creationdiv.id="newbookdiv";
    creationdiv.className= "w-[50vw] max-w-[100vw] mx-auto bg-gray-200 mb-7 mt-7 py-7 rounded-md flex flex-col justify-center items-center";
    const form=document.createElement("newbookform");
    form.innerHTML=`
      <form class="max-w-sm mx-auto">
        <div class="mb-6 px-5 lg:px-0 ">
          <label for="Title" class="block mb-2.5 text-sm font-medium text-heading">Title</label>
          <input type="Title" id="Title" class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full py-2.5 px-20 shadow-xs placeholder:text-body" placeholder="-Enter the title of the book-" required />
        </div>
        <div class="mb-6 px-5 lg:px-0 ">
          <label for="Author" class="block mb-2.5 text-sm font-medium text-heading">Author</label>
          <input type="Author" id="Author" class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full py-2.5 px-20 shadow-xs  placeholder:text-body" placeholder="-Enter the name of the Author-" required />
        </div>
        <div class="mb-6 px-5 lg:px-0 ">
          <label for="Numberofpages" class="block mb-2.5 text-sm font-medium text-heading">Number of pages</label>
          <input type="Numberofpages" id="Numberofpages" class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full py-2.5 px-20 shadow-xs  placeholder:text-center" placeholder="-Enter the number of pages-" required />
        </div>
        <button id="cancelbutton" class="relative ml-4 mb-4  bg-gray-600 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">Cancel</button>
        <button id="createbutton" type="submit" class="relative ml-4 mb-4  bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>
    `;
    creationdiv.appendChild(form);
    addbookbutton.parentNode.insertBefore(creationdiv, addbookbutton.nextSibling);

    const cancelbutton = document.getElementById("cancelbutton");

    cancelbutton.addEventListener("click", function() {
      creationdiv.remove();
    })

    const createbutton = document.getElementById("createbutton");
    const bookgrid = document.getElementById("bookgrid");

    createbutton.addEventListener("click",function() {
      const Title= document.getElementById("Title").value;
      const Author= document.getElementById("Author").value;
      const Numberofpages= document.getElementById("Numberofpages").value;
      const read= false;

      addBookToLibrary(Author,Title,Numberofpages,read);
      creationdiv.remove();
      
      const newbook= new Book(Author,Title,Numberofpages,read);
      const newbookdiv=document.createElement("newbkdiv");

      bookgrid.innerHTML+=`
      <a data-id="book" data-book-id="${myLibrary.length - 1} href="#" class="mt-6 h-[45vh] lg:h-[55vh] lg:w-[25vw] xl:w-[20vw] w-[50vw] md:w-[30vw] group relative block bg-black">
        <img alt="" src="images/21TsZ14+iBL._AC_UF1000,1000_QL80_.jpg" class="absolute inset-0 h-full w-full opacity-75 transition-opacity group-hover:opacity-50">
        <div class="relative p-4 sm:p-6 lg:p-8">
          <p class="text-xl font-bold text-white sm:text-2xl">
            ${Title}
          </p>
          <button id="removebutton" class="mt-4 -ml-px rounded-r-sm border border-gray-200 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white dark:focus:ring-offset-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
            </svg>
          </button>
          <button id="readstat" class="bg-white hover:bg-gray-100 text-gray-800 ml-2 h-10 font-semibold py-2 px-3 border border-gray-400 rounded shadow focus:outline-none focus:shadow-outline">
            Not read
          </button> 
          <div class="mt-32 sm:mt-48 lg:mt-64">
            <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p class="text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic
                asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                Repudiandae?
              </p>
            </div>
          </div>
        </div>
      </a>
      `;
    }) 

  }
  cancelbutton.addEventListener("click", function() {
    creationdiv.remove();
  })

  const createbutton = document.getElementById("createbutton");
  const bookgrid = document.getElementById("bookgrid");

  createbutton.addEventListener("click",function() {
    const Title= document.getElementById("Title").value;
    const Author= document.getElementById("Author").value;
    const Numberofpages= document.getElementById("Numberofpages").value;
    const read= false;

    addBookToLibrary(Author,Title,Numberofpages,read);
    creationdiv.remove();
    
    const newbook= new Book(Author,Title,Numberofpages,read);
    const newbookdiv=document.createElement("newbkdiv");

    bookgrid.innerHTML+=`
    <a href="#" class="mt-6 h-[45vh] lg:h-[55vh] lg:w-[25vw] xl:w-[20vw] w-[50vw] md:w-[30vw] group relative block bg-black">
      <img alt="" src="images/21TsZ14+iBL._AC_UF1000,1000_QL80_.jpg" class="absolute inset-0 h-full w-full opacity-75 transition-opacity group-hover:opacity-50">
      <div class="relative p-4 sm:p-6 lg:p-8">
        <p class="text-xl font-bold text-white sm:text-2xl">
          ${Title}
        </p>
        <button id="removebutton" class="mt-4 -ml-px rounded-r-sm border border-gray-200 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white dark:focus:ring-offset-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
          </svg>
        </button>
        <div class="mt-32 sm:mt-48 lg:mt-64">
          <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p class="text-sm text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic
              asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
              Repudiandae?
            </p>
          </div>
        </div>
      </div>
    </a>
    `;
  })
})

const a=document.querySelectorAll("[data-id]");
for (i=0;i<myLibrary.length;i++) {
  a[i].dataset.bookId=myLibrary[i].id; //assign each book an id
}

document.addEventListener("click",function(event){
  //only check for remove button clicks
  const removeButton=event.target.closest("button");
  if(removeButton && removeButton.innerHTML.includes("svg")){
    const anchorTag=event.target.closest(('[data-id]'));
    if(anchorTag){
      const bookId= anchorTag.dataset.bookId;
      removeBookFromLibrary(bookId);
      anchorTag.classList.add("hidden");
    }
  }
})

function removeBookFromLibrary(ID) {
  for (var i=0 ; i<myLibrary.length ;i++) {
    if(myLibrary[i].id==ID) {
      myLibrary.splice(i,1);
      break;
    }
  }
}








