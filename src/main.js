import { CURRENT_RESPONSE } from "../tests/fixtures/open-meteo-current.js";
import { DAILY_RESPONSE } from "../tests/fixtures/open-meteo-daily.js";
import { toCurrent, toDaily } from "./forecast.js";
import { renderCurrent, renderDaily} from "./render.js";

const current = toCurrent(CURRENT_RESPONSE);
const days = toDaily(DAILY_RESPONSE);

renderCurrent(current, "Dallas, Texas");
renderDaily(days);

const search = document.querySelector("#search-form")
console.log(search)
