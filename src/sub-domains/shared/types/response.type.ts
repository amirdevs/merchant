export interface IRes<T = unknown> {
  success: boolean;
  status: number;
  data: T;
  meta: { message: string };
}
