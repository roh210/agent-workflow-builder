"use client";
import { LLMTaskNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const LLMTaskConfig = ({ nodeId, config }: BaseNodeConfigProps<LLMTaskNodeConfig>) => {
  const { handleChange } = useNodeConfig<LLMTaskNodeConfig>(nodeId);
  const { clampNumber } = useFieldValidation();

  return (
    <div className="space-y-4">
      <FormField label="Prompt Template">
        <textarea
          className={INPUT_CLASSNAME}
          value={config.promptTemplate || ""}
          onChange={(e) => handleChange("promptTemplate", e.target.value)}
          placeholder="Use {variable} syntax for dynamic values"
          rows={4}
        />
      </FormField>

      {/* TODO: Add VariablesEditor component for Record<string, string> editing */}
      
      <FormField label="Model">
        <select
          value={config.model}
          onChange={(e) => handleChange("model", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="o1">o1</option>
          <option value="o1-mini">o1-mini</option>
        </select>
      </FormField>

      <FormField label="Temperature">
        <input
          type="number"
          className={INPUT_CLASSNAME}
          value={config.temperature || ""}
          onChange={(e) => handleChange("temperature", Number(e.target.value))}
          placeholder="0.7 (0 = deterministic, 2 = creative)"
          step={0.1}
          min={0}
          max={2}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (value && !isNaN(value)) {
              handleChange("temperature", clampNumber(value, 0, 2));
            }
          }}
        />
      </FormField>

      <FormField label="Max Tokens">
        <input
          type="number"
          className={INPUT_CLASSNAME}
          value={config.maxTokens || ""}
          onChange={(e) => handleChange("maxTokens", Number(e.target.value))}
          placeholder="e.g., 1000"
          min={1}
          max={4000}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (value && !isNaN(value)) {
              handleChange("maxTokens", clampNumber(value, 1, 4000));
            }
          }}
        />
      </FormField>

      <FormField label="System Message">
        <textarea
          className={INPUT_CLASSNAME}
          value={config.systemMessage || ""}
          onChange={(e) => handleChange("systemMessage", e.target.value)}
          placeholder="Optional: Set the behavior and context for the AI"
          rows={3}
        />
      </FormField>
    </div>
  );
};
