export interface MyFile extends File {
  preview: string;
  width: number;
  height: number;
  orientation: "portrait" | "landscape" | "square";
}
