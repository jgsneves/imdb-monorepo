export class DateUtil {
  public static addDaysToCurrentDate(daysToAdd: number): Date {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + daysToAdd);
    return newDate;
  }

  public static dateTimeLocaleFormat(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }
}
