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

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";

const User = (props) => {
    // data variable
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

    // useEffects
    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    // find user with id
    const getUser = (id) => {
        UserDataService.getUser(id)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // get posts user made
    const getUserPosts = (id) => {
        UserDataService.getUserPosts(id)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // print user info
    const renderNestedValues = (obj, depth = 0) => {
        return Object.entries(obj).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                return (
                    <div key={key} style={{ marginLeft: `${depth * 20}px` }}>
                        <strong>{key}:</strong>
                        {renderNestedValues(value, depth + 1)}
                    </div>
                );
            } else {
                return (
                    <div key={key} style={{ marginLeft: `${depth * 20}px` }}>
                        <strong>{key}:</strong> {value}
                    </div>
                );
            }
        });
    };

    // print
    const renderPosts = (posts) => {
        posts.forEach((post) => {});
    };

    // handle deleting a post
    const deletePost = (post, user) => {
        if (user) {
            if (user.id == post.user_id) {
                // if they made the post
                return (
                    <div>
                        <br />
                        <Button
                            variant="link"
                            onClick={() =>
                                UserDataService.deletePost(post._id, post.user_id) // send request
                                    .then((res) => {
                                        alert("Successfully deleted. Reload the page.");
                                    })
                                    .catch((e) => {
                                        console.log(e);
                                    })
                            }
                        >
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    };

    // return page content
    return (
        <div>
            <br />
            <Container>
                <Row>
                    <Col>
                        <Image src={user.picture.large} width={300} fluid />
                        <br />
                        <br />
                        <Card>
                            <Card.Header as="h5">{user.login.username}</Card.Header>
                            <Card.Body>{renderNestedValues(user)}</Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Col>
                            <Card.Header as="h5">Posts</Card.Header>
                            {user.posts &&
                                user.posts.map((post, index) => (
                                    <Card key={index}>
                                        <Card.Header as="h4">{post.title}</Card.Header>
                                        <Card.Body>
                                            <p style={{ fontSize: "x-large" }}>{post.body}</p>
                                            <br />
                                            <p>Likes: {post.likes}</p>
                                            <p>
                                                Author: <Link to={"/mp272/users/" + post.user_id}>{post.username}</Link>{" "}
                                            </p>
                                            <p>Posted On: {new Date(Date.parse(post.lastModified)).toDateString()}</p>
                                            <p>Post ID: {post._id}</p>
                                            <div>{deletePost(post, props.user)}</div>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// send data
export default User;
