'use client';

export default function ErrorBoundary({ error }) {
  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-4">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error.message || "Error loading vehicle details. Please try again later."}
      </div>
    </div>
  );
}
