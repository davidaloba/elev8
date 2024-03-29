
import { RootState, useAppSelector } from '@store'

import { Container } from '@components'
import { Post } from './post'

export const ViewPost = () => {
  const { posts } = useAppSelector((state: RootState) => state)
  const currentPost = posts.current

  // const [reply, setReply] = useState('')
  // const replyHandler = async () => {
  //   try {
  //     const { data } = await axios.put(`/api/posts/${currentPost.slug}/comments`, {
  //       comment: reply,
  //       userName: user.userInfo.userName,
  //       avatar: user.userInfo.profile.avatar
  //     },
  //     { headers: { authorization: `Bearer ${user.userInfo.token}` } }
  //     )
  //     fetchPosts('/api/posts')
  //   } catch (err) {
  //     alert(getError(err))
  //   }
  // }

  return (
    <Container >
      <section className=''>
        {/* <div className='sticky top-[286px] z-50 py-4 bg-white '> */}
        <div className='py-4 '>
          <Post
            post={currentPost}
            key={currentPost.slug}
          />
          {/* <form className='flex items-center justify-between'>
            <div className="relative mr-4">
              <Avatar src='/avatar.png' type={user.userInfo.userName} width='32' height='32' />
            </div>
            <input
              type='reply'
              name="reply"
              id="reply"
              placeholder='type in your reply...'
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className='text-lg h-auto mr-4 w-full border-[1px] border-slate-200'
            ></input>
            <button onClick={replyHandler} className='py-1 px-2 text-lg  border-0'>Reply</button>
          </form> */}
        </div>
        {/* <div className=''>
          {currentPost.replies && currentPost.replies.map((reply) => (
            <Reply
              reply={reply}
              key={reply._id}
            />
          ))}
        </div> */}
      </section>
    </Container >
  )
}
