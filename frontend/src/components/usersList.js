import React, { useState, useEffect } from "react";
import UserDataService from "../services/usersDataService";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    useEffect(() => {
        retrieveUsers();
    }, []);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    const retrieveNextPage = () => {
        if (currentSearchMode === "findByTitle") {
            findByTitle();
        } else {
            retrieveUsers();
        }
    };

    const retrieveUsers = () => {
        setCurrentSearchMode("");
        UserDataService.getAll(currentPage)
            .then((response) => {
                console.log(response.data);
                setUsers(response.data.users);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const find = (query, by) => {
        UserDataService.find(query, by, currentPage)
            .then((response) => {
                console.log(response.data);
                setUsers(response.data.users);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        setCurrentSearchMode("findByTitle");
        find(searchTitle, "title");
    };

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByTitle}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {users.map((user) => {
                        return (
                            <Col>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img src={user.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{user.title}</Card.Title>
                                        <Card.Text>{user.plot}</Card.Text>
                                        <Link to={"/users/" + user._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <br />
                Showing Page: {currentPage}
                <Button
                    variant="link"
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                    Get Next {entriesPerPage} Results
                </Button>
            </Container>
        </div>
    );
};

export default UsersList;
