import { cache } from 'react';
import { getClient } from './client';
import { QueryParams } from 'next-sanity';

// Cache Sanity queries for the duration of a single request
// This prevents duplicate queries when multiple components need the same data
export const cachedClient = {
  fetch: cache(async <QueryResponse = any>(
    query: string,
    params?: QueryParams,
    preview: boolean = false
  ): Promise<QueryResponse> => {
    const client = getClient(preview ? process.env.SANITY_API_READ_TOKEN : undefined);
    return client.fetch<QueryResponse>(query, params || {});
  })
};

// Specific cached query functions for common queries
export const getCategories = cache(async (preview = false) => {
  const { CATEGORIES_QUERY } = await import('./queries');
  return cachedClient.fetch(CATEGORIES_QUERY, {}, preview);
});

export const getHomePageData = cache(async (preview = false) => {
  const { HOME_QUERY } = await import('./queries');
  return cachedClient.fetch(HOME_QUERY, {}, preview);
});