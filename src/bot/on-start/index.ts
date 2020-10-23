import { SEND_MESSAGE_URL } from '../constants';
import { axiosSend } from '../handle-replies/utils/axios-send';
import { pluralizedPushups } from '../handle-replies/utils/pluralized-pushups';

export async function onStart(chat_id: number, target = 1): Promise<void> {
  const total = target - 1;

  // sends starting message to do 1 pushup now, with callback buttons:
  //   - `done` - the pushup repetitions were done
  //   - `end` - user decides not to do the suggested repetitions
  axiosSend({
    data: {
      chat_id,
      text: `Do ${target} ${pluralizedPushups(target)} now!`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Crushed it!',
              callback_data: JSON.stringify({
                action: 'done',
                total,
                target,
              }),
            },
          ],
          [
            {
              text: 'No more!',
              callback_data: JSON.stringify({
                action: 'end',
                total,
                target,
              }),
            },
          ],
        ],
      },
    },
    method: 'post',
    url: SEND_MESSAGE_URL,
  });
}
