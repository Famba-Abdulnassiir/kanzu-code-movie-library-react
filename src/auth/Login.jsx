import { useState, useContext } from "react";
import { TextInput, Checkbox, Button, Group, Box, Image } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useNavigate, Link } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { jwtDecode } from "jwt-decode";


export default function Login() {
    const loginurl = 'http://localhost:8080/api/v1/auth/login'
    const [error, setError] = useState([])
    const { setUser, token, setToken} = useContext(MovieContext)


    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const navigate = useNavigate();
    

    const handleSubmit = (values) => {
        const { email, password } = form.values;
        fetch(loginurl, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        }).then(response => {
            if (response.ok) {
                return response.json(); // Parse the response body as JSON
            } else {
                throw new Error('Login Failed. Check your Username or Password');
            }
        }).then(data => {
            const decoded = jwtDecode(data.access_token);
            const user = {
                username: decoded.userName,
                email: decoded.email,
                role: decoded.role,
            };
            setUser(user);
            const token = data.access_token;
            localStorage.setItem('token', token);
            navigate('/');
            setToken(token);
        }).catch(error => {
            setError(error.message);
            console.log(error.message);
        });
    }

    return (
        <>
            <div className='bg-cover bg-center min-h-screen flex justify-center items-center' style={{ backgroundImage: "url('/bg-image.jpg')" }}>
                <Box maw={400} mx="auto" className='bg-white rounded-md p-10 shadow-md w-96'>
                    <div className=''>
                        <p className='text-center mb-1 text-2xl text-gray-900 font-bold'>Join us today!</p>
                        <h1 className=' text-xl text-center font-bold mb-1'>Kanzu Code <span className='text-amber-400'>Movie Lib</span></h1>
                        <p className='mb-2 text-sm text-center'>Your Number one stop for all movies</p>
                        <hr></hr>
                    </div>

                    <h2 className='mb-4 mt-2 font-semibold text-md'>Create an Account</h2>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <div>
                            <label className='mb-2 text-gray-700 font-bold block'>
                                Email<i className="fa-light fa-asterisk text-red-600"></i>
                            </label>
                            <TextInput
                                className="mb-4"
                                placeholder="your@email.com"
                                {...form.getInputProps('email')}
                            />
                        </div>

                        <div>
                            <label className='mb-2 text-gray-700 font-bold block'>
                                Password<i className="fa-light fa-asterisk text-red-600"></i>
                            </label>
                            <TextInput
                                type="password"
                                placeholder="Enter Password"
                                {...form.getInputProps('password')}
                            />
                        </div>

                        <Group position="center" mt="md">
                            <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</Button>
                        </Group>
                        <p>{error}</p>
                    </form>
                    <div className='text-center mt-5'>
                        <p className='text-sm text-gray-600'>Not a member? <Link to={'/auth/signup'} className='text-blue-500 hover:underline'>Signup</Link> || <Link to={'/'} className='text-blue-500 hover:underline'>Home</Link></p>
                    </div>
                </Box>
            </div>

        </>

    )

}
