import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IChatMessage, IChatRoom } from '~/lib/interfaces/chat';
import { RootState } from '~/store/index';
import { generateBaseFields } from '~/utils/api';

interface IState {
  rooms: {
    [key: string]: IChatRoom & { messages: IChatMessage[] };
  };
  activeRoomId: string;
}

const slice = createSlice({
  name: 'chat',
  initialState: {
    rooms: {},
    activeRoomId: '',
  } as IState,
  reducers: {
    setActiveRoom: (chat, { payload: roomId }: PayloadAction<string>) => {
      chat.activeRoomId = roomId;
    },
    addRoom: (chat) => {
      const newRoom: IChatRoom = {
        ...generateBaseFields(),
        name: '',
      };

      chat.rooms[newRoom.id] = { ...newRoom, messages: [] };
      chat.activeRoomId = newRoom.id;
    },
    removeRoom: (chat, { payload: roomId }: PayloadAction<string>) => {
      delete chat.rooms[roomId];

      if (chat.activeRoomId === roomId) chat.activeRoomId = '';
    },
    clearRooms: (chat) => {
      chat.rooms = {};
      chat.activeRoomId = '';
    },
    addMessage: (
      chat,
      { payload: { message, roomId } }: PayloadAction<{ message: IChatMessage; roomId: string }>,
    ) => {
      const chatRoom = chat.rooms[roomId];

      if (chatRoom) {
        chatRoom.messages = [...chatRoom.messages, message];

        if (!chatRoom.name) {
          chatRoom.name = message.content || '';
        }
      }
    },
  },
});

export default slice.reducer;

export const chatActions = slice.actions;

export const ChatRoomsSelector = createSelector(
  (state: RootState) => state.chat.rooms,
  (chatRooms) => Object.values(chatRooms),
);

export const ChatMessagesSelector = createSelector(
  (state: RootState) => state.chat,
  (chat) => chat.rooms[chat.activeRoomId]?.messages || [],
);
