import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              The Personal Book Manager
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Track your library, log your progress, and build a meaningful archive of your favorite literature.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200 shadow-md"
              >
                Login
              </Link>

              <button className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-6 py-3 rounded-xl font-medium transition duration-200 text-gray-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
