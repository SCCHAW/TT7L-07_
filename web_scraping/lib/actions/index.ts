"use server"

<<<<<<< HEAD
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try{
      connectToDB();

      const scrapedProduct = await scrapeAmazonProduct(productUrl);

      if(!scrapedProduct) return;


=======
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(producturl: string) {
    if(!producturl) return;

    try{
      const scrapedProduct =await scrapeAmazonProduct(producturl);
>>>>>>> 82d95256809410bb5b43ada5c0b9265df1b79a86
    } catch (error: any) {
      throw new Error('failed to create /update product: ${error.message')
    }
}