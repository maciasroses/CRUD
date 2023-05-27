import { Link } from "@remix-run/react";

function MoviesList({ movies }: any) {
    return (
        <>
            {movies.map((movie: any) => (
                <div key={movie.id}>
                    <Link to={movie.id}>
                        <div className="p-3 m-2 rounded-lg bg-indigo-400 text-white transition duration-500 hover:scale-[110%] hover:bg-indigo-800">
                            <p className="font-bold text-xl">{movie.name}</p>
                            <div className="inline-block">
                                <p className="float-left mx-2">{movie.audience}</p>
                                <p className="float-left mx-2">{movie.calification}</p>
                                <p className="float-left mx-2">{movie.year}</p>
                            </div>
                            <div className="clear-both"></div>
                        </div>
                    </Link >
                </div>
            ))}
        </>
    )
}
export default MoviesList;