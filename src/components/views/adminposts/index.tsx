import { useEffect, useState } from 'react'

import axios from 'axios'

import { getError } from '@db/error'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchAdminPosts, fetchAdminSummary, fetchData } from '@store/actions'

import {
  Button, Container
} from '@components'

export const AdminPosts = () => {
  const dispatch = useAppDispatch()
  const { admin, user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchData('/api/admin/posts', user.userInfo.token, fetchAdminPosts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isCreatePost, setIsCreatePost] = useState(false)

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState('freebies')
  const [link, setLink] = useState(null)
  const [points, setPoints] = useState(null)
  const [cost, setCost] = useState(null)
  useEffect(() => {
    if (type !== 'premium') setCost(null)
    if (type !== 'tasks') setPoints(null)
    console.log(type)
  }, [type])

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      const { data } = await axios.post(
        '/api/admin/posts',
        {
          slug: slug,
          title: title,
          body: body,
          type: type,
          link: link,
          points: points,
          cost: cost
        },
        {
          headers: { authorization: `Bearer ${user.userInfo.token}` }
        }
      )
      dispatch({ type: 'CREATE_SUCCESS' })
      alert(`${data.title} was created successfully`)
      setIsCreatePost(false)
      setSlug('')
      setTitle('')
      setBody('')
      setType('freebies')
      setLink(null)
      setPoints(null)
      setCost(null)
      fetchData('/api/admin/posts', user.userInfo.token, fetchAdminPosts)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
    } catch (err) {
      alert(getError(err))
    }
  }

  const deleteHandler = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }
    try {
      await axios.delete(`/api/admin/posts/${postId}`, {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      })
      fetchData('/api/admin/posts', user.userInfo.token, fetchAdminPosts)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
      alert('Post deleted successfully')
    } catch (err) {
      alert(getError(err))
    }
  }

  return (
    <section className="mt-24 mb-12">
      <Container>
        <div className=" flex justify-between items-center mb-8">
          <div className=''>
            <div className='text-6xl font-bold '>
              Posts
            </div>
          </div>
          {!isCreatePost && <div>
            <Button
              onClick={() => setIsCreatePost(true)}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </div>}
        </div>
      </Container>
      <Container>
        {isCreatePost && <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
          <Container>
            <form action="">

              <div>
                <label htmlFor="type">Type</label>
                <select
                  type="text"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className='outlined fullWidth'
                  placeholder='select the post type..'
                  required
                >
                  <option value={null} selected disabled >Select your option</option>
                  <option value="freebies">Freebies</option>
                  <option value="tasks">Tasks</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div>
                <label htmlFor="slug">Slug</label>
                <input
                  type='text'
                  name="slug"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type='text'
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="body">Body</label>
                <input
                  type='text'
                  name="body"
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>

                <div>
                  <label htmlFor="link">Link</label>
                  <input
                    type='text'
                    name="link"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className='outlined fullWidth'
                  ></input>
                </div>

              {type === 'tasks' &&
                <div>
                  <label htmlFor="points">Points</label>
                  <input
                    type='number'
                    name="points"
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className='outlined fullWidth'
                    required
                  ></input>
                </div>
              }
              {type === 'premium' && <div>
                <label htmlFor="cost">Cost</label>
                <input
                  type='number'
                  name="cost"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>}
              <div className=' mt-6 ' >
                <button onClick={createHandler} type="button" color="primary">Create</button>
                <div onClick={() => setIsCreatePost(false)} className='mt-2 cursor-pointer'>[X]</div>
              </div>
            </form>
          </Container>
        </div>
        }
        {!isCreatePost && <table>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>SLUG</th>
              <th className='p-4 border-x'>TITLE</th>
              <th className='p-4 border-x'>BODY</th>
              <th className='p-4 border-x'>TYPE</th>
              <th className='p-4 border-x'>TASK</th>
              <th className='p-4 border-x'>POINTS</th>
              <th className='p-4 border-x'>COST</th>
            </tr>
          </thead>
          {!admin.posts
            ? <tbody><tr><td className=' text-3xl font-bold' >loading...</td></tr></tbody>
            : <tbody>
              {admin.posts.length > 0
                ? (admin.posts.map((post) => (
                  <tr key={post.slug} className='border-2' >
                    <td className='p-4 border-x'>{post.slug}</td>
                    <td className='p-4 border-x'>{post.title}</td>
                    <td className='p-4 border-x'>{post.body.substring(0, 120)}...</td>
                    <td className='p-4 border-x'>{post.type}</td>
                    {post.data.link ? <td className='p-4 border-x'>{post.data.link}</td> : <td className='p-4 border-x'>nil</td>}
                    {post.data.points ? <td className='p-4 border-x'>{post.data.points}</td> : <td className='p-4 border-x'>nil</td>}
                    {post.data.cost ? <td className='p-4 border-x'>{post.data.cost}</td> : <td className='p-4 border-x'>nil</td>}
                    <td>
                      <Button
                        onClick={() => deleteHandler(post._id)}
                        size="small"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  )))
                : <tr className='border-2 font-italic ' > <div className=' px-10 py-4 italic' >No posts...  </div> </tr>
              }
            </tbody>}
        </table>}
      </Container>
    </section>
  )
}
