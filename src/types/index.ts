import type {
  UINT32,
  INT32,
  UINT16,
  UINT8,
  INT64,
  UINT64,
  HANDLE,
  LPVOID,
  SIZE_T,
} from '@cheatron/win32-ext';

export type {
  UINT32,
  INT32,
  UINT16,
  UINT8,
  INT64,
  UINT64,
  HANDLE,
  LPVOID,
  SIZE_T,
};

/**
 * Handle using with all API
 */
export type ksh = HANDLE;

export * from './ks_arch';
export * from './ks_mode';
export * from './ks_err';
export * from './ks_opt_type';
export * from './ks_opt_value';
export * from './x86';
