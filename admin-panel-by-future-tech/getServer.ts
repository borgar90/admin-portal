const localServer = "http://localhost:3001";

const liveServer = "";

const getServer = () => {
  if (process.env.NODE_ENV === "development") {
    return localServer;
  } else {
    return liveServer;
  }
};

export default getServer;
