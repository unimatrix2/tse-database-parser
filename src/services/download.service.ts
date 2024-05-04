import 'colors';
import { loggingColors as log } from '../lib/enum.lib';
import { createWriteStream } from 'fs';
import { TSE_BASE_FILE_NAME, TSE_CDN_BASE_URL, TSE_DOWNLOAD_FILE_EXT } from '../const/download.const';

export async function download(years: string, path: string) {
  const parsedYears = years.includes(',') ? years.split(',') : [years];

  for (const year of parsedYears) {
    const url = `${TSE_CDN_BASE_URL}${TSE_BASE_FILE_NAME}${year}${TSE_DOWNLOAD_FILE_EXT}`;

    console.log(log.info + 'Downloading data from', url);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${log.error}Failed to download data from url: ${url}`);
    console.log(log.success + 'Downloaded data from', url);

    const filePath = `${path}/${TSE_BASE_FILE_NAME}${year}${TSE_DOWNLOAD_FILE_EXT}`;
    const writeStream = createWriteStream(filePath);

    console.log(log.info + 'Saving data to:', filePath);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    writeStream.write(buffer);
    console.log(log.success + 'Data saved to:', filePath);
  }
}