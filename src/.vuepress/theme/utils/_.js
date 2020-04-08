const _ = {};

_.insertJs = (src) => {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = 'async';
    s.src = src;
    document.body.appendChild(s);
    s.onload = () => {
      resolve();
    };
    s.onerror = () => {
      reject();
    };
  });
};

export default _;