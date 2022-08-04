import React, { useState, useEffect } from "react";
import Projects from './Projects';
import axios from 'axios';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

const Search = ({ blogs, user, db }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [trendBlogs, setTrendBlogs] = useState([]);
    const [topic, setTopic] = useState([]);

    //!!!fetching the data as array
    const titles = blogs.map(blog => blog);
    // console.log(titles);
    // console.log(blogs.doc);
    const query = (Object.keys(titles[0]));

    const queryDetails = (Object.values(query))
    // console.log(query);
    // console.log(queryDetails);





    // !!!fetching the data as objects
    const title = titles.forEach(doc => {
        const deneme = [];
        deneme.push(doc)

        // shows entries as objects
        // console.log(doc);


        //shows entries an objects in array
        console.log(deneme);

        const query = (Object.keys(doc));
        // shows each key in an array
        // console.log(query)

        //shows each index in an array
        // console.log(Object.keys(query))

        const deneme3 = deneme.filter(checkTitle);

        function checkTitle(title) {
            return (Object.keys(deneme)) == 'deneme'
        }

        console.log(Object.values(deneme))
        // console.log(deneme3)


        const findSearchterm = ({ key }) => {
            return `${key}` == 'deneme'
        }
        const deneme2 = deneme.map(findSearchterm);

        // console.log(deneme)

        // for (const [key, value] of Object.entries(query)) {
        //     console.log(`${key}:${value}`)
        // }


    });


    // useEffect(() => {
    //     getTitles(title);
    // }, []);

    // const getTitles = (title) => {
    //     setLoading(true);
    //     let result = result = title.map(title);
    //     console.log('result: ' + result)
    //     setLoading(false);
    // }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (searchTerm && user) {
    //         getTitle(titles === searchTerm);
    //     }
    // };

    return (
        <div>
            {/* <form className="search" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search a movie..."
                    onSubmit={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form> */}
            <div className="d-flex justify-content-center flex-wrap">
                {loading ? (
                    <div className="spinner-border text-primary m-5" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    blogs?.map((blog) => <Projects
                        blogs={blogs}
                        user={user}
                        key={blog.id}
                        {...blog} />)
                )}
            </div>
        </div>
    )
}

export default Search