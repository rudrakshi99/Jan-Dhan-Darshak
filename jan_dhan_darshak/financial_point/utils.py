from datetime import date, timedelta


def allsundays(year):
    d = date(year, 1, 1)  # January 1st
    d += timedelta(days=6 - d.weekday())  # First Sunday
    while d.year == year:
        yield d
        d += timedelta(days=7)


def get_saturdays(year):
    arr = []
    for month in range(1, 13):
        dt = date(year, month, 1)  # first day of month
        first_w = dt.isoweekday()  # weekday of 1st day of the month
        if first_w == 7:  # if it is Sunday return 0
            first_w = 0
        saturday2 = 14 - first_w
        dt1 = date(year, month, saturday2)
        saturday4 = 28 - first_w  # 4th Saturday
        dt2 = date(year, month, saturday4)
        arr.append(dt1)
        arr.append(dt2)
        print(dt2.strftime("%Y-%B : "), dt1.day, " and ", dt2.day)
    return arr
