// import type { NextPage } from 'next'
import Head from "next/head";
import MovieList from "src/components/MovieList";
import { Movies } from "../../interfaces/Movies";
import Link from "next/link";
import { connection } from "src/utils/database";

interface Props {
  movies: Movies[];
}

const Home = ({ movies }: Props) => {
  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-2xl font-extrabold tracking-tight text-gray-900 bg-gray-100 py-4  flex-1">
        <div className="flex justify-between">
          <p className="ml-8">Movies</p>
          <Link href="/movies/add" passHref>
            <button className="shadow px-4 text-sm mr-4 text-white py-1 border rounded-full bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-cyan-600">
              Add &#43;
            </button>
          </Link>
        </div>
      </header>
      <main className="bg-white">
        <div className="max-w-2xl mx-auto py-6 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <section className=" grid grid-cols-1 grid-flow-row gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {movies.length === 0 ? (
              <h5 className="text-2xl font-medium text-gray-500">No Movies</h5>
            ) : (
              <MovieList movies={movies} />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const text = "SELECT * FROM movie";
  const result = await connection.query(text);
  // console.log(result.rows, "new");
  // const res = await fetch("http://localhost:3000/api/movies");
  // const movies = await res.json();

  return {
    props: {
      movies: result.rows,
    },
    revalidate: 10,
  };
};
