import React from 'react'
import { PostSummary, Grid } from '@components'

export const Posts: React.FC = ({ posts, title }) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {title}
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
