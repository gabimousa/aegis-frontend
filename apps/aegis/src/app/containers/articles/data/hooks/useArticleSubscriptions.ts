import { useMutateCache } from '@aegis/shared';
import { print } from 'graphql';
import { useEffect } from 'react';
import { wsClient } from '../../../../shared';
import { ArticleModel } from '../../model';
import {
  ARTICLE_DETAILS_UPDATED_SUBSCRIPTION,
  ARTICLE_DISCONTINUED_SUBSCRIPTION,
  ARTICLE_REGISTERED_SUBSCRIPTION,
  ARTICLES_QUERY_KEY,
} from '../graphql';

const registerSubString = print(ARTICLE_REGISTERED_SUBSCRIPTION);
const updateSubString = print(ARTICLE_DETAILS_UPDATED_SUBSCRIPTION);
const deactivateSubString = print(ARTICLE_DISCONTINUED_SUBSCRIPTION);

export const useArticleSubscriptions = () => {
  const { upsertInfiniteData, updateInInfiniteData, removeFromInfiniteData } =
    useMutateCache<ArticleModel>();
  useEffect(() => {
    // 1. Create the iterators
    const registerIter = wsClient.iterate({ query: registerSubString });
    const updateIter = wsClient.iterate({ query: updateSubString });
    const deactivateIter = wsClient.iterate({ query: deactivateSubString });

    // 2. Start separate async "workers" for each stream
    const subscribeRegister = async () => {
      try {
        for await (const result of registerIter) {
          const data = result.data;
          if (data?.onArticleRegistered) {
            upsertInfiniteData(
              data.onArticleRegistered as ArticleModel,
              ARTICLES_QUERY_KEY(),
              'articles'
            );
          }
        }
      } catch (err) {
        console.error('Register Sub Error:', err);
      }
    };

    const subscribeUpdate = async () => {
      try {
        for await (const result of updateIter) {
          const data = result.data;
          if (data?.onArticleDetailsUpdated) {
            updateInInfiniteData(
              data.onArticleDetailsUpdated as ArticleModel,
              ARTICLES_QUERY_KEY(),
              'articles'
            );
          }
        }
      } catch (err) {
        console.error('Update Sub Error:', err);
      }
    };

    const subscribeDeactivate = async () => {
      try {
        for await (const result of deactivateIter) {
          const data = result.data;
          if (data?.onArticleDeactivated) {
            const id = (data.onArticleDeactivated as { id: string }).id;
            removeFromInfiniteData(id, ARTICLES_QUERY_KEY(), 'articles');
          }
        }
      } catch (err) {
        console.error('Deactivate Sub Error:', err);
      }
    };

    // Run workers
    subscribeRegister();
    subscribeUpdate();
    subscribeDeactivate();

    // 3. Cleanup logic
    const unlisten = wsClient.on('connected', () => console.log('✅ WS Connected'));

    const unlistenErr = wsClient.on('error', (err) =>
      console.error('❌ WS Connection Error:', err)
    );
    const unlistenClose = wsClient.on('closed', () => console.log('🔌 WS Connection Closed'));

    return () => {
      // Calling .return() on the iterator terminates the subscription
      // and breaks the 'for await' loop.
      registerIter.return?.();
      updateIter.return?.();
      deactivateIter.return?.();
      unlisten();
      unlistenErr();
      unlistenClose();
    };
  }, [upsertInfiniteData, removeFromInfiniteData, updateInInfiniteData]);
};
