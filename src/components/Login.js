import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const feature = [];
    const { login } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory(); /// Dziala jak Link chyba xD

    // console.log(signup)
    // console.log(emailRef.current)

    async function handleSubmit(e) {
        e.preventDefault();



        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            setError("Failed to sign in")
            console.log(error.code)
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log in</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}

export default Login;
