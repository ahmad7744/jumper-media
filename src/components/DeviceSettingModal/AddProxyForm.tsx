import { useState } from "react";
import { Button } from "../ui/button";
import Select from "../ui/select";

export const AddProxyForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <div>
      <p className="text-zinc-400 text-sm mb-6">
        Specify connection type and authorization parameters.
      </p>

      <div className="grid md:grid-cols-2  gap-4 mb-8">
        <div>
          <label className="text-zinc-300 text-sm block mb-2">Connect</label>
          <div className="rounded-md text-white">
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              className="max-w-xs"
            />
          </div>
        </div>
        <div>
          <label className="text-zinc-300 text-sm block mb-2">
            Authorization
          </label>
          <div className="  rounded-md text-white ">
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>

      <Button
        variant={"outline"}
        className="w-full bg-blue-700 border-none text-white"
      >
        Add Proxy
      </Button>
    </div>
  );
};
