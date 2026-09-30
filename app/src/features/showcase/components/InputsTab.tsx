import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../shared/components/inputs/Input";
import FormInput from "../../../shared/components/inputs/FormInput";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import TextArea from "../../../shared/components/inputs/TextArea";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import RadioButton from "../../../shared/components/inputs/RadioButton";
import FormRadioButton from "../../../shared/components/inputs/FormRadioButton";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import FormNumberInput from "../../../shared/components/inputs/FormNumberInput";
import OtpInput from "../../../shared/components/inputs/OtpInput";
import FormOtpInput from "../../../shared/components/inputs/FormOtpInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import Slider from "../../../shared/components/inputs/Slider";
import { RangeSlider } from "../../../shared/components/inputs/Slider";
import Knob from "../../../shared/components/inputs/Knob";
import Rate from "../../../shared/components/inputs/Rate";
import ColorPicker from "../../../shared/components/inputs/ColorPicker";
import FormColorPicker from "../../../shared/components/inputs/FormColorPicker";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import FormDatePicker from "../../../shared/components/inputs/FormDatePicker";
import FileUpload from "../../../shared/components/inputs/FileUpload";
import RichTextEditor from "../../../shared/components/inputs/RichTextEditor";
import FormRichTextEditor from "../../../shared/components/inputs/FormRichTextEditor";
import Transfer from "../../../shared/components/inputs/Transfer";
import WorkflowEditor from "../../../shared/components/editors/WorkflowEditor";
import { SectionTitle, ExampleBlock, type DemoForm, transferSourceData } from "../types/showcaseData";

