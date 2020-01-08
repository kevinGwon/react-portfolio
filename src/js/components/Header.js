import React from 'react';

function Header({ daily, onChange, onSubmit }) {
  return (
    <header id="header" className="header">
      <div className="header-inner">
        <h1 className="logo a11y">The movie</h1>
        <div className="header-search">
          <form onSubmit={e => onSubmit(e)}>
            <input
              type="search"
              className="input-block"
              placeholder="제목을 입력하세요"
              onChange={onChange}
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
