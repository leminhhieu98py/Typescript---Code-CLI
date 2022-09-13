import { useState } from 'react';
import { MenuProps } from 'antd';

export const useMenu = (initialOpenKey: string, rootSubmenuKeys: string[]) => {
  const [openKeys, setOpenKeys] = useState([initialOpenKey]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return {
    openKeys,
    onOpenChange
  };
};
