import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      email: 'admin@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: true,
      userName: 'admin'
    },
    {
      email: 'user@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: false,
      userName: 'user',
      profile: {
        points: 0,
        dob: '24th April 1997',
        firstName: 'John',
        lastName: 'Doe',
        avatar: '/bg.jpg',
        phone: '08104157669',
        facebook: 'johny555',
        instagram: 'johny555',
        twitter: 'johny555'
      }

    }
  ],
  posts: [
    {
      type: 'tasks',
      slug: 'task-1',
      title: 'Perform tasks to earn points',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: 'https://google.com/',
        points: 5,
        cost: null
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      type: 'freebies',
      slug: 'freebie-1',
      title: 'This content is accessible for to all users',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: null,
        points: null,
        cost: null
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      type: 'premium',
      slug: 'premium-1',
      title: 'This is a premium content',
      body: 'You spend points to view premium content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: null,
        points: null,
        cost: 5
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      type: 'tasks',
      slug: 'task-2',
      title: 'Another tasks to earn points from',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: 'https://google.com/',
        points: 5,
        cost: null
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      type: 'freebies',
      slug: 'freebie-2',
      title: 'Another content free for all users',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: null,
        points: null,
        cost: null
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    },
    {
      type: 'premium',
      slug: 'premium-2',
      title: 'This is another premium content',
      body: 'You spend points to view premium content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.',
      data: {
        link: null,
        points: null,
        cost: 5
      },
      replies: [
        {
          userName: 'jane',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'john',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          userName: 'jude',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]

    }
  ]
}
export default data
