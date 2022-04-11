import { useRouter } from "next/router";
import { Movies } from "src/interfaces/Movies";

interface Props {
  movies: Movies[];
}

function MovieList({ movies = [] }: Props) {
  const router = useRouter();

  return (
    <>
      {movies.map((movie, index) => {
        let source;
        if (movie.trailer) {
          source = movie.trailer.split("=")[1];
        }
        return (
          <div
            className="rounded overflow-hidden border shadow-md hover:scale-105 transition-all cursor-pointer"
            key={index}
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            <div>
              <iframe
                src={`https://www.youtube.com/embed/${source}`}
                className="w-full h-full object-cover divide-y divide-solid"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {movie.title}
                </h3>
                {/* <p className="text-sm text-gray-700 float-right">{movie.description}</p> */}
                <p className="mt-1 text-sm ">Director: {movie.director}</p>
              </div>
              <p className="text-sm text-gray-500">
                Rating: ⭐
                <span
                  className={
                    +movie.review < 8
                      ? "text-sm font-medium text-red-500"
                      : "text-sm font-medium text-green-500"
                  }
                >
                  {movie.review} /10
                </span>
              </p>
              {/* <p>{movie.trailer}</p> */}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MovieList;
