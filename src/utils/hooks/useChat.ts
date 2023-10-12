import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IChatMessage } from '~/lib/interfaces/chat';
import { socketService } from '~/services/socket.service';
import { chatActions, ChatMessagesSelector, ChatRoomsSelector } from '~/store/chat';
import { generateBaseFields } from '~/utils/api';
import { useAppSelector } from '~/utils/hooks/useAppSelector';

export function useChat() {
  const { activeRoomId, rooms } = useAppSelector((state) => state.chat);
  const chatRooms = useSelector(ChatRoomsSelector);
  const messages = useSelector(ChatMessagesSelector);

  const dispatch = useDispatch();

  const handleMsgStream = useCallback(
    (newMessages: IChatMessage[]) => {
      if (socketService.socket.connected) {
        const baseFields = generateBaseFields();

        const assistantMessage: IChatMessage = {
          ...baseFields,
          role: 'assistant',
          content: '',
          generating: true,
        };

        dispatch(chatActions.addMessage({ message: assistantMessage, roomId: activeRoomId }));

        socketService.socket.emit('stream', {
          messages: newMessages.filter((m) => !m.error && !m.generating),
          roomId: activeRoomId,
          msgId: baseFields.id,
        });
      } else {
        const assistantMessage: IChatMessage = {
          ...generateBaseFields(),
          role: 'assistant',
          content: 'Error generating response',
          error: true,
        };

        dispatch(chatActions.addMessage({ message: assistantMessage, roomId: activeRoomId }));
      }
    },
    [activeRoomId, dispatch],
  );

  const onStream = useCallback(
    async (userInput: string) => {
      if (!userInput.trim().length) return;

      const userMessage: IChatMessage = {
        ...generateBaseFields(),
        role: 'user',
        content: userInput.trim(),
      };

      dispatch(chatActions.addMessage({ message: userMessage, roomId: activeRoomId }));

      const newMessages = [...messages, userMessage];

      handleMsgStream(newMessages);
    },
    [activeRoomId, dispatch, handleMsgStream, messages],
  );

  const onRegenerate = useCallback(async () => {
    const newMessages = messages.slice(0, messages.length - 1);

    dispatch(chatActions.deleteLastMessage(activeRoomId));

    handleMsgStream(newMessages);
  }, [activeRoomId, dispatch, handleMsgStream, messages]);

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
      onRegenerate,
      onStream,
    }),
    [activeRoomId, chatRooms, dispatch, messages, onRegenerate, rooms, onStream],
  );
}
