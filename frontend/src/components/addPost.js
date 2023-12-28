/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import React, { useState } from "react";
import UserDataService from "../services/usersDataService";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

// create a post
const AddPost = (props) => {
    let editing = false;
    let initialPostState = "";

    //check state
    if (props.location.state && props.location.state.currentPost) {
        editing = true;
        initialPostState = props.location.state.currentPost.post;
    }

    // variables
    const [title, setTitle] = useState(initialPostState);
    const [body, setBody] = useState(initialPostState);
    // keeps track if post is submitted
    const [submitted, setSubmitted] = useState(false);

    // input changes
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeBody = (e) => {
        setBody(e.target.value);
    };

    // submit post
    const savePost = () => {
        var data = {
            // create request variable
            title: title,
            body: body,
            user_id: props.user.id,
            username: props.user.username,
        };
        // editing
        if (editing) {
            // get existing post id
            data.post_id = props.location.state.currentPost._id;
            UserDataService.updatePost(data)
                .then((response) => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            console.log(data);
            UserDataService.createPost(data) // send request
                .then((response) => {
                    setSubmitted(true);
                })
                .catch((e) => {});
        }
    };

    // return page content
    return (
        <Container className="mt-3">
            {submitted ? (
                <div>
                    <h4>Post submitted successfully</h4>
                    <Link to="/mp272/posts">Back to posts</Link>
                </div>
            ) : (
                <Form className="text-center d-flex flex-column align-items-center mb-3">
                    {/* User Input */}
                    <Form.Group className="w-75">
                        <Form.Label>
                            <h2 className="my-2">{editing ? "Edit" : "Create"} Post</h2>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Title" required value={title} onChange={onChangeTitle} />
                        <Form.Control className="my-3" as="textarea" rows={3} placeholder="Body" required value={body} onChange={onChangeBody} />
                    </Form.Group>
                    {/* Submit Button */}
                    <Button variant="primary" onClick={savePost}>
                        Submit
                    </Button>
                </Form>
            )}
        </Container>
    );
};

// send data
export default AddPost;
