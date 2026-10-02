export interface SelectOption {
  value: string;
  label: string;
  slug?: string;
  title?: string;
}

export interface ContactFormData {
  selectPlaceholder?: string;
  options: SelectOption[];
}
