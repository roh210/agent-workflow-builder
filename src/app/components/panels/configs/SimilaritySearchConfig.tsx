"use client";
import { SimilaritySearchNodeConfig } from "@/types";
import { FormField } from "./FormField";
import { BaseNodeConfigProps } from "@/types/config";
import { useNodeConfig } from "@/hooks/useNodeConfig";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { INPUT_CLASSNAME } from "@/lib/constants/forms";

export const SimilaritySearchConfig = ({ nodeId, config }: BaseNodeConfigProps<SimilaritySearchNodeConfig>) => {
  const { handleChange } = useNodeConfig<SimilaritySearchNodeConfig>(nodeId);
  const { clampNumber } = useFieldValidation();

  return (
    <div className="space-y-4">
      <FormField label="Query Embedding Source">
        <select
          value={config.queryEmbeddingSource}
          onChange={(e) => handleChange("queryEmbeddingSource", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="fromPreviousNode">From Previous Node</option>
          <option value="generateFromText">Generate From Text</option>
        </select>
      </FormField>
      {config.queryEmbeddingSource === "generateFromText" && (
        <FormField label="Query Text">
          <textarea
            className={INPUT_CLASSNAME}
            value={config.queryText || ""}
            onChange={(e) => handleChange("queryText", e.target.value)}
          />
        </FormField>
      )}
      <FormField label="Vector Store Type">
        <select
          value={config.vectorStoreType}
          onChange={(e) => handleChange("vectorStoreType", e.target.value)}
          className={INPUT_CLASSNAME}
        >
          <option value="inMemory">In Memory</option>
          <option value="uploaded">Uploaded</option>
        </select>
      </FormField>
      {config.vectorStoreType === "uploaded" && (
        <FormField label="Uploaded Vectors ID">
          <input
            type="text"
            value={config.uploadedVectorsId || ""}
            className={INPUT_CLASSNAME}
            onChange={(e) => handleChange("uploadedVectorsId", e.target.value)}
          />
        </FormField>
      )}
      <FormField label="Top K">
        <input
          type="number"
          required
          min={1}
          max={100}
          value={config.topK || 5}
          onChange={(e) => handleChange("topK", Number(e.target.value))}
          onBlur={(e) => {
            const value = Number(e.target.value);
            handleChange("topK", clampNumber(value, 1, 100));
          }}
          className={INPUT_CLASSNAME}
        />
      </FormField>
      <FormField label="Similarity Threshold">
        <input
          type="number"
          step={0.01}
          min={0}
          max={1}
          placeholder="0.7 - only show results above 70% match"
          value={config.similarityThreshold || ""}
          onChange={(e) =>
            handleChange("similarityThreshold", Number(e.target.value))
          }
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (value && !isNaN(value)) {
              handleChange("similarityThreshold", clampNumber(value, 0, 1));
            }
          }}
          className={INPUT_CLASSNAME}
        />
      </FormField>
    </div>
  );
};
