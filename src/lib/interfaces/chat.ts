import { ChatMessage } from 'humanloop';

import { IBaseEntity } from '~/lib/interfaces/entity';

export interface IChatRoom extends IBaseEntity {
  name: string;
}

export interface IChatMessage extends IBaseEntity, ChatMessage {}
