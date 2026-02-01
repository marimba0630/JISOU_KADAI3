import "@testing-library/jest-dom";
import "whatwg-fetch";
import { config } from "dotenv";

config();

if (!globalThis.structuredClone) {
  globalThis.structuredClone = (value: any) =>
    JSON.parse(JSON.stringify(value));
}
