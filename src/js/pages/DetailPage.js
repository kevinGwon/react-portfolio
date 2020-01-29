import React from 'react';
import DetailContainer from '../containers/DetailContainer';

function DetailPage(props) {
  return <DetailContainer {...props} />;
}

export default React.memo(DetailPage);
