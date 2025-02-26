
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface MetricCardProps {
    title: string;
    value: string | number;
    valuePercent:string | number;
    icon?: string;
    className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, className, valuePercent }) => {
    return (
        <Card className={cn(" bg-[#FFFFFF0A] border-[1px] border-[#FFFFFF0F] text-white rounded-xl flex flex-col gap-2 p-6 2xl:p-10 2xl:gap-4", className)}>
            <CardHeader className="flex flex-row-reverse lg:flex-row justify-between lg:justify-start items-center gap-3">
                {icon && (
                    <div className="lg:bg-[#FFFFFF1A] lg:p-[10px] items-center rounded-md">
                        <div
                            className="text-zinc-200 w-6 h-6 text-center"
                            dangerouslySetInnerHTML={{ __html: icon }}
                        />

                    </div>

                )}
                <CardTitle className="text-xs 2xl:text-xl flex-1 Inter font-medium text-zinc-200 ">{title}</CardTitle>

            </CardHeader>
            <CardContent>
                <p className="text-xl lg:text-2xl 2xl:text-4xl Inter font-bold text-zinc-200">{value}</p>
                <p className="text-xs  2xl:text-base Inter font-normal text-zinc-400 mt-2">{valuePercent}</p>

            </CardContent>
        </Card>
    );
};

export default MetricCard;