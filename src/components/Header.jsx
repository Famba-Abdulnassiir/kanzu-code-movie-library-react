import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import MovieContext from '../context/MovieContext';
import { useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { Text } from '@mantine/core';





export default function Header() {
    const { movies, setSearchedMovies, user, setUser } = useContext(MovieContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()


    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredMovies = movies.filter((movie) =>
            movie.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchedMovies(filteredMovies);
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const user = {
                    username: decoded.userName,
                    email: decoded.email,
                    role: decoded.role,
                };
                setUser(user);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('No token found, user is logged out.');
            setUser(null);
        }
    }, [setUser]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/movies')
    }

    return (
        <div className='h-15 bg-[#030617] flex justify-between items-center mt-auto align-middle'>
            <div className='ml-16 text-xl'>
                <Link to={'/'}> <h1 className='text-white  p-2 font-bold'>Kanzu Code <br /> <span className='text-amber-400'>Movie Lib</span></h1> </Link>
            </div>

            <div className='text-white ml-6 font-semibold'>
                <Link to={'/'} className='mr-4'>Home</Link>
                <Link to={'/movies'}>All Movies </Link>
            </div>

            <div className='flex-1 divider'></div>

            <div>
                <input className='p-1 rounded-sm bg-slate-300 mr-6'
                    type='search'
                    placeholder='Search Movie...'
                    value={searchTerm}
                    onChange={handleSearch} />

            </div>

            {!user ? (<div className='mr-16 font-semibold'>
                <Link className='text-white' to={'/auth/login'}>Signin</Link>
                <Link className='text-white' to={'/auth/signup'}> | Signup</Link>
            </div>) :
                (<div className='mr-16 font-semibold flex'>
                    <Text className='text-white mr-2 font-semibold'>({user?.username || ''})</Text>
                    <Link className='text-white' onClick={handleLogout} > | Signout</Link>
                </div>)}



        </div>

    )
}
