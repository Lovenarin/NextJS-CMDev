import { useRouter } from "next/router";
import React from "react";

export default function Movies({ movies, randomData }) {
  return (
    <div>
      <h1>Movies</h1>
      <span>{randomData}</span>
      <ul>
        {movies.map((movie, index) => {
          return (
            <li key={`${index}`}>
              <img
                src={movie.youtube_image}
                alt=""
                height={30}
                style={{ marginRight: 16 }}
              />
              {`${index + 1}. ${movie.title} | ${movie.subtitle}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// This function gets called at build time
export async function getServerSideProps(context) {
  const { type } = context.query;

  // songs, foods, superhero
  const url = `https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&passwoed=password&type=${type}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      movies: data.youtubes,
      randomData: Math.random().toString(),
    },
  };
}
