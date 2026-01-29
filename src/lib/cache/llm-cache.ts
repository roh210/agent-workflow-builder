// Simple in-memory cache for LLM responses
// Key: hash of (prompt + model + temperature)
// Value: LLM response

import { createHash } from 'crypto';

interface CacheEntry {
  response: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const TTL = 24 * 60 * 60 * 1000; // 24 hours

export function getCacheKey(prompt: string, model: string, temperature: number): string {
  const input = `${prompt}|${model}|${temperature}`;
  return createHash('sha256').update(input).digest('hex');
}

export function getFromCache(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  // Check if expired
  if (Date.now() - entry.timestamp > TTL) {
    cache.delete(key);
    return null;
  }
  
  return entry.response;
}

export function setInCache(key: string, response: string): void {
  cache.set(key, { response, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}