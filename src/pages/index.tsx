/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link'
import { Grid, Link, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import db from '../db'
import Product from '../db/models/Product'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Store } from '../store'
import ProductItem from '../components/ProductItem.tsx'
import useStyles from '../styles/styles'

export default function Home (props) {
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { topRatedProducts, featuredProducts } = props

  return (
    <Layout>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps () {
  await db.connect()
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3)
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1
    })
    .limit(6)
  await db.disconnect()
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj)
    }
  }
}
