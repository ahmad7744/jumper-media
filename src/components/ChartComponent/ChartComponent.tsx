"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Assets from "../../../public/assets/assets";


const defaultChartData = [
    { time: "9AM", downloadSpeed: 186, uploadSpeed: 80 },
    { time: "10AM", downloadSpeed: 305, uploadSpeed: 200 },
    { time: "11AM", downloadSpeed: 237, uploadSpeed: 120 },
    { time: "12AM", downloadSpeed: 73, uploadSpeed: 190 },
    { time: "1PM", downloadSpeed: 209, uploadSpeed: 130 },
    { time: "2PM", downloadSpeed: 214, uploadSpeed: 140 },
    { time: "3PM", downloadSpeed: 214, uploadSpeed: 140 },
    { time: "4PM", downloadSpeed: 250, uploadSpeed: 100 },



];


const defaultChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
        icon: TrendingUp,
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
        icon: TrendingUp,
    },
} satisfies ChartConfig;

interface AreaChartProps {
    chartData?: typeof defaultChartData;
    chartConfig?: typeof defaultChartConfig;
    title?: string;
    description?: string;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({
    chartData = defaultChartData,
    chartConfig = defaultChartConfig,
    title = "Proxy Performance",
    description = "Showing total visitors for the last 6 months",
}) => {
    return (
        <div className="w-full max-w-[726px] bg-zinc-900 rounded-[8px] p-6 Inter">

            <div className="flex justify-between">
                <p className="text-zinc-200 text-xs font-medium">{title}</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-blue-400" />
                        <p className="text-xs text-zinc-200">Downloading Speed</p>

                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-teal-400" />
                        <p className="text-xs text-zinc-200">Uploading Speed</p>

                    </div>
                </div>


            </div>


            <ChartContainer className="m-0 dark" config={chartConfig}>
                <AreaChart
                    className="m-0"
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 20, right:20, top: 0, bottom: 0 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 4)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-blur bg-[#FFFFFF1A] p-4 rounded-md flex flex-col gap-2">
                                        <p className="font-medium text-sm text-zinc-200">{`Time: ${data.time}`}</p>
                                        <div className="flex items-center gap-2">
                                            <div  className="text-blue-400" dangerouslySetInnerHTML={{ __html: Assets.DownloadSpeed }} />
                                            <p className="text-xs text-zinc-200 font-bold">{`${data.downloadSpeed}`}<span className="font-normal"> Mbps</span></p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-teal-400" dangerouslySetInnerHTML={{ __html: Assets.UploadSpeed }} />
                                            <p className="text-xs text-zinc-200 font-bold">{`${data.uploadSpeed}`}<span className="font-normal"> Mbps</span></p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="downloadSpeed"
                        type="natural"
                        fill="url(#fillMobile)"
                        fillOpacity={0.4}
                        stroke="var(--color-mobile)"
                        stackId="a"
                    />
                    <Area
                        dataKey="uploadSpeed"
                        type="natural"
                        fill="url(#fillDesktop)"
                        fillOpacity={0.4}
                        stroke="var(--color-desktop)"
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
};

export default AreaChartComponent;
