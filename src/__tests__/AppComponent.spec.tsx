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

const mockRecords: Record[] = [
  new Record(1, "test1", 10, "2026-01-14 00:00:00.000000+00"),
  new Record(2, "test2", 5, "2026-01-14 00:00:00.000000+00")
];
const mockGetAllRecords = vi.fn().mockResolvedValue(mockRecords);

vi.mock("../lib/supabaseCRUDFunctions.ts", () => {
  return {
    insertRecord: vi.fn().mockResolvedValue(undefined),
    getAllRecords: () =>mockGetAllRecords(() => Promise.resolve([...mockRecords])),
    updateRecord: vi.fn((data:{title: string, time: number}, id:number) => {
      const record = mockRecords.find(r => r.id === id);
      if(record) {
        record.title = data.title;
        record.time = data.time;
      }
      return Promise.resolve();
    }),
    deleteRecord: vi.fn((id: number) => {
      // 削除したレコードを配列から消す
      const index = mockRecords.findIndex(r => r.id === id);
      if (index >= 0) mockRecords.splice(index, 1);
      return Promise.resolve();
    }),
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

/*
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
      "-100"
    );
    

    const modalRegisterButton = utils.getByRole("button", {name: "登録"});
    await userEvent.click(modalRegisterButton);
    
    expect(
      await utils.findByText("時間は0以上である必要があります")
    ).toBeInTheDocument();

    expect(supabase.insertRecord).not.toHaveBeenCalled();

    
    await waitFor(() => {
      expect(supabase.insertRecord).toHaveBeenCalledWith({
        title: "React Test",
        time: 100,
      });
    });
    

  });
});
*/

/*
describe("delete", ()=>{
  it("should be deleted record", async () =>{
    render(<ChakraProvider value={createSystem(defaultConfig, {})}><LearningRecord /></ChakraProvider>);
    
    //const message = screen.getByTestId("load");
    const button = await screen.findAllByRole("button", {name: "削除"});
    await userEvent.click(button[0]);

    await waitFor(() => {
      expect(supabase.deleteRecord).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.queryByText("test1")).not.toBeInTheDocument();
    });

    // もう1件は残っている
    expect(screen.getByText("test2")).toBeInTheDocument();

  });
});
*/

describe("update", () => {
  it("should render title", async () => {
    render(<ChakraProvider value={createSystem(defaultConfig, {})}><LearningRecord /></ChakraProvider>);
    
    //const message = screen.getByTestId("load");
    const button = await screen.findAllByRole("button", {name: "編集"});
    await userEvent.click(button[0]);


    const dialog = await screen.findByRole("dialog");
    const utils = within(dialog);

    //const message = await utils.findByTestId("title");
    
    //expect(message).toHaveTextContent("記録編集");

    const input = utils.getByLabelText("学習内容");

    await userEvent.clear(input);
    await userEvent.type(
      input,
      "React Test"
    );
    
    const modalSaveButton = utils.getByRole("button", {name: "保存"});
    await userEvent.click(modalSaveButton);
    
    await waitFor(() => {
      expect(supabase.updateRecord).toHaveBeenCalledWith({
        title: "React Test",
        time: 10,
      },1)
    });

  await waitFor(() => {
    expect(screen.getByText("React Test")).toBeInTheDocument();
  });

  });
});