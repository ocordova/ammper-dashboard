const CustomLegend = () => (
  <div
    id="custom-legend"
    className="flex flex-row items-center justify-center gap-x-1.5"
  >
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm">
      <svg
        className="h-2 w-2 fill-emerald-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Inflow
    </span>
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm">
      <svg
        className="h-2 w-2 fill-rose-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Outflow
    </span>
  </div>
);

export default CustomLegend;
