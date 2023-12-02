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

const UsersList = (props) => {
    // variables
    const [users, setUsers] = useState([]);
    const [uName, setUName] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    //useEffects
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
            querySearch();
        } else {
            retrieveUsers();
        }
    };

    // get all users
    const retrieveUsers = () => {
        setCurrentSearchMode("");
        UserDataService.getAll(currentPage)
            .then((response) => {
                setUsers(response.data.users);
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

        UserDataService.find(query, currentPage)
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((e) => {
                console.log(e);
            });

        console.log(users);
    };

    // return page content
    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={uName}
                                    onChange={(e) => {
                                        setUName(e.target.value);
                                    }}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={(e) => {
                                        setFName(e.target.value);
                                    }}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={(e) => {
                                        setLName(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={querySearch}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <br />
                <Row>
                    {users.map((user) => {
                        return (
                            <Col>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img src={user.picture.large} />
                                    <Card.Body>
                                        <Card.Title>{user.login.username}</Card.Title>
                                        <Card.Text>
                                            {user.name.first} {user.name.last}
                                        </Card.Text>
                                        <Link to={"/mp272/users/" + user._id}>View</Link>
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

// send data
export default UsersList;
