import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { db } from "~/services/db";
import EditMovie from "~/components/EditMovie";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Edit Page" }];
};

export default function MovieEdit() {
    const movie = useLoaderData()
    return (
        <>
            <div className="grid h-screen place-items-center">
                <div className="w-[50%] text-center">
                    <div className="p-3 m-2 rounded-lg bg-indigo-800 text-white">
                        <EditMovie movie={movie} />
                    </div>
                </div>
            </div>
        </>
    )
}

const badRequest = (data: any) => {
    return json(data, { status: 400 });
};

export const loader = async ({ params }: any) => {
    const movie = await db.movie.findUnique({
        where: {
            id: params.movieId
        }
    })
    if (!movie) {
        throw json({ message: "This movie was not found to edit" }, { status: 404 });
    }
    return movie
}


export const action = async ({ request, params }: any) => {
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

    const movie = await db.movie.update({
        where: {
            id: params.movieId,
        },
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

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="grid h-screen place-items-center">
                <div className="m-5 text-indigo-950 top-0 left-0 absolute text-2xl">
                    <Link to='/movies'>Movies...</Link>
                </div>
                <div className="flex max-w-sm my-0 mx-auto p-6 rounded-lg bg-white shadow-xl items-center">
                    <h1 className="text-center">{error.data.message}</h1>
                </div>
            </div>
        );
    }

    return (
        //ESTE ERROR QUIZAS SE DEBA A QUE NO SE ESTA CONECTANDO A LA BASE DE DATOS
        <div className="grid h-screen place-items-center">
            <div className="flex max-w-sm my-0 mx-auto p-6 rounded-lg bg-white shadow-xl items-center">
                <h1 className="text-center">Something went wrong</h1>
            </div>
        </div>
    );
}