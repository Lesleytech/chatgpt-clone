import { ReactNode } from 'react';

type MenuItemType = 'divider' | 'menu';

export interface IMenuItem<T extends MenuItemType = MenuItemType> {
  type?: T;
  icon?: T extends 'menu' ? ReactNode : never;
  label?: T extends 'menu' ? string : never;
  key?: T extends 'menu' ? string : never;
  onClick?: () => void;
}
