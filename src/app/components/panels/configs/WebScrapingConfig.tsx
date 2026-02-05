"use client";
import { WebScrapingNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const WebScrapingConfig = ({ nodeId, config }: BaseNodeConfigProps<WebScrapingNodeConfig>) => {
  const { handleChange } = useNodeConfig<WebScrapingNodeConfig>(nodeId);
  const { clampNumber } = useFieldValidation();

  return (
    <div className="space-y-4">
      <FormField label="URL Source">
        <select
          value={config.urlSource}
          onChange={(e) => handleChange("urlSource", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="fromInput">From Input</option>
          <option value="manual">Manual URL</option>
        </select>
      </FormField>
      {config.urlSource === "manual" && (
        <FormField label="Manual URL">
          <input
            type="text"
            className={INPUT_CLASSNAME}
            value={config.manualUrl || ""}
            onChange={(e) => handleChange("manualUrl", e.target.value)}
          />
        </FormField>
      )}
      <FormField label="Extraction Rules">
        <textarea
          value={config.extractionRules || ""}
          onChange={(e) => handleChange("extractionRules", e.target.value)}
          className={INPUT_CLASSNAME}
          placeholder="CSS selectors: .article-content, #main"
        />
      </FormField>
      <FormField label="Should summarize Content">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded border-gray-600 bg-gray-800 text-blue-500"
            checked={config.shouldSummarize || false}
            onChange={(e) => handleChange("shouldSummarize", e.target.checked)}
          />
          <span className="text-sm text-gray-300">
            Enable content summarization
          </span>
        </label>
      </FormField>
      {config.shouldSummarize && (
        <>
          <FormField label="Summarization Model">
            <select
              value={config.summarizationModel || ''}
              onChange={(e) =>
                handleChange("summarizationModel", e.target.value)
              }
              className={INPUT_CLASSNAME}
            >
              <option value="">Select model</option>
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            </select>
          </FormField>

          <FormField label="Summarization Length (in tokens)">
            <input
              type="number"
              value={config.summaryLength || ''}
              placeholder="e.g., 500"
              onChange={(e) =>
                handleChange("summaryLength", Number(e.target.value))
              }
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (value && !isNaN(value)) {
                  handleChange("summaryLength", clampNumber(value, 50, 2000));
                }
              }}
              min={50}
              max={2000}
              className={INPUT_CLASSNAME}
            />
          </FormField>
        </>
      )}
    </div>
  );
};
