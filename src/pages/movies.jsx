import React from 'react'
import Header from '../components/Header'
import MoviesCard from '../components/MovieCard';



export default function movies() {
    return (
        <>
        <div className="h-screen w-screen" >
            <main className='overflow-scroll overflow-x-hidden'>
                <MoviesCard />
            </main>

        </div>
            

        </>
    );
};


