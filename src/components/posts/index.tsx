import React from 'react'
import { PostSummary, Grid } from '../'

export const Posts: React.FC = ({ popularPosts }) => {
  const posts = popularPosts

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <Grid>
        {posts.map((post) => (
          <PostSummary
            post={post}
            key={post.slug}
          />
        ))}
      </Grid>
    </section>
  )
}
