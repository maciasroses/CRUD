import { useNavigation } from "@remix-run/react";
import { Form, Link } from "@remix-run/react";

export default function DeleteMovie({ movie }: any) {
    const transition = useNavigation()
    const isSubmitting = transition.state === 'submitting'
    return (
        <Form method="POST">
            <p className="text-3xl font-extrabold border-b border-solid border-slate-200">Delete</p>
            <div className="text-center m-2">
                <p>¿Are you sure to delete this movie: <br /> <strong>"{movie.name}"</strong>?</p>
            </div>
            <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b pt-3">
                <button type="submit" className="p-2 bg-red-600 text-red-100 rounded" disabled={isSubmitting}>
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
                <Link to={`/movies/${movie.id}`} className="ml-2 p-2 bg-green-600 text-white rounded">Cancel</Link>
            </div>
        </Form>
    )
}