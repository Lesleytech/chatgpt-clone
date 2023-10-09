import { v4 as uuidv4 } from 'uuid';


export function generateBaseFields() {
  const timestamp = Math.floor(Date.now() / 1000);

  return {
    id: uuidv4(),
    updatedAt: timestamp,
    createdAt: timestamp,
  };
}
