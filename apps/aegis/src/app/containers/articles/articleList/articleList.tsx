import { Link, useMatch } from 'react-router';
import MasterDetail from '../../../components/layout/master-detail/master-detail';

export function ArticleList() {
  const match = useMatch('/articles/:id');
  console.log('Matched article ID:', match?.params.id);

  return (
    <MasterDetail detailsOpen={!!match}>
      <div>
        <h2>Articles</h2>
        <Link to="/">Click here to go back to root page.</Link> <br />
        <Link to="./id">Click here to go to child page.</Link>
      </div>
    </MasterDetail>
  );
}
export default ArticleList;
