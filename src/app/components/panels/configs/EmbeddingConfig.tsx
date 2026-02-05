"use client";
import { EmbeddingGeneratorNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const EmbeddingConfig = ({ nodeId, config }: BaseNodeConfigProps<EmbeddingGeneratorNodeConfig>) => {
  const { handleChange } = useNodeConfig<EmbeddingGeneratorNodeConfig>(nodeId);
  const { clampNumber } = useFieldValidation();

  return (
    <div className="space-y-4">
      <FormField label="Text Source">
        <select
          value={config.textSource}
          onChange={(e) => handleChange("textSource", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="fromPreviousNode">From Previous Node</option>
          <option value="manual">Manual Entry</option>
        </select>
      </FormField>
      {config.textSource === "manual" && (
        <FormField label="Manual Text">
          <textarea
            className={INPUT_CLASSNAME}
            value={config.manualText || ""}
            onChange={(e) => handleChange("manualText", e.target.value)}
           />
        </FormField>
      )}
      {config.textSource === "fromPreviousNode" && (
        <FormField label="Field Mapping">
          <input
            type="text"
            placeholder="data.content"
            className={INPUT_CLASSNAME}
            value={config.fieldPath || ""}
            onChange={(e) => handleChange("fieldPath", e.target.value)}
          />
        </FormField>
      )}
      <FormField label="Model">
        <select
          value={config.model}
          onChange={(e) => handleChange("model", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="text-embedding-3-small">text-embedding-3-small</option>
          <option value="text-embedding-3-large">text-embedding-3-large</option>
          <option value="text-embedding-ada-002">text-embedding-ada-002</option>
        </select>
      </FormField>
      <FormField label="Dimensions">
        <input
          type="number"
          className={INPUT_CLASSNAME}
          value={config.dimensions || ''}
          placeholder="Optional: 512-3072 (leave empty for default)"
          min={0}
          max={3072}
          onChange={(e) => handleChange("dimensions", Number(e.target.value))}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (value && !isNaN(value)) {
              handleChange("dimensions", clampNumber(value, 0, 3072));
            }
          }}
        />
      </FormField>
    </div>
  );
};
