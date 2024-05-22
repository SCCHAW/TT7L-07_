"use server"

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(producturl: string) {
    if(!producturl) return;

    try{
      const scrapedProduct =await scrapeAmazonProduct(producturl);
    } catch (error: any) {
      throw new Error('failed to create /update product: ${error.message')
    }
}