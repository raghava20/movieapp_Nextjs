import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Movies } from "src/interfaces/Movies";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  movie: Movies;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Movie = ({ movie }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  let source;
  if (movie.trailer) {
    source = movie.trailer.split("=")[1];
  }

  const handleDelete = async (id: string | undefined) => {
    const res = await fetch(`/api/movie/edit/` + id, { method: "DELETE" });

    router.back();
  };

  return (
    <div className="w-full h-full p-2">
      <div>
        <iframe
          src={`https://www.youtube.com/embed/${source}`}
          className="w-full h-[60vh]"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-2">
        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="text-sm font-bold text-gray-900">{movie.title}</h3>
            <div>
              <button
                className="shadow-md border-none shadow-green-500/40 mr-2 border-green-600 rounded-full px-4 py-1 font-medium text-gray-100  hover:bg-green-700 bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                onClick={() => router.push(`/movie/edit/${router.query.id}`)}
              >
                <ModeIcon sx={{ fontSize: 18, mr: 0.5, ml: -1, mb: 0.5 }} />
                Edit
              </button>
              <button
                className="shadow-md border-none shadow-red-500/40 border-red-500 rounded-full px-4 py-1 font-medium text-gray-100  hover:bg-red-600 bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => setOpen(!open)}
              >
                <DeleteIcon sx={{ fontSize: 18, mr: 0.5, ml: -1, mb: 0.5 }} />
                Delete
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-4">{movie.description}</p>
          <p className="mt-3 text-sm ">Director: {movie.director}</p>
        </div>
        <p className="text-sm text-gray-500 mt-3">
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

        <div>
          <button
            className="shadow-md border-none shadow-cyan-500/40 px-4 text-sm mt-12 text-white py-1 rounded-full bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-cyan-600"
            onClick={() => router.back()}
          >
            {" "}
            &#8592; Back
          </button>
        </div>

        <Modal open={open} onClose={() => setOpen(!open)}>
          <Box sx={style}>
            Are you sure want to delete this?
            <div className="flex justify-end gap-4 mt-3">
              <button
                className="border border-gray-500 rounded-md px-4 py-1 font-medium shadow-sm shadow-gray-500 text-gray-50 hover:bg-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setOpen(!open)}
              >
                No
              </button>
              <button
                className="border border-red-500 rounded-md px-4 py-1 font-medium shadow-sm shadow-red-500 text-gray-50 hover:bg-red-600 bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDelete(movie.id)}
              >
                Yes
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movie/edit/` + id
  );
  const movie = await res.json();

  return {
    props: {
      movie: movie
    }
  };
};

export default Movie;
