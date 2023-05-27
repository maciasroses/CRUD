import { redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/node";
import { db } from "~/services/db";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AddMovie from "~/components/AddMovie";
import MoviesList from "~/components/MoviesList";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Movies" }];
};

export default function MoviesIndex() {
    const movies = useLoaderData()

    return (
        <>
            <div className="grid h-screen min-h-min place-items-center">
                <div className="text-center m-5 text-indigo-950 top-0 left-0 absolute text-4xl">
                    <Link to='/'>Home</Link>
                </div>
                <div className="w-[50%] text-center">
                    <AddMovie />
                    {movies.length > 0 ? (
                        <div className="m-auto overflow-auto h-[400px] px-[30px]">
                            <MoviesList movies={movies} />
                        </div>
                    ) : (
                        <div>Nothing here, add something...</div>
                    )}

                </div>
            </div>
        </>
    );
}

const badRequest = (data: any) => {
    return json(data, { status: 400 });
};

export const loader = async () => {
    const movies = await db.movie.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return movies
}

export const action = async ({ request }: any) => {
    const form = await request.formData();
    const name = form.get('name')
    const director = form.get('director')
    const audience = form.get('audience')
    const calification = parseFloat(form.get('calification'))
    const year = parseInt(form.get('year'))
    const description = form.get('description')

    const fields = { name, director, audience, calification, year, description };
    const fieldErrors = {
        name: !name ? "The movie must have a name." : null,
        director: !director ? "The movie must have a director." : null,
        audience: !audience ? "The movie must have an audience." : null,
        calification: !calification ? "The movie must have a calification." : null,
        year: !year ? "The movie must have a year." : null,
        description: !description ? "The movie must have a description." : null,
    };
    const hasErrors = Object.values(fieldErrors).some(Boolean);
    if (hasErrors) {
        return badRequest({ fieldErrors, fields });
    }

    const movie = await db.movie.create({
        data: {
            name: name,
            director: director,
            audience: audience,
            calification: calification,
            year: year,
            description: description
        }
    })

    return redirect(`/movies/${movie.id}`)
}