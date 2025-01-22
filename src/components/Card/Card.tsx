
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
        <Card className={cn(" bg-[#18181B] border border-[#27272A] text-white", className)}>
            <CardHeader className="flex flex-row items-center gap-3">
                {icon && (
                    <div className="bg-[#FFFFFF1A] p-[10px] items-center rounded-[8px]">
                        <div
                            className="text-zinc-200 w-6 h-6 text-center"
                            dangerouslySetInnerHTML={{ __html: icon }}
                        />

                    </div>

                )}
                <CardTitle className="text-sm Inter font-medium text-zinc-200 ">{title}</CardTitle>

            </CardHeader>
            <CardContent>
                <p className="text-2xl Inter font-bold text-zinc-200">{value}</p>
                <p className="text-xs Inter font-normal text-zinc-400 mt-2">{valuePercent}</p>


            </CardContent>
        </Card>
    );
};

export default MetricCard;