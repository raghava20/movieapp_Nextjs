// import type { NextPage } from 'next'
import Head from "next/head";
import MovieList from "src/components/MovieList";
import { Movies } from "../../interfaces/Movies";
import Link from "next/link";
import { connection } from "src/utils/database";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  movies: Movies[];
}

const Home = ({ movies }: Props) => {
  const router = useRouter();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        localStorage.removeItem("user");
        return router.push("/");
      }
    }
  };

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
          <div>
            <Link href="/movies/add" passHref>
              <button className="shadow-md shadow-cyan-500/40 px-4 text-sm mr-3 text-white py-1 border-none rounded-full bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-cyan-600">
                Add &#43;
              </button>
            </Link>
            <Link href="/donate" passHref>
              <button className="shadow-md shadow-purple-500/40 px-4 text-sm mr-3 text-white py-1 border-none rounded-full bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-purple-600">
                Donate ₹
              </button>
            </Link>
            <Link href="/api/auth/logout" passHref>
              <button
                onClick={() => localStorage.removeItem("user")}
                className="shadow-md shadow-gray-500/40 px-4 text-sm mr-4 text-gray-500 py-1 bg-gray-300 border-none rounded-full hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-offset-1 focus:ring-gray-600 "
              >
                Logout
              </button>
            </Link>
          </div>
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
  // const res = await fetch(`http://localhost:3000/api/movies`);
  // const movies = await res.json();

  return {
    props: {
      movies: result.rows
    },
    revalidate: 10
  };
};
