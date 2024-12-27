import { LottoGameType } from "./types";
type DaySchedule = {
  [key in
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"]: LottoGameType[];
};

export const getLottoSchedule = (): DaySchedule => ({
  SUNDAY: [LottoGameType.ULTRA_LOTTO_658, LottoGameType.SUPER_LOTTO_649],
  MONDAY: [LottoGameType.GRAND_LOTTO_655, LottoGameType.MEGA_LOTTO_645],
  TUESDAY: [
    LottoGameType.ULTRA_LOTTO_658,
    LottoGameType.SUPER_LOTTO_649,
    LottoGameType.LOTTO_642,
  ],
  WEDNESDAY: [LottoGameType.GRAND_LOTTO_655, LottoGameType.MEGA_LOTTO_645],
  THURSDAY: [LottoGameType.SUPER_LOTTO_649, LottoGameType.LOTTO_642],
  FRIDAY: [LottoGameType.ULTRA_LOTTO_658, LottoGameType.MEGA_LOTTO_645],
  SATURDAY: [LottoGameType.GRAND_LOTTO_655, LottoGameType.LOTTO_642],
});

export const getNextDrawDate = (gameType: LottoGameType): Date => {
  const schedule = getLottoSchedule();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ] as const;
  const today = new Date();
  const dayOfWeek = today.getDay();

  let daysAhead = 1;
  while (daysAhead <= 7) {
    const futureDay = (dayOfWeek + daysAhead) % 7;
    const dayName = days[futureDay];
    if (schedule[dayName].includes(gameType)) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + daysAhead);
      nextDate.setHours(21, 0, 0, 0);
      return nextDate;
    }
    daysAhead++;
  }
  return today;
};
