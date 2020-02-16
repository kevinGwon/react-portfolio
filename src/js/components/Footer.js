import React from 'react';

function Footer({ isSearch, isDetail }) {
  return (
    <footer
      id="footer"
      className={`footer${isSearch || isDetail ? ' no-fixed' : ''}`}
    >
      @developerGwon@gmail.com
    </footer>
  );
}

Footer.displayName = 'Footer';

export default Footer;
