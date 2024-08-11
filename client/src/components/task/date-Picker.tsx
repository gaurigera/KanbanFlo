"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";

interface DatePickerProps {
  date?: Date;
}

export default function DatePicker(props?: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    if (props?.date) {
      setDate(props?.date);
    }
  }, [props?.date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[200px] justify-between bg-white",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
