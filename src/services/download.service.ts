import 'colors';
import { loggingColors as log } from '../lib/enum.lib';
import { createWriteStream } from 'fs';
import { TSE_BASE_FILE_NAME, TSE_CDN_BASE_URL, TSE_DOWNLOAD_FILE_EXT } from '../const/download.const';

export async function download(years: string, path: string) {
  const parsedYears = years.includes(',') ? years.split(',') : [years];
  parsedYears.forEach(validateYear);

  const requests = [...parsedYears].map(year => {
    const url = `${TSE_CDN_BASE_URL}${TSE_BASE_FILE_NAME}${year}${TSE_DOWNLOAD_FILE_EXT}`;
    return fetch(url).then(async response => {
      if (!response.ok) throw new Error(`${log.error}Failed to download data from url: ${url}`);
      
      const filePath = `${path}/${TSE_BASE_FILE_NAME}${year}${TSE_DOWNLOAD_FILE_EXT}`;
      const writeStream = createWriteStream(filePath);
      console.log(log.info + 'Saving data to:', filePath);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      writeStream.write(buffer);
      console.log(log.success + 'Data saved to:', filePath);
    });
  });

  await Promise.all(requests);
  console.log(log.success + 'All data saved to:', path);
}

function validateYear(year: string) {
  if (!year.match(/\d{4}/)) throw new Error(`${log.error}Invalid year format: ${year}`);
  const yearNumber = Number(year);
  if (yearNumber < 1998 || yearNumber > 2022) throw new Error(`${log.error}Invalid year: ${year}`);
}