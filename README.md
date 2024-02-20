<p align="center">
    <h1 align="center">Communica Social</h1>
</p>
<p align="center">
    <em>A social media app.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/michaelpeluso/Communica-Social?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/michaelpeluso/Communica-Social?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/michaelpeluso/Communica-Social?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat&logo=Bootstrap&logoColor=white" alt="Bootstrap">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<br>
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>

---

##  Overview

<p>Communica Social is a full stack web application, serving as an online hub for users to make and read online posts. This project uses a custom-built, backend CRUD API that makes requests to a MongoDB database holding over 300 documents.</p>

Communica Social is comprised of a 3 core pages:
- Login - Users are prompted to log in with a username and ID. This allows them to create, manage, and delete their posts.
- User Catalog - This is where all current users can be viewed. Users can search for a user of choice in order to view their respective posts.
- Post Feed - This is a public display of all past posts by all users. Each post includes features like a title, discription, tags, timestamp, creator, etc.

---

##  Repository Structure

```sh
└── Communica-Social/
    ├── backend
    │   ├── api
    │   │   ├── posts.controller.js
    │   │   ├── users.controller.js
    │   │   └── users.route.js
    │   ├── dao
    │   │   ├── postsDAO.js
    │   │   └── usersDAO.js
    │   ├── index.js
    │   ├── package-lock.json
    │   ├── package.json
    │   └── server.js
    └── frontend
        ├── README.md
        ├── package-lock.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        └── src
            ├── App.css
            ├── App.js
            ├── App.test.js
            ├── components
            │   ├── PostsList.js
            │   ├── addPost.js
            │   ├── login.js
            │   ├── user.js
            │   └── usersList.js
            ├── index.css
            ├── index.js
            ├── logo.svg
            ├── reportWebVitals.js
            ├── services
            │   └── usersDataService.js
            └── setupTests.js
```

---
<!--
##  Modules

<details closed><summary>frontend</summary>

| File                                                                                                          | Summary                         |
| ---                                                                                                           | ---                             |
| [package.json](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/package.json)           | <code>► INSERT-TEXT-HERE</code> |
| [package-lock.json](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/package-lock.json) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>frontend.src</summary>

| File                                                                                                                | Summary                         |
| ---                                                                                                                 | ---                             |
| [App.test.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/App.test.js)               | <code>► INSERT-TEXT-HERE</code> |
| [App.css](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/App.css)                       | <code>► INSERT-TEXT-HERE</code> |
| [index.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/index.js)                     | <code>► INSERT-TEXT-HERE</code> |
| [reportWebVitals.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/reportWebVitals.js) | <code>► INSERT-TEXT-HERE</code> |
| [index.css](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/index.css)                   | <code>► INSERT-TEXT-HERE</code> |
| [setupTests.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/setupTests.js)           | <code>► INSERT-TEXT-HERE</code> |
| [App.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/App.js)                         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>frontend.src.components</summary>

| File                                                                                                               | Summary                         |
| ---                                                                                                                | ---                             |
| [addPost.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/components/addPost.js)     | <code>► INSERT-TEXT-HERE</code> |
| [login.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/components/login.js)         | <code>► INSERT-TEXT-HERE</code> |
| [PostsList.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/components/PostsList.js) | <code>► INSERT-TEXT-HERE</code> |
| [usersList.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/components/usersList.js) | <code>► INSERT-TEXT-HERE</code> |
| [user.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/components/user.js)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>frontend.src.services</summary>

| File                                                                                                                           | Summary                         |
| ---                                                                                                                            | ---                             |
| [usersDataService.js](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/src/services/usersDataService.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>frontend.public</summary>

| File                                                                                                         | Summary                         |
| ---                                                                                                          | ---                             |
| [manifest.json](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/public/manifest.json) | <code>► INSERT-TEXT-HERE</code> |
| [robots.txt](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/public/robots.txt)       | <code>► INSERT-TEXT-HERE</code> |
| [index.html](https://github.com/michaelpeluso/Communica-Social/blob/master/frontend/public/index.html)       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>backend</summary>

| File                                                                                                         | Summary                         |
| ---                                                                                                          | ---                             |
| [index.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/index.js)                   | <code>► INSERT-TEXT-HERE</code> |
| [server.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/server.js)                 | <code>► INSERT-TEXT-HERE</code> |
| [package.json](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/package.json)           | <code>► INSERT-TEXT-HERE</code> |
| [package-lock.json](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/package-lock.json) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>backend.api</summary>

| File                                                                                                                 | Summary                         |
| ---                                                                                                                  | ---                             |
| [users.route.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/api/users.route.js)           | <code>► INSERT-TEXT-HERE</code> |
| [users.controller.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/api/users.controller.js) | <code>► INSERT-TEXT-HERE</code> |
| [posts.controller.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/api/posts.controller.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>backend.dao</summary>

| File                                                                                                 | Summary                         |
| ---                                                                                                  | ---                             |
| [postsDAO.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/dao/postsDAO.js) | <code>► INSERT-TEXT-HERE</code> |
| [usersDAO.js](https://github.com/michaelpeluso/Communica-Social/blob/master/backend/dao/usersDAO.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

---
-->
##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**: `version x.y.z`

###  Installation

1. Clone the Communica-Social repository:

```sh
git clone https://github.com/michaelpeluso/Communica-Social
```

2. Change to the project directory:

```sh
cd Communica-Social
```

3. Install the dependencies:

```sh
npm install
```

###  Running Communica-Social

Use the following command to run Communica-Social:

```sh
node app.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---
