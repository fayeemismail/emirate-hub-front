export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactFormData {
  selectPlaceholder?: string;
  options: SelectOption[];
}
