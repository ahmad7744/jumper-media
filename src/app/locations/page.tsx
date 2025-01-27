import { Input } from '@/components/ui/input';
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { ChevronDown, RotateCcw } from 'lucide-react';
import Assets from '../../../public/assets/assets';
const page = () => {
  return (
    <div className="w-full h-screen  mx-auto">
      <div className=" p-10 w-full  max-w-[1440px] mx-auto ">
        <h1 className="text-neutral-50 Inter font-bold text-3xl">Locations</h1>

        <div className="flex items-center py-5 justify-between max-w-[1360px]">
          <Input
            placeholder="Search Locations"
            // value={(table.getColumn("phoneID")?.getFilterValue() as string) ?? ""}
            // onChange={(event) =>
            //   table.getColumn("phoneID")?.setFilterValue(event.target.value)
            // }
            className="max-w-[260px] bg-zinc-900 border-neutral-800 text-neutral-400"
            

          />
          <div className="gap-3 flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-transparent border Inter font-medium border-neutral-800 text-neutral-50"
                  size="sm"
                >
                  Sort by: Name{" "}
                  {/* {selectedLocations.length === 0
                    ? "All"
                    : selectedLocations.length === 1
                      ? selectedLocations[0]
                      : `${selectedLocations[0]}, ...`}{" "} */}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1 absolute z-50"
                align="start"
              >
                {/* {allLocations.map((location) => {
                  const isSelected = selectedLocations.includes(location);
                  return (
                    <div
                      key={location}
                      className={`flex items-center space-x-2 p-2 ${isSelected ? 'bg-zinc-800 rounded-[2px]' : ''}`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLocations((prev) => [...prev, location]);
                          } else {
                            setSelectedLocations((prev) => prev.filter((loc) => loc !== location));
                          }
                        }}
                        id={location}
                        className="border border-zinc-500 w-4 h-4 rounded-sm data-[state=checked]:bg-zinc-300 data-[state=checked]:border-zinc-300"
                      >
                        <CheckboxIndicator className="text-zinc-950">
                          <Check className="w-4 h-4" />
                        </CheckboxIndicator>
                      </Checkbox>

                      <label
                        htmlFor={location}
                        className="text-sm text-zinc-200 Inter font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                      >
                        {location}
                      </label>
                    </div>
                  );
                })} */}
              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto bg-transparent border Inter font-medium border-neutral-800 text-neutral-50" size={"sm"}>
                  Status: All <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1" align="start">

                {/* <CustomRadioButton
                  options={options}
                  selectedValue={filterStatus}
                  onChange={setFilterStatus}
                /> */}

              </DropdownMenuContent>



            </DropdownMenu>


          </div>
        </div>

      </div>
    </div>
  )
}

export default page