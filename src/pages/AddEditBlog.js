import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import './grid.css';

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Din",
  "Insanbilim",
  "Yontembilim",
  "Dünya",

];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description, box1a, box1b, box1c, box2, box3a, box3b, box3c, box4, box5a, box5b, box5c, box6a, box6b, box6c, box7, box8, box9, box10, box11a, box11b, box11c, box12a, box12b, box12c, box13, box14a, box14b, box14c, box15a, box15b, box15c, box16, box17a, box17b, box17c, box17e, box17f, box17g, box18a, box18b, box18c } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Yükleme oranı: " + progress);
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Dosya yüklemesi durduruldu.");
              break;
            case "running":
              console.log("Dosya yüklemesi devam ediyor.");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Resim başarıyla yüklendi.");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Proje başarıyla oluşturuldu.");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Proje başarıyla güncellendi.");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("Tüm metin alanlarının doldurulması gerekmektedir.");
    }

    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Tablo Düzelt" : "Tablo Oluştur"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-xs-12 col-md-8 col-lg-6">
            <form className="col-12 blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Konu"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Anahtar Kelime (yazdıktan sonra 'enter'a basınız)"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Bu yeni bir fikir mi?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Evet&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Hayır
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Kategori Seç</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-d-md-block none">
                <div className="content">
                  <div className="box1">
                    <div className="box1a"><input className='w-100 h-100' placeholder="1a-->" name="box1a"
                      value={box1a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box1b"><input className='w-100 h-100' placeholder="1b-->" name="box1b"
                      value={box1b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box1c"><input className='w-100 h-100' placeholder="1c-->" name="box1c"
                      value={box1c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box2"><input className='w-100 h-100' placeholder="2-->" type="text" name="box2"
                    value={box2}
                    onChange={handleChange} /></div>
                  <div className="box3">
                    <div className="box3a"><input className='w-100 h-100' placeholder="3a-->" name="box3a"
                      value={box3a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box3b"><input className='w-100 h-100' placeholder="3b-->" name="box3b"
                      value={box3b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box3c"><input className='w-100 h-100' placeholder="3c-->" name="box3c"
                      value={box3c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box4"><input className='w-100 h-100' placeholder="4-->" name="box4"
                    value={box4}
                    onChange={handleChange} type="text" /></div>
                  <div className="box5">
                    <div className="box5a"><input className='w-100 h-100' placeholder="5a-->" name="box5a"
                      value={box5a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box5b"><input className='w-100 h-100' placeholder="5b-->" name="box5b"
                      value={box5b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box5c"><input className='w-100 h-100' placeholder="5c-->" name="box5c"
                      value={box5c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box6">
                    <div className="box6a"><input className='w-100 h-100' placeholder="6a-->" name="box6a"
                      value={box6a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box6b"><input className='w-100 h-100' placeholder="6b-->" name="box6b"
                      value={box6b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box6c"><input className='w-100 h-100' placeholder="6c-->" name="box6c"
                      value={box6c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box7"><input placeholder="7-->" name="box7"
                    value={box7}
                    onChange={handleChange} type="text" /></div>
                  <div className="box8"><input placeholder="8-->" name="box8"
                    value={box8}
                    onChange={handleChange} type="text" /></div>
                  <div className="box9"><input placeholder="9-->" name="box9"
                    value={box9}
                    onChange={handleChange} type="text" /></div>
                  <div className="box10"><input placeholder="10-->" name="box10"
                    value={box10}
                    onChange={handleChange} type="text" /></div>
                  <div className="box11">
                    <div className="box11a"><input className='w-100 h-100' placeholder="11a-->" name="box11a"
                      value={box11a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box11b"><input className='w-100 h-100' placeholder="11b-->" name="box11b"
                      value={box11b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box11c"><input className='w-100 h-100' placeholder="11c-->" name="box11c"
                      value={box11c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box12">
                    <div className="box12a"><input className='w-100 h-100' placeholder="12a-->" name="box12a"
                      value={box12a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box12b"><input className='w-100 h-100' placeholder="12b-->" name="box12b"
                      value={box12b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box12c"><input className='w-100 h-100' placeholder="12c-->" name="box12c"
                      value={box12c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box13"><input className='w-100 h-100' placeholder="13-->" name="box13"
                    value={box13}
                    onChange={handleChange} type="text" /></div>
                  <div className="box14">
                    <div className="box14a"><input className='w-100 h-100' placeholder="14a-->" name="box14a"
                      value={box14a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box14b"><input className='w-100 h-100' placeholder="14b-->" name="box14b"
                      value={box14b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box14c"><input className='w-100 h-100' placeholder="14c-->" name="box14c"
                      value={box14c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box15">
                    <div className="box15a"><input className='w-100 h-100' placeholder="15a-->" name="box15a"
                      value={box15a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box15b"><input className='w-100 h-100' placeholder="15b-->" name="box15b"
                      value={box15b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box15c"><input className='w-100 h-100' placeholder="15c-->" name="box15c"
                      value={box15c}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box16"><input className='w-100 h-100' placeholder="16-->" name="box16"
                    value={box16}
                    onChange={handleChange} type="text" /></div>
                  <div className="box17">
                    <div className="box17a"><input placeholder="17a-->" className='w-100 h-100' name="box17a"
                      value={box17a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box17b"><input placeholder="17b-->" className='w-100 h-100' name="box17b"
                      value={box17b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box17c"><input placeholder="17c-->" className='w-100 h-100' name="box17c"
                      value={box17c}
                      onChange={handleChange} type="text" /></div>
                    <div className="box17d"></div>
                    <div className="box17e"><input placeholder="17e-->" className='w-100 h-100' name="box17e"
                      value={box17e}
                      onChange={handleChange} type="text" /></div>
                    <div className="box17f"><input placeholder="17f-->" className='w-100 h-100' name="box17f"
                      value={box17f}
                      onChange={handleChange} type="text" /></div>
                    <div className="box17g"><input placeholder="17g-->" className='w-100 h-100' name="box17g"
                      value={box17g}
                      onChange={handleChange} type="text" /></div>
                  </div>
                  <div className="box18">
                    <div className="box18a"><input placeholder="18a-->" className='w-100 h-100' name="box18a"
                      value={box18a}
                      onChange={handleChange} type="text" /></div>
                    <div className="box18b"><input placeholder="18b-->" className='w-100 h-100' name="box18b"
                      value={box18b}
                      onChange={handleChange} type="text" /></div>
                    <div className="box18c"><input placeholder="18c-->" className='w-100 h-100' name="box18c"
                      value={box18c}
                      onChange={handleChange} type="text" />
                    </div>
                  </div>
                  <div className="box19">
                    <div className="cont1">
                      <div className="col-12 py-3">
                        <textarea
                          className="form-control description-box"
                          placeholder="Tablo Hakkında Yaz"
                          value={description}
                          name="description"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="cont2">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                    <div className="cont3">
                      <div><p>Yalnızca jpg, jpeg ve gif uzantılı dosyalar.. <br />Lütfen resim yüklendi mesajını bekleyiniz.</p></div>
                    </div>
                    <div className="cont4">
                      <div className="col-12 py-3 text-center">
                        <button
                          className="btn btn-add"
                          type="submit"
                          disabled={progress !== null && progress < 100}
                        >
                          {id ? "Düzelt" : "Kaydet"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row detdesc">
                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Tablo Hakkında Yaz"
                    value={description}
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div><p>Yalnızca jpg, jpeg ve gif uzantılı dosyalar.. <br />Lütfen resim yüklendi mesajını bekleyiniz.</p></div>
                <div className="col-12 py-3 text-center">
                  <button
                    className="btn btn-add"
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    {id ? "Düzelt" : "Kaydet"}
                  </button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
