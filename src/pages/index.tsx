import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const handlePush = () => {
    const currentUser = JSON.stringify(user);
    localStorage.setItem("user", currentUser);
    router.push("/movies");
    return;
  };
  return (
    <header className="text-2xl font-extrabold tracking-tighter text-gray-900 bg-gray-100 py-4 flex-1">
      <div className="flex justify-between">
        <p className="ml-8">Movies</p>
        <div>
          {user ? (
            <>{handlePush()}</>
          ) : (
            <Link href="/api/auth/login" passHref>
              <button className="shadow px-4 text-sm mr-4 text-black py-1 bg-slate-100 border rounded-full hover:text-gray-600 focus:outline-none focus:ring-offset-1 focus:ring-gray-600 ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
