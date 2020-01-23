import React from 'react';

function Header({
  onChange,
  onSubmit,
  onSearch,
  onGoHome,
  inputText,
  isSearch,
  isDetail,
  isActiveSearch,
  $inputSearch,
}) {
  return (
    <header
      id="header"
      className={`header${isActiveSearch ? ' is-active' : ''}${
        isActiveSearch && isDetail ? '--detail' : ''
      }
       ${isSearch ? 'is-typing' : ''}`}
    >
      <div className="l-header">
        <h1 className="logo a11y">The movie</h1>
        <button
          className={`btn-home${isSearch || isDetail ? ' is-visible' : ''}`}
          onClick={onGoHome}
        >
          <svg viewBox="0 0 40 40">
            <polyline points="25.9,32.1 13.4,19.5 25.9,7" />
          </svg>
          <span>돌아가기</span>
        </button>
        <div className="header-search">
          <form onSubmit={e => onSubmit(e)}>
            <div className="input-group">
              <input
                type="search"
                className="input-block"
                placeholder="제목을 입력하세요"
                value={inputText}
                onChange={onChange}
                ref={$inputSearch}
              />
              <button type="button" className="btn-search" onClick={onSearch}>
                <svg className="icon-search" viewBox="0 0 483.083 483.083">
                  <g>
                    <g>
                      <path
                        d="M332.74,315.35c30.883-33.433,50.15-78.2,50.15-127.5C382.89,84.433,298.74,0,195.04,0S7.19,84.433,7.19,187.85
            S91.34,375.7,195.04,375.7c42.217,0,81.033-13.883,112.483-37.4l139.683,139.683c3.4,3.4,7.65,5.1,11.9,5.1s8.783-1.7,11.9-5.1
            c6.517-6.517,6.517-17.283,0-24.083L332.74,315.35z M41.19,187.85C41.19,103.133,110.04,34,195.04,34
            c84.717,0,153.85,68.85,153.85,153.85S280.04,341.7,195.04,341.7S41.19,272.567,41.19,187.85z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
