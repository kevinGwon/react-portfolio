import React from 'react';
import DetailContainer from '../containers/DetailContainer';

function Detail(props) {
  return <DetailContainer {...props} />;
}

export default React.memo(Detail);
