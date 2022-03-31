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
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
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
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      }
    }
  ],
  posts: [
    {
      title: 'From Server-side Rendering to Static Generation',
      author: {
        name: 'mistertaavetti',
        avatar: '/avatar.png',
        biography: 'We are a goo'
      },
      slug: 'from-server-side-rendering-to-static-generation',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      category: 'category',
      likes: 1,
      comments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      featuredImage: '/bg.jpg',
      isFeatured: true,
      date: '22nd March 2022'
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      author: {
        name: 'author',
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      },
      slug: 'lorem-ipsum-dolor-sit-amet',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      category: 'category',
      likes: 1,
      comments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      featuredImage: '/bg.jpg',
      isFeatured: true,
      date: '22nd March 2022'
    },
    {
      title: 'consectetur adipiscing elit',
      author: {
        name: 'author',
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      },
      slug: 'consectetur-adipiscing-elit',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      category: 'category',
      likes: 1,
      comments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      featuredImage: '/bg.jpg',
      isFeatured: true,
      date: '22nd March 2022'
    },
    {
      title: 'sed do eiusmod tempor incididunt ut labore',
      author: {
        name: 'author',
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      },
      slug: 'sed-do-eiusmod-tempor-incididunt-ut-labore ',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      category: 'category',
      likes: 1,
      comments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
      featuredImage: '/bg.jpg',
      isFeatured: true,
      date: '22nd March 2022'
    }
  ]
}
export default data
