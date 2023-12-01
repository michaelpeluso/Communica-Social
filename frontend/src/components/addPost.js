import React, { useState } from "react";
import UserDataService from "../services/usersDataService";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddPost = (props) => {
    let editing = false;
    let initialPostState = "";

    if (props.location.state && props.location.state.currentPost) {
        editing = true;
        initialPostState = props.location.state.currentPost.post;
    }

    const [post, setPost] = useState(initialPostState);
    // keeps track if post is submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangePost = (e) => {
        const post = e.target.value;
        setPost(post);
    };

    const savePost = () => {
        var data = {
            post: post,
            name: props.user.name,
            user_id: props.user.id,
            // get user id direct from url
            user_id: props.match.params.id,
        };
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
            UserDataService.createPost(data)
                .then((response) => {
                    setSubmitted(true);
                })
                .catch((e) => {});
        }
    };

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Post submitted successfully</h4>
                    <Link to={"/users/" + props.match.params.id}>Back to User</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Post</Form.Label>
                        <Form.Control type="text" required value={post} onChange={onChangePost} />
                    </Form.Group>
                    <Button variant="primary" onClick={savePost}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default AddPost;
