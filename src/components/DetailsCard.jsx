
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'; { }
import { Card, Image, Text, Badge, Button, RingProgress, TextInput, Modal, Group, CardSection, Loader } from '@mantine/core';
import MovieContext from '../context/MovieContext';
import { useDisclosure } from '@mantine/hooks'

export default function DetailsCard() {
    const { movieId } = useParams()
    const { fetchAllMovies, movies, setMovies, user,setUser, token, setToken } = useContext(MovieContext)
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        fetchAllMovies().then(() => setLoading(false));
    }, []);


    const movie = movies.find(movie => movie.id === parseInt(movieId));

    if (isLoading) {
        return <>
            <div className='flex justify-center items-center mx-auto flex-col'>
                <Loader color="blue" />
            </div>
        </>
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    /* Handle Movie Delete here */
    const handleMovieDelete = async () => {

        try {

            const response = await fetch(`http://localhost:8080/api/v1/movies/${movie.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            });

            if (response.ok) {
                console.log(`Movie ${movie.title} deleted successfully.`)
                navigate('/movies');
            } else {
                console.error('Delete request failed');
                console.error(token)

            }
        } catch (error) {
            console.error('Error deleting movie:', error);
            

        }
    };

    /* End of movie Delete */

    return (
        <div className='bg-[#0f1526]'>
            <Card shadow="sm" padding="lg" radius="md" withBorder className='flex flex-row items-center justify-evenly gap-7 bg-transparent text-white'>
                <div className='mt-auto'>
                    <Image
                        src={movie.imageUrl}
                        height={160}
                        alt={`${movie.title} poster Image`}
                    />
                </div>

                <div className=''>
                    <Text fw={1000} className='font-bold text-xl mb-5'>{movie.title} <span className='text-gray-700 font-semibold'> ({movie.releaseYear}) </span></Text>

                    <Group className='mb-5'>

                        <RingProgress
                            size={70}
                            thickness={6}
                            sections={[{ value: parseInt(movie.rating), color: 'blue', }]}
                            label={
                                <Text c="blue" fw={700} ta="center" size="md" className='font-bold'>
                                    {movie.rating}%
                                </Text>
                            }
                        />
                        <Text className='p-0' fw={700} size="md">
                            User <br />
                            Rating
                        </Text>
                        <Group>
                            <FontAwesomeIcon icon={faCirclePlay} size="xl" style={{ color: "#ffff", }} />
                            <Text> Play Trailer</Text>
                        </Group>
                    </Group>
                    <Text fw={650} className='mb-1'>Description</Text>
                    <Text className='mr-10 mb-5'>{movie.description}</Text>
                    <Text className='mb-1' fw={650}>Director</Text>
                    <Text className='mb-5'>{movie.director}</Text>
                    {/* <video src={} controls autoPlay /> */}

                    <Badge color="blue" variant="light">
                        Buy or Rent
                    </Badge>

                    {user?.role=== 'Admin' ? (<Group className='flex justify-center'>
                    <Button className='bg-blue-800 text-white hover:bg-blue-600' >Edit</Button>
                    <Button className='bg-red-700 text-white hover:bg-red-600' onClick={open}>Delete</Button>
                </Group>) : (<div></div>)}
                </div>
                

            </Card>

            {/* Delete Movie Model */}
            <Modal opened={opened} onClose={close} title="Delete Movie">
                <Group >
                    {<Text className='font-semibold text-lg'>Are you sure you want to delete {movie.title} ?</Text>}

                    <div className='flex justify-center align-middle items-center  gap-5'>
                        <Button className='bg-green-800 hover:bg-green-600 text-white' onClick={handleMovieDelete}>Yes</Button>
                        <Button className='bg-black text-white hover:bg-slate-900' onClick={close}>No</Button>
                    </div>

                </Group>
            </Modal>

        </div>
    )
}

