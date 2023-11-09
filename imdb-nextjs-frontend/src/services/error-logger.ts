import { ErrorInfo } from "react";

export class ErrorLogger {
  public static log(error: any, errorInfo?: ErrorInfo) {
    console.log({ error, errorInfo });
  }
}
