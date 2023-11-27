import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Go to Home
            </Link>
        </div>
    )
}
