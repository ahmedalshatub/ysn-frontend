import { useState, useCallback, useMemo } from "react";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";

type CalendarVariant = "default" | "bordered" | "filled";

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
}

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  variant?: CalendarVariant;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showOutsideDays?: boolean;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const Calendar = ({
  value,
  defaultValue,
  onChange,
  events = [],
  onEventClick,
  variant = "default",
  minDate,
  maxDate,
  disabledDates = [],
  showOutsideDays = true,
  className = "",
}: CalendarProps) => {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || defaultValue || null);
  const [viewDate, setViewDate] = useState(() => {
    const d = value || defaultValue || today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((evt) => {
      const key = evt.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(evt);
    });
    return map;
  }, [events]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month, firstDayOfWeek, prevMonthDays, daysInMonth]);

  const isDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
      return disabledDates.some((d) => isSameDay(d, date));
    },
    [minDate, maxDate, disabledDates]
  );

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    setSelectedDate(date);
    onChange?.(date);
  };

  const navigateMonth = (direction: number) => {
    setViewDate(new Date(year, month + direction, 1));
  };

  const goToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    onChange?.(today);
  };

  return (
    <div className={`calendar calendar-${variant} ${className}`}>
      <div className="calendar-header">
        <button type="button" className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
          <ChevronLeftIcon width="16" height="16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </button>
        <div className="calendar-header-center">
          <span className="calendar-month-year">{MONTHS[month]} {year}</span>
          <button type="button" className="calendar-today-btn" onClick={goToToday}>Today</button>
        </div>
        <button type="button" className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
          <ChevronRightIcon width="16" height="16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </button>
      </div>

      <div className="calendar-weekdays">
        {DAYS.map((day) => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map(({ date, isCurrentMonth }, idx) => {
          const dateKey = formatDateKey(date);
          const dayEvents = eventMap.get(dateKey) || [];
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const disabled = isDisabled(date);
          const outsideDay = !isCurrentMonth;

          if (outsideDay && !showOutsideDays) {
            return <div key={idx} className="calendar-day-empty" />;
          }

          return (
            <div
              key={idx}
              className={`calendar-day ${isToday ? "calendar-day-today" : ""} ${isSelected ? "calendar-day-selected" : ""} ${disabled ? "calendar-day-disabled" : ""} ${outsideDay ? "calendar-day-outside" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span className="calendar-day-number">{date.getDate()}</span>
              {dayEvents.length > 0 && (
                <div className="calendar-events">
                  {dayEvents.slice(0, 3).map((evt) => (
                    <span
                      key={evt.id}
                      className={`calendar-event-dot calendar-event-${evt.color || "primary"}`}
                      title={evt.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(evt);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type { CalendarProps, CalendarEvent, CalendarVariant };
export default Calendar;
