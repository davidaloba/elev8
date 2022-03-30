import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: false,
      isAuthor: false
    },
    {
      name: 'John',
      email: 'author@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: false,
      isAuthor: true,
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      }
    },
    {
      name: 'Jane',
      email: 'admin@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: true,
      isAuthor: false
    },
    {
      name: 'John',
      email: 'author@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: true,
      isAuthor: true,
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      }
    }
  ],
  posts: [
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    },
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    },
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    },
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    },
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    },
    {
      title: 'title',
      author: {
        name: 'author',
        avatar: '/icons/nextjs-icon.svg',
        biography: 'String'
      },
      slug: 'slug',
      body: 'body',
      excerpt: 'excerpt',
      category: 'category',
      likes: 1,
      comments: ['comments', 'comments', 'comments'],
      description: 'description',
      featuredImage: '/icons/nextjs-icon.svg',
      isFeatured: true,
      date: 'date'
    }
  ]
}
export default data
