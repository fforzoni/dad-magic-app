// Priority Movies List - These movies will be prioritized in their respective genres
export const priorityMovies = [
  // Romantic Comedies
  { title: "Pretty Woman", tmdbId: 89, genre: "Romance" },
  { title: "Dirty Dancing", tmdbId: 448, genre: "Romance" },
  { title: "Love Actually", tmdbId: 508, genre: "Romance" },
  { title: "Notting Hill", tmdbId: 1089, genre: "Romance" },
  { title: "Mamma Mia!", tmdbId: 11631, genre: "Musical" },
  { title: "When Harry Met Sally", tmdbId: 1059, genre: "Romance" },
  { title: "My Best Friend's Wedding", tmdbId: 11831, genre: "Romance" },
  { title: "Father of the Bride", tmdbId: 11831, genre: "Comedy" },
  { title: "Titanic", tmdbId: 597, genre: "Romance" },
  { title: "The Holiday", tmdbId: 1587, genre: "Romance" },
  { title: "Bridget Jones's Diary", tmdbId: 11831, genre: "Romance" },
  { title: "La La Land", tmdbId: 313369, genre: "Musical" },
  { title: "Sleepless in Seattle", tmdbId: 11831, genre: "Romance" },
  { title: "10 Things I Hate About You", tmdbId: 11831, genre: "Romance" },
  { title: "The Notebook", tmdbId: 11831, genre: "Romance" },

  // Crime/Gangster Films
  { title: "The Godfather", tmdbId: 238, genre: "Crime" },
  { title: "Goodfellas", tmdbId: 769, genre: "Crime" },
  { title: "Scarface", tmdbId: 111, genre: "Crime" },
  { title: "Casino Royale", tmdbId: 36557, genre: "Action" },
  { title: "Snatch", tmdbId: 107, genre: "Crime" },
  { title: "The Untouchables", tmdbId: 117, genre: "Crime" },
  { title: "Once Upon a Time in America", tmdbId: 311, genre: "Crime" },
  { title: "Peaky Blinders", tmdbId: 60574, genre: "Crime" },
  { title: "Pulp Fiction", tmdbId: 680, genre: "Crime" },
  { title: "Reservoir Dogs", tmdbId: 500, genre: "Crime" },
  { title: "American Gangster", tmdbId: 4982, genre: "Crime" },
  { title: "Heat", tmdbId: 949, genre: "Crime" },
  { title: "The Departed", tmdbId: 1422, genre: "Crime" },
  { title: "The Irishman", tmdbId: 398978, genre: "Crime" },
  { title: "City of God", tmdbId: 598, genre: "Crime" },

  // Thriller/Psychological
  { title: "Se7en", tmdbId: 550, genre: "Thriller" },
  { title: "Joker", tmdbId: 475557, genre: "Thriller" },
  { title: "The Illusionist", tmdbId: 7515, genre: "Thriller" },
  { title: "Shutter Island", tmdbId: 11324, genre: "Thriller" },
  { title: "Fight Club", tmdbId: 550, genre: "Thriller" },
  { title: "Gone Girl", tmdbId: 210577, genre: "Thriller" },
  { title: "Prisoners", tmdbId: 146233, genre: "Thriller" },
  { title: "Black Swan", tmdbId: 44214, genre: "Thriller" },
  { title: "The Sixth Sense", tmdbId: 966, genre: "Thriller" },
  { title: "Memento", tmdbId: 77, genre: "Thriller" },
  { title: "The Prestige", tmdbId: 1124, genre: "Thriller" },
  { title: "The Silence of the Lambs", tmdbId: 274, genre: "Thriller" },
  { title: "Oldboy", tmdbId: 670, genre: "Thriller" },
  { title: "Donnie Darko", tmdbId: 141, genre: "Thriller" },
  { title: "The Girl with the Dragon Tattoo", tmdbId: 12445, genre: "Thriller" },

  // Financial/Business Films
  { title: "The Wolf of Wall Street", tmdbId: 106646, genre: "Drama" },
  { title: "Wall Street", tmdbId: 73, genre: "Drama" },
  { title: "Margin Call", tmdbId: 49524, genre: "Drama" },
  { title: "The Big Short", tmdbId: 318846, genre: "Drama" },
  { title: "Boiler Room", tmdbId: 10315, genre: "Drama" },
  { title: "Too Big to Fail", tmdbId: 49524, genre: "Drama" },
  { title: "Inside Job", tmdbId: 49524, genre: "Documentary" },
  { title: "Rogue Trader", tmdbId: 49524, genre: "Drama" },
  { title: "Barbarians at the Gate", tmdbId: 49524, genre: "Drama" },
  { title: "Trading Places", tmdbId: 1624, genre: "Comedy" },
  { title: "Money Monster", tmdbId: 318846, genre: "Drama" },
  { title: "Equity", tmdbId: 318846, genre: "Drama" },
  { title: "Glengarry Glen Ross", tmdbId: 318846, genre: "Drama" },
  { title: "Enron: The Smartest Guys in the Room", tmdbId: 318846, genre: "Documentary" },
  { title: "American Psycho", tmdbId: 1359, genre: "Thriller" },

  // Classic Films
  { title: "Forrest Gump", tmdbId: 13, genre: "Drama" },
  { title: "The Shawshank Redemption", tmdbId: 278, genre: "Drama" },
  { title: "Top Gun", tmdbId: 744, genre: "Action" },
  { title: "Avatar", tmdbId: 19995, genre: "Sci-Fi" },
  { title: "Rocky", tmdbId: 1366, genre: "Action" },
  { title: "The Lord of the Rings: The Fellowship of the Ring", tmdbId: 120, genre: "Fantasy" },
  { title: "E.T. the Extra-Terrestrial", tmdbId: 424, genre: "Sci-Fi" },
  { title: "The Dark Knight", tmdbId: 155, genre: "Action" },
  { title: "Gladiator", tmdbId: 98, genre: "Action" },
  { title: "Jurassic Park", tmdbId: 329, genre: "Adventure" },
  { title: "Inception", tmdbId: 27205, genre: "Sci-Fi" },
  { title: "The Matrix", tmdbId: 603, genre: "Sci-Fi" },
  { title: "Saving Private Ryan", tmdbId: 857, genre: "War" },
  { title: "Back to the Future", tmdbId: 105, genre: "Sci-Fi" },

  // Animated Films
  { title: "Bambi", tmdbId: 3170, genre: "Family & Animation" },
  { title: "Barbie", tmdbId: 346698, genre: "Adventure" },
  { title: "Frozen", tmdbId: 109445, genre: "Family & Animation" },
  { title: "The Incredibles", tmdbId: 9806, genre: "Family & Animation" },
  { title: "Inside Out", tmdbId: 150540, genre: "Family & Animation" },
  { title: "The Jungle Book", tmdbId: 932, genre: "Adventure" },
  { title: "The Wizard of Oz", tmdbId: 630, genre: "Fantasy" },
  { title: "Alice in Wonderland", tmdbId: 12155, genre: "Fantasy" },
  { title: "Toy Story", tmdbId: 862, genre: "Family & Animation" },
  { title: "Finding Nemo", tmdbId: 12, genre: "Family & Animation" },
  { title: "Shrek", tmdbId: 808, genre: "Family & Animation" },
  { title: "Moana", tmdbId: 277834, genre: "Family & Animation" },
  { title: "Up", tmdbId: 14160, genre: "Family & Animation" },
  { title: "Monsters, Inc.", tmdbId: 585, genre: "Family & Animation" },
  { title: "Zootopia", tmdbId: 269149, genre: "Family & Animation" },

  // Action/Adventure
  { title: "The Bourne Identity", tmdbId: 2501, genre: "Action" },
  { title: "Die Hard", tmdbId: 562, genre: "Action" },
  { title: "Captain America: The First Avenger", tmdbId: 1771, genre: "Action" },
  { title: "Mission: Impossible", tmdbId: 954, genre: "Action" },
  { title: "Iron Man", tmdbId: 1726, genre: "Action" },
  { title: "King Kong", tmdbId: 254, genre: "Adventure" },
  { title: "The Avengers", tmdbId: 24428, genre: "Action" },
  { title: "Pirates of the Caribbean: The Curse of the Black Pearl", tmdbId: 22, genre: "Adventure" },
  { title: "Quantum of Solace", tmdbId: 10764, genre: "Action" },
  { title: "The Dark Knight Rises", tmdbId: 49026, genre: "Action" },
  { title: "Mad Max: Fury Road", tmdbId: 76341, genre: "Action" },
  { title: "Indiana Jones and the Raiders of the Lost Ark", tmdbId: 89, genre: "Adventure" },
  { title: "John Wick", tmdbId: 245891, genre: "Action" },
  { title: "The Hunger Games", tmdbId: 70160, genre: "Adventure" },

  // Musical Films
  { title: "Back to Black", tmdbId: 346698, genre: "Musical" },
  { title: "Rocketman", tmdbId: 504608, genre: "Musical" },
  { title: "Bohemian Rhapsody", tmdbId: 424694, genre: "Musical" },
  { title: "Grease", tmdbId: 621, genre: "Musical" },
  { title: "The Greatest Showman", tmdbId: 316029, genre: "Musical" },
  { title: "Chicago", tmdbId: 423, genre: "Musical" },
  { title: "Moulin Rouge!", tmdbId: 824, genre: "Musical" },
  { title: "West Side Story", tmdbId: 630, genre: "Musical" },
  { title: "Sing", tmdbId: 335797, genre: "Family & Animation" },
  { title: "Dreamgirls", tmdbId: 9762, genre: "Musical" },
  { title: "Les Misérables", tmdbId: 82690, genre: "Musical" },
  { title: "A Star Is Born", tmdbId: 332562, genre: "Musical" },
  { title: "Pitch Perfect", tmdbId: 49524, genre: "Comedy" },
  { title: "Mary Poppins", tmdbId: 433, genre: "Musical" },

  // Magic/Illusion Films
  { title: "Now You See Me", tmdbId: 75656, genre: "Thriller" },
  { title: "Harry Potter and the Sorcerer's Stone", tmdbId: 671, genre: "Fantasy" },
  { title: "Fantastic Beasts and Where to Find Them", tmdbId: 259316, genre: "Fantasy" },
  { title: "The Sorcerer's Apprentice", tmdbId: 27022, genre: "Fantasy" },
  { title: "Doctor Strange", tmdbId: 284052, genre: "Action" },
  { title: "Bedknobs and Broomsticks", tmdbId: 49524, genre: "Fantasy" },
  { title: "Oz the Great and Powerful", tmdbId: 49524, genre: "Fantasy" },
  { title: "Matilda", tmdbId: 49524, genre: "Comedy" },

  // Horror Films
  { title: "The Exorcist", tmdbId: 9552, genre: "Horror" },
  { title: "Alien", tmdbId: 348, genre: "Horror" },
  { title: "Jaws", tmdbId: 578, genre: "Horror" },
  { title: "The Shining", tmdbId: 694, genre: "Horror" },
  { title: "It", tmdbId: 346364, genre: "Horror" },
  { title: "A Nightmare on Elm Street", tmdbId: 372, genre: "Horror" },
  { title: "Get Out", tmdbId: 419430, genre: "Horror" },
  { title: "Hereditary", tmdbId: 493922, genre: "Horror" },
  { title: "Paranormal Activity", tmdbId: 23823, genre: "Horror" },
  { title: "Halloween", tmdbId: 948, genre: "Horror" },
  { title: "Psycho", tmdbId: 539, genre: "Horror" },
  { title: "The Ring", tmdbId: 565, genre: "Horror" },
  { title: "Scream", tmdbId: 423, genre: "Horror" },
  { title: "Us", tmdbId: 458723, genre: "Horror" },
  { title: "Insidious", tmdbId: 49018, genre: "Horror" }
];

// Helper function to get priority movies by genre
export const getPriorityMoviesByGenre = (genreName) => {
  // Handle combined Family & Animation genre
  if (genreName === 'Family' || genreName === 'Animation') {
    return priorityMovies.filter(movie => 
      movie.genre === 'Family & Animation'
    );
  }
  
  return priorityMovies.filter(movie => 
    movie.genre.toLowerCase() === genreName.toLowerCase()
  );
};

// Helper function to check if a movie is a priority movie
export const isPriorityMovie = (movieTitle) => {
  return priorityMovies.some(movie => 
    movie.title.toLowerCase() === movieTitle.toLowerCase()
  );
};
