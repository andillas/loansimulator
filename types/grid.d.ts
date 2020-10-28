export interface GridOptions {
  caption: string;
  cols: ColConfig[];
}
interface ColConfig {
  id: string;
  title: string;
  type: string;
  width?: string;
  align?: string;
}
