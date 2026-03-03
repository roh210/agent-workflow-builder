import { WebScrapingNodeConfig } from "@/types";
import { ExecutorFunction } from "../engine.types";

export const executeWebScraping: ExecutorFunction = async ({ node, inputData }) => {
    // For Web Scraping Node, we would perform the scraping based on the URL and selectors in the config
    const config = node.config as unknown as WebScrapingNodeConfig; 

    return {output : inputData};
}