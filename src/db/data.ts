import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      userName: 'user',
      email: 'user@example.com',
      password: bcrypt.hashSync('654321'),
      saves: ['from-server-side-rendering', 'lorem-ipsum-dolor-sit-amet', 'consectetur-adipiscing-elit', 'sed-do-eiusmod-tempor'],
      isAdmin: false,
      isAuthor: false
    },
    {
      userName: 'author',
      email: 'author@example.com',
      password: bcrypt.hashSync('654321'),
      saves: ['from-server-side-rendering', 'lorem-ipsum-dolor-sit-amet', 'consectetur-adipiscing-elit', 'sed-do-eiusmod-tempor'],
      isAdmin: false,
      isAuthor: true,
      authorProfile: {
        name: 'John Doe',
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      }
    },
    {
      userName: 'adminAuthor',
      email: 'author@example.com',
      password: bcrypt.hashSync('654321'),
      saves: ['from-server-side-rendering', 'lorem-ipsum-dolor-sit-amet', 'consectetur-adipiscing-elit', 'sed-do-eiusmod-tempor'],
      isAdmin: true,
      isAuthor: true,
      authorProfile: {
        name: 'Admin Author',
        avatar: '/avatar.png',
        biography: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
      }
    },
    {
      userName: 'admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('654321'),
      saves: ['from-server-side-rendering', 'lorem-ipsum-dolor-sit-amet', 'consectetur-adipiscing-elit', 'sed-do-eiusmod-tempor'],
      isAdmin: true,
      isAuthor: false
    }
  ],
  posts: [
    {
      slug: 'from-server-side-rendering',
      title: 'From Server-side Rendering to Static Generation',
      author: 'adminAuthor',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      featuredImage: '/bg.jpg',
      categories: 'categories',
      isFeatured: true,
      saves: 1,
      comments: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      slug: 'lorem-ipsum-dolor-sit-amet',
      title: 'Lorem ipsum dolor sit amet',
      author: 'adminAuthor',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      featuredImage: '/bg.jpg',
      categories: 'categories',
      isFeatured: true,
      saves: 1,
      comments: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      slug: 'consectetur-adipiscing-elit',
      title: 'consectetur adipiscing elit',
      author: 'adminAuthor',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      featuredImage: '/bg.jpg',
      categories: 'categories',
      isFeatured: true,
      saves: 1,
      comments: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      slug: 'sed-do-eiusmod-tempor',
      title: 'sed do eiusmod tempor incididunt ut labore',
      author: 'adminAuthor',
      body: 'body',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      featuredImage: '/bg.jpg',
      categories: 'categories',
      isFeatured: true,
      saves: 1,
      comments: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    }
  ]
}
export default data
