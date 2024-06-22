"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonLazadaShopeeProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";

export async function scrapeAndStoreProduct(productUrl: string) {
  console.log('scrp')
  if(!productUrl) return;

  try {
    
    connectToDB();

    const scrapedProduct = await scrapeAmazonLazadaShopeeProduct(productUrl);
  console.log('scrp finished',JSON.stringify(scrapedProduct))


    if(!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    console.log('existingProduct',existingProduct)

    if(existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    console.log('newProduct=>',newProduct)


    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    console.log('eorrr',error)
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if(!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if(!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

  } catch (error) {
    console.log(error);
  }
}