import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../../../shared/components/inputs/Select";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import FormSearchInput from "../../../shared/components/inputs/FormSearchInput";
import TreeSelect from "../../../shared/components/inputs/TreeSelect";
import {
  SectionTitle,
  ExampleBlock,
  type DemoForm,
  simpleOptions,
  countryOptions,
  languageOptions,
  frameworkOptions,
  treeSelectData,
} from "../types/showcaseData";

const SelectsTab = () => {
  const [selectVal, setSelectVal] = useState<string | number>("");
  const [treeVal, setTreeVal] = useState<string[]>([]);

  const { control } = useForm<DemoForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      agree: false,
      newsletter: false,
      bio: "",
      notes: "",
      plan: "",
      priority: "",
      country: "",
      language: "",
      framework: "",
      searchCountry: "",
      searchLanguage: "",
      quantity: 0,
      rating: 0,
      otp: "",
      shortOtp: "",
      content: "",
      article: "",
    },
  });

  return (
    <div className="space-y-8">
      {/* ── SELECT ────────────────────────────── */}
      <SectionTitle title="Select" description="Single-select dropdowns with search, variants, sizes, and states." />

      <ExampleBlock title="Basic Select">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select id="sel-basic" label="Country" options={countryOptions} value={selectVal} onChange={setSelectVal} placeholder="Choose a country" />
          <Select id="sel-default" label="With Default Option" addDefaultOption defaultOptionLabel="All Countries" options={countryOptions.slice(0, 3)} />
          <Select id="sel-pre" label="Preselected" defaultValue="react" options={frameworkOptions} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Searchable Select">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select id="sel-search" label="Search Countries" searchable searchPlaceholder="Type to search..." options={countryOptions} />
          <Select id="sel-search-lang" label="Search Languages" searchable variant="success" options={languageOptions} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select id="sel-v-pri" label="Primary" variant="primary" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-sec" label="Secondary" variant="secondary" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-dan" label="Danger" variant="danger" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-suc" label="Success" variant="success" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-war" label="Warning" variant="warning" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-inf" label="Info" variant="info" defaultValue="a" options={simpleOptions} />
          <Select id="sel-v-drk" label="Dark" variant="dark" defaultValue="a" options={simpleOptions} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select id="sel-sm" label="Small" size="sm" options={simpleOptions} />
          <Select id="sel-md" label="Medium" size="md" options={simpleOptions} />
          <Select id="sel-lg" label="Large" size="lg" options={simpleOptions} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Disabled Options">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select id="sel-err" label="With Error" error errorMessage="Please select a country" options={countryOptions.slice(0, 2)} />
          <Select id="sel-dis" label="Disabled" disabled defaultValue="us" options={countryOptions.slice(0, 2)} />
          <Select id="sel-dis-opt" label="Disabled Options" options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom", disabled: true },
            { value: "ca", label: "Canada" },
            { value: "au", label: "Australia", disabled: true },
          ]} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select id="sel-tt-top" label="Tooltip Top" tooltip="Choose your preferred country" tooltipPosition="top" options={countryOptions.slice(0, 3)} />
          <Select id="sel-tt-right" label="Tooltip Right" tooltip="Select a framework" tooltipPosition="right" options={frameworkOptions.slice(0, 3)} />
        </div>
      </ExampleBlock>

      {/* ── FORM SELECT ──────────────────────── */}
      <SectionTitle title="FormSelect" description="Controlled select with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelect<DemoForm> id="fsel-country" label="Country" name="country" control={control} variant="primary" options={countryOptions.slice(0, 5)} />
          <FormSelect<DemoForm> id="fsel-lang" label="Language (Searchable)" name="language" control={control} variant="success" searchable options={languageOptions.slice(0, 7)} />
          <FormSelect<DemoForm> id="fsel-fw" label="Framework" name="framework" control={control} variant="info" options={frameworkOptions} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelect<DemoForm> id="fsel-err" label="With Error" name="country" control={control} error errorMessage="Country is required" options={countryOptions.slice(0, 2)} />
          <FormSelect<DemoForm> id="fsel-dis" label="Disabled" name="language" control={control} disabledStatus options={languageOptions.slice(0, 2)} />
          <FormSelect<DemoForm> id="fsel-tt" label="With Tooltip" name="framework" control={control} tooltip="Choose your framework" variant="dark" searchable options={frameworkOptions.slice(0, 4)} />
        </div>
      </ExampleBlock>

      {/* ── SEARCH INPUT ─────────────────────── */}
      <SectionTitle title="SearchInput" description="Autocomplete search input with dropdown." />

      <ExampleBlock title="Basic">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SearchInput id="si-basic" label="Search Country" options={countryOptions} placeholder="Type to search..." />
          <SearchInput id="si-pre" label="Pre-selected" options={languageOptions} defaultValue="ts" />
          <SearchInput id="si-noresult" label="Custom No Results" options={frameworkOptions} noResultsText="Nothing matched" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SearchInput id="si-sm" label="Small" options={countryOptions} size="sm" />
          <SearchInput id="si-md" label="Medium" options={countryOptions} size="md" />
          <SearchInput id="si-lg" label="Large" options={countryOptions} size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Read Only">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SearchInput id="si-err" label="With Error" options={countryOptions} error errorMessage="Please select a country" />
          <SearchInput id="si-dis" label="Disabled" options={languageOptions} disabled defaultValue="py" />
          <SearchInput id="si-ro" label="Read Only" options={frameworkOptions} readOnly defaultValue="react" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SearchInput id="si-tt-top" label="Tooltip Top" options={countryOptions} tooltip="Search for a country" tooltipPosition="top" />
          <SearchInput id="si-tt-right" label="Tooltip Right" options={languageOptions} tooltip="Pick a language" tooltipPosition="right" />
          <SearchInput id="si-tt-bottom" label="Tooltip Bottom" options={frameworkOptions} tooltip="Choose framework" tooltipPosition="bottom" />
        </div>
      </ExampleBlock>

      {/* ── FORM SEARCH INPUT ────────────────── */}
      <SectionTitle title="FormSearchInput" description="Controlled search input with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSearchInput<DemoForm> id="fsi-country" label="Search Country" name="searchCountry" control={control} options={countryOptions} />
          <FormSearchInput<DemoForm> id="fsi-lang" label="Search Language" name="searchLanguage" control={control} options={languageOptions} />
          <FormSearchInput<DemoForm> id="fsi-lg" label="Large Size" name="searchCountry" control={control} options={countryOptions} size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSearchInput<DemoForm> id="fsi-err" label="With Error" name="searchCountry" control={control} error errorMessage="Country is required" options={countryOptions} />
          <FormSearchInput<DemoForm> id="fsi-dis" label="Disabled" name="searchLanguage" control={control} disabledStatus options={languageOptions} />
          <FormSearchInput<DemoForm> id="fsi-tt" label="With Tooltip" name="searchCountry" control={control} tooltip="Search and select a country" options={countryOptions} />
        </div>
      </ExampleBlock>

      {/* ── TREE SELECT ──────────────────────── */}
      <SectionTitle title="TreeSelect" description="Hierarchical dropdown with single, multiple, and checkbox modes." />

      <ExampleBlock title="Single Select">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreeSelect options={treeSelectData} label="Single Select" placeholder="Choose a category..." searchable />
          <TreeSelect options={treeSelectData} label="Pre-selected" defaultValue={["iphone"]} searchable />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Multiple & Checkbox">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreeSelect options={treeSelectData} label="Multiple Select" mode="multiple" placeholder="Choose categories..." searchable value={treeVal} onChange={(vals) => setTreeVal(vals)} />
          <TreeSelect options={treeSelectData} label="Checkbox Mode" mode="checkbox" placeholder="Select items..." searchable />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Pre-selected Checkbox">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TreeSelect options={treeSelectData} label="With Error" error errorMessage="Please select at least one option" placeholder="Required field..." />
          <TreeSelect options={treeSelectData} label="Disabled" disabled placeholder="Cannot select..." />
          <TreeSelect options={treeSelectData} label="Pre-selected Checkbox" mode="checkbox" defaultValue={["iphone", "samsung"]} searchable />
        </div>
      </ExampleBlock>
    </div>
  );
};

export default SelectsTab;
