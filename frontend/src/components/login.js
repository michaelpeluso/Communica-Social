/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import React, { useState, useEffect } from "react";
import UserDataService from "../services/usersDataService";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

const Login = (props) => {
    // variables
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [user, setUser] = useState({
        gender: null,
        name: {
            title: null,
            first: null,
            last: null,
        },
        location: {
            street: {
                number: null,
                name: null,
            },
            city: null,
            state: null,
            country: null,
            postcode: null,
            coordinates: {
                latitude: null,
                longitude: null,
            },
            timezone: {
                offset: null,
                description: null,
            },
        },
        email: null,
        login: {
            uuid: null,
            username: null,
            password: null,
            salt: null,
            md5: null,
            sha1: null,
            sha256: null,
        },
        dob: {
            date: null,
            age: null,
        },
        registered: {
            date: null,
            age: null,
        },
        phone: null,
        cell: null,
        id: {
            name: null,
            value: null,
        },
        picture: {
            large: null,
            medium: null,
            thumbnail: null,
        },
        nat: "US",
        lastModified: {
            $date: null,
        },
        posts: [],
    });

    // input changes
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangeId = (e) => {
        setId(e.target.value);
    };

    // handle login
    const login = async () => {
        try {
            const response = await getUser(id);
            if (response) {
                props.login({ username: response.login.username, id: response._id });
                console.log(response);
                props.history.push("/");
            }
        } catch (e) {
            alert("User not found.");
            console.log(e);
        }
    };

    // find user by login credentials
    const getUser = async (id) => {
        try {
            const response = await UserDataService.getUser(id);
            setUser(response.data);
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    // return page content
    return (
        <div>
            <Container>
                <Form>
                    {/* user input */}
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={id} onChange={onChangeId} />
                    </Form.Group>
                    {/* submit button */}
                    <Button variant="primary" onClick={login}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

// send data
export default Login;
