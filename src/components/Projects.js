import React from 'react'

const Projects = ({ blogs, user }) => {
    const userId = user?.uid;

    return (
        <div className='w-100'>
            {blogs?.map((blog) => (
                <table className="table table-striped mt-3" key={blog.id}>
                    <thead>
                        <tr className='table-primary'>
                            <th scope="col">No</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Yazar</th>
                            <th scope="col">Konu</th>
                            <th scope="col">Kategory</th>
                            <th scope="col">Anahtar Kelime</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{blog.timestamp.toDate().toDateString()}</td>
                            <td>{blog.author}</td>
                            <td>{blog.title}</td>
                            <td>{blog.category}</td>
                            <td>{blog.tags}</td>
                        </tr>
                    </tbody>
                </table>
            ))}

        </div>
    )
}

export default Projects