const InputsTab = () => {
  const [otp, setOtp] = useState("");
  const [shortOtp, setShortOtp] = useState("");
  const [slider, setSlider] = useState(40);
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [knobVal, setKnobVal] = useState(65);
  const [rateVal, setRateVal] = useState(3);
  const [color, setColor] = useState("#6366f1");
  const [date, setDate] = useState("");
  const [rte, setRte] = useState("<p>Hello <strong>World</strong></p>");
  const [transferTarget, setTransferTarget] = useState<string[]>(["1", "3"]);
  const [quantity, setQuantity] = useState(5);

  const { control } = useForm<DemoForm>({
    defaultValues: {
      username: "Ahmed",
      email: "ahmed@example.com",
      password: "secret123",
      agree: true,
      newsletter: false,
      bio: "Full-stack developer",
      notes: "",
      plan: "pro",
      priority: "",
      country: "",
      language: "",
      framework: "",
      searchCountry: "",
      searchLanguage: "",
      quantity: 10,
      rating: 4,
      otp: "",
      shortOtp: "",
      content: "<p>Form content</p>",
      article: "",
    },
  });

  return (
    <div className="space-y-8">
      {/* ── INPUT ───────────────────────────────── */}
      <SectionTitle title="Input" description="Text inputs with labels, errors, tooltips, sizes, and datalists." />

      <ExampleBlock title="Basic Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input id="in-1" label="Username" placeholder="Enter username" />
          <Input id="in-2" label="Email" type="email" placeholder="Enter email" />
          <Input id="in-3" label="Password" type="password" placeholder="Enter password" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input id="in-sm" label="Small" size="sm" placeholder="Small input" />
          <Input id="in-md" label="Medium" size="md" placeholder="Medium input" />
          <Input id="in-lg" label="Large" size="lg" placeholder="Large input" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error State">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="in-err1" label="Username" error errorMessage="Username is required" placeholder="Enter username" />
          <Input id="in-err2" label="Email" error errorMessage="Invalid email format" placeholder="Enter email" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled & Read Only">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="in-dis" label="Disabled" disabled value="Cannot edit" />
          <Input id="in-ro" label="Read Only" readOnly value="Read only value" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="in-tt1" label="With Tooltip" placeholder="Hover me" tooltip="This is a helpful tooltip" tooltipPosition="top" />
          <Input id="in-tt2" label="Tooltip Right" placeholder="Hover me" tooltip="Right tooltip" tooltipPosition="right" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Datalist">
        <div className="max-w-sm">
          <Input id="in-dl" label="Framework" placeholder="Type to search..." dataList={["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt"]} />
        </div>
      </ExampleBlock>

      {/* ── FORM INPUT (react-hook-form) ─────────── */}
      <SectionTitle title="FormInput" description="Controlled inputs with react-hook-form." />

      <ExampleBlock title="Controlled & Error / Disabled / Read Only / Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormInput name="username" control={control} label="Username (Controlled)" placeholder="Username" />
          <FormInput name="email" control={control} label="Email (Controlled)" placeholder="Email" />
          <FormInput name="username" control={control} label="With Error" error errorMessage="Field required" placeholder="Username" />
          <FormInput name="username" control={control} label="Disabled" disabledStatus placeholder="Disabled" />
          <FormInput name="username" control={control} label="Read Only" readOnlyStatus placeholder="Read only" />
          <FormInput name="username" control={control} label="With Tooltip" tooltip="Helpful tip" />
        </div>
      </ExampleBlock>

      {/* ── CHECKBOX ────────────────────────────── */}
      <SectionTitle title="Checkbox" description="Checkboxes with variants, sizes, descriptions, and states." />

      <ExampleBlock title="Variants">
        <div className="flex flex-wrap gap-6">
          <Checkbox id="cb-pri" variant="primary" label="Primary" defaultChecked />
          <Checkbox id="cb-suc" variant="success" label="Success" defaultChecked />
          <Checkbox id="cb-dan" variant="danger" label="Danger" defaultChecked />
          <Checkbox id="cb-war" variant="warning" label="Warning" defaultChecked />
          <Checkbox id="cb-inf" variant="info" label="Info" defaultChecked />
          <Checkbox id="cb-dar" variant="dark" label="Dark" defaultChecked />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-6">
          <Checkbox id="cb-sm" size="sm" label="Small" defaultChecked />
          <Checkbox id="cb-md" size="md" label="Medium" defaultChecked />
          <Checkbox id="cb-lg" size="lg" label="Large" defaultChecked />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Description">
        <div className="space-y-3">
          <Checkbox id="cb-d1" label="Email Notifications" description="Receive email updates about your account." defaultChecked />
          <Checkbox id="cb-d2" label="SMS Notifications" description="Receive text messages for important alerts." />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Unchecked / Error / Disabled">
        <div className="flex flex-wrap gap-6">
          <Checkbox id="cb-unc" label="Unchecked" />
          <Checkbox id="cb-err" label="Error" error errorMessage="Required" />
          <Checkbox id="cb-dis1" label="Disabled Off" disabled />
          <Checkbox id="cb-dis2" label="Disabled On" disabled defaultChecked />
        </div>
      </ExampleBlock>

      {/* ── FORM CHECKBOX ──────────────────────── */}
      <SectionTitle title="FormCheckbox" description="Controlled checkboxes with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="flex flex-wrap gap-6">
          <FormCheckbox name="agree" control={control} label="I agree to terms" />
          <FormCheckbox name="newsletter" control={control} label="Subscribe to newsletter" />
          <FormCheckbox name="agree" control={control} label="With Error" error errorMessage="Must accept" />
          <FormCheckbox name="agree" control={control} label="Disabled" disabledStatus />
        </div>
      </ExampleBlock>

      {/* ── TEXTAREA ────────────────────────────── */}
      <SectionTitle title="TextArea" description="Multi-line text inputs with various sizes and states." />

      <ExampleBlock title="Basic & Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextArea id="ta-1" label="Description" placeholder="Enter description..." />
          <TextArea id="ta-2" label="Notes" placeholder="Enter notes..." rows={3} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <TextArea id="ta-sm" label="Small" size="sm" placeholder="Small" />
          <TextArea id="ta-md" label="Medium" size="md" placeholder="Medium" />
          <TextArea id="ta-lg" label="Large" size="lg" placeholder="Large" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Resize Options">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextArea id="ta-none" label="No Resize" resize="none" placeholder="Cannot resize" />
          <TextArea id="ta-vert" label="Vertical" resize="vertical" placeholder="Vertical only" />
          <TextArea id="ta-both" label="Both" resize="both" placeholder="Both directions" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled / Read Only / Tooltip">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextArea id="ta-err" label="With Error" error errorMessage="Description is required" placeholder="Enter text" />
          <TextArea id="ta-dis" label="Disabled" disabled value="Cannot edit this" />
          <TextArea id="ta-ro" label="Read Only" readOnly value="Read only content" />
          <TextArea id="ta-tt" label="With Tooltip" tooltip="Extra info" placeholder="Hover me" />
        </div>
      </ExampleBlock>

      {/* ── FORM TEXTAREA ──────────────────────── */}
      <SectionTitle title="FormTextArea" description="Controlled text areas with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormTextArea name="bio" control={control} label="Bio (Controlled)" placeholder="Tell us about yourself" />
          <FormTextArea name="notes" control={control} label="Notes" error errorMessage="Required" placeholder="Notes" />
          <FormTextArea name="bio" control={control} label="Disabled" disabledStatus />
          <FormTextArea name="bio" control={control} label="Read Only" readOnlyStatus />
        </div>
      </ExampleBlock>

      {/* ── RADIO BUTTON ────────────────────────── */}
      <SectionTitle title="RadioButton" description="Radio button groups with variants, sizes, orientations." />

      <ExampleBlock title="Vertical (Default)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Select Plan</p>
            <RadioButton name="rb-plan" options={[{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }, { value: "enterprise", label: "Enterprise" }]} defaultValue="pro" />
          </div>
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Priority</p>
            <RadioButton name="rb-priority" options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]} />
          </div>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Horizontal">
        <div>
          <p className="text-sm font-medium sc-heading mb-2">Layout Direction</p>
          <RadioButton name="rb-horiz" direction="horizontal" options={[{ value: "ltr", label: "LTR" }, { value: "rtl", label: "RTL" }, { value: "auto", label: "Auto" }]} defaultValue="ltr" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants & Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Success Variant</p>
            <RadioButton name="rb-var" variant="success" options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]} defaultValue="a" />
          </div>
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Small Size</p>
            <RadioButton name="rb-size-sm" size="sm" options={[{ value: "x", label: "X" }, { value: "y", label: "Y" }]} defaultValue="x" />
          </div>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Error / Disabled">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium sc-heading mb-2">With Error</p>
            <RadioButton name="rb-err" error errorMessage="Selection required" options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} />
          </div>
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Disabled</p>
            <RadioButton name="rb-dis" disabled options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} defaultValue="a" />
          </div>
        </div>
      </ExampleBlock>

      {/* ── FORM RADIO ─────────────────────────── */}
      <SectionTitle title="FormRadioButton" description="Controlled radio buttons with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium sc-heading mb-2">Plan (Controlled)</p>
            <FormRadioButton name="plan" control={control} options={[{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }, { value: "enterprise", label: "Enterprise" }]} />
          </div>
          <div>
            <p className="text-sm font-medium sc-heading mb-2">With Error</p>
            <FormRadioButton name="priority" control={control} error errorMessage="Required" options={[{ value: "low", label: "Low" }, { value: "high", label: "High" }]} />
          </div>
        </div>
      </ExampleBlock>

      {/* ── PASSWORD INPUT ──────────────────────── */}
      <SectionTitle title="Password Input" description="Password fields with toggle visibility." />

      <ExampleBlock title="Basic & Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PasswordInput id="pw-1" label="Password" placeholder="Enter password" />
          <PasswordInput id="pw-sm" label="Small" size="sm" placeholder="Small" />
          <PasswordInput id="pw-lg" label="Large" size="lg" placeholder="Large" />
        </div>
      </ExampleBlock>

      {/* ── NUMBER INPUT ────────────────────────── */}
      <SectionTitle title="NumberInput" description="Numeric inputs with buttons, variants, sizes, and states." />

      <ExampleBlock title="Basic">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput id="ni-1" label="Quantity" value={quantity} onChange={setQuantity} />
          <NumberInput id="ni-2" label="With Step" step={5} defaultValue={10} />
          <NumberInput id="ni-3" label="Min/Max" min={0} max={100} defaultValue={50} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput id="ni-pri" label="Primary" variant="primary" defaultValue={5} />
          <NumberInput id="ni-suc" label="Success" variant="success" defaultValue={10} />
          <NumberInput id="ni-dan" label="Danger" variant="danger" defaultValue={15} />
          <NumberInput id="ni-war" label="Warning" variant="warning" defaultValue={20} />
          <NumberInput id="ni-inf" label="Info" variant="info" defaultValue={25} />
          <NumberInput id="ni-dar" label="Dark" variant="dark" defaultValue={30} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Colored Buttons">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput id="ni-cb1" label="Primary Colored" variant="primary" coloredButtons defaultValue={5} />
          <NumberInput id="ni-cb2" label="Success Colored" variant="success" coloredButtons defaultValue={10} />
          <NumberInput id="ni-cb3" label="Danger Colored" variant="danger" coloredButtons defaultValue={15} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput id="ni-sm" label="Small" size="sm" defaultValue={5} />
          <NumberInput id="ni-md" label="Medium" size="md" defaultValue={10} />
          <NumberInput id="ni-lg" label="Large" size="lg" defaultValue={15} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Min/Max & States">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput id="ni-mm" label="Range 0–10" min={0} max={10} defaultValue={5} />
          <NumberInput id="ni-e" label="Error" error errorMessage="Invalid value" defaultValue={0} />
          <NumberInput id="ni-d" label="Disabled" disabled defaultValue={5} />
          <NumberInput id="ni-ro" label="Read Only" readOnly defaultValue={42} />
          <NumberInput id="ni-tt" label="With Tooltip" tooltip="Adjust quantity" defaultValue={5} />
        </div>
      </ExampleBlock>

      {/* ── FORM NUMBER INPUT ──────────────────── */}
      <SectionTitle title="FormNumberInput" description="Controlled number inputs with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormNumberInput name="quantity" control={control} label="Quantity (Controlled)" />
          <FormNumberInput name="quantity" control={control} label="With Error" error errorMessage="Required" />
          <FormNumberInput name="quantity" control={control} label="Disabled" disabledStatus />
          <FormNumberInput name="quantity" control={control} label="With Tooltip" tooltip="Set quantity" />
        </div>
      </ExampleBlock>

      {/* ── OTP INPUT ──────────────────────────── */}
      <SectionTitle title="OTP Input" description="One-time password inputs with different lengths and variants." />

      <ExampleBlock title="Lengths">
        <div className="space-y-4">
          <OtpInput id="otp-4" label="4 Digits" length={4} value={shortOtp} onChange={setShortOtp} />
          <OtpInput id="otp-6" label="6 Digits" length={6} value={otp} onChange={setOtp} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants & Sizes">
        <div className="space-y-4">
          <OtpInput id="otp-pri" label="Primary" variant="primary" length={6} />
          <OtpInput id="otp-suc" label="Success" variant="success" length={6} />
          <OtpInput id="otp-sm" label="Small" size="sm" length={6} />
          <OtpInput id="otp-lg" label="Large" size="lg" length={6} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="States">
        <div className="space-y-4">
          <OtpInput id="otp-err" label="Error" error errorMessage="Invalid code" length={6} />
          <OtpInput id="otp-dis" label="Disabled" disabled length={6} />
        </div>
      </ExampleBlock>

      {/* ── FORM OTP ───────────────────────────── */}
      <SectionTitle title="FormOtpInput" description="Controlled OTP input with react-hook-form." />

      <ExampleBlock title="Controlled">
        <FormOtpInput name="otp" control={control} label="OTP (Controlled)" length={6} />
      </ExampleBlock>

      {/* ── SLIDER ─────────────────────────────── */}
      <SectionTitle title="Slider" description="Range sliders with colors, sizes, ticks, and range mode." />

      <ExampleBlock title="Default">
        <div className="max-w-md">
          <Slider value={slider} onChange={setSlider} label="Volume" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <Slider defaultValue={30} color="primary" label="Primary" showValue />
          <Slider defaultValue={50} color="success" label="Success" showValue />
          <Slider defaultValue={70} color="danger" label="Danger" showValue />
          <Slider defaultValue={40} color="warning" label="Warning" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          <Slider defaultValue={40} size="sm" label="Small" showValue />
          <Slider defaultValue={60} size="md" label="Medium" showValue />
          <Slider defaultValue={80} size="lg" label="Large" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Ticks & Step">
        <div className="space-y-6 max-w-md">
          <Slider defaultValue={50} showTicks tickCount={5} label="With Ticks" showValue />
          <Slider defaultValue={20} step={10} min={0} max={100} showTicks label="Step 10" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Range (Dual Thumb)">
        <div className="max-w-md">
          <RangeSlider value={range} onChange={setRange} label="Price Range" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <div className="max-w-md">
          <Slider defaultValue={50} disabled label="Disabled" showValue />
        </div>
      </ExampleBlock>

      {/* ── KNOB ──────────────────────────────── */}
      <SectionTitle title="Knob" description="Circular knob inputs for value selection." />

      <ExampleBlock title="Sizes">
        <div className="flex flex-wrap gap-8 items-end">
          <Knob value={knobVal} onChange={setKnobVal} size="sm" label="Small" showValue />
          <Knob value={knobVal} onChange={setKnobVal} size="md" label="Medium" showValue />
          <Knob value={knobVal} onChange={setKnobVal} size="lg" label="Large" showValue />
          <Knob value={knobVal} onChange={setKnobVal} size="xl" label="XL" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Colors">
        <div className="flex flex-wrap gap-8 items-end">
          <Knob value={65} size="md" color="primary" label="Primary" showValue />
          <Knob value={45} size="md" color="success" label="Success" showValue />
          <Knob value={80} size="md" color="danger" label="Danger" showValue />
          <Knob value={55} size="md" color="warning" label="Warning" showValue />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Interactive & Disabled">
        <div className="flex flex-wrap gap-8 items-end">
          <Knob value={knobVal} onChange={setKnobVal} size="lg" label="Interactive" showValue />
          <Knob value={50} size="lg" disabled label="Disabled" showValue />
        </div>
      </ExampleBlock>

      {/* ── RATE ──────────────────────────────── */}
      <SectionTitle title="Rate" description="Star rating inputs with half stars, sizes, and colors." />

      <ExampleBlock title="Default">
        <Rate value={rateVal} onChange={setRateVal} />
      </ExampleBlock>

      <ExampleBlock title="Half Stars">
        <Rate defaultValue={2.5} allowHalf />
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="space-y-4">
          <Rate defaultValue={3} size="sm" />
          <Rate defaultValue={3} size="md" />
          <Rate defaultValue={3} size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Colors">
        <div className="space-y-4">
          <Rate defaultValue={4} color="primary" />
          <Rate defaultValue={4} color="success" />
          <Rate defaultValue={4} color="danger" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="10 Stars & Allow Clear">
        <div className="space-y-4">
          <Rate defaultValue={7} count={10} />
          <Rate defaultValue={3} allowClear />
        </div>
      </ExampleBlock>

      {/* ── COLOR PICKER ─────────────────────── */}
      <SectionTitle title="ColorPicker" description="Color picker inputs with sizes and states." />

      <ExampleBlock title="Default & Sizes">
        <div className="flex flex-wrap gap-4 items-end">
          <ColorPicker value={color} onChange={setColor} />
          <ColorPicker defaultValue="#10b981" size="sm" />
          <ColorPicker defaultValue="#ef4444" size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <ColorPicker defaultValue="#6366f1" disabled />
      </ExampleBlock>

      {/* ── FORM COLOR PICKER ────────────────── */}
      <SectionTitle title="FormColorPicker" description="Controlled color picker with react-hook-form." />

      <ExampleBlock title="Controlled">
        <FormColorPicker label="Theme Color" value={color} onChange={setColor} />
      </ExampleBlock>

      {/* ── DATE PICKER ──────────────────────── */}
      <SectionTitle title="DatePicker" description="Date picker inputs with sizes and constraints." />

      <ExampleBlock title="Default & Sizes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DatePicker value={date} onChange={setDate} />
          <DatePicker defaultValue="2024-06-15" size="sm" />
          <DatePicker defaultValue="2024-06-15" size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Min/Max & Disabled">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker defaultValue="2024-06-15" minDate="2024-01-01" maxDate="2024-12-31" />
          <DatePicker defaultValue="2024-06-15" disabled />
        </div>
      </ExampleBlock>

      {/* ── FORM DATE PICKER ─────────────────── */}
      <SectionTitle title="FormDatePicker" description="Controlled date picker with react-hook-form." />

      <ExampleBlock title="Controlled">
        <div className="max-w-sm">
          <FormDatePicker label="Event Date" value={date} onChange={setDate} />
        </div>
      </ExampleBlock>

      {/* ── FILE UPLOAD ──────────────────────── */}
      <SectionTitle title="FileUpload" description="File upload with variants, accept types, sizes, and states." />

      <ExampleBlock title="Default">
        <FileUpload accept={{ "image/*": [".png", ".jpg", ".gif"] }} maxFiles={5} maxSize={10 * 1024 * 1024} />
      </ExampleBlock>

      <ExampleBlock title="Minimal">
        <FileUpload variant="minimal" accept={{ "image/*": [".png", ".jpg"] }} maxFiles={3} />
      </ExampleBlock>

      <ExampleBlock title="Bordered">
        <FileUpload variant="bordered" accept={{ "image/*": [".png", ".jpg"] }} maxFiles={3} />
      </ExampleBlock>

      <ExampleBlock title="Filled">
        <FileUpload variant="filled" accept={{ "image/*": [".png", ".jpg"] }} maxFiles={3} />
      </ExampleBlock>

      <ExampleBlock title="Images Only">
        <FileUpload accept={{ "image/*": [".png", ".jpg", ".gif", ".webp"] }} maxFiles={10} label="Upload Images" />
      </ExampleBlock>

      <ExampleBlock title="PDF Only">
        <FileUpload accept={{ "application/pdf": [".pdf"] }} maxFiles={5} label="Upload PDFs" />
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="space-y-4">
          <FileUpload size="sm" accept={{ "image/*": [".png"] }} maxFiles={1} />
          <FileUpload size="lg" accept={{ "image/*": [".png"] }} maxFiles={1} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="No Preview">
        <FileUpload accept={{ "image/*": [".png", ".jpg"] }} maxFiles={3} showPreview={false} />
      </ExampleBlock>

      <ExampleBlock title="Error & Disabled">
        <div className="space-y-4">
          <FileUpload accept={{ "image/*": [".png"] }} maxFiles={1} error="File is required" />
          <FileUpload accept={{ "image/*": [".png"] }} maxFiles={1} disabled />
        </div>
      </ExampleBlock>

      {/* ── RICH TEXT EDITOR ─────────────────── */}
      <SectionTitle title="RichTextEditor" description="WYSIWYG rich text editor with various states." />

      <ExampleBlock title="Basic">
        <RichTextEditor value={rte} onChange={setRte} label="Content" />
      </ExampleBlock>

      <ExampleBlock title="States">
        <div className="space-y-4">
          <RichTextEditor value="<p>Error state content</p>" label="With Error" error errorMessage="Content is required" />
          <RichTextEditor value="<p>Disabled content</p>" label="Disabled" disabled />
          <RichTextEditor value="" label="Disabled" disabled />
        </div>
      </ExampleBlock>

      {/* ── FORM RICH TEXT EDITOR ────────────── */}
      <SectionTitle title="FormRichTextEditor" description="Controlled rich text editor with react-hook-form." />

      <ExampleBlock title="Controlled">
        <FormRichTextEditor name="content" control={control} label="Article (Controlled)" />
      </ExampleBlock>

      {/* ── WORKFLOW EDITOR ──────────────────── */}
      <SectionTitle title="WorkflowEditor" description="Visual workflow / flow-chart editor." />

      <ExampleBlock title="Basic">
        <div className="h-[400px] rounded-xl overflow-hidden border">
          <WorkflowEditor />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <div className="h-[300px] rounded-xl overflow-hidden border">
          <WorkflowEditor disabled />
        </div>
      </ExampleBlock>

      {/* ── TRANSFER ─────────────────────────── */}
      <SectionTitle title="Transfer" description="Dual-list transfer component." />

      <ExampleBlock title="Default">
        <Transfer dataSource={transferSourceData} targetKeys={transferTarget} onChange={setTransferTarget} />
      </ExampleBlock>

      <ExampleBlock title="Without Search">
        <Transfer dataSource={transferSourceData} targetKeys={[]} onChange={() => {}} showSearch={false} />
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <Transfer dataSource={transferSourceData} targetKeys={["1"]} onChange={() => {}} disabled />
      </ExampleBlock>
    </div>
  );
};

export default InputsTab;
