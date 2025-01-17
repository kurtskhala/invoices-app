import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';

export function DatePicker({
  handleDateChange,
  initialDate,
  disabled,
}: {
  handleDateChange: (date: Date) => void;
  initialDate?: string;
  disabled?: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );

  useEffect(() => {
    if (initialDate) {
      const newDate = new Date(initialDate);
      setDate(newDate);
    }
  }, []);

  const onDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      handleDateChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left text-foreground font-bold rounded-[8px]',
            !date && 'text-muted-foreground '
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
