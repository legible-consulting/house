/// <reference types="astro/client" />

declare const __BUILD_COMMIT__: string;
declare const __BUILD_TIME__: string;

declare namespace App {
  interface Locals {
    user: import("./lib/db").DeskUser | null;
  }
}
