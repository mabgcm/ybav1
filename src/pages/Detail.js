import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import { db } from "../firebase";
import './grid.css'

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };

    getBlogsData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                Yazar <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <div className="col-sm-12">
                <div className="content">
                  <div className="box1">
                    <div className="box1a">{blog?.box1a}</div>
                    <div className="box1b">{blog?.box1b}</div>
                    <div className="box1c">{blog?.box1c}</div>
                  </div>
                  <div className="box2">{blog?.box2}</div>
                  <div className="box3">
                    <div className="box3a">{blog?.box3a}</div>
                    <div className="box3b">{blog?.box3b}</div>
                    <div className="box3c">{blog?.box3c}</div>
                  </div>
                  <div className="box4">{blog?.box4}</div>
                  <div className="box5">
                    <div className="box5a">{blog?.box5a}</div>
                    <div className="box5b">{blog?.box5b}</div>
                    <div className="box5c">{blog?.box5c}</div>
                  </div>
                  <div className="box6">
                    <div className="box6a">{blog?.box6a}</div>
                    <div className="box6b">{blog?.box6b}</div>
                    <div className="box6c">{blog?.box6c}</div>
                  </div>
                  <div className="box7"><p>{blog?.box7}</p></div>
                  <div className="box8"><p>{blog?.box8}</p></div>
                  <div className="box9"><p>{blog?.box9}</p></div>
                  <div className="box10"><p>{blog?.box10}</p></div>
                  <div className="box11">
                    <div className="box11a">{blog?.box11a}</div>
                    <div className="box11b">{blog?.box11b}</div>
                    <div className="box11c">{blog?.box11c}</div>
                  </div>
                  <div className="box12">
                    <div className="box12a">{blog?.box12a}</div>
                    <div className="box12b">{blog?.box12b}</div>
                    <div className="box12c">{blog?.box12c}</div>
                  </div>
                  <div className="box13">{blog?.box13}</div>
                  <div className="box14">
                    <div className="box14a">{blog?.box14a}</div>
                    <div className="box14b">{blog?.box14b}</div>
                    <div className="box14c">{blog?.box14c}</div>
                  </div>
                  <div className="box15">
                    <div className="box15a">{blog?.box15a}</div>
                    <div className="box15b">{blog?.box15b}</div>
                    <div className="box15c">{blog?.box15c}</div>
                  </div>
                  <div className="box16">{blog?.box16}</div>
                  <div className="box17">
                    <div className="box17a">{blog?.box17a}</div>
                    <div className="box17b">{blog?.box17b}</div>
                    <div className="box17c">{blog?.box17c}</div>
                    <div className="box17d"></div>
                    <div className="box17e">{blog?.box17e}</div>
                    <div className="box17f">{blog?.box17f}</div>
                    <div className="box17g">{blog?.box17g}</div>
                  </div>
                  <div className="box18">
                    <div className="box18a">{blog?.box18a}</div>
                    <div className="box18b">{blog?.box18b}</div>
                    <div className="box18c">{blog?.box18c}</div>
                  </div>
                  <div className="box19">
                    <div className="cont1">
                      <div className="detdesc col-dm-6 d-sm-block">
                        <hr />
                        <p className="text-start">{blog?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
