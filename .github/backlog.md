Status: ✅ Complete (MVP scope)
Notes: Complex UI components (Variables Editor, SelectedFields Editor, JSON Schema Editor) deferred to polish phase. See AWB-050, AWB-051, AWB-052.

---

## Polish Phase Tickets (Deferred)

### AWB-050: Add Variables Editor to LLMTaskConfig
Type: Enhancement
Priority: P3 - Low
Story Points: 2
Sprint: Polish Phase
Blocked By: AWB-011
Tags: `enhancement`, `polish`, `post-mvp`

**Description**
Add visual editor for LLM prompt template variables (Record<string, string>). Currently users must hardcode values in the prompt template.

**User Story**
As a user, I want to define reusable variables for my LLM prompts so I can use dynamic values like `{topic}` and `{aspect}` in my templates.

**Acceptance Criteria**
- [ ] Visual key-value editor for variables
- [ ] Add/remove variable rows
- [ ] Edit variable names and values
- [ ] Variables update Zustand store
- [ ] Handle duplicate key names gracefully

**Technical Implementation**
```typescript
// LLMTaskConfig.tsx addition
const variableEntries = Object.entries(config.variables || {});

const addVariable = () => {
  const key = `var${Object.keys(config.variables || {}).length + 1}`;
  handleChange('variables', { ...(config.variables || {}), [key]: '' });
};

const updateVariable = (oldKey: string, newKey: string, value: string) => {
  const updated = { ...(config.variables || {}) };
  delete updated[oldKey];
  updated[newKey] = value;
  handleChange('variables', updated);
};

const removeVariable = (key: string) => {
  const updated = { ...(config.variables || {}) };
  delete updated[key];
  handleChange('variables', updated);
};

// UI
{variableEntries.map(([key, value], index) => (
  <div key={index} className="flex gap-2">
    <input value={key} onChange={...} placeholder="Variable name" />
    <input value={value} onChange={...} placeholder="Value" />
    <button onClick={() => removeVariable(key)}>×</button>
  </div>
))}
<button onClick={addVariable}>+ Add Variable</button>
```

**Effort Estimate:** 1-2 hours

---

### AWB-051: Add SelectedFields Editor to DataOutputConfig
Type: Enhancement
Priority: P3 - Low
Story Points: 3
Sprint: Polish Phase
Blocked By: AWB-011
Tags: `enhancement`, `polish`, `post-mvp`

**Description**
Add field selector to cherry-pick specific fields from upstream nodes for output. Currently outputs all fields from previous node.

**User Story**
As a user, I want to select specific fields from connected nodes (e.g., only "title" and "url" from web scraping) so my output is clean and focused.

**Acceptance Criteria**
- [ ] Dropdown of upstream connected nodes
- [ ] Field path input (JSON path syntax)
- [ ] Optional label for display
- [ ] Add/remove field mappings
- [ ] Updates selectedFields array in store

**Technical Implementation**
```typescript
// Get upstream nodes
const upstreamNodes = useWorkflowStore(state => {
  const edges = state.edges;
  const incomingEdges = edges.filter(e => e.target === nodeId);
  return incomingEdges.map(e => 
    state.nodes.find(n => n.id === e.source)
  ).filter(Boolean);
});

const addField = () => {
  const newField = { nodeId: '', fieldPath: '', label: '' };
  handleChange('selectedFields', [...(config.selectedFields || []), newField]);
};

const updateField = (index: number, key: string, value: any) => {
  const updated = [...(config.selectedFields || [])];
  updated[index] = { ...updated[index], [key]: value };
  handleChange('selectedFields', updated);
};

// UI
{config.selectedFields?.map((field, index) => (
  <div key={index} className="space-y-2 border p-2 rounded">
    <select value={field.nodeId} onChange={...}>
      {upstreamNodes.map(node => (
        <option value={node.id}>{node.data.label}</option>
      ))}
    </select>
    <input value={field.fieldPath} placeholder="data.title" />
    <input value={field.label} placeholder="Display name (optional)" />
    <button onClick={() => removeField(index)}>Delete</button>
  </div>
))}
```

**Effort Estimate:** 3-4 hours

---

### AWB-052: Add JSON Schema Editor to StructuredOutputConfig
Type: Enhancement
Priority: P3 - Low
Story Points: 1
Sprint: Polish Phase
Blocked By: AWB-011
Tags: `enhancement`, `polish`, `post-mvp`, `library`

**Description**
Add visual JSON Schema editor for manual schema definition. Currently users can only use "fromExample" mode.

**User Story**
As a user, I want to define JSON schemas visually (without writing raw JSON) so I can specify complex extraction structures easily.

**Acceptance Criteria**
- [ ] Visual tree editor for JSON schemas
- [ ] Support for nested objects and arrays
- [ ] Type selection (string, number, boolean, object, array)
- [ ] Required field toggles
- [ ] Updates jsonSchema in store

**Recommended Library: vanilla-jsoneditor**
- Lightweight (~50kb bundle)
- Tree view + code view
- Built-in validation
- Good for technical users

**Installation**
```bash
npm install vanilla-jsoneditor
```

**Technical Implementation**
```typescript
import { JSONEditor } from 'vanilla-jsoneditor';

{config.schemaDefinition === "manual" && (
  <FormField label="JSON Schema">
    <div className="border border-gray-600 rounded h-[300px]">
      <JSONEditor
        content={{ 
          json: config.jsonSchema || { 
            type: 'object', 
            properties: {} 
          } 
        }}
        onChange={(content) => {
          if (content.json) {
            handleChange('jsonSchema', content.json);
          }
        }}
        mode="tree"
      />
    </div>
  </FormField>
)}
```

**Alternative Libraries**
- `@rjsf/core` - More features, larger bundle (~200kb)
- `@monaco-editor/react` - VS Code editor, huge bundle (~1MB)

**Effort Estimate:** 15-20 minutes (library integration)

---