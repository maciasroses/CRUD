import { useActionData, useNavigation } from "@remix-run/react";
import { Form, Link } from "@remix-run/react";

export default function EditMovie({ movie }: any) {
    const transition = useNavigation()
    const isSubmitting = transition.state === 'submitting'

    const actionData = useActionData()
    const { fieldErrors } = actionData ?? {}
    const {
        name: nameError,
        director: directorError,
        audience: audienceError,
        calification: calificationError,
        year: yearError,
        description: descriptionError
    } = fieldErrors ?? {}

    return (
        <Form method="POST">
            <p className="text-3xl font-extrabold border-b border-solid border-slate-200">Edit</p>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    className="text-center text-indigo-900 w-9/12 rounded p-3 leading-tight"
                    placeholder="Name of the movie"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={movie.name}
                />
                {nameError && <p><small style={{ color: 'red' }}>{nameError}</small></p>}
            </div>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="director"
                >
                    Director
                </label>
                <input
                    className="text-center text-indigo-900 w-9/12 rounded p-3 leading-tight"
                    placeholder="Director of the movie"
                    type="text"
                    id="director"
                    name="director"
                    defaultValue={movie.director}
                />
                {directorError && <p><small style={{ color: 'red' }}>{directorError}</small></p>}
            </div>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="audience"
                >
                    Audience
                </label>
                <input
                    className="text-center text-indigo-900 w-9/12 rounded p-3 leading-tight"
                    placeholder="Audience of the movie"
                    type="text"
                    id="audience"
                    name="audience"
                    defaultValue={movie.audience}
                />
                {audienceError && <p><small style={{ color: 'red' }}>{audienceError}</small></p>}
            </div>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="calification"
                >
                    Calification
                </label>
                <input
                    className="text-center text-indigo-900 w-9/12 rounded p-3 leading-tight"
                    placeholder="Calification of the movie"
                    type="text"
                    id="calification"
                    name="calification"
                    defaultValue={movie.calification}
                />
                {calificationError && <p><small style={{ color: 'red' }}>{calificationError}</small></p>}
            </div>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="year"
                >
                    Year
                </label>
                <input
                    className="text-center text-indigo-900 w-9/12 rounded p-3 leading-tight"
                    placeholder="Year of the movie"
                    type="number"
                    id="year"
                    name="year"
                    defaultValue={movie.year}
                />
                {yearError && <p><small style={{ color: 'red' }}>{yearError}</small></p>}
            </div>
            <div className="text-center m-2">
                <label
                    className="block tracking-wide font-bold"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    className="w-9/12 text-center text-indigo-900 rounded p-3 leading-tight"
                    placeholder="Description of the movie"
                    id="description"
                    name="description"
                    defaultValue={movie.description}
                />
                {descriptionError && <p><small style={{ color: 'red' }}>{descriptionError}</small></p>}
            </div>
            <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b pt-3">
                <button type="submit" className="p-2 bg-red-600 text-red-100 rounded" disabled={isSubmitting}>
                    {isSubmitting ? 'Editing...' : 'Edit'}
                </button>
                <Link to={`/movies/${movie.id}`} className="ml-2 p-2 bg-green-600 text-white rounded">Cancel</Link>
            </div>
        </Form>
    )
}