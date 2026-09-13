export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
  timezones: string[];
};

// Kept in a separate data module so it can be swapped for a full ISO/telephony
// dataset without changing any project-form logic.
export const countries: Country[] = [
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩", timezones: ["Bangladesh Standard Time — Dhaka (GMT+6)"] },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸", timezones: ["Eastern Time (ET) — GMT-5 / GMT-4 DST", "Central Time (CT) — GMT-6 / GMT-5 DST", "Mountain Time (MT) — GMT-7 / GMT-6 DST", "Pacific Time (PT) — GMT-8 / GMT-7 DST", "Alaska Time (AKT) — GMT-9 / GMT-8 DST", "Hawaii Time (HST) — GMT-10"] },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧", timezones: ["Greenwich Mean / British Summer — GMT+0 / GMT+1 DST"] },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦", timezones: ["Eastern Time — GMT-5 / GMT-4 DST", "Central Time — GMT-6 / GMT-5 DST", "Mountain Time — GMT-7 / GMT-6 DST", "Pacific Time — GMT-8 / GMT-7 DST", "Atlantic Time — GMT-4 / GMT-3 DST", "Newfoundland Time — GMT-3:30 / GMT-2:30 DST"] },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺", timezones: ["Eastern Time (AEST/AEDT) — GMT+10 / GMT+11", "Central Time (ACST/ACDT) — GMT+9:30 / GMT+10:30", "Western Time (AWST) — GMT+8"] },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳", timezones: ["India Standard Time — IST (GMT+5:30)"] },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰", timezones: ["Pakistan Standard Time (GMT+5)"] },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵", timezones: ["Nepal Time (GMT+5:45)"] },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰", timezones: ["Sri Lanka Standard Time (GMT+5:30)"] },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹", timezones: ["Western European Time — GMT+0 / GMT+1 DST"] },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮", timezones: ["Eastern European Time — GMT+2 / GMT+3 DST"] },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱", timezones: ["Central European Time — GMT+1 / GMT+2 DST"] },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪", timezones: ["Irish Standard Time — GMT+0 / GMT+1 DST"] },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪", timezones: ["Gulf Standard Time (GMT+4)"] },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦", timezones: ["Arabia Standard Time (GMT+3)"] },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦", timezones: ["Arabia Standard Time (GMT+3)"] },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼", timezones: ["Arabia Standard Time (GMT+3)"] },
  { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲", timezones: ["Gulf Standard Time (GMT+4)"] },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬", timezones: ["Singapore Standard Time (GMT+8)"] },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾", timezones: ["Malaysia Time (GMT+8)"] },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩", timezones: ["Western Indonesia (WIB) — GMT+7", "Central Indonesia (WITA) — GMT+8", "Eastern Indonesia (WIT) — GMT+9"] },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭", timezones: ["Indochina Time (GMT+7)"] },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳", timezones: ["Indochina Time (GMT+7)"] },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭", timezones: ["Philippine Standard Time (GMT+8)"] },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳", timezones: ["China Standard Time (GMT+8)"] },
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰", timezones: ["Hong Kong Time (GMT+8)"] },
  { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼", timezones: ["Taiwan Standard Time (GMT+8)"] },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵", timezones: ["Japan Standard Time (GMT+9)"] },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷", timezones: ["Korea Standard Time (GMT+9)"] },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿", timezones: ["New Zealand Time — GMT+12 / GMT+13 DST"] },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷", timezones: ["Brasília Time (GMT-3)", "Amazon Time (GMT-4)", "Acre Time (GMT-5)"] },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽", timezones: ["Central Time (GMT-6)", "Pacific Time (GMT-8 / GMT-7 DST)", "Mountain Time (GMT-7)", "Eastern Time (GMT-5)"] },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷", timezones: ["Argentina Time (GMT-3)"] },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦", timezones: ["South Africa Standard Time (GMT+2)"] },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬", timezones: ["West Africa Time (GMT+1)"] },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪", timezones: ["East Africa Time (GMT+3)"] },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬", timezones: ["Eastern European Time — GMT+2 / GMT+3 DST"] },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷", timezones: ["Turkey Time (GMT+3)"] },
];

export const defaultCountry = countries.find((country) => country.code === "US") ?? countries[0];
