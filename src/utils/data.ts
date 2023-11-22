export const COLUMN_NAMES = {
  TO_APPLY: "To apply",
  APPLIED: "Applied", 
  INTERVIEWING: "Interviewing",
  ONSITE: "Onsite",
  OFFER: "Offer"
};

const { TO_APPLY, APPLIED, INTERVIEWING, ONSITE, OFFER } = COLUMN_NAMES;

export const COLUMN_ARRAY = [
  { columnId: "2b33291b-05e7-4cea-a2ba-d47a82feb7e8", name: TO_APPLY, bgColor: "" },
  { columnId: "a6ba1942-243c-4447-b747-913a17ac4f3d", name: APPLIED, bgColor: "#faf8f2" },
  { columnId: "4bf2c970-c1ec-4222-951a-e9c56fc550c3", name: INTERVIEWING, bgColor: "" },
  { columnId: "b55f2059-8a29-44bf-841c-644ce88b955c", name: ONSITE, bgColor: "" },
  { columnId: "fbdac992-8e31-413d-99aa-a8f478fb9994", name: OFFER, bgColor: "#f7f9f7" }
];

export const tasks = [
  { id: 1, name: 'Intel', column: "2b33291b-05e7-4cea-a2ba-d47a82feb7e8" },
  { id: 2, name: 'Zoom', column: "2b33291b-05e7-4cea-a2ba-d47a82feb7e8" },
  { id: 3, name: 'Spotify', column: "a6ba1942-243c-4447-b747-913a17ac4f3d" },
  { id: 4, name: 'Meta', column: "b55f2059-8a29-44bf-841c-644ce88b955c" },
  { id: 5, name: 'Google', column: "b55f2059-8a29-44bf-841c-644ce88b955c" }
];
