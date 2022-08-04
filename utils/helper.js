let newDate = new Date()
let date_raw = newDate.getDate();
let month_raw = newDate.getMonth() + 1;
let year = newDate.getFullYear();
var date, month

if (date_raw < 10) { date = "0" + date_raw.toString() } else { date = date_raw.toString() }
if (month_raw < 10) { month = "0" + month_raw.toString() } else { month = month_raw.toString() }

export const fullDate = `${year}-${month}-${date}`;


export const GenderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

export const RelationOptions = [
  { value: 'Self', label: 'Self' },
  { value: 'Wife', label: 'Wife' },
  { value: 'Husband', label: 'Husband' },
  { value: 'Son', label: 'Son' },
  { value: 'Daughter', label: 'Daughter' },
  { value: 'Daughter-in-law', label: 'Daughter-in-law' },
  { value: 'Grand-son', label: 'Grand-son' },
  { value: 'Grand-daughter', label: 'Grand-daughter' }
]
