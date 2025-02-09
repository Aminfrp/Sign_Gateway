export enum StatusEnum {
  error = "error",
  idle = "idle",
  pending = "pending",
  success = "success",
}

export type PdfDataType = {
  url: string;
  status: StatusEnum | "error" | "idle" | "pending" | "success";
};
