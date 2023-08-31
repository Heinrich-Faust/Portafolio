import React, { useEffect } from 'react';

const UserWayWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-account", "OlZshI7wN2");
    script.setAttribute("src", "https://cdn.userway.org/widget.js");
    (document.body || document.head).appendChild(script);

    return () => {
      (document.body || document.head).removeChild(script);
    };
  }, []);

  return (
    <noscript>
      Please ensure Javascript is enabled for purposes of{' '}
      <a href="https://userway.org">website accessibility</a>
    </noscript>
  );
};

export default UserWayWidget;
