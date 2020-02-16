import React from 'react';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

function FooterContainer() {
  const { isDetail } = useSelector(state => state.load);
  const { isSearch } = useSelector(state => state.global);
  return <Footer isSearch={isSearch} isDetail={isDetail} />;
}

FooterContainer.displayName = 'FooterContainer';

export default FooterContainer;
