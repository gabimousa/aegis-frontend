import { RegisterArticleInput, UpdateArticleDetailsInput } from '@aegis/shared';
import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ArticleModel } from '../model';
import {
  useArticleDetailsQuery,
  useArticlesQuery,
  useArticleSubscriptions,
  useDiscontinueArticle,
  useSaveArticle,
} from './hooks';

type ArticlesContextType = {
  list: {
    articles: ArticleModel[];
    loadingArticles: boolean;
    loadingArticlesError?: ErrorLike;
    totalCount: number;
    load: () => void;
    loadMore: () => void;
    loadById: (id: string) => void;
    getById: (id: string) => ArticleModel | undefined;
    addOne: (item: ArticleModel) => void;
    addMany: (items: ArticleModel[]) => void;
    deleteOne: (id: string) => void;
    clear: () => void;
    canLoadMore: boolean;
    searchTerm?: string;
    setSearchTerm: (term: string | undefined) => void;
  };
  details: {
    selectedArticle?: ArticleModel;
    selectArticle: (id: string | undefined) => void;
    loadingArticleDetails: boolean;
    loadingArticleDetailsError?: ErrorLike;
    saveArticleDetails: (
      input: RegisterArticleInput | UpdateArticleDetailsInput
    ) => Promise<boolean>;
    savingArticleDetails?: boolean;
    discontinue: (articleId: string) => Promise<boolean>;
    discontinuingArticle: boolean;
  };
};

export const ArticlesDataContext = createContext<ArticlesContextType>({
  list: {
    articles: [],
    loadingArticles: false,
    loadingArticlesError: undefined,
    totalCount: 0,
    load: async () => Promise.resolve([]),
    loadMore: async () => Promise.resolve([]),
    loadById: async (id: string) => undefined,
    getById: (id: string) => undefined,
    addOne: () => void 0,
    addMany: () => void 0,
    deleteOne: () => void 0,
    clear: () => void 0,
    canLoadMore: false,
    searchTerm: '',
    setSearchTerm: () => void 0,
  },
  details: {
    selectArticle: () => void 0,
    selectedArticle: undefined,
    loadingArticleDetails: false,
    loadingArticleDetailsError: undefined,
    saveArticleDetails: async () => false,
    savingArticleDetails: false,
    discontinue: async () => false,
    discontinuingArticle: false,
  },
});

export const ArticlesDataProvider = ({ children }: PropsWithChildren) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>(undefined);

  // Article list query and mutations
  const {
    items,
    totalCount,
    loading,
    error,
    canLoadMore,
    getItemById,
    load,
    loadMore,
    loadById,
    addOne,
    addMany,
    clear,
    deleteOne,
    setSearchValue,
    searchValue,
  } = useArticlesQuery({
    pageSize: 25,
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Article details query and mutations
  const {
    entity,
    loading: loadingArticleDetails,
    error: loadingArticleDetailsError,
  } = useArticleDetailsQuery({
    id: selectedArticleId,
  });

  const { save, saving } = useSaveArticle({
    onDataSaved: ({ id }) => {
      loadById(id);
    },
  });

  const { discontinue, discontinuingArticle } = useDiscontinueArticle({
    onArticleDiscontinued: (id) => {
      loadById(id);
    },
  });

  // Subscriptions for real-time updates
  useArticleSubscriptions({
    onArticleDetailsUpdated: (article: ArticleModel) => {
      // Article updates might change name/sort order - use smart refetch
      addOne(article);
    },
    onArticleRegistered: (article: ArticleModel) => {
      // New articles might appear on different pages - reset pagination
      addOne(article);
    },
    onArticleDiscontinued: (id) => {
      // Discontinuation might empty current page
      deleteOne(id);
    },
  });

  return (
    <ArticlesDataContext.Provider
      value={{
        list: {
          articles: items,
          loadingArticles: loading,
          loadingArticlesError: error,
          searchTerm: searchValue,
          totalCount: totalCount ?? 0,
          setSearchTerm: setSearchValue,
          loadMore,
          load,
          loadById,
          getById: getItemById,
          addOne,
          addMany,
          deleteOne,
          clear,
          canLoadMore,
        },
        details: {
          selectArticle: setSelectedArticleId,
          selectedArticle: entity,
          loadingArticleDetails: loadingArticleDetails,
          loadingArticleDetailsError: loadingArticleDetailsError,
          saveArticleDetails: save,
          savingArticleDetails: saving,
          discontinue,
          discontinuingArticle,
        },
      }}
    >
      {children}
    </ArticlesDataContext.Provider>
  );
};

export default ArticlesDataContext;
