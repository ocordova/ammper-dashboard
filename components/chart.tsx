import HighchartsReact, {
  HighchartsReactRefObject,
  HighchartsReactProps,
} from "highcharts-react-official";

import { useRef } from "react";

export default function Chart({ options, highcharts }: HighchartsReactProps) {
  const chartRef = useRef<HighchartsReactRefObject>(null);

  return (
    <HighchartsReact highcharts={highcharts} options={options} ref={chartRef} />
  );
}
