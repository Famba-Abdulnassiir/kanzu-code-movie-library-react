import React, { useState, useEffect, useContext } from 'react';
import { Card, Image, Text, Badge, Button, RingProgress, TextInput, Modal, Group, CardSection, NumberInput, Notification, rem} from '@mantine/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconX, IconCheck} from '@tabler/icons-react';
import  MovieContext from '../context/MovieContext';



const MoviesCard = () => {
    // const [movies, setMovies] = useState([]);
    // const {fetchAllMovies} = useContext(MovieContext)
    const { fetchAllMovies, movies, setMovies,token, setToken,user, setUser } = useContext(MovieContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const movieUploadUrl = 'http://localhost:8080/api/v1/movies/'

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            releaseYear: '',
            director: '',
            rating: '',
            imageUrl: '',
            // trailorUrl: ''

        },
    });

    useEffect(() => {
        fetchAllMovies();
    }, [])

    //     const fetchMovies = async () => {
    //         try {
    //             const response = await fetch('https://kanzu-code-movie-library-backend.onrender.com/api/v1/movies');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setMovies(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             setError('Error fetching data');
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchMovies();
    // }, []);

    // if (isLoading) {
    //     return <>
    //         <div className='flex justify-center items-center mx-auto flex-col'>
    //             <Loader color="blue" />
    //         </div>

    //     </>
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    //Start here.
    const handleImageUpload = async (values) => {
        setIsLoading(true);
       

        const formData = new FormData();
        formData.append('imageUrl', selectedFile);
        if(!selectedFile) return movies.imageUrl
        try {
            const imageResponse = await fetch('http://localhost:8080/api/v1/movies/uploadImage', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!imageResponse.ok) {
                throw new Error('Image upload failed');
            }

            const imageData = await imageResponse.json();            
            const imageUrl = imageData.imageUrl.secure_url;
            
            // Now post movie details along with imageUrl
            const movieResponse = await fetch(movieUploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({
                    title: values.title || title,
                    releaseYear: values.releaseYear || releaseYear,
                    description: values.description || description,
                    director: values.director || director,
                    rating: values.rating || rating,
                    imageUrl: imageUrl || imageUrl,
                    //trailorUrl:trailorUrl || trailorUrl
                }),
            });

            if (!movieResponse.ok) {
                throw new Error('Movie upload failed');
            }

            setSuccessMessage('Movie Successfully Uploaded');
            form.reset();

            setTimeout(() => {
                close();
                setSuccessMessage('');
            }, 2300);
        } catch (error) {
            setError('Error uploading movie: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

return (
    <>
        <div className="p-4 bg-[#0f1526]" >
            
            <div className='flex  flex-row justify-between'>
            <h2 className="text-2xl font-bold mb-2 text-white mx-12">All Movies</h2>
                
            {user?.role === 'Admin'?( <Button onClick={open} className='bg-green-900 text-white mr-12'>Create</Button>) : (<div></div>)}
            </div>
            <div className="flex fle-col flex-wrap gap-3 ml-12">
                {movies.map((movie) => (
                        <Link to={`/movies/${movie.id}`} className="lg:w-[18.7%] h-[]">
                            {/* <div className=''> */}
                            <div className='w-full'>
                                <Image
                                    className='h-[20rem]'
                                    src={movie.imageUrl}
                                    height={100}
                                    alt={`${movie.title} poster Image`}
                                />
                            </div>

                            <Text fw={700} className='font-bold text-white my-2'>{movie.title}</Text>

                            <Group className='justify-between'>
                                <Text size="sm" c="dimmed">
                                    Year: {movie.releaseYear}
                                </Text>

                                <Text size="sm" c="dimmed" className='mr-2'>
                                    Rating: {movie.rating}%
                                </Text>
                            </Group>


                            <Badge color="green" variant="light" className='my-2'>
                                Buy or Rent
                            </Badge>
                            {/* </div> */}
                        </Link>
                  ))}
            </div>
        </div>


            {/* {console.log(formData)} */}
        {/* Model of Posting a Movie */}
        <Modal opened={opened} onClose={close} title="Post a Movie" data-autofocus centered>
            <form onSubmit={form.onSubmit(handleImageUpload)}>
                
                <Group>
                    <TextInput className="w-10/12 m-auto"
                        label="Title"
                        placeholder="Input Movie Title"
                        {...form.getInputProps("title")}
                    />

                    <TextInput className="w-10/12 m-auto"
                        label="Movie Description"
                        placeholder="Enter Movie Short Description "
                        {...form.getInputProps("description")}
                    />

                    <NumberInput className="w-10/12 m-auto"
                        label="Year of release"
                        min={1880}
                        max={2024}
                        placeholder="Enter Year of Release"
                        {...form.getInputProps("releaseYear")}
                    />

                    <TextInput className="w-10/12 m-auto"
                        label="Director"
                        placeholder="Enter Movie Director"
                        {...form.getInputProps("director")}
                    />

                    <NumberInput className="w-10/12 m-auto"
                        label="Rating"
                        min={1}
                        max={100}
                        placeholder="Rate the movie from 1 to 100"
                        {...form.getInputProps("rating")}
                    />

                    <div className="border-2 border-dashed p-3 w-10/12 m-auto text-center">
                        <input id="imageUpload" className="m-auto"
                            type='file'
                            label="Movie Poster"
                            placeholder="Upload Your Movie Image"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            // icon={<IconUpload size={14} />}
                        />
                    </div>

                    {/* <TextInput className="w-10/12 m-auto"
                        label="Trailer Url"
                        placeholder="Enter Movie trailer Url"
                        {...form.getInputProps("trailorUrl")}
                    /> */}




                </Group>
                <Button type="submit" className="bg-blue-500 mt-3">Post Movie</Button>
                <br />
            </form>
            {successMessage && (<Notification icon={checkIcon} color="teal" title="Successfully Posted a Movie." mt="md">
            {successMessage}
            </Notification>)}

            

            {isLoading && (<Loader size="md" className="m-auto" />)}
        </Modal>
        {/* End of Movie Post Model */}

    </>
);
 }

export default MoviesCard;