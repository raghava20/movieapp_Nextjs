import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
const initialState = {
  title: "",
  description: "",
  director: "",
  review: "",
  trailer: ""
};

export default function AddMovies(): JSX.Element {
  const [data, setData] = useState(initialState);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    setData(initialState);
    router.back();
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid place-items-center mt-2"
    >
      <div className="grid grid-flow-row  mt-3 w-11/12 sm:w-3/4 md:w-1/2 m-auto">
        <label htmlFor="title" className="font-medium mt-2">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          required
          placeholder="Title..."
        />
        <label htmlFor="title" className="font-medium mt-2">
          Description:
        </label>
        <textarea
          name="description"
          rows={6}
          value={data.description}
          onChange={handleChange}
          className="shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="write your description..."
          required
        ></textarea>
        <label htmlFor="title" className="font-medium mt-2">
          Review:
        </label>
        <input
          type="number"
          min="0"
          max="10"
          name="review"
          value={data.review}
          onChange={handleChange}
          className="shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Enter review"
          required
        />
        <label htmlFor="title" className="font-medium mt-2">
          Director:
        </label>
        <input
          type="text"
          name="director"
          value={data.director}
          onChange={handleChange}
          className="shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Enter director"
          required
        />
        <label htmlFor="title" className="font-medium mt-2">
          Trailer:
        </label>

        <input
          type="text"
          name="trailer"
          value={data.trailer}
          onChange={handleChange}
          className="focus:outline-none p-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full  rounded-md sm:text-sm border border-gray-300"
          placeholder="paste your id..."
          required
        />

        <small className="text-gray-500">
          ex: https://www.youtube.com/watch?v=mqqft2x_Aa4{" "}
        </small>
      </div>
      <div>
        <button
          type="button"
          className="inline-flex justify-center mt-5 mr-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
