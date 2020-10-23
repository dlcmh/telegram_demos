import { EDIT_MESSAGE_REPLY_MARKUP_URL, SEND_MESSAGE_URL } from '../constants';
import { timers } from './schedule-and-send-notification';
import { axiosSend } from './utils/axios-send';
import { pluralizedPushups } from './utils/pluralized-pushups';

export async function onEnd(
  chat_id: number,
  message_id: number,
  total: number
): Promise<void> {
  clearTimeout(timers[chat_id]);

  // (A) clears buttons from the previous "Do X pushups now!" message
  //   - https://stackoverflow.com/a/47867344
  axiosSend({
    data: {
      chat_id,
      message_id,
    },
    method: 'post',
    url: EDIT_MESSAGE_REPLY_MARKUP_URL,
  });

  // (B) sends a summary / total pushups done message
  //   - no callback buttons necessary as we've reached the end of our daily fitness cycle
  axiosSend({
    data: {
      chat_id,
      text:
        total === 0
          ? 'Maybe next time then!'
          : `Congrats! You did a total of ${total} ${pluralizedPushups(
              total
            )}!`,
    },
    method: 'post',
    url: SEND_MESSAGE_URL,
  });
}
