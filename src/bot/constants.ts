import env from '../env';

const BOT_URL = [env.BOT.url, env.BOT.token].join('/');
export const EDIT_MESSAGE_REPLY_MARKUP_URL = [
  BOT_URL,
  'editMessageReplyMarkup',
].join('/');
export const SEND_MESSAGE_URL = [BOT_URL, 'sendMessage'].join('/');
