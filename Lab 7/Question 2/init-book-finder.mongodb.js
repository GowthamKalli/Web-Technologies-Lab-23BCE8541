use('book-finder')

db.books.insertMany([

  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Programming",
    price: 1999,
    rating: 4.4,
    year: 2008
  },
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery (20th Anniversary Edition)",
    author: "Andrew Hunt, David Thomas",
    category: "Programming",
    price: 2499,
    rating: 4.5,
    year: 2019
  },
  {
    title: "Python Crash Course (3rd Edition)",
    author: "Eric Matthes",
    category: "Programming",
    price: 2399,
    rating: 4.6,
    year: 2023
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Programming",
    price: 3499,
    rating: 4.7,
    year: 2017
  },
  {
    title: "Grokking Algorithms: An Illustrated Guide for Programmers and Other Curious People",
    author: "Aditya Bhargava",
    category: "Programming",
    price: 1999,
    rating: 4.6,
    year: 2016
  },

  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    price: 399,
    rating: 4.3,
    year: 1960
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    price: 499,
    rating: 4.2,
    year: 1949
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 299,
    rating: 3.9,
    year: 1925
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    price: 350,
    rating: 4.3,
    year: 1813
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    price: 450,
    rating: 3.8,
    year: 1951
  },

  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 499,
    rating: 4.2,
    year: 1988
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Science",
    price: 599,
    rating: 4.4,
    year: 2011
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    price: 799,
    rating: 4.4,
    year: 1980
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    category: "Science",
    price: 699,
    rating: 4.1,
    year: 2010
  },
  {
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    category: "Science",
    price: 899,
    rating: 4.4,
    year: 2016
  },

  {
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    category: "Self-Help",
    price: 799,
    rating: 4.4,
    year: 2018
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Self-Help",
    price: 699,
    rating: 4.2,
    year: 1989
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Self-Help",
    price: 499,
    rating: 4.2,
    year: 1936
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Self-Help",
    price: 599,
    rating: 4.4,
    year: 1946
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Self-Help",
    price: 899,
    rating: 4.2,
    year: 2011
  }
]);

db.books.find().pretty().limit(20);
db.books.countDocuments(); 