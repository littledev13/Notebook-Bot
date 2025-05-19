import {
  fetchEconomicEvents,
  CalendarType,
  Country,
  Currency,
  Language,
  Importance,
  TimeZone,
} from "investing-economic-calendar";

// Example to fetch all important events of today by Countries.
const eventsDaily = await fetchEconomicEvents({
  importance: [Importance.HIGH, Importance.MEDIUM],
  calType: CalendarType.DAILY,
  lang: Language.ENGLISH,
  timeZone: 77,
  currencies: [Currency.USD],
});

// Example to fetch all important events of the week by Currencies.
const eventsWeekly = await fetchEconomicEvents({
  importance: [Importance.HIGH, Importance.MEDIUM],
  calType: CalendarType.WEEKLY,
  lang: Language.ENGLISH,
  timeZone: 77,
  currencies: [Currency.USD],
});

export { eventsDaily, eventsWeekly };
