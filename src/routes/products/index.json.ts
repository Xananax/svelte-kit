// This file is generated from an npm script. If it doesn't exist, it means you neglected to
// run the proper script
// @ts-ignore
import { StatusCodes } from 'http-status-codes'
import body from './productsData.json'

export async function get() {
  return {
    status: StatusCodes.OK,
    body
  }
}
