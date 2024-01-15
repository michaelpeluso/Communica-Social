/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserList from "./components/usersList";
import AddPost from "./components/addPost";
import PostsList from "./components/PostsList";
import User from "./components/user";
import Login from "./components/login";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
    // login logic
    const [user, setUser] = useState(null);
    async function login(user = null) {
        setUser(user);
    }
    async function logout() {
        setUser(null);
    }

    // html output
    return (
        <div className="App">
            {/* nav bar */}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="mx-3">Communica Social</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav mr-auto">
                        <Nav.Link>
                            <Link className="nav-link" to={"/mp272/users"}>
                                Users
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to={"/mp272/posts"}>
                                Posts
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {user && (
                                <Link className="nav-link" to={`/mp272/${user && user.id}/post`}>
                                    Make a Post
                                </Link>
                            )}
                        </Nav.Link>
                        <Nav.Link>
                            {user ? (
                                <Link className="nav-link" to={"/mp272/login"}>
                                    Logged In as {user.username}
                                </Link>
                            ) : (
                                <Link className="nav-link" to={"/mp272/login"}>
                                    Login
                                </Link>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Route to respective pages */}
            <Switch>
                <Route exact path={["/", "/mp272/users"]} component={UserList}></Route>
                <Route path="/mp272/:id/post" render={(props) => <AddPost {...props} user={user} />}></Route>
                <Route path="/mp272/users/:id" render={(props) => <User {...props} user={user} />}></Route>
                <Route path="/mp272/login" render={(props) => <Login {...props} login={login} />}></Route>
                <Route path={["/mp272/posts"]} render={(props) => <PostsList {...props} user={user} />}></Route>
            </Switch>
        </div>
    );
}

export default App;
