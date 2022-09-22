import * as Add2Calendar from "add2calendar";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import { InfoRow, InfoRowValue } from "../InfoRow";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";

const RepaymentDate = () => {
  const { formState } = useBuyWithLeverage();
  const { duration } = formState;
  const nowMs = new Date().getTime();
  const periodMs = duration * 86400 * 1000;
  const repaymentDate = new Date(nowMs + periodMs);
  const dateString = repaymentDate.toDateString();
  const localeDateString = repaymentDate.toLocaleDateString();

  const calendarEvent = new Add2Calendar({
    start: dateString,
    end: dateString,
    title: "MetaStreet Loan Repayment Date",
    description: "Head to MetaStreet marketplace to repay your loan.",
    isAllDay: true,
  });
  const addToCalendarLink = calendarEvent.getGoogleUrl();

  return (
    <InfoRow className="bwl-modal-form-repayment-date">
      <PurpleSectionLabel>Repayment Date</PurpleSectionLabel>
      <InfoRowValue className="important-text">
        <a
          href={addToCalendarLink}
          target="_blank"
          rel="noreferrer noopener"
          className="bwl-modal-form-repayment-date-calendar-a"
        >
          <CalendarIcon className="bwl-modal-from-repayment-date-calendar-icon" />
        </a>
        <span>{localeDateString}</span>
      </InfoRowValue>
    </InfoRow>
  );
};

const CalendarIcon = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 7.667a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2v-12z" fill="#fff" />
      <path
        d="M8 7.667v-4m8 4v-4m-9 8h10m-12 10h14a2 2 0 002-2v-12a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        stroke="#7159AD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RepaymentDate;
