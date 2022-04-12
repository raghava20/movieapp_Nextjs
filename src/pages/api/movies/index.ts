// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { connection } from '../../../utils/database';
import { connection } from "src/utils/database";

interface Data {
  id: number;
  title: string;
  description: string;
  review: string;
  director: string;
  trailer: string;
  message: string;
}

type PartialData = Partial<Data>;

// eslint-disable-next-line
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<PartialData>
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM movie";
        const result = await connection.query(text);
        // console.log(result);
        return res.status(201).json(result.rows);
      } catch (err: unknown) {
        const value = err as Error;
        console.log({ error: value.message });
        res.json({ message: value.message });
      }

    case "POST":
      try {
        console.log("hi");
        const { title, description, review, director, trailer } = body;

        const query =
          "INSERT INTO movie (title, description, review, director, trailer) VALUES ($1,$2,$3,$4,$5) RETURNING *";
        const value = [title, description, review, director, trailer];

        const response = await connection.query(query, value);
        res.json(response);
      } catch (err: unknown) {
        const value = err as Error;
        console.log({ error: value.message });
        res.json({ message: value.message });
      }

    default:
      return res.status(400).json({ message: "method not allowed" });
  }
}
