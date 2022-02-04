// This file is generated from an npm script. If it doesn't exist, it means you neglected to
// run the proper script
// @ts-ignore
import { StatusCodes } from 'http-status-codes'
import { products } from './productsData'

export async function get() {
  return {
    status: StatusCodes.OK,
    body: products
  }
}
