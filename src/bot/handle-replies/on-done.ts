import { EDIT_MESSAGE_REPLY_MARKUP_URL, SEND_MESSAGE_URL } from '../constants';
import { scheduleAndSendNotification } from './schedule-and-send-notification';
import { axiosSend } from './utils/axios-send';
import { pluralizedPushups } from './utils/pluralized-pushups';

export async function onDone(
  chat_id: number,
  message_id: number,
  total: number,
  target: number
): Promise<void> {
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

  const newTarget = target + 1;
  const newTotal = total + target;

  const text = [
    `You just crushed ${target}`,
    `${pluralizedPushups(target)}!`,
    newTotal > 1 ? `${newTotal} cumulatively!` : '',
    `You will do ${newTarget}`,
    pluralizedPushups(newTarget),
    'next - wait for the notification!',
  ].join(' ');

  // (B) sends message "...wait for the notification"
  const response = await axiosSend({
    data: {
      chat_id,
      message_id,
      text,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'No more!',
              callback_data: JSON.stringify({
                action: 'end',
                total: total + target,
                target: newTarget,
              }),
            },
          ],
        ],
      },
    },
    method: 'post',
    url: SEND_MESSAGE_URL,
  });

  // (C) schedules notification notification by calling `scheduleAndSendNotification` function
  if (response) {
    const {
      result: { message_id },
    } = response.data;
    scheduleAndSendNotification(chat_id, message_id, total, target);
  }
}
