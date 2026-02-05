"use client";
import { DataOutputNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const DataOutputConfig = ({ nodeId, config }: BaseNodeConfigProps<DataOutputNodeConfig>) => {
  const { handleChange } = useNodeConfig<DataOutputNodeConfig>(nodeId);

  return (
    <div className="space-y-4">
      <FormField label="Output Format">
        <select
          value={config.outputFormat}
          onChange={(e) => handleChange("outputFormat", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="text">Text</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
        </select>
      </FormField>
      <FormField label="Display Source">
        <select
          value={config.displaySource}
          onChange={(e) => handleChange("displaySource", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="previousNode">Previous Node</option>
          <option value="selectFields">Select Fields</option>
        </select>
      </FormField>
      {config.displaySource === "selectFields" && (
        <div>
          {" "}
          Optional array
          {/* TODO: Add SelectedFieldsEditor component for field mapping */}
        </div>
      )}
      <FormField label="Pretty Print">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            aria-description="pretty-print"
            className="rounded border-gray-600 bg-gray-800 text-blue-500"
            checked={config.prettyPrint || false}
            onChange={(e) => handleChange("prettyPrint", e.target.checked)}
          />
          <span className="text-sm text-gray-300">Enable pretty printing</span>
        </label>
      </FormField>
      <FormField label="Include Metadata">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            aria-description="meta-data"
            className="rounded border-gray-600 bg-gray-800 text-blue-500"
            checked={config.includeMetadata || false}
            onChange={(e) => handleChange("includeMetadata", e.target.checked)}
          />
          <span className="text-sm text-gray-300">
            Enable metadata inclusion
          </span>
        </label>
      </FormField>
    </div>
  );
};
