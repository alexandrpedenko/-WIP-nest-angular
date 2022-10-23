
export interface ToastData {
  title: string;
  message: string;
  toastType: ToastType;
}

export type ToastType = 'error' | 'success';
