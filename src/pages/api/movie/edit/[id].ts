import { NextApiRequest, NextApiResponse } from 'next'
import { connection } from 'src/utils/database';

// eslint-disable-next-line
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, body } = req;


    switch (method) {
        case 'GET':
            try {
                const text = 'SELECT * FROM movie WHERE id = $1';
                const value = [query.id]
                const result = await connection.query(text, value);

                if (result.rows.length === 0) {
                    return res.status(404).json({ message: "Movie not found" })
                }
                return res.json(result.rows[0])

            }
            catch (err: any) {
                console.log({ error: err.message })
                return res.status(500).json({ message: err.message })

            }

        case 'POST':
            try {
                const { title, description, review, director, trailer } = body;

                const query = 'INSERT INTO movie (title, description, review, director, trailer) VALUES ($1,$2,$3,$4,$5) RETURNING *'
                const value = [title, description, review, director, trailer]

                const response = await connection.query(query, value)
                res.json({})
            }
            catch (err: any) {
                console.log({ error: err.message })
                return res.status(500).json({ message: err.message })

            }


        case 'PUT':
            try {
                const { title, description, review, director, trailer } = body;
                const text = 'UPDATE movie SET title=$1,description = $2,review=$3,director=$4,trailer=$5 WHERE id = $6';
                const value = [title, description, review, director, trailer, query.id]
                const result = await connection.query(text, value);

                if (result.rows.length === 0) {
                    return res.status(404).json({ message: "Movie not found" })
                }
                console.log(result)
                return res.json({ message: "updated movie" })

            }
            catch (err: any) {
                console.log({ error: err.message })
                return res.status(500).json({ message: err.message })
            }

        case 'DELETE':
            try {
                const text = 'DELETE FROM movie WHERE id = $1';
                const value = [query.id]
                const result = await connection.query(text, value);

                if (result.rowCount === 0) {
                    return res.status(404).json({ message: "Movie not found" })
                }
                console.log(result)
                return res.json({ message: "Deleted movie" })

            }
            catch (err: any) {
                console.log({ error: err.message })
                return res.status(500).json({ message: err.message })

            }

        default:
            return res.status(400).json({ message: "method not allowed" });
    }
}