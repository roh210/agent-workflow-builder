"use client";
import { DataInputNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const DataInputConfig = ({ nodeId, config }: BaseNodeConfigProps<DataInputNodeConfig>) => {
  const { handleChange } = useNodeConfig<DataInputNodeConfig>(nodeId);
  
  return (
    <div className="space-y-4">
      <FormField label="Input type">
        <select
          value={config.inputType}
          onChange={(e) => handleChange("inputType", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="text">Text</option>
          <option value="json">JSON</option>
          <option value="file">File</option>
        </select>
      </FormField>

      <FormField label="Placeholder">
        <input
          type="text"
          className={INPUT_CLASSNAME}
          value={config.placeholder || ""}
          onChange={(e) => handleChange("placeholder", e.target.value)}
        />
      </FormField>

      <FormField label="Default Value">
        <textarea
          className={INPUT_CLASSNAME}
          value={config.defaultValue || ""}
          onChange={(e) => handleChange("defaultValue", e.target.value)}
        />
      </FormField>
    </div>
  );
};

