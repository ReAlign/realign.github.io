const Fetch = {};

const _ = {
  getParamsStr(json = {}) {
    const keys = Object.keys(json);
    if (!keys.length) {
      return '';
    } else {
      let paramArr = [];
      keys.forEach((k) => {
        paramArr.push(`${k}=${json[k]}`);
      });

      return `?${paramArr.join('&')}`;
    }
  },
  base(url = '', options = {}) {
    return new Promise((res, rej) => {
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          res(json);
        })
        .catch(() => {
          rej();
        });
    });
  }
};

Fetch.$get = (url = '', data = {}) => {
  return _.base(`${url}${_.getParamsStr(data)}`);
};

Fetch.$post = (url = '', data = {}) => {
  const options = {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  };
  return _.base(url, options);
};

export default Fetch;