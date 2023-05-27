import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/services/db";

export const meta: V2_MetaFunction = ({ data }: any) => {
    if (!data) {
        return [
            { title: "Not found" }
        ];
    } else {
        return [
            { title: data.name },
        ];
    }
};

export default function MovieIdIndex() {
    const movie = useLoaderData()
    return (
        <>
            <div className="grid h-screen place-items-center">
                <div className="m-5 text-indigo-950 top-0 left-0 absolute text-2xl">
                    <Link to='/movies'>Movies...</Link>
                </div>
                <div className="w-[70%] text-center">
                    <div className="p-3 m-2 rounded-lg bg-indigo-800 text-white">
                        <div className="mb-3">
                            <p className="text-4xl">{movie.name}</p>
                            <p className="text-xl">{movie.director}</p>
                            <div className="inline-block">
                                <p className="float-left mx-2">{movie.audience}</p>
                                <p className="float-left mx-2">{movie.calification}</p>
                                <p className="float-left mx-2">{movie.year}</p>
                            </div>
                            <p>{movie.description}</p>
                        </div>
                        <div className="inline-block">
                            <Link to='edit' className="float-left">
                                <button type="submit" className="bg-gray-200 text-black hover:bg-gray-400 rounded p-2 mx-2">Edit</button>
                            </Link>
                            <Link to='delete' className="float-left">
                                <button type="submit" className="bg-red-200 text-red-950 hover:bg-red-400 rounded p-2 mx-2">Delete</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const loader = async ({ params }: any) => {
    const movie = await db.movie.findUnique({
        where: {
            id: params.movieId
        }
    })
    if (!movie) {
        throw json({ message: "This movie was not found" }, { status: 404 });
    }
    return movie
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