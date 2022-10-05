import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";

interface InfoDropdownProps {
  label: ReactNode;
  value: ReactNode;
  children: ReactNode;
  labelVariant?: "normal" | "important";
  className?: string;
}

const InfoDropdown = (props: InfoDropdownProps) => {
  const { label, value, children, labelVariant, className } = props;
  const [open, setOpen] = useState(false);

  return (
    <Disclosure>
      <div className={classNames("dropdown-wrapper", className)}>
        <InfoRow>
          <InfoRowLabel variant={labelVariant}>
            <Disclosure.Button className="dropdown-button" type="button" onClick={() => setOpen((o) => !o)}>
              {label}
              <ChevronDownIcon className={classNames("dropdown-button-icon", { "dropdown-button-icon-open": open })} />
            </Disclosure.Button>
          </InfoRowLabel>
          <InfoRowValue className="important-text">{value}</InfoRowValue>
        </InfoRow>
        <Transition
          as="div"
          className="dropdown-transition"
          enter="dropdown-transition-enter"
          enterFrom="dropdown-transition-enter-from"
          enterTo="dropdown-transition-enter-to"
          leave="dropdown-transition-leave"
          leaveFrom="dropdown-transition-leave-from"
          leaveTo="dropdown-transition-leave-to"
        >
          <Disclosure.Panel className="dropdown-panel">{children}</Disclosure.Panel>
        </Transition>
      </div>
    </Disclosure>
  );
};

export default InfoDropdown;
