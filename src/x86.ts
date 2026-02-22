import { ks_arch, ks_mode } from './types';
import { Keystone } from './keystone';

export class KeystoneX86 extends Keystone {
  constructor(mode: ks_mode | number | boolean = 8) { // Default MODE_64
      const actualMode = typeof mode === 'boolean' 
          ? (mode ? 8 : 4) // 8 -> MODE_64, 4 -> MODE_32
          : mode;
      
      super(ks_arch.X86, actualMode as number);
  }
}
