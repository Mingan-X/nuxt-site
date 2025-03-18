const request = async (url: string, options: any, headers: object) => {
  const config = useRuntimeConfig();
  const reqUrl = config.public.BASE_URL + url;
  const customHeaders: any = Object.assign(
    { "Content-Type": "application/json" },
    headers
  );
  // 处理 application/x-www-form-urlencoded 类型的请求体
  if (
    customHeaders["Content-Type"].includes("application/x-www-form-urlencoded")
  ) {
    options.body = new URLSearchParams(options.body);
  }
  // 处理 form-data 类型的请求体
  if (customHeaders["Content-Type"].includes("multipart/form-data")) {
    // 删除 Content-Type 头部，让浏览器自动设置
    delete customHeaders["Content-Type"];
  }

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, headers: customHeaders })
      .then(({ data, error, execute }) => {
        if (error.value) {
          console.log(error.value, "error");
          return;
        }
        const value = data.value as any;
        resolve(value);
      })
      .catch((err) => {
        console.log(err, "err");
        reject(err);
      });
  });
};

export const useRequest = {
  get: (url: string = "", params: object = {}, headers: object = {}) => {
    return request(
      url,
      { method: "GET", params, key: `${url}${JSON.stringify(params)}` },
      headers
    );
  },
  delete: (url: string = "", params: object = {}, headers: object = {}) => {
    return request(
      url,
      { method: "DELETE", params, key: `${url}${JSON.stringify(params)}` },
      headers
    );
  },
  post: (url: string = "", body: object = {}, headers: object = {}) => {
    return request(
      url,
      { method: "POST", body, key: `${url}${JSON.stringify(body)}` },
      headers
    );
  },
};
