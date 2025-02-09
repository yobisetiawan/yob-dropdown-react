/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, Search, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionProps,
  OptionsOrGroups,
  SingleValue,
} from "react-select";
import "./styles.css";

const highlightText = (text: string, search: string) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#ddd" : "#ddd",
    boxShadow: state.isFocused ? "0 0 0 0px #ddd" : "none",
    paddingLeft: "30px",
    position: "relative",
    "&:hover": {
      borderColor: state.isFocused ? "#ddd" : "#ddd",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: "0px",
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "lightgray" : "white",
    color: "#000",
    ":hover": {
      backgroundColor: "lightgray",
    },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};

export interface OptionType {
  label: string;
  value: string;
}

export interface IProps {
  value?: OptionType | OptionType[];
  onChange?: (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>
  ) => void;
  portal?: boolean;
  withSearch?: boolean;
  options?: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  multiple?: boolean;
  outlined?: boolean;
  customOption?: React.ComponentType<
    OptionProps<OptionType, boolean, GroupBase<OptionType>>
  >;
}

const Dropdown = ({
  value,
  onChange,
  options,
  portal = false,
  withSearch = true,
  multiple = false,
  outlined = true,
  customOption,
}: IProps) => {
  const selectRef = useRef(null) as any;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenSelect = () => {
    setIsOpen(!isOpen);
    if (!open && selectRef.current) {
      selectRef.current!.focus();
    }
  };

  const removeSelected = (x: OptionType) => {
    if (Array.isArray(value)) {
      const newList = [...value];
      const filterList = newList.filter((el) => x.value !== el.value);
      if (onChange) {
        onChange(filterList);
      }

      setIsOpen(false);
    }
  };

  const viewSelected = () => {
    if (!multiple) {
      const single = value as OptionType;
      return <div className="single-select">{single?.label ?? ""}</div>;
    }

    const data = value as OptionType[];
    return (
      <div>
        {(data?.length ? data : []).map((x: OptionType, i: number) => {
          return (
            <div key={x.value + i} className="pill">
              <div className="inner-pill">
                <span>{x?.label}</span>
                <a
                  title="closed"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeSelected(x);
                  }}
                  className="pill-closed"
                >
                  <XCircle size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="yob-dropdown">
      <div className="result" onClick={handleOpenSelect}>
        <div>{viewSelected()}</div>
        <div className="chev-down">
          <ChevronDown color="#ddd" />
        </div>
      </div>

      {isOpen && (
        <div className="wrap">
          <div className="wrap-inner">
            <div className="search-icon">
              <Search color="#ddd" />
            </div>
            <Select
              ref={selectRef}
              menuIsOpen={isOpen}
              options={options}
              isSearchable={withSearch}
              isMulti={multiple}
              onInputChange={(value) => setSearch(value)}
              formatOptionLabel={
                outlined
                  ? (option) => <div>{highlightText(option.label, search)}</div>
                  : undefined
              }
              value={value}
              onChange={(value) => {
                if (onChange) {
                  onChange(value);
                }
              }}
              onMenuOpen={() => setIsOpen(true)}
              onMenuClose={() => setIsOpen(false)}
              styles={customStyles}
              components={
                typeof customOption !== "undefined"
                  ? { MultiValue: () => null, Option: customOption }
                  : { MultiValue: () => null }
              }
              menuPortalTarget={portal ? document.body : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
