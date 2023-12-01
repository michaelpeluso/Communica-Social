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
    const [user, setUser] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
    });

    const getUser = (id) => {
        UserDataService.get(id)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const deleteReview = (reviewId, index) => {
        UserDataService.deleteReview(reviewId, props.user.id)
            .then((response) => {
                setUser((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return {
                        ...prevState,
                    };
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={user.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{user.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{user.plot}</Card.Text>
                                {props.user && <Link to={"/users/" + props.match.params.id + "/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {user.reviews.map((review, index) => {
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>{review.name + " reviewed on " + new Date(Date.parse(review.date)).toDateString()}</h5>
                                        <p>{review.review}</p>
                                        {props.user && props.user.id === review.user_id && (
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname: "/users/" + props.match.params.id + "/review",
                                                            state: { currentReview: review },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </Media.Body>
                                </Media>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default User;
