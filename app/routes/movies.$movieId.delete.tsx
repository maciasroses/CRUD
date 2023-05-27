import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { db } from "~/services/db";
import DeleteMovie from "~/components/DeleteMovie";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Delete Page" }];
};

export default function MovieEdit() {
    const movie = useLoaderData()
    return (
        <>
            <div className="grid h-screen place-items-center">
                <div className="w-[50%] text-center">
                    <div className="p-3 m-2 rounded-lg bg-indigo-800 text-white">
                        <DeleteMovie movie={movie} />
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
        throw json({ message: "This movie was not found to delete" }, { status: 404 });
    }
    return movie
}

export const action = async ({ params }: any) => {
    await db.movie.delete({ where: { id: params.movieId } })
    return redirect('/movies')
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