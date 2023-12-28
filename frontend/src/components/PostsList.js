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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const PostsList = (props) => {
    // variables
    const [posts, setPosts] = useState([]);
    const [uName, setUName] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    // useEffects
    useEffect(() => {
        retrieveUsers();
    }, []);
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    // change pages
    const retrieveNextPage = () => {
        if (currentSearchMode === "findByTitle") {
            querySearch();
        } else {
            retrieveUsers();
        }
    };

    // get all users
    const retrieveUsers = () => {
        setCurrentSearchMode("");
        UserDataService.getAllPosts(currentPage) // send request
            .then((response) => {
                setPosts(response.data);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // update query
    const querySearch = () => {
        const query = {
            uname: uName,
            fname: fName,
            lname: lName,
        };
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
            <Container className="my-4 w-75">
                {/* Displaying the posts */}
                <Row>
                    {posts.users &&
                        posts.users.map((post) => (
                            <div key={post._id} className="mb-4">
                                {/* Individual post card */}
                                <Card>
                                    {/* Post header */}
                                    <Card.Header className="fs-3 fw-normal">{post.parent_id ? `Replying to: ${post.parent_id}` : post.title}</Card.Header>
                                    <Card.Body>
                                        {/* Post body */}
                                        <p className="fs-4 fw-normal">{post.body}</p>
                                        {/* Likes count */}
                                        <p className="text-muted">Likes: {post.likes ? post.likes : 0}</p>
                                        {/* Author information */}
                                        <p>
                                            Author: <Link to={`/mp272/users/${post.user_id}`}>{post.username}</Link>
                                        </p>
                                        {/* Posted timestamp */}
                                        <p>Posted On: {new Date(Date.parse(post.lastModified || post.date)).toDateString()}</p>
                                        {/* Post ID */}
                                        <p>Post ID: {post._id}</p>
                                        {/* Delete button */}
                                        <div>{deletePost(post, props.user)}</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </Row>
                {/* Load more button */}
                <div className="d-flex justify-content-center my-4">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                        }}
                    >
                        Load More
                    </Button>
                </div>
            </Container>
        </div>
    );
};

// send data
export default PostsList;
