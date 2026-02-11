import { vi } from "vitest";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { LearningRecord } from '../LearningRecord'
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { Record } from "../domain/record"

/*
describe("load", () => {
  it("should render title", async () => {
    render(<ChakraProvider value={createSystem(defaultConfig, {})}><LearningRecord /></ChakraProvider>);
    
    screen.debug();
    //const message = screen.getByTestId("load");
    const message = await screen.findByTestId("title");
    
    expect(message).toHaveTextContent("学習記録一覧");
  });
});*/

//const mockInsertRecord = vi.fn().mockResolvedValue(undefined);
const mockGetAllRecords = vi.fn().mockResolvedValue([
  new Record(1, "test1", 10, "2026-01-14 00:00:00.000000+00"),
  new Record(2, "test2", 5, "2026-01-14 00:00:00.000000+00")
]);

vi.mock("../lib/supabaseCRUDFunctions.ts", () => {
  return {
    insertRecord: vi.fn().mockResolvedValue(undefined),
    getAllRecords: () =>mockGetAllRecords()
  }
});

import * as supabase from "../lib/supabaseCRUDFunctions"

/*
describe("Button", () => {
  it("should render title", async () => {
    render(<ChakraProvider value={createSystem(defaultConfig, {})}><LearningRecord /></ChakraProvider>);
    
    screen.debug();
    //const message = screen.getByTestId("load");
    //const button = await screen.findByRole("button", {name: "登録"});
    const button = await screen.findByRole("table");

    expect(button).toBeInTheDocument();
  });
});
*/
describe("Modal", () => {
  it("should render title", async () => {
    render(<ChakraProvider value={createSystem(defaultConfig, {})}><LearningRecord /></ChakraProvider>);
    
    //const message = screen.getByTestId("load");
    const button = await screen.findByRole("button", {name: "登録"});
    await userEvent.click(button);


    const dialog = await screen.findByRole("dialog");
    const utils = within(dialog);

    await userEvent.type(
      utils.getByLabelText("学習内容"),
      "React Test"
    );

    await userEvent.type(
      utils.getByLabelText("時間"),
      "100"
    );

    const modalRegisterButton = utils.getByRole("button", {name: "登録"});
    await userEvent.click(modalRegisterButton);
    
    await waitFor(() => {
      expect(supabase.insertRecord).toHaveBeenCalledWith({
        title: "React Test",
        time: 100,
      });
    });

  });
});