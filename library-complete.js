'use strict';

var booooooks = ['Book of the Dead','Amduat','Spell of the Twelve Caves','The Book of Gates','Book of the Netherworld','Book of Caverns','Book of the Earth','Litany of Re','Book of the Heavens','The History of Little Henry and his Bearer (1814)','The History of the Fairchild Family (3 volumes, 1818, 1842, 1847)','The History of Henry Milner (1822-1837)','Mr Midshipman Easy (1836)','Masterman Ready, or the Wreck of the Pacific (1841)','The Settlers in Canada (1844)','The Children of the New Forest (1847)','Hudson Bay; or, Everyday Life in the Wilds of North America (1848)','The King of the Golden River (1851)'];

function Book(title) {
  this.title = title;
  this.shelf = null;
  this.enshelf = function (shelf) {
    this.unshelf();
    shelf.addBook(this);
  };
  this.unshelf = function () {
    if (this.shelf) {
      this.shelf.removeBook(this);
    }
    return this;
  };
}

function Shelf(location) {
  this.location = location;
  this.books = [];
}

Shelf.prototype = {
  constructor: Shelf,

  book: function(id) {
    if (id >= this.books.length) {
      return 'Not that many books exist on this shelf, man';
    } else {
      return this.books[id];
    }
  },
  removeBook: function(book) {
    for (var i = 0; i < this.books.length; i++) {
      if (book.title === this.books[i].title) {
        this.books.splice([i],1);
        book.shelf = null;
      }
    }
  },
  addBook: function(book) {
    this.books.push(book);
    book.shelf = this;
  }
};

function Library(shelves) {
  // Create shelves
  this.shelves = [];
  for (var i = 0; i < shelves; i++) {
    this.shelves.push(new Shelf(i + 1));
  }

  // Populate library
  for (i = 0; i < booooooks.length; i++) {
    var currShelf = this.getRandomShelf();
    var newBook = new Book(booooooks[i]);
    currShelf.books.push(newBook);
    newBook.shelf = currShelf;
  }

}

Library.prototype = {
  constructor: Library,

  getRandomShelf: function() {
    var i = Math.floor(Math.random() * this.shelves.length);
    return this.shelves[i];
  },
  shelf: function(location) {
    if (location >= this.shelves.length) {
      return 'Not that many shelves exist, man';
    } else {
      return this.shelves[location];
    }
  },
  allBooks: function() {
    var allBooks = [];
    for (var i = 0; i < this.shelves.length; i++) {
      var books = this.shelves[i].books;
      for (var b = 0; b < books.length; b++) {
        allBooks.push(this.shelves[i].books[b].title);
      }
    }
    return allBooks;
  }
};

var library = new Library(5); // creates library with n number of shelves

// library.allBooks // returns all books in library

// library.shelves // returns all shelves and shelf contents

// shelf = library.shelf(1) // returns all books on nth shelf

// book = library.shelf(1).book(2) // returns nth book on nth shelf

// book.enshelf(shelf) // moves book location to shelf object passed in

// book.unshelf() // removes book from shelf