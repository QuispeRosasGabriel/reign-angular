const PROXY_CONFIG = [
    {
      context: [
        "/"
      ],
      target: "http://localhost:3000/",
      changeOrigin: true,
      secure: false
    }
  ];

  module.exports = PROXY_CONFIG;