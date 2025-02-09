import { GroupBase, MultiValue, OptionProps, OptionsOrGroups, SingleValue } from 'react-select';
export interface OptionType {
    label: string;
    value: string;
}
export interface IProps {
    value?: OptionType | OptionType[];
    onChange?: (newValue: MultiValue<OptionType> | SingleValue<OptionType>) => void;
    portal?: boolean;
    withSearch?: boolean;
    options?: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
    multiple?: boolean;
    outlined?: boolean;
    customOption?: React.ComponentType<OptionProps<OptionType, boolean, GroupBase<OptionType>>>;
}
declare const Dropdown: ({ value, onChange, options, portal, withSearch, multiple, outlined, customOption, }: IProps) => import("react/jsx-runtime").JSX.Element;
export default Dropdown;
