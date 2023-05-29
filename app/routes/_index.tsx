import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Welcome" }];
};



export default function Index() {
  return (
    
    <div className="grid h-screen place-items-center">
      <div className="w-[50%] text-center">
        <p className="text-xl text-indigo-900 m-5">Welcome to the best movies list</p>
        <Link to='/movies' className="p-4 bg-indigo-950 text-white hover:bg-indigo-200 hover:text-indigo-900">Go</Link>
      </div>
    </div>
  );
}
