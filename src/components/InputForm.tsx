"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarExporter } from "@/lib/CalendarExporter";
import { questConfig } from "@/config/questConfig";
import { downloadFile } from "@/lib/downloadFile";

const dateFormatOptions = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY/MM/DD",
];

export const InputForm: React.FC = () => {
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [eventSummary, setEventSummary] = useState("@code @type in @location");
  const [eventDescription, setEventDescription] = useState(
    "@code-@section: @name (@type) in @location with @prof"
  );
  const [questContent, setQuestContent] = useState("");

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const exporter = new CalendarExporter(
        dateFormat,
        questContent,
        eventSummary,
        eventDescription
      );
      const ical = exporter.run();
      downloadFile(ical, questConfig.filename);
    } catch (err: any) {
      alert(err?.message || "Unable to generate iCalendar file! Please check your input.");
    }
  }

  return (
    <form
      onSubmit={handleGenerate}
      className="w-[90vw] max-w-[712px] bg-[#171717] border border-[#2F2F2F] rounded-xl p-6 flex flex-col gap-6 shadow-lg"
      style={{ margin: "0 auto" }}
    >
      {/* Quest Page Content */}
      <div className="flex flex-col gap-2">
        <label htmlFor="quest-content" className="text-[#C9C9C9] font-medium text-sm mb-1">
          Quest Page Content
        </label>
        <Textarea
          id="quest-content"
          placeholder="Paste your Quest schedule here"
          value={questContent}
          onChange={e => setQuestContent(e.target.value)}
          className="h-26 resize-none overflow-y-auto bg-[#191919] border-[#232323] text-[#E5E5E5] placeholder:text-[#7C7C7C] custom-scrollbar"
        />
      </div>
      {/* Date Format and Event Summary */}
      <div className="flex flex-row gap-4 items-end">
        <div className="flex-1 flex flex-col gap-2 max-w-[130px]">
          <label className="text-[#C9C9C9] font-medium text-sm mb-1">Date Format</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-[#191919] border-[#232323] text-[#E5E5E5]"
              >
                {dateFormat || "MM/DD/YYYY"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#191919] border-[#232323] text-[#E5E5E5]">
              {dateFormatOptions.map(option => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => setDateFormat(option)}
                  className="cursor-pointer"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-[#C9C9C9] font-medium text-sm mb-1">Event Summary</label>
          <Input
            value={eventSummary}
            onChange={e => setEventSummary(e.target.value)}
            className="bg-[#191919] border-[#232323] text-[#E5E5E5] placeholder:text-[#7C7C7C]"
            placeholder="@code @type in @location"
          />
        </div>
      </div>
      {/* Event Description and Generate Button */}
      <div className="flex flex-row gap-4 items-end">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-[#C9C9C9] font-medium text-sm mb-1">Event Description</label>
          <Input
            value={eventDescription}
            onChange={e => setEventDescription(e.target.value)}
            className="bg-[#191919] border-[#232323] text-[#E5E5E5] placeholder:text-[#7C7C7C]"
            placeholder="@code-@section: @name (@type) in @location with @prof"
          />
        </div>
        <Button
          type="submit"
          className="h-8 px-6 py-[18px] mb-[1px] bg-[#E5E5E5] text-[#171717] font-medium text-[15px] rounded-md flex items-center gap-2 hover:bg-[#d4d4d4] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E5E5E5] cursor-pointer"
        >
          Generate <span className="text-lg">→</span>
        </Button>
      </div>
    </form>
  );
};

export default InputForm; 