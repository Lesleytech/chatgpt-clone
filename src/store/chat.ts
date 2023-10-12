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
        chatRoom.messages = [...chatRoom.messages.filter((m) => !m.error), message];

        if (!chatRoom.name) {
          chatRoom.name = message.content || '';
        }

        if (!message.generating && !message.error) {
          idbService.updateRoom(roomId, { name: chatRoom.name, messages: chatRoom.messages });
        }
      }
    },
    deleteLastMessage: (chat, { payload: roomId }: PayloadAction<string>) => {
      const chatRoom = chat.rooms[roomId];

      if (chatRoom) {
        chatRoom.messages = chatRoom.messages.slice(0, chatRoom.messages.length - 1);

        idbService.updateRoom(roomId, { name: chatRoom.name, messages: chatRoom.messages });
      }
    },
    streamTokens: (
      chat,
      {
        payload: { tokens, roomId, msgId, done },
      }: PayloadAction<{ roomId: string; tokens: string; msgId: string; done?: boolean }>,
    ) => {
      const msg = chat.rooms[roomId]?.messages.find((m) => m.id === msgId);

      if (!msg || msg.role === 'user') return;

      if (done) {
        msg.generating = false;

        // Convert proxy array to array and save to idb
        idbService.updateRoom(roomId, {
          messages: JSON.parse(JSON.stringify(chat.rooms[roomId].messages)),
        });
      } else {
        msg.content += tokens;
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
