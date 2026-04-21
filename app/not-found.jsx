import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
        
        {/* 404 */}
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found 😢
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>

    </div>
  );
};

export default NotFound;