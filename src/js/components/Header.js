import React from 'react';

function Header({ onChange, onSubmit, onGoHome, inputText, isSearch }) {
  return (
    <header id="header" className="header">
      <h1 className="logo a11y">The movie</h1>
      <div className="header-search">
        <form onSubmit={e => onSubmit(e)}>
          <input
            type="search"
            className="input-block"
            placeholder="제목을 입력하세요"
            value={inputText}
            onChange={onChange}
          />
          {isSearch && (
            <button
              type="button"
              className="btn btn--invert"
              onClick={onGoHome}
            >
              돌아가기
            </button>
          )}
        </form>
      </div>
    </header>
  );
}

export default Header;
