import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserList from "./components/usersList";
import AddPost from "./components/addPost";
//import PostList from "./components/postList";
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
                <Navbar.Brand>User Posts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to={"/users"}>Users</Link>
                        </Nav.Link>
                        <Nav.Link>{user ? <a>Logout User</a> : <Link to={"/login"}>Login</Link>}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Route to respective pages */}
            <Switch>
                <Route exact path={["/", "/mp272_users"]} component={UserList}></Route>
                <Route path="/mp272_user/:id/post" render={(props) => <AddPost {...props} user={user} />}></Route>
                <Route path="/mp272_users/:id/" render={(props) => <User {...props} user={user} />}></Route>
                <Route path="/mp272_login" render={(props) => <Login {...props} login={login} />}></Route>
            </Switch>
        </div>
    );
}

export default App;
