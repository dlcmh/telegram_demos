import axios, { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';

export async function axiosSend(
  config: AxiosRequestConfig
): Promise<AxiosResponse | void> {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log('axiosSend error', { config });
    if (error.isAxiosError) {
      const {
        response: { data },
      } = error;
      console.log({ ...data });
    } else {
      console.log({ error });
    }
  }
}
