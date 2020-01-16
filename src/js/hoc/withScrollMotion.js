import React from 'react';
import ScrollMotion from '../animation/scroll-motion';

const scrollMotion = new ScrollMotion();

const withScroll = Component => {
  return props => {
    return <Component {...props} scrollMotion={scrollMotion} />;
  };
};

export default withScroll;
