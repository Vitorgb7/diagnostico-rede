import os from 'os';
export function getActiveNetworkInterface() {
  const interfaces = os.networkInterfaces();
  let activeInterface = null;

  for (const iface in interfaces) {
    const ifaceInfo = interfaces[iface];
    
    for (const i of ifaceInfo) {
      if (i.family === 'IPv4' && !i.internal) {
        activeInterface = iface;
        break;
      }
    }

    if (activeInterface) break;
  }

  return activeInterface;
}
