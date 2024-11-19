import { Downloader } from "nodejs-file-downloader";

export default async (accountData, fromServer) => {
  let images = { avatar: accountData.avatar, header: accountData.header };

  for (const image in images) {
    if (images[image] && !images[image].includes("/missing.png")) {
      const downloader = new Downloader({
        url: images[image],
        directory: "./downloads",
      });
      try {
        console.log(`downloading ${images[image]}...`);
        const { filePath, downloadStatus } = await downloader.download();
        console.log(`${filePath} downloaded`);
        images[image] = filePath;
      } catch (error) {
        console.log(`${filePath} download failed`);
        delete images[image];
      }
    } else {
      delete images[image];
    }
  }

  return images;
};
