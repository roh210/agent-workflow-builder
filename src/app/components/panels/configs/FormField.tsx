
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    {children}
  </div>
);

