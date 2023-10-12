import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IChatMessage } from '~/lib/interfaces/chat';
import { syncMessages } from '~/services/api/chat';
import { chatActions, ChatMessagesSelector, ChatRoomsSelector } from '~/store/chat';
import { generateBaseFields } from '~/utils/api';
import { useAppSelector } from '~/utils/hooks/useAppSelector';

export function useChat() {
  const { activeRoomId, rooms } = useAppSelector((state) => state.chat);
  const chatRooms = useSelector(ChatRoomsSelector);
  const messages = useSelector(ChatMessagesSelector);

  const dispatch = useDispatch();

  const onSend = useCallback(
    async (userInput: string) => {
      if (!userInput.trim().length) return;

      const userMessage: IChatMessage = {
        ...generateBaseFields(),
        role: 'user',
        content: userInput.trim(),
      };

      dispatch(chatActions.addMessage({ message: userMessage, roomId: activeRoomId }));

      const newMessages = [...messages, userMessage];

      // eslint-disable-next-line no-console
      const res = await syncMessages(newMessages);

      const assistantMessage: IChatMessage = {
        ...generateBaseFields(),
        role: 'assistant',
        content: res || '',
      };

      dispatch(chatActions.addMessage({ message: assistantMessage, roomId: activeRoomId }));
    },
    [activeRoomId, dispatch, messages],
  );

  const onRegenerate = useCallback(async () => {
    const newMessages = messages.slice(0, messages.length - 1);

    dispatch(chatActions.deleteLastMessage(activeRoomId));
    // eslint-disable-next-line no-console
    const res = await syncMessages(newMessages);

    const assistantMessage: IChatMessage = {
      ...generateBaseFields(),
      role: 'assistant',
      content: res || '',
    };

    dispatch(chatActions.addMessage({ message: assistantMessage, roomId: activeRoomId }));
  }, [activeRoomId, dispatch, messages]);

  return useMemo(
    () => ({
      onAddRoom: () => dispatch(chatActions.addRoom()),
      onRemoveRoom: (id: string) => dispatch(chatActions.removeRoom(id)),
      onActiveRoomChange: (id: string) => dispatch(chatActions.setActiveRoom(id)),
      onClearRooms: () => dispatch(chatActions.clearRooms()),
      activeRoomId,
      activeRoom: rooms[activeRoomId],
      chatRooms,
      messages,
      onSend,
      onRegenerate,
    }),
    [activeRoomId, chatRooms, dispatch, messages, onRegenerate, onSend, rooms],
  );
}
