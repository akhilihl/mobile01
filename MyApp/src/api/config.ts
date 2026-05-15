const config = {
  production: {
    url: "",
    apiUrl: "https://j09j1s5cyl.execute-api.ap-southeast-1.amazonaws.com/prod/",
    bucketName: "leadsynq-super-admin",
    region: "ap-southeast-1",
  },
    develop: {
    url: "",
    apiUrl: "https://rsdxtqspm6.execute-api.ap-southeast-1.amazonaws.com/dev/",   
    bucketName: "leadsynq-super-admin",
    region: "ap-southeast-1",
  },
  local: {
    url: "http://localhost:5000/",
    apiUrl: "http://localhost:3000/dev/",
  },
};
export const environment = "production";
const hostConfig = {
  WEB_URL: config[environment].url,
  IMAGE_URL: `https://${config[environment].bucketName}.s3.ap-southeast-1.amazonaws.com`,
  API_URL: config[environment].apiUrl,
  S3_BUCKET: `${config[environment].bucketName}`,
  AWS_REGION: `${config[environment].region}`
};

export { hostConfig };