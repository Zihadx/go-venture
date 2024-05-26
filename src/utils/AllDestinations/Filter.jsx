import { Checkbox, FormControlLabel, Slider, Typography } from "@mui/material";

const DestinationFilter = ({ destinations }) => {


  const uniqueCategories = [...new Set(destinations.data.map(des => des.category))];


  return (
    <div>
      <div className="p-4 border rounded-lg shadow-md w-full">
        {/* ---filter by price--- */}
        <div className="my-4">
          <Typography variant="h6">Filter Price</Typography>
          <div className="mt-4">
            <Typography>$50 - $10000</Typography>
            <Slider
              value={[50, 10000]}
              valueLabelDisplay="auto"
              min={50}
              max={10000}
              sx={{ color: "orange" }}
            />
          </div>
        </div>
        <hr />
        {/* ---filter by rating--- */}
        <div className="my-4">
          <Typography variant="h6">Rating</Typography>
          <div className="mt-4">
            <Typography>0 - 5</Typography>
            <Slider
              value={[0, 5]}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.5}
              sx={{ color: "orange" }}
            />
          </div>
        </div>
        <hr />

        {/* ---filter by category--- */}
        <div className="my-4">
          <Typography variant="h6">Category</Typography>
          <div className="mt-4">
          {uniqueCategories.map((category) => (
            <FormControlLabel
              key={category}
              control={<Checkbox value={category} />}
              label={category}
              sx={{ display: 'block' }}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationFilter;
