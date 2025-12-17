import { useSubscription } from '@apollo/client/react';
import { ArticleModel } from '../../model';
import {
  onArticleDetailsUpdatedSubscription,
  onArticleDiscontinuedSubscription,
  onArticleRegisteredSubscription,
} from '../graphql/articlesSubscriptions';

type useArticleSubscriptionsProps = {
  onArticleRegistered?: (article: ArticleModel) => void;
  onArticleDetailsUpdated?: (article: ArticleModel) => void;
  onArticleDiscontinued?: (articleId: string) => void;
};

export const useArticleSubscriptions = ({
  onArticleRegistered,
  onArticleDetailsUpdated,
  onArticleDiscontinued,
}: useArticleSubscriptionsProps) => {
  const {
    data: registeredData,
    restart: restartRegisteredSubscription,
    error: registeredError,
  } = useSubscription(onArticleRegisteredSubscription, {
    onData(options) {
      const article = options.data.data?.onArticleRegistered;
      article && onArticleRegistered?.(article as ArticleModel);
    },
  });

  const {
    data: updateData,
    restart: restartUpdateSubscription,
    error: updateError,
  } = useSubscription(onArticleDetailsUpdatedSubscription, {
    onData(options) {
      const article = options.data.data?.onArticleDetailsUpdated;
      article && onArticleDetailsUpdated?.(article as ArticleModel);
    },
  });

  const {
    data: discontinuedData,
    restart: restartDiscontinuedSubscription,
    error: discontinuedError,
  } = useSubscription(onArticleDiscontinuedSubscription, {
    onData(options) {
      const articleId = options.data.data?.onArticleDiscontinued.id;
      articleId && onArticleDiscontinued?.(articleId);
    },
  });

  return {
    onUpdateData: updateData,
    restartUpdateSubscription,
    updateError,
    registeredData,
    restartRegisteredSubscription,
    registeredError,
    discontinuedData,
    restartDiscontinuedSubscription,
    discontinuedError,
  };
};

export default useArticleSubscriptions;
