import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IChatMessage, IChatRoomInStore } from '~/lib/interfaces/chat';
import { idbService } from '~/services/idb.service';
import { RootState } from '~/store/index';
import { generateBaseFields } from '~/utils/api';

interface IState {
  rooms: {
    [key: string]: IChatRoomInStore;
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
    setInitialRooms: (chat, { payload: rooms }: PayloadAction<IChatRoomInStore[]>) => {
      chat.rooms = rooms.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    },
    addRoom: (chat) => {
      const newRoom: IChatRoomInStore = {
        ...generateBaseFields(),
        name: '',
        messages: [],
      };

      chat.rooms[newRoom.id] = { ...newRoom, messages: [] };
      chat.activeRoomId = newRoom.id;

      idbService.addRoom(newRoom);
    },
    removeRoom: (chat, { payload: roomId }: PayloadAction<string>) => {
      delete chat.rooms[roomId];

      if (chat.activeRoomId === roomId) chat.activeRoomId = '';

      idbService.removeRoom(roomId);
    },
    clearRooms: (chat) => {
      chat.rooms = {};
      chat.activeRoomId = '';

      idbService.clearRooms();
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

        idbService.updateRoom(roomId, { name: chatRoom.name, messages: chatRoom.messages });
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
