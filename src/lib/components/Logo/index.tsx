import { Image } from '@chakra-ui/react';
import { FC } from 'react';

import { ASSET_RESOURCES } from '~/utils/resources';

interface IProps {
  size?: number;
}

const Logo: FC<IProps> = ({ size = 175 }) => {
  return <Image src={ASSET_RESOURCES.logo} objectFit="contain" w={`${size}px`} alt="Logo" />;
};

export { Logo };
