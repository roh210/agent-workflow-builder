"use client";
import { StructuredOutputNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const StructuredOutputConfig = ({ nodeId, config }: BaseNodeConfigProps<StructuredOutputNodeConfig>) => {
  const { handleChange } = useNodeConfig<StructuredOutputNodeConfig>(nodeId);

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
            placeholder="Paste unstructured text to extract data from"
            rows={4}
          />
        </FormField>
      )}

      <FormField label="Schema Definition">
        <select
          value={config.schemaDefinition}
          onChange={(e) => handleChange("schemaDefinition", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="fromExample">From Example</option>
          <option value="manual">Manual JSON Schema</option>
        </select>
      </FormField>

      {config.schemaDefinition === "fromExample" && (
        <FormField label="Example Output">
          <textarea
            className={INPUT_CLASSNAME}
            value={config.exampleOutput || ""}
            onChange={(e) => handleChange("exampleOutput", e.target.value)}
            placeholder='{ "name": "John", "email": "john@example.com", "age": 30 }'
            rows={4}
          />
        </FormField>
      )}

      {config.schemaDefinition === "manual" && (
        <div className="text-sm text-gray-400 p-3 bg-gray-900 rounded">
          {/* TODO: Add JSONSchemaEditor component for visual schema building */}
          JSON Schema editor coming soon. Use "From Example" for now.
        </div>
      )}

      <FormField label="Model">
        <select
          value={config.model}
          onChange={(e) => handleChange("model", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        </select>
      </FormField>

      <FormField label="Instructions">
        <textarea
          className={INPUT_CLASSNAME}
          value={config.instructions || ""}
          onChange={(e) => handleChange("instructions", e.target.value)}
          placeholder="Optional: Guide the extraction (e.g., 'Extract dates in ISO format')"
          rows={3}
        />
      </FormField>
    </div>
  );
};
