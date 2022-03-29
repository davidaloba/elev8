import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: true
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: false
    }
  ],
  posts: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      isFeatured: true,
      featuredImage: '/images/banner1.jpg',
      price: 70,
      author: 'Nike',
      likes: 4.5,
      numComments: 10,
      countInStock: 20,
      description: 'A popular shirt'
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      isFeatured: true,
      featuredImage: '/images/banner2.jpg',
      price: 80,
      author: 'Adidas',
      likes: 4.2,
      numComments: 10,
      countInStock: 20,
      description: 'A popular shirt'
    },
    {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      price: 90,
      author: 'Raymond',
      likes: 4.5,
      numComments: 10,
      countInStock: 20,
      description: 'A popular shirt'
    },
    {
      name: 'Golf Pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 90,
      author: 'Oliver',
      likes: 4.5,
      numComments: 10,
      countInStock: 20,
      description: 'Smart looking pants'
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 95,
      author: 'Zara',
      likes: 4.5,
      numComments: 10,
      countInStock: 20,
      description: 'A popular pants'
    },
    {
      name: 'Classic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      price: 75,
      author: 'Casely',
      likes: 4.5,
      numComments: 10,
      countInStock: 20,
      description: 'A popular pants'
    }
  ]
}
export default data